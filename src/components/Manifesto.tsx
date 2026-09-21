import { SectionHead, Reveal, It, LineReveal } from "./anim";
import { principles, marqueeItems, profile } from "../lib/data";

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-[var(--color-line-dark)] py-3">
      <div
        className={`gpu flex w-max items-center ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
      >
        {items.map((m, i) => (
          <span
            key={i}
            className="display-condensed flex items-center pr-10 text-[clamp(2rem,4.5vw,4rem)] font-bold uppercase text-[var(--color-void)]"
          >
            <span className={i % 3 === 1 ? "outline-void" : ""}>{m}</span>
            <span className="ml-10 h-3 w-3 rounded-full bg-[var(--color-signal)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Manifesto() {
  return (
    <section id="principles" className="paper relative py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHead index="01" kicker="Operating principles" dark={false}>
          <LineReveal>Understand it,</LineReveal>
          <LineReveal delay={0.1}>
            then <It className="text-[var(--color-signal)]">build it to last.</It>
          </LineReveal>
        </SectionHead>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          {/* statement */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="display text-[clamp(1.6rem,2.6vw,2.3rem)] font-medium leading-[1.1]">
                {profile.philosophy[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-void)]/70">
                {profile.philosophy[1]}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="serif-it mt-6 text-2xl text-[var(--color-void)]">{profile.philosophy[2]}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 inline-flex items-center gap-3 border border-[var(--color-void)] px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.22em]">
                <span className="text-[var(--color-signal)]">ƒ(x)</span> inspectable, testable, useful
              </div>
            </Reveal>
          </div>

          {/* ledger of principles */}
          <div>
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div
                  data-hover
                  className="group grid grid-cols-[auto_1fr] gap-6 border-t border-[var(--color-void)]/15 py-8 transition-colors last:border-b hover:bg-[var(--color-void)] hover:text-[var(--color-bone)] md:grid-cols-[80px_1fr] md:px-4"
                >
                  <span className="font-mono text-xs text-[var(--color-signal)] tabular-nums">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <div>
                    <h3 className="display text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed opacity-70">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 space-y-3 md:mt-32">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
