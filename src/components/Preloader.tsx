import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGS = [
  "allocating tensor runtime",
  "compiling neural graph",
  "spanning activation paths",
  "hydrating state machines",
  "system nominal",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 22 + 14;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => {
          setGone(true);
          setTimeout(onDone, 520);
        }, 130);
      }
      setPct(Math.floor(v));
    }, 70);
    return () => clearInterval(id);
  }, [onDone]);

  const logIndex = Math.min(Math.floor(pct / (100 / LOGS.length)), LOGS.length - 1);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="paper fixed inset-0 z-[400] flex flex-col justify-between p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-void)]/60">
            <span>Harshit Rana — Portfolio</span>
            <span>Build 2026.04</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-void)]/55">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={logIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="block"
                  >
                    ▸ {LOGS[logIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="display mt-3 text-[clamp(1.6rem,4vw,3rem)] font-semibold text-[var(--color-void)]">
                Loading <em className="serif-it text-[var(--color-signal)]">systems.</em>
              </div>
            </div>
            <div className="display-condensed text-[clamp(5rem,18vw,15rem)] font-bold leading-none text-[var(--color-void)] tabular-nums">
              {String(pct).padStart(3, "0")}
            </div>
          </div>

          <div className="h-[3px] w-full bg-[var(--color-void)]/10">
            <div className="h-full bg-[var(--color-void)]" style={{ width: `${pct}%`, transition: "width .15s linear" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
