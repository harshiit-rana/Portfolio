import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHead, Reveal, It, LineReveal } from "./anim";
import { techNodes, productNodes, skillGroups } from "../lib/data";

const TX = 150;
const PX = 850;
const W = 1000;
const H = 620;

type Hover = { type: "tech" | "product"; id: string } | null;

export default function StackGraph() {
  const [hover, setHover] = useState<Hover>(null);

  const edges = useMemo(() => {
    const list: { tech: string; product: string; d: string }[] = [];
    for (const t of techNodes) {
      for (const p of productNodes) {
        if (!t.powers.includes(p.id)) continue;
        const y1 = (t.y / 100) * H;
        const y2 = (p.y / 100) * H;
        list.push({ tech: t.id, product: p.id, d: `M ${TX} ${y1} C 420 ${y1}, 580 ${y2}, ${PX} ${y2}` });
      }
    }
    return list;
  }, []);

  const hoveredTech = techNodes.find((t) => hover?.type === "tech" && t.id === hover.id);
  const hoveredProduct = productNodes.find((p) => hover?.type === "product" && p.id === hover.id);

  const edgeActive = (t: string, p: string) =>
    !hover ? false : hover.type === "tech" ? t === hover.id : p === hover.id;

  const techLit = (id: string) => {
    if (!hover) return true;
    if (hover.type === "tech") return id === hover.id;
    return !!productNodes.find((p) => p.id === hover.id)?.stack.includes(id);
  };
  const prodLit = (id: string) => {
    if (!hover) return true;
    if (hover.type === "product") return id === hover.id;
    return !!techNodes.find((t) => t.id === hover.id)?.powers.includes(id);
  };

  const techContexts = (powers: string[]) =>
    powers
      .map((id) => productNodes.find((p) => p.id === id)?.label)
      .filter(Boolean) as string[];

  return (
    <section id="stack" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHead
          index="03"
          kicker="The composition"
          right={
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-faint)] md:block">
              Hover a node — trace where each tool is used
            </span>
          }
        >
          <LineReveal>Tools, mapped to</LineReveal>
          <LineReveal delay={0.1}>
            where they're <It className="text-[var(--color-signal)]">actually used.</It>
          </LineReveal>
        </SectionHead>

        {/* desktop schematic */}
        <Reveal className="hidden lg:block">
          <div
            className="ticks relative w-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-mute)]"
            style={{ aspectRatio: `${W}/${H}` }}
            onMouseLeave={() => setHover(null)}
          >
            <div className="rule-dots absolute inset-0 opacity-60" />
            <span className="absolute left-6 top-5 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-faint)]">
              Technologies
            </span>
            <span className="absolute right-6 top-5 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-faint)]">
              Projects & work
            </span>

            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              {edges.map((e, i) => {
                const on = edgeActive(e.tech, e.product);
                return (
                  <path
                    key={i}
                    d={e.d}
                    fill="none"
                    stroke={on ? "#ff4d1f" : "#ece7db"}
                    strokeWidth={on ? 1.8 : 0.8}
                    strokeOpacity={on ? 0.95 : hover ? 0.05 : 0.14}
                    strokeDasharray={on ? "none" : "4 6"}
                    style={{ transition: "stroke-opacity .35s, stroke-width .35s, stroke .35s" }}
                  />
                );
              })}
            </svg>

            {/* center readout */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2 text-center">
              <AnimatePresence mode="wait">
                {hoveredTech ? (
                  <motion.div
                    key={hoveredTech.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[var(--color-panel)] px-4 py-6"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-signal)]">
                      Technology · {hoveredTech.core ? "daily driver" : "in the toolbox"}
                    </div>
                    <h3 className="display mt-2 text-5xl font-semibold text-[var(--color-ink)]">
                      {hoveredTech.label}
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-mute)]">
                      {hoveredTech.blurb}
                    </p>
                    <div className="mx-auto mt-5 flex max-w-sm flex-wrap justify-center gap-2">
                      {techContexts(hoveredTech.powers).map((c) => (
                        <span
                          key={c}
                          className="border border-[var(--color-line)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : hoveredProduct ? (
                  <motion.div
                    key={hoveredProduct.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[var(--color-panel)] px-4 py-6"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-signal)]">
                      Work · {hoveredProduct.tag}
                    </div>
                    <h3 className="display mt-2 text-4xl font-semibold text-[var(--color-ink)]">
                      {hoveredProduct.label}
                    </h3>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-mute)]">
                      {hoveredProduct.stack.length} technologies in use
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-[var(--color-panel)] px-4 py-6"
                  >
                    <div className="mx-auto mb-4 h-10 w-10 animate-orbit border border-[var(--color-ink)]/40" style={{ transform: "rotate(45deg)" }} />
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-faint)]">
                      12 technologies · 19 paths · 5 contexts
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {techNodes.map((t) => {
              const on = hover?.type === "tech" && hover.id === t.id;
              const lit = techLit(t.id);
              return (
                <button
                  key={t.id}
                  data-hover
                  onMouseEnter={() => setHover({ type: "tech", id: t.id })}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(TX / W) * 100}%`, top: `${t.y}%` }}
                >
                  <span
                    className={`flex items-center gap-3 border px-4 py-2 font-mono text-[12px] transition-all duration-300 ${
                      on
                        ? "border-[var(--color-signal)] bg-[var(--color-signal)] text-[var(--color-void)]"
                        : lit
                        ? "border-[var(--color-ink)]/40 bg-[var(--color-void)] text-[var(--color-ink)] hover:border-[var(--color-signal)]"
                        : "border-[var(--color-line)] bg-[var(--color-void)] text-[var(--color-faint)] opacity-40"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 ${t.core ? "bg-[var(--color-signal)]" : "bg-[var(--color-ink)]/50"} ${on ? "bg-[var(--color-void)]" : ""}`} />
                    {t.label}
                  </span>
                </button>
              );
            })}

            {productNodes.map((p) => {
              const on = hover?.type === "product" && hover.id === p.id;
              return (
                <a
                  key={p.id}
                  href={p.href}
                  data-hover
                  onMouseEnter={() => setHover({ type: "product", id: p.id })}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(PX / W) * 100}%`, top: `${p.y}%` }}
                >
                  <span
                    className={`flex flex-col items-start border px-5 py-3 transition-all duration-300 ${
                      on
                        ? "border-[var(--color-ink)] bg-[var(--color-bone)] text-[var(--color-void)]"
                        : prodLit(p.id)
                        ? "border-[var(--color-ink)]/40 bg-[var(--color-void)] text-[var(--color-ink)]"
                        : "border-[var(--color-line)] bg-[var(--color-void)] opacity-40"
                    }`}
                  >
                    <span className="display text-lg font-semibold">{p.label}</span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${on ? "text-[var(--color-signal-deep)]" : "text-[var(--color-faint)]"}`}>
                      {p.tag} →
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* mobile fallback */}
        <div className="space-y-6 lg:hidden">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {techNodes.map((t) => (
                <span
                  key={t.id}
                  className={`border px-3.5 py-2 font-mono text-xs ${
                    t.core
                      ? "border-[var(--color-signal)] text-[var(--color-ink)]"
                      : "border-[var(--color-line)] text-[var(--color-mute)]"
                  }`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </Reveal>
          {productNodes.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div className="border border-[var(--color-line)] p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="display text-2xl font-semibold text-[var(--color-ink)]">{p.label}</h4>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-signal)]">{p.tag}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="border border-[var(--color-line)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-mute)]">
                      {techNodes.find((t) => t.id === s)?.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* full toolbox, grouped */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <div className="flex items-center justify-between gap-6 border-t border-[var(--color-line)] pt-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-mute)]">
                The full toolbox — grouped by area
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-faint)] md:block">
                Only tools genuinely used
              </span>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <Reveal key={g.name} delay={0.05 * i} className="bg-[var(--color-void)]">
                <div className="h-full p-6 md:p-7">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-signal)]">
                    {g.name}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {g.items.map((s) => (
                      <span key={s} className="text-[15px] text-[var(--color-ink)]/85">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
