import { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { projectsByYear, type Project } from "@/data/projects";

const TOTAL = projectsByYear.reduce((n, y) => n + y.projects.length, 0);

type Peek = { project: Project; x: number; y: number };

/**
 * The lab notebook: entries numbered in the margin, oldest is №01, ruled like paper.
 * Hovering an entry that has a screenshot tapes a print of it next to the cursor.
 */
export default function ProjectLog() {
  const [peek, setPeek] = useState<Peek | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  let entry = TOTAL + 1;

  return (
    <div className="log py-2" onPointerLeave={() => setPeek(null)}>
      <div className="log-head grid grid-cols-[2.75rem_1fr] items-end gap-x-4 pb-2 font-mono text-[11px] tracking-[0.14em] text-gray-500 sm:grid-cols-[3.5rem_1fr_auto]">
        <span className="text-right">entry</span>
        <span>project</span>
        <span className="hidden sm:block">refs</span>
      </div>

      {projectsByYear.map(({ year, projects }) => (
        <section key={year} aria-labelledby={`log-${year}`}>
          <h2
            id={`log-${year}`}
            className="log-year sticky top-0 z-10 grid grid-cols-[2.75rem_1fr] gap-x-4 bg-white py-2 font-mono text-xs sm:grid-cols-[3.5rem_1fr]"
          >
            <span className="text-right font-bold text-betich-dark">{year}</span>
            <span className="text-gray-400">
              {projects.length} {projects.length === 1 ? "entry" : "entries"}
            </span>
          </h2>
          <ol>
            {projects.map((p) => {
              entry -= 1;
              const no = String(entry).padStart(2, "0");
              return (
                <li
                  key={p.name}
                  className="log-row group grid grid-cols-[2.75rem_1fr] gap-x-4 py-3.5 sm:grid-cols-[3.5rem_1fr_auto]"
                  onPointerMove={
                    canHover && p.image ? (e) => setPeek({ project: p, x: e.clientX, y: e.clientY }) : undefined
                  }
                  onPointerLeave={canHover ? () => setPeek(null) : undefined}
                >
                  <span className="pt-0.5 text-right font-mono text-[11px] tabular-nums text-gray-400 transition-colors group-hover:text-betich-dark">
                    №{no}
                  </span>
                  <div className="flex min-w-0 gap-3">
                    <span className="shrink-0 text-xl leading-6" aria-hidden="true">
                      {p.emoji}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <a
                          href={p.live ?? p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-gray-800 underline decoration-transparent underline-offset-4 transition-colors hover:text-betich-dark hover:decoration-betich-light"
                        >
                          {p.name}
                        </a>
                        {p.image && (
                          <FiImage
                            className="h-3 w-3 shrink-0 translate-y-px text-gray-300"
                            aria-label="has screenshot"
                          />
                        )}
                      </div>
                      {p.description && (
                        <p className="mt-1 max-w-[62ch] text-xs leading-relaxed text-gray-500">{p.description}</p>
                      )}
                      <div className="mt-1.5 flex gap-3 font-mono text-[11px] sm:hidden">
                        <Refs project={p} />
                      </div>
                    </div>
                  </div>
                  <div className="hidden items-start gap-3 pt-0.5 font-mono text-[11px] sm:flex">
                    <Refs project={p} />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      <p className="grid grid-cols-[2.75rem_1fr] gap-x-4 pt-4 font-mono text-[11px] text-gray-400 sm:grid-cols-[3.5rem_1fr]">
        <span />
        <span>— end of log. first entry, 2021.</span>
      </p>

      {peek?.project.image && (
        <figure
          key={peek.project.name}
          aria-hidden="true"
          className="log-peek pointer-events-none fixed z-50 m-0"
          style={{
            left: Math.min(peek.x + 24, window.innerWidth - 290),
            top: Math.min(Math.max(peek.y - 60, 16), window.innerHeight - 200),
          }}
        >
          <img
            src={peek.project.image.src}
            alt=""
            className={
              peek.project.image.phone
                ? "w-28 rounded-lg"
                : `aspect-[8/5] w-64 rounded ${peek.project.image.contain ? "object-contain" : "object-cover object-top"}`
            }
          />
        </figure>
      )}

      <style
        // Inline so selectors like `a > b` survive SSR unescaped and hydrate cleanly.
        dangerouslySetInnerHTML={{
          __html: `
        .log {
          /* the notebook's margin line, running behind the entry numbers */
          background-image: linear-gradient(#DEDEFF, #DEDEFF);
          background-size: 1px 100%;
          background-repeat: no-repeat;
          background-position: calc(2.75rem + 0.5rem) 0;
        }
        @media (min-width: 640px) {
          .log { background-position: calc(3.5rem + 0.5rem) 0; }
        }
        .log-head { border-bottom: 1px solid #DEDEFF; }
        .log-year { border-bottom: 1px solid #E5E7EB; }
        .log-row { border-bottom: 1px solid #F3F4F6; }
        .log-ref { color: #9CA3AF; transition: color 0.2s ease; white-space: nowrap; }
        .log-ref:hover { color: #4845DA; }
        .log-ref:focus-visible { outline: 2px solid #4845DA; outline-offset: 2px; border-radius: 2px; }

        .log-peek {
          padding: 6px 6px 18px;
          background: #fff;
          border: 1px solid #E5E7EB;
          box-shadow: 0 18px 36px -18px rgb(17 24 39 / 0.45);
          transform: rotate(-2.5deg);
          animation: log-peek-in 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* a strip of tape holding the print to the page */
        .log-peek::before {
          content: "";
          position: absolute;
          top: -9px;
          left: 50%;
          width: 64px;
          height: 18px;
          transform: translateX(-50%) rotate(3deg);
          background: rgb(222 222 255 / 0.85);
        }
        @keyframes log-peek-in {
          from { opacity: 0; transform: rotate(-6deg) scale(0.92); }
          to { opacity: 1; transform: rotate(-2.5deg) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .log-peek { animation: none; }
        }
      `,
        }}
      />
    </div>
  );
}

function Refs({ project }: { project: Project }) {
  return (
    <>
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="log-ref">
        [code]
      </a>
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="log-ref">
          [live]
        </a>
      )}
      {project.writeup && (
        <a href={project.writeup} className="log-ref">
          [writeup]
        </a>
      )}
    </>
  );
}
