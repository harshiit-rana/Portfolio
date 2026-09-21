import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHead, Reveal, It, LineReveal, EASE } from "./anim";
import { projects } from "../lib/data";

type P = (typeof projects)[number];

function ProjectCard({ p }: { p: P }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="ticks relative border border-[var(--color-line)] bg-[var(--color-void)] text-[var(--color-ink)]"
    >
      {/* masthead */}
      <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[var(--color-line)] p-7 md:p-10">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-[var(--color-signal)]">
            {p.tagline}
          </div>
          <h3 className="display mt-4 text-[clamp(2.4rem,5.4vw,5rem)] font-bold">{p.name}</h3>
          <div className="mt-4">
            <span className="inline-block border border-[var(--color-line)] px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-mute)]">
              {p.type}
            </span>
          </div>
        </div>
        {(p as P & { repo?: string }).repo ? (
          <a
            href={(p as P & { repo?: string }).repo}
            target="_blank"
            rel="noreferrer"
            data-hover
            aria-label={`${p.name} source code on GitHub`}
            className="grid h-12 w-12 shrink-0 place-items-center border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-signal)] hover:text-[var(--color-void)]"
          >
            <ArrowUpRight size={18} />
          </a>
        ) : (
          <span className="h-12 w-12 shrink-0 border border-[var(--color-line)]" aria-hidden />
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr_1.15fr]">
        {/* left: problem + approach */}
        <div className="border-b border-[var(--color-line)] p-7 lg:border-b-0 lg:border-r lg:p-10">
          <p className="max-w-xl text-[15px] leading-relaxed text-[var(--color-ink)]/90 md:text-base">
            {p.description}
          </p>

          <div className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-faint)]">
            The problem
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-mute)] md:text-base">
            {p.problem}
          </p>

          <div className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-faint)]">
            The approach
          </div>
          <ol className="mt-4 space-y-4">
            {p.approach.map((a, k) => (
              <li key={k} className="flex gap-4">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-[var(--color-signal)] tabular-nums">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-[var(--color-ink)]/85">{a}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* right: architecture flow + highlights + capabilities */}
        <div className="p-7 lg:p-10">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-faint)]">
            Architecture
          </div>
          <div className="mt-4 divide-y divide-[var(--color-line)] border border-[var(--color-line)]">
            {p.architecture.map((step, k) => (
              <div key={step.k} className="flex gap-4 p-4">
                <div className="flex w-24 shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-signal)]">
                  {step.k}
                  {k < p.architecture.length - 1 && (
                    <ArrowRight size={12} className="hidden text-[var(--color-faint)] lg:block" />
                  )}
                </div>
                <p className="text-[13.5px] leading-relaxed text-[var(--color-mute)]">{step.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-faint)]">
            Implemented
          </div>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-ink)]/85"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 bg-[var(--color-signal)]" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-px border border-[var(--color-line)] bg-[var(--color-line)]">
            {p.metrics.map((m) => (
              <div key={m.v} className="bg-[var(--color-void)] px-3 py-4 text-center">
                <div className="display text-xl font-semibold text-[var(--color-signal)] md:text-2xl">
                  {m.k}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-faint)]">
                  {m.v}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mute)]">
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHead
          index="04"
          kicker="Selected projects"
          right={
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-faint)] md:block">
              Personal · Internship · Learning
            </span>
          }
        >
          <LineReveal>Selected projects.</LineReveal>
          <LineReveal delay={0.1}>
            Implemented, tested, <It className="text-[var(--color-signal)]">documented.</It>
          </LineReveal>
        </SectionHead>

        <div className="space-y-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-faint)]">
            Every capability listed reflects implemented work — no concept features
          </p>
        </Reveal>
      </div>
    </section>
  );
}
