import { motion } from "framer-motion";
import { SectionHead, Reveal, It, LineReveal, EASE } from "./anim";
import { hackathons, certifications } from "../lib/data";

export default function Honors() {
  return (
    <section id="honors" className="paper relative py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHead index="05" kicker="Proof of work" dark={false}>
          <LineReveal>Credibility,</LineReveal>
          <LineReveal delay={0.1}>
            compiled <It className="text-[var(--color-signal)]">under pressure.</It>
          </LineReveal>
        </SectionHead>

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* hackathon ledger */}
          <div>
            <div className="mb-4 grid grid-cols-[64px_1fr_auto] font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-void)]/50 md:grid-cols-[90px_1fr_140px]">
              <span>Year</span>
              <span>Event</span>
              <span className="text-right">Result</span>
            </div>
            {hackathons.map((h, i) => (
              <Reveal key={h.event} delay={i * 0.06}>
                <div
                  data-hover
                  className="group grid grid-cols-[64px_1fr_auto] items-start gap-3 border-t border-[var(--color-void)]/15 py-7 transition-colors hover:bg-[var(--color-void)] hover:text-[var(--color-bone)] md:grid-cols-[90px_1fr_140px] md:px-3"
                >
                  <span className="font-mono text-xs tabular-nums opacity-60 group-hover:opacity-80">{h.year}</span>
                  <div>
                    <h3 className="display text-[clamp(1.6rem,3vw,2.8rem)] font-semibold">{h.event}</h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed opacity-70">{h.body}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] ${
                        i === 0
                          ? "bg-[var(--color-signal)] text-[var(--color-void)]"
                          : "border border-current"
                      }`}
                    >
                      {h.place}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[var(--color-void)]/15" />
          </div>

          {/* certifications */}
          <Reveal delay={0.15}>
            <div className="border border-[var(--color-void)] p-7 md:p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="display text-3xl font-semibold">Certified depth</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-50">
                  {String(certifications.length).padStart(2, "0")} records
                </span>
              </div>
              <div className="mt-6">
                {certifications.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: EASE }}
                    className="group grid grid-cols-[28px_1fr] gap-3 border-t border-[var(--color-void)]/15 py-4"
                    data-hover
                  >
                    <span className="mt-2 h-2 w-2 bg-[var(--color-signal)] transition-transform group-hover:rotate-45 group-hover:scale-125" />
                    <div>
                      <div className="text-[15px] font-medium">{c.name}</div>
                      <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] opacity-55">
                        {c.issuer}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="serif-it mt-8 border-t border-[var(--color-void)]/15 pt-6 text-xl leading-snug">
                Certificates prove syllabus. The results above prove engineering.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
