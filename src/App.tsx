import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Experience from "./components/Experience";
import StackGraph from "./components/StackGraph";
import Projects from "./components/Projects";
import Honors from "./components/Honors";
import Footer from "./components/Footer";

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[320] h-[2px] origin-left bg-[var(--color-signal)]"
      style={{ scaleX }}
    />
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="grain relative">
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <Experience />
        <StackGraph />
        <Projects />
        <Honors />
        <Footer />
      </main>
    </div>
  );
}
