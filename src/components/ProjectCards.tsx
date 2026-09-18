import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronUp, FiChevronDown, FiGithub, FiExternalLink, FiFileText } from "react-icons/fi";
import { projectsByYear, type Project } from "@/data/projects";

type Card = Project & { year: number; indexInYear: number; yearCount: number };

const CARDS: Card[] = projectsByYear.flatMap(({ year, projects }) =>
  projects.map((p, indexInYear) => ({ ...p, year, indexInYear, yearCount: projects.length })),
);

/** Cards visible behind the top one — the peek that tells you there's more below. */
const STACK_DEPTH = 3;
/** Scroll distance each card holds the deck, as a share of the viewport. Mirrored in the track height below. */
const STEP_VH = 50;

/** Year header + deck + controls. The deck itself is 440px, shrinking on short screens. */
const FRAME_HEIGHT = "min(100svh, calc(min(440px, 58svh) + 11rem))";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function Odometer({ value }: { value: number }) {
  return (
    <span className="odometer" aria-hidden="true">
      {String(value)
        .split("")
        .map((digit, i) => (
          <span key={i} className="odometer-col">
            <span className="odometer-strip" style={{ transform: `translateY(-${Number(digit) * 10}%)` }}>
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
}

function cardStyle(offset: number, reduced: boolean): React.CSSProperties {
  // offset < 0: already scrolled past, flown up and out. 0: the top card. > 0: waiting in the stack.
  if (offset < 0) {
    return {
      transform: reduced ? "none" : "translateY(-70%) rotate(-5deg) scale(0.96)",
      opacity: 0,
      filter: reduced ? "none" : "blur(6px)",
      zIndex: 20,
      visibility: offset < -1 ? "hidden" : "visible",
      pointerEvents: "none",
    };
  }
  const depth = Math.min(offset, STACK_DEPTH);
  return {
    transform: reduced ? "none" : `translateY(${depth * 16}px) scale(${1 - depth * 0.05})`,
    opacity: offset >= STACK_DEPTH || (reduced && offset > 0) ? 0 : 1 - depth * 0.2,
    filter: "blur(0px)",
    zIndex: 10 - depth,
    visibility: offset > STACK_DEPTH ? "hidden" : "visible",
    pointerEvents: offset === 0 ? "auto" : "none",
  };
}

export default function ProjectCards() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  /** Where a smooth scroll is headed, so repeated presses keep counting from there instead of the stale index. */
  const pending = useRef<number | null>(null);

  const total = CARDS.length;
  const active = CARDS[index];

  /** Page scroll offset where the deck starts, and how far one card spans. */
  const measure = useCallback(() => {
    const t = track.current;
    const f = frame.current;
    if (!t || !f) return null;
    // The deck starts moving once the frame pins, i.e. when the track's top reaches the sticky offset.
    const start = t.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(f).top);
    const step = (t.offsetHeight - f.offsetHeight) / (total - 1);
    return { start, step };
  }, [total]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let raf = 0;
    function update() {
      raf = 0;
      const m = measure();
      if (!m) return;
      // Switch a little before the halfway mark so the next card arrives as you commit to the scroll.
      const i = Math.floor((window.scrollY - m.start) / m.step + 0.35);
      const next = Math.max(0, Math.min(total - 1, i));
      if (next === pending.current) pending.current = null;
      setIndex(next);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [measure, total]);

  const goTo = useCallback(
    (i: number) => {
      const m = measure();
      if (!m) return;
      const target = Math.max(0, Math.min(total - 1, i));
      pending.current = target;
      window.scrollTo({ top: m.start + target * m.step, behavior: reduced ? "auto" : "smooth" });
    },
    [measure, reduced, total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft" || e.key === "k") goTo((pending.current ?? index) - 1);
      if (e.key === "ArrowRight" || e.key === "j") goTo((pending.current ?? index) + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const transition = reduced
    ? "opacity 0.2s linear"
    : `transform 0.6s ${EASE}, opacity 0.45s ${EASE}, filter 0.45s ${EASE}`;

  return (
    <div
      ref={track}
      className="not-prose relative"
      style={{ height: `calc(${FRAME_HEIGHT} + ${(total - 1) * STEP_VH}svh)` }}
    >
      <div
        ref={frame}
        className="sticky flex flex-col justify-center py-4"
        style={{ top: `max(0px, calc((100svh - ${FRAME_HEIGHT}) / 2))`, height: FRAME_HEIGHT }}
      >
        <div className="mx-auto flex w-full max-w-[36rem] items-stretch gap-4 sm:gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex items-baseline justify-between gap-3 font-mono">
              <span className="text-3xl font-bold leading-none text-betich-dark sm:text-4xl">
                <Odometer value={active.year} />
                <span className="sr-only" aria-live="polite">
                  {active.year}
                </span>
              </span>
              <span className="text-xs tabular-nums text-gray-400">
                {active.indexInYear + 1} of {active.yearCount}
              </span>
            </div>

            <div className="relative h-[min(440px,58svh)] w-full">
              {CARDS.map((card, i) => {
                const offset = i - index;
                const liveLabel = card.live?.replace(/^https?:\/\//, "").replace(/\/$/, "");
                return (
                  <article
                    key={`${card.year}-${card.name}`}
                    aria-hidden={offset !== 0}
                    className="absolute inset-0 flex origin-bottom flex-col justify-between gap-4 overflow-hidden rounded-3xl border-2 border-betich-light bg-white p-5 shadow-[0_12px_32px_-12px_rgb(72_69_218/0.22)] sm:p-7"
                    style={{ ...cardStyle(offset, reduced), transition }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-5xl leading-none sm:text-7xl">{card.emoji}</span>
                      <span className="rounded-full border border-betich-light px-2.5 py-1 font-mono text-[11px] text-gray-500">
                        {card.year}
                      </span>
                    </div>

                    <div className="flex min-h-0 flex-col gap-2">
                      <h3 className="text-balance font-mono text-base font-bold text-betich-dark sm:text-xl">
                        {card.name}
                      </h3>
                      {card.description && (
                        <p className="line-clamp-5 text-sm leading-relaxed text-gray-500 sm:line-clamp-6">
                          {card.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-chip"
                        tabIndex={offset === 0 ? 0 : -1}
                      >
                        <FiGithub className="h-3 w-3" /> code
                      </a>
                      {card.live && (
                        <a
                          href={card.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-chip"
                          tabIndex={offset === 0 ? 0 : -1}
                        >
                          <FiExternalLink className="h-3 w-3 shrink-0" />
                          <span className="truncate">{liveLabel}</span>
                        </a>
                      )}
                      {card.writeup && (
                        <a href={card.writeup} className="card-chip" tabIndex={offset === 0 ? 0 : -1}>
                          <FiFileText className="h-3 w-3" /> writeup
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 font-mono sm:justify-start">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Previous project"
                className="nav-btn"
              >
                <FiChevronUp className="h-4 w-4" />
              </button>
              <span className="min-w-[4.5rem] text-center text-xs tabular-nums text-gray-400">
                {String(index + 1).padStart(2, "0")} / {total}
              </span>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === total - 1}
                aria-label="Next project"
                className="nav-btn"
              >
                <FiChevronDown className="h-4 w-4" />
              </button>
              <span className="hidden text-[11px] text-gray-400 sm:inline">keep scrolling</span>
            </div>
          </div>

          <nav aria-label="Project timeline" className="rail">
            <ol>
              {projectsByYear.map(({ year, projects }) => {
                const isYear = year === active.year;
                return (
                  <li key={year} className={`rail-year${isYear ? " is-active" : ""}`}>
                    <span className="rail-label">
                      <span className="sm:hidden">’{String(year).slice(2)}</span>
                      <span className="hidden sm:inline">{year}</span>
                    </span>
                    <ol>
                      {projects.map((p) => {
                        const i = CARDS.findIndex((c) => c.year === year && c.name === p.name);
                        const state = i === index ? "is-current" : i < index ? "is-past" : "";
                        return (
                          <li key={p.name}>
                            <button
                              type="button"
                              className={`rail-tick ${state}`}
                              onClick={() => goTo(i)}
                              aria-label={`${p.name}, ${year}`}
                              aria-current={i === index ? "step" : undefined}
                              title={p.name}
                            >
                              <span />
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>

      <style>{`
        .odometer {
          display: inline-flex;
          font-variant-numeric: tabular-nums;
        }
        .odometer-col {
          display: inline-block;
          height: 1em;
          overflow: hidden;
          line-height: 1;
        }
        .odometer-strip {
          display: flex;
          flex-direction: column;
          transition: transform 0.9s ${EASE};
        }
        .odometer-col:nth-child(3) .odometer-strip { transition-delay: 40ms; }
        .odometer-col:nth-child(4) .odometer-strip { transition-delay: 80ms; }
        .odometer-strip > span { height: 1em; }

        .rail {
          flex: none;
          width: 2.5rem;
          display: flex;
          align-items: center;
        }
        .rail > ol {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          width: 100%;
        }
        .rail > ol::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.25rem;
          bottom: 0.25rem;
          width: 1px;
          background: #DEDEFF;
        }
        .rail-label {
          display: block;
          padding-left: 0.6rem;
          font-family: "Roboto Mono", "Sarabun", monospace;
          font-size: 0.6875rem;
          line-height: 1.25rem;
          letter-spacing: 0.04em;
          color: #9CA3AF;
          transform-origin: left center;
          transition: color 0.4s ${EASE}, transform 0.6s ${EASE}, letter-spacing 0.6s ${EASE};
        }
        .rail-year.is-active .rail-label {
          color: #4845DA;
          font-style: italic;
          letter-spacing: 0.12em;
          transform: translateX(4px) scale(1.12);
        }
        .rail-tick {
          display: flex;
          align-items: center;
          width: 100%;
          height: 0.75rem;
          cursor: pointer;
        }
        .rail-tick > span {
          display: block;
          height: 2px;
          width: 0.4rem;
          border-radius: 999px;
          background: #E5E7EB;
          transition: width 0.45s ${EASE}, background-color 0.3s ease, height 0.3s ease;
        }
        .rail-year.is-active .rail-tick > span { width: 0.6rem; background: #DEDEFF; }
        .rail-tick.is-past > span { background: #DEDEFF; }
        .rail-tick:hover > span { width: 1rem; background: #4845DA; }
        .rail-tick.is-current > span,
        .rail-year.is-active .rail-tick.is-current > span {
          width: 100%;
          height: 3px;
          background: #4845DA;
        }
        .rail-tick:focus-visible { outline: none; }
        .rail-tick:focus-visible > span { outline: 2px solid #4845DA; outline-offset: 3px; }

        @media (min-width: 640px) {
          .rail { width: 5.5rem; }
          .rail > ol { gap: 0.5rem; }
          .rail-tick { height: 0.875rem; }
          .rail-tick.is-current > span,
          .rail-year.is-active .rail-tick.is-current > span { width: 2rem; }
        }

        .card-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          max-width: 100%;
          border-radius: 999px;
          border: 1px solid #DEDEFF;
          padding: 0.25rem 0.65rem;
          font-family: "Roboto Mono", "Sarabun", monospace;
          font-size: 0.7rem;
          color: #4845DA;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
        }
        .card-chip:hover {
          background-color: #4845DA;
          color: #fff;
          border-color: #4845DA;
        }
        .nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2rem;
          width: 2rem;
          border-radius: 999px;
          border: 1px solid #DEDEFF;
          color: #9CA3AF;
          transition: color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
        }
        .nav-btn:hover:not(:disabled) {
          color: #4845DA;
          border-color: #4845DA;
        }
        .nav-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .card-chip:focus-visible,
        .nav-btn:focus-visible {
          outline: 2px solid #4845DA;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
