import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export const pointerRef = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      pointerRef.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
}

const BONE = new THREE.Color("#ece7db");
const SIGNAL = new THREE.Color("#ff4d1f");
const EMBER = new THREE.Color("#ff8a5b");

const vertexShader = /* glsl */ `
  attribute float aPhase;
  attribute float aAmp;
  attribute float aSpd;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vPulse;
  void main() {
    vColor = aColor;
    float pulse = 0.65 + 0.45 * sin(uTime * aSpd + aPhase);
    vPulse = pulse;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aAmp * uPixelRatio * pulse * (150.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vPulse;
  uniform float uAlpha;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    /* hard disc with thin soft edge — crisp, not blurry */
    float a = 1.0 - smoothstep(0.34, 0.46, d);
    gl_FragColor = vec4(vColor, a * vPulse * uAlpha);
  }
`;

function makePointMaterial(alpha: number) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uAlpha: { value: alpha },
    },
    transparent: true,
    depthWrite: false,
  });
}

function fibSphere(count: number, radius: number, squash = 0.62, jitter = 0.45): Float32Array {
  const arr = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const y = 1 - t * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const k = 1 - jitter + jitter * Math.random();
    arr[i * 3] = Math.cos(theta) * r * radius * k;
    arr[i * 3 + 1] = y * radius * k;
    arr[i * 3 + 2] = Math.sin(theta) * r * radius * squash;
  }
  return arr;
}

function Neurons({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const kernel = useRef<THREE.Mesh>(null);
  const kernelInner = useRef<THREE.Mesh>(null);

  const count = isMobile ? 100 : 160;
  const positions = useMemo(() => fibSphere(count, 5.4), [count]);

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const phases = new Float32Array(count);
    const amps = new Float32Array(count);
    const spds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2;
      const hot = Math.random() < 0.12;
      amps[i] = hot ? 2.2 + Math.random() * 0.8 : 0.7 + Math.random() * 0.9;
      spds[i] = 0.6 + Math.random() * 1.4;
      c.copy(hot ? SIGNAL : BONE);
      c.toArray(colors, i * 3);
    }
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    g.setAttribute("aAmp", new THREE.BufferAttribute(amps, 1));
    g.setAttribute("aSpd", new THREE.BufferAttribute(spds, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, count]);

  /* nearest-3 neighbours via scalar partial selection — no per-pair
     object allocation and no 160 array sorts (was ~25k objects at mount,
     which produced a visible hitch as the hero appeared). */
  const edgeGeo = useMemo(() => {
    const pts: number[] = [];
    const cols: number[] = [];
    for (let i = 0; i < count; i++) {
      const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
      let b0 = Infinity, b1 = Infinity, b2 = Infinity;
      let j0 = -1, j1 = -1, j2 = -1;
      for (let j = 0; j < count; j++) {
        if (j === i) continue;
        const dx = positions[j * 3] - ax;
        const dy = positions[j * 3 + 1] - ay;
        const dz = positions[j * 3 + 2] - az;
        const d = dx * dx + dy * dy + dz * dz;
        if (d < 0.35) continue;
        if (d < b0) { b2 = b1; j2 = j1; b1 = b0; j1 = j0; b0 = d; j0 = j; }
        else if (d < b1) { b2 = b1; j2 = j1; b1 = d; j1 = j; }
        else if (d < b2) { b2 = d; j2 = j; }
      }
      for (const j of [j0, j1, j2]) {
        if (j < 0) continue;
        pts.push(ax, ay, az, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        const hot = Math.random() < 0.15;
        const c = hot ? SIGNAL : BONE;
        cols.push(c.r, c.g, c.b, c.r, c.g, c.b);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    return g;
  }, [positions, count]);

  const material = useMemo(() => makePointMaterial(1.0), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;
    const g = group.current;
    if (!g) return;
    const targetY = t * 0.05 + pointerRef.x * 0.35;
    const targetX = 0.1 + pointerRef.y * 0.22;
    g.rotation.y += (targetY - g.rotation.y) * 0.045;
    g.rotation.x += (targetX - g.rotation.x) * 0.045;
    g.position.x += ((isMobile ? 0 : 2.4) + pointerRef.x * 0.3 - g.position.x) * 0.05;
    g.position.y += ((isMobile ? 1.6 : 0.2) - pointerRef.y * 0.3 - g.position.y) * 0.05;
    if (kernel.current) {
      kernel.current.rotation.x = t * 0.25;
      kernel.current.rotation.z = t * 0.18;
    }
    if (kernelInner.current) {
      kernelInner.current.rotation.y = -t * 0.4;
      const s = 1 + Math.sin(t * 1.6) * 0.06;
      kernelInner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <points geometry={nodeGeo} material={material} />
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.22} depthWrite={false} />
      </lineSegments>

      {/* the kernel — a wireframe icosahedron with a hot solid core */}
      <mesh ref={kernel}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color={BONE} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={kernelInner}>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial color={SIGNAL} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.66, 0]} />
        <meshBasicMaterial color={EMBER} wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Dust({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = isMobile ? 260 : 640;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(fibSphere(count, 14, 1, 0.5), 3));
    const phases = new Float32Array(count);
    const amps = new Float32Array(count);
    const spds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2;
      amps[i] = 0.25 + Math.random() * 0.45;
      spds[i] = 0.4 + Math.random();
      BONE.toArray(colors, i * 3);
    }
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    g.setAttribute("aAmp", new THREE.BufferAttribute(amps, 1));
    g.setAttribute("aSpd", new THREE.BufferAttribute(spds, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);

  const material = useMemo(() => makePointMaterial(0.35), []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return <points ref={ref} geometry={geo} material={material} />;
}

export default function NeuralHero() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [isMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  /* Stop rendering entirely once the hero leaves the viewport — the GPU
     is then free for scrolling the rest of the page. */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="vignette pointer-events-none absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.3, 11.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Neurons isMobile={isMobile} />
        <Dust isMobile={isMobile} />
        <EffectComposer multisampling={0} resolutionScale={0.6}>
          {/* one tight pass: only the vermilion core is above threshold */}
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.6} luminanceSmoothing={0.1} radius={0.45} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
