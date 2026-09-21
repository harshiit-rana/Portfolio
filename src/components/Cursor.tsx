import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });
  const target = useRef<EventTarget | null>(null);
  const queued = useRef(false);
  const isActive = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    /* Motion values update immediately (no React render).
       The expensive part — walking the DOM with closest() — is throttled
       to one check per animation frame instead of once per mousemove. */
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      target.current = e.target;
      if (queued.current) return;
      queued.current = true;
      requestAnimationFrame(() => {
        queued.current = false;
        const t = target.current as HTMLElement | null;
        const next = !!t?.closest?.("a, button, [data-hover]");
        if (next !== isActive.current) {
          isActive.current = next;
          setActive(next);
        }
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[500] h-2 w-2 rounded-full bg-[var(--color-signal)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[499] border border-[var(--color-signal)]"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          rotate: active ? 45 : 0,
          opacity: active ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      />
    </>
  );
}
