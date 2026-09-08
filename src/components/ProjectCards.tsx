import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink, FiFileText } from "react-icons/fi";
import { projectsByYear, type Project } from "@/data/projects";

type Card = Project & { year: number };

const CARDS: Card[] = projectsByYear.flatMap(({ year, projects }) => projects.map((p) => ({ ...p, year })));

/** How far a drag has to travel to count as a swipe once released. */
const SWIPE_DISTANCE = 90;
/** Cards rendered in the stack at once — the top one plus a peek of what's behind it. */
const STACK_DEPTH = 3;

export default function ProjectCards() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  const total = CARDS.length;

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total);
    setDrag(0);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("a, button")) return;
    dragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setDrag(e.clientX - startX.current);
  }

  function onPointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    setDrag((d) => {
      if (Math.abs(d) > SWIPE_DISTANCE) go(d < 0 ? 1 : -1);
      return 0;
    });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = useMemo(
    () => Array.from({ length: STACK_DEPTH }, (_, i) => CARDS[(index + i) % total]).reverse(),
    [index, total],
  );

  return (
    <div className="not-prose flex flex-col items-center gap-6 py-6">
      <div
        className="relative h-[420px] w-full max-w-sm touch-pan-y select-none sm:h-[440px] sm:max-w-md"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {visible.map((card, i) => {
          const depth = visible.length - 1 - i; // 0 = top card
          const isTop = depth === 0;
          const scale = 1 - depth * 0.045;
          const translateY = depth * 14;
          const translateX = isTop ? drag : 0;
          const rotate = isTop ? drag / 22 : 0;
          const opacity = 1 - depth * 0.18;
          const liveLabel = card.live?.replace(/^https?:\/\//, "").replace(/\/$/, "");

          return (
            <div
              key={`${card.year}-${card.name}`}
              className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 border-betich-light bg-white p-6 shadow-lg sm:p-7"
              style={{
                transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex: 10 - depth,
                opacity,
                transition:
                  dragging.current && isTop
                    ? "none"
                    : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease",
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-6xl leading-none sm:text-7xl">{card.emoji}</span>
                <span className="rounded-full border border-betich-light px-2.5 py-1 font-mono text-xs text-gray-400">
                  {card.year}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-lg font-bold text-betich-dark sm:text-xl">{card.name}</h3>
                {card.description && (
                  <p className="text-sm leading-relaxed text-gray-500">{card.description}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="card-chip">
                  <FiGithub className="h-3 w-3" /> code
                </a>
                {card.live && (
                  <a href={card.live} target="_blank" rel="noopener noreferrer" className="card-chip">
                    <FiExternalLink className="h-3 w-3" /> {liveLabel}
                  </a>
                )}
                {card.writeup && (
                  <a href={card.writeup} className="card-chip">
                    <FiFileText className="h-3 w-3" /> writeup
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-5">
        <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="nav-btn">
          <FiChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-mono text-xs text-gray-400">
          {index + 1} / {total}
        </span>
        <button type="button" onClick={() => go(1)} aria-label="Next project" className="nav-btn">
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="font-mono text-[11px] text-gray-300">drag, or use the arrows</p>

      <style>{`
        .card-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
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
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .nav-btn:hover {
          color: #4845DA;
          border-color: #4845DA;
        }
      `}</style>
    </div>
  );
}
