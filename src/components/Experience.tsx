import { motion } from "framer-motion";
import { SectionHead, Reveal, It, LineReveal, EASE } from "./anim";
import { experiences, type ExperienceEntry } from "../lib/data";

const TERMINAL = [
  { cmd: "$ n8n workflows validate", out: false },
  { cmd: "  webhook → validation → remediation chain        ok", out: true },
  { cmd: "$ pytest backend/tests -q", out: false },
  { cmd: "  backend tests passing                           ok", out: true },
  { cmd: "$ docker compose up -d", out: false },
  { cmd: "  services running                                ok", out: true },
];

function ExperienceBlock({ exp }: { exp: ExperienceEntry }) {
  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h3 className="display text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold text-[var(--color-ink)]">
            {exp.company}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-signal)]">
            {exp.role}
          </span>
        </div>
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-faint)]">
          {exp.period} · {exp.location}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-6 max-w-2xl text-[clamp(1.1rem,1.7vw,1.35rem)] leading-snug text-[var(--color-ink)]">
          {exp.summary}
        </p>
      </Reveal>

      <div className="mt-8">
        {exp.bullets.map((b, i) => (
          <Reveal key={i} delay={0.04 * i}>
            <div className="group grid grid-cols-[48px_1fr] gap-4 border-t border-[var(--color-line)] py-5 md:grid-cols-[80px_1fr]">
              <span className="font-mono text-xs text-[var(--color-signal)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] leading-relaxed text-[var(--color-mute)] transition-colors group-hover:text-[var(--color-ink)] md:text-base">
                {b}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-[var(--color-line)]" />
      </div>

      <Reveal delay={0.12}>
        <div className="mt-6 flex flex-wrap gap-2">
          {exp.chips.map((c) => (
            <span
              key={c}
              className="border border-[var(--color-line)] px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-mute)]"
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHead
          index="02"
          kicker="Experience"
          right={
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-faint)] md:block">
              2 roles · 2025 — Present
            </span>
          }
        >
          <LineReveal>Internships &</LineReveal>
          <LineReveal delay={0.1}>
            <It className="text-[var(--color-signal)]">applied work.</It>
          </LineReveal>
        </SectionHead>

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="space-y-20">
            {experiences.map((exp) => (
              <ExperienceBlock key={exp.company} exp={exp} />
            ))}
          </div>

          {/* dev shell */}
          <Reveal delay={0.15} className="lg:sticky lg:top-28 lg:self-start">
            <div className="ticks border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)]">
              <div className="code flex items-center justify-between border-b border-[var(--color-line)] px-5 py-3 text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-faint)]">
                <span>harshit@tinycrows · dev</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" /> intern
                </span>
              </div>
              <div className="code space-y-2 p-5 text-[12px] leading-relaxed md:text-[12.5px]">
                {TERMINAL.map((l, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.3 + i * 0.22 }}
                    className={l.out ? "whitespace-pre text-[var(--color-mute)]" : "text-[var(--color-ink)]"}
                  >
                    {l.out ? (
                      <>
                        {l.cmd.replace(/ok$/, "")}
                        <span className="text-[var(--color-signal)]">ok</span>
                      </>
                    ) : (
                      l.cmd
                    )}
                  </motion.p>
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + TERMINAL.length * 0.22 }}
                >
                  $ <span className="animate-blink inline-block h-3.5 w-2 translate-y-0.5 bg-[var(--color-signal)]" />
                </motion.p>
              </div>
            </div>

            <div className="mt-px grid grid-cols-3 border border-[var(--color-line)]">
              {[
                { k: "02", v: "internship roles" },
                { k: "Python", v: "backend + apis" },
                { k: "n8n", v: "automation" },
              ].map((s, i) => (
                <div
                  key={s.v}
                  className={`px-4 py-5 ${i < 2 ? "border-r border-[var(--color-line)]" : ""}`}
                >
                  <div className="display text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">{s.k}</div>
                  <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--color-faint)]">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
