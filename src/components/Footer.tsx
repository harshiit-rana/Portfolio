import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Reveal, It, LineReveal, EASE } from "./anim";
import { socials } from "../lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-24 md:pt-36">
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center justify-between border-t border-[var(--color-line)] pt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-mute)]">
            <span>
              <span className="text-[var(--color-signal)]">06</span>&nbsp;&nbsp;Signal
            </span>
            <span className="hidden md:inline">India · Open to conversations</span>
          </div>
        </Reveal>

        <h2 className="display mt-10 text-[clamp(2.8rem,8vw,8rem)] font-bold">
          <LineReveal>Have an impossible</LineReveal>
          <LineReveal delay={0.1}>
            problem? <It className="text-[var(--color-signal)]">Let's talk.</It>
          </LineReveal>
        </h2>

        <div className="mt-14 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 * i }}
              className="group flex items-center justify-between bg-[var(--color-void)] p-7 transition-colors hover:bg-[var(--color-signal)] hover:text-[var(--color-void)] md:p-9"
            >
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-faint)] group-hover:text-[var(--color-void)]/70">
                  {s.label}
                </div>
                <div className="display mt-2 text-xl font-semibold md:text-2xl">{s.handle}</div>
              </div>
              <ArrowUpRight
                size={22}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.a>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex items-center justify-end border-t border-[var(--color-line)] py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-faint)]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 transition-colors hover:text-[var(--color-signal)]"
              data-hover
            >
              Top <ArrowUp size={13} className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </Reveal>
      </div>

      {/* colossal type, cropped at the bottom edge */}
      <div className="pointer-events-none relative h-[16vw] select-none overflow-hidden md:h-[14vw]">
        <motion.div
          initial={{ y: "35%" }}
          whileInView={{ y: "8%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="display-condensed absolute inset-x-0 top-0 text-center text-[clamp(4.5rem,17.5vw,17rem)] font-bold leading-none text-[var(--color-ink)]"
        >
          HARSHIT RANA
        </motion.div>
      </div>
    </footer>
  );
}
