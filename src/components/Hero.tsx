import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import NeuralHero from "./three/NeuralHero";
import { profile } from "../lib/data";
import { EASE } from "./anim";

function Line({
  children,
  delay,
  ready,
}: {
  children: React.ReactNode;
  delay: number;
  ready: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={ready ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 0.75, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const fade = (d: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.55, ease: EASE, delay: d * 0.55 },
  });

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <NeuralHero />

      {/* masthead frame lines */}
      <div className="pointer-events-none absolute inset-x-6 top-[88px] hidden border-t border-[var(--color-line)] md:inset-x-10 md:block" />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-end px-6 pb-10 pt-32 md:px-10">
        {/* headline */}
        <h1 className="display mt-16 text-[clamp(3.4rem,11.5vw,11rem)] font-bold text-[var(--color-ink)]">
          <Line delay={0.1} ready={ready}>Harshit</Line>
          <Line delay={0.22} ready={ready}>
            Rana<span className="text-[var(--color-signal)]">.</span>
          </Line>
        </h1>

        <div className="mt-8 grid items-end gap-8 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1fr_1fr]">
          <motion.p
            {...fade(0.6)}
            className="max-w-xl text-[clamp(1.15rem,1.9vw,1.5rem)] leading-snug text-[var(--color-ink)]"
          >
            I build AI-powered systems{" "}
            <em className="serif-it text-[var(--color-signal)]">across the stack</em> — from
            intelligent workflows and backend services to practical interfaces.
          </motion.p>

          <motion.div {...fade(0.75)} className="pointer-events-auto flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href="#work"
              className="btn-fill group inline-flex items-center gap-3 border border-[var(--color-ink)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-signal)] hover:text-[var(--color-void)]"
            >
              View systems
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#principles"
              className="inline-flex items-center gap-3 px-3 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-mute)] transition-colors hover:text-[var(--color-ink)]"
            >
              How I work <ArrowDown size={14} className="text-[var(--color-signal)]" />
            </a>
          </motion.div>
        </div>

        {/* bottom rule */}
        <motion.div
          {...fade(0.95)}
          className="mt-10 flex items-center justify-between border-t border-[var(--color-line)] pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-faint)]"
        >
          <span>{profile.status}</span>
          <span className="hidden md:inline">Python · FastAPI · LangGraph · React · PostgreSQL · Docker</span>
          <span>Scroll ↓</span>
        </motion.div>
      </div>
    </section>
  );
}
