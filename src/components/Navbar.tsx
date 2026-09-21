import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "../lib/data";

const LINKS = [
  { n: "01", label: "Principles", href: "#principles" },
  { n: "02", label: "Experience", href: "#experience" },
  { n: "03", label: "Stack", href: "#stack" },
  { n: "04", label: "Work", href: "#work" },
  { n: "05", label: "Honors", href: "#honors" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onPaper, setOnPaper] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    /* Detect whether the header band currently sits over a light "paper"
       section, and switch the palette instead of relying on blend modes
       (difference-blending vermilion over bone produced a cyan artifact). */
    const papers = Array.from(document.querySelectorAll<HTMLElement>("section.paper"));
    const PROBE_Y = 36; // vertical centre of the header band
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      setOnPaper(
        papers.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= PROBE_Y && r.bottom >= PROBE_Y;
        })
      );
    };
    const fn = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
      if (raf) cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  /* palette: bone-on-dark by default, black-on-paper over light sections */
  const fg = onPaper ? "text-[var(--color-void)]" : "text-[var(--color-bone)]";
  const fgSoft = onPaper ? "text-[var(--color-void)]/60" : "text-[var(--color-bone)]/65";
  const accent = onPaper
    ? "bg-[var(--color-void)] text-[var(--color-bone)] hover:bg-[var(--color-signal)] hover:text-[var(--color-void)]"
    : "bg-[var(--color-signal)] text-[var(--color-void)] hover:bg-[var(--color-bone)]";
  const dot = onPaper ? "bg-[var(--color-void)]" : "bg-[var(--color-signal)]";
  const outline = onPaper
    ? "border-[var(--color-void)]/70 text-[var(--color-void)] hover:border-[var(--color-void)] hover:bg-[var(--color-void)] hover:text-[var(--color-bone)]"
    : "border-[var(--color-bone)]/60 text-[var(--color-bone)] hover:border-[var(--color-signal)] hover:bg-[var(--color-signal)] hover:text-[var(--color-void)]";
  const surface = !scrolled
    ? "border-transparent bg-transparent"
    : onPaper
    ? "border-[var(--color-line-dark)] bg-[var(--color-bone)]"
    : "border-[var(--color-line)] bg-[var(--color-void)]/95";

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[300] border-b transition-[padding,background-color,border-color] duration-300 ${surface} ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 items-center px-6 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
          <a href="#top" className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${dot}`} />
            <span className={`font-mono text-[12px] uppercase tracking-[0.22em] transition-colors duration-300 ${fg}`}>
              Harshit Rana
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`link-line font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${fgSoft} hover:opacity-100`}
              >
                <span className="text-[var(--color-signal)]">{l.n}</span> {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-6 lg:flex">
            <span className={`font-mono text-[11px] tracking-[0.2em] tabular-nums transition-colors duration-300 ${fgSoft}`}>
              IND {time}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${outline}`}
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            data-hover
            className={`justify-self-end grid h-10 w-10 place-items-center transition-colors duration-300 lg:hidden ${accent}`}
          >
            <Menu size={20} strokeWidth={2.25} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="paper fixed inset-0 z-[350] flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-[12px] uppercase tracking-[0.22em]">{profile.name}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                data-hover
                className="grid h-10 w-10 place-items-center bg-[var(--color-signal)] text-[var(--color-void)] transition-colors hover:bg-[var(--color-bone)]"
              >
                <X size={20} strokeWidth={2.25} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6">
              {[...LINKS, { n: "06", label: "Contact", href: "#contact" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + 0.06 * i, duration: 0.5 }}
                  className="flex items-baseline gap-4 border-b border-[var(--color-line-dark)] py-4"
                >
                  <span className="font-mono text-xs text-[var(--color-signal)]">{l.n}</span>
                  <span className="display text-5xl font-semibold">{l.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
