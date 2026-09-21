import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  y = 22,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* headline reveal — opacity + small lift. Never leaves text hidden even
   if the in-view trigger is missed (Lenis / anchor jumps / StrictMode). */
export function LineReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE, delay: delay * 0.6 }}
    >
      {children}
    </motion.span>
  );
}

export function SectionHead({
  index,
  kicker,
  children,
  right,
  dark = true,
}: {
  index: string;
  kicker: string;
  children: ReactNode;
  right?: ReactNode;
  dark?: boolean;
}) {
  const line = dark ? "border-[var(--color-line)]" : "border-[var(--color-line-dark)]";
  const mute = dark ? "text-[var(--color-mute)]" : "text-[var(--color-void)]/55";
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className={`flex items-center justify-between gap-6 border-t ${line} pt-4`}>
          <div className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] ${mute}`}>
            <span className="text-[var(--color-signal)]">{index}</span>
            {kicker}
          </div>
          {right}
        </div>
      </Reveal>
      <h2 className="display mt-8 text-[clamp(2.6rem,6.4vw,5.8rem)] font-semibold">
        {children}
      </h2>
    </div>
  );
}

/* italic serif accent — replaces gradient text */
export function It({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={`serif-it font-normal ${className ?? ""}`}>{children}</em>;
}
