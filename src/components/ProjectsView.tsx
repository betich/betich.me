import { useEffect, useRef, useState } from "react";
import ProjectCards from "@/components/ProjectCards";
import ProjectBento from "@/components/ProjectBento";
import ProjectLog from "@/components/ProjectLog";

const VIEWS = ["deck", "grid", "list"] as const;
type View = (typeof VIEWS)[number];

const STORAGE_KEY = "betich:projects-layout";

/** The deck is the front door; the grid and the list are there for browsing everything at once. */
export default function ProjectsView() {
  const [view, setView] = useState<View>("deck");
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (VIEWS as readonly string[]).includes(stored)) setView(stored as View);
    } catch {
      // storage can be blocked (private mode); the deck is a fine default.
    }
  }, []);

  function choose(next: View) {
    setView(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // same as above — the choice just won't persist.
    }
    // Scrolled deep into the deck? Bring the new view in from its top.
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
  }

  return (
    <div ref={top} className="not-prose scroll-mt-6">
      <div role="group" aria-label="Project layout" className="mb-4 flex items-center gap-3 font-mono text-xs">
        {VIEWS.map((v, i) => (
          <span key={v} className="flex items-center gap-3">
            {i > 0 && (
              <span className="text-gray-300" aria-hidden="true">
                /
              </span>
            )}
            <button
              type="button"
              aria-pressed={view === v}
              onClick={() => choose(v)}
              className={`view-btn ${view === v ? "is-active" : ""}`}
            >
              {v}
            </button>
          </span>
        ))}
      </div>

      <div key={view} className="view-swap">
        {view === "deck" && <ProjectCards />}
        {view === "grid" && <ProjectBento />}
        {view === "list" && <ProjectLog />}
      </div>

      <style
        // Inline so selectors like `a > b` survive SSR unescaped and hydrate cleanly.
        dangerouslySetInnerHTML={{
          __html: `
        .view-btn {
          color: #9CA3AF;
          transition: color 0.2s ease;
        }
        .view-btn:hover { color: #6B7280; }
        .view-btn.is-active {
          color: #4845DA;
          font-style: italic;
        }
        .view-btn:focus-visible {
          outline: 2px solid #4845DA;
          outline-offset: 3px;
          border-radius: 2px;
        }
        .view-swap { animation: view-in 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes view-in {
          from { opacity: 0.001; }
          to { opacity: 1; }
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
        @media (prefers-reduced-motion: reduce) {
          .view-swap { animation: none; }
        }
      `,
        }}
      />
    </div>
  );
}
