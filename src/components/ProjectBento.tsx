import { useEffect, useRef, useState } from "react";
import { FiGithub, FiExternalLink, FiFileText } from "react-icons/fi";
import { projectsByYear, type Project } from "@/data/projects";
import { ProjectShot, hostLabel } from "@/components/ProjectBits";

/** Tile footprint: browser screenshots get the big 2×2, phone captures a tall 1×2 (full width on phones), everything else a 1×1. */
function span(p: Project) {
  if (!p.image) return "";
  if (p.image.phone) return "col-span-2 row-span-2 sm:col-span-1";
  return "col-span-2 row-span-2";
}

/** Small icon links for the tile corner — the tile itself already links to the project. */
function CornerLinks({ project }: { project: Project }) {
  return (
    <span className="relative z-10 flex items-center gap-0.5">
      {project.writeup && (
        <a href={project.writeup} className="tile-icon" aria-label={`${project.name} writeup`} title="writeup">
          <FiFileText className="h-3.5 w-3.5" />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="tile-icon"
          aria-label={`${project.name} live at ${hostLabel(project.live)}`}
          title={hostLabel(project.live)}
        >
          <FiExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tile-icon"
        aria-label={`${project.name} code`}
        title="code"
      >
        <FiGithub className="h-3.5 w-3.5" />
      </a>
    </span>
  );
}

function Tile({ project, order }: { project: Project; order: number }) {
  const primary = project.live ?? project.url;
  const big = Boolean(project.image);
  return (
    <li className={`tile group ${span(project)}`} style={{ "--i": order } as React.CSSProperties}>
      {big && <ProjectShot project={project} className="min-h-0 flex-1" />}
      <div className={`flex items-start justify-between gap-2 ${big ? "" : "flex-1"}`}>
        <span
          className={`tile-emoji inline-block leading-none ${big ? "text-2xl" : "text-3xl sm:text-4xl"}`}
          aria-hidden="true"
        >
          {project.emoji}
        </span>
        <CornerLinks project={project} />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <a
          href={primary}
          target="_blank"
          rel="noopener noreferrer"
          className="tile-link font-mono text-[13px] font-bold leading-snug text-gray-800 sm:text-sm"
        >
          {project.name}
        </a>
        {project.description && (
          <p className={`text-xs leading-relaxed text-gray-500 ${big ? "line-clamp-2" : "line-clamp-2 max-sm:hidden"}`}>
            {project.description}
          </p>
        )}
      </div>
    </li>
  );
}

export default function ProjectBento() {
  const root = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  // Tiles below the fold rise in as their year scrolls into view; anything already on screen just stays put.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const groups = Array.from(el.querySelectorAll<HTMLElement>("[data-year-group]"));
    const below = groups.filter((g) => g.getBoundingClientRect().top > window.innerHeight);
    below.forEach((g) => g.classList.add("is-waiting"));
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.remove("is-waiting");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    below.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className={`bento flex flex-col gap-3 py-2 ${armed ? "is-armed" : ""}`}>
      {projectsByYear.map(({ year, projects }) => (
        <section key={year} data-year-group aria-label={String(year)}>
          <ul className="grid grid-flow-row-dense auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[10rem] sm:grid-cols-4">
            <li className="tile tile-year" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="font-mono text-3xl font-bold leading-none tracking-tight sm:text-4xl">{year}</span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-[#DEDEFF]">
                {String(projects.length).padStart(2, "0")} {projects.length === 1 ? "project" : "projects"}
              </span>
            </li>
            {projects.map((p, i) => (
              <Tile key={p.name} project={p} order={i + 1} />
            ))}
          </ul>
        </section>
      ))}

      <style
        // Inline so selectors like `a > b` survive SSR unescaped and hydrate cleanly.
        dangerouslySetInnerHTML={{
          __html: `
        .tile {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          min-width: 0;
          padding: 0.9rem;
          border-radius: 1.25rem;
          border: 1.5px solid #DEDEFF;
          background: #fff;
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.3s ease,
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 0s;
        }
        @media (min-width: 640px) {
          .tile { padding: 1.1rem; }
        }
        .tile:not(.tile-year):hover,
        .tile:not(.tile-year):focus-within {
          transform: translateY(-3px);
          border-color: #4845DA;
          box-shadow: 0 14px 30px -16px rgb(72 69 218 / 0.35);
        }
        /* The name link stretches over the whole tile; the corner icons sit above it. */
        .tile-link::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
        }
        .tile-link:focus-visible { outline: none; }
        .tile:has(.tile-link:focus-visible) { outline: 2px solid #4845DA; outline-offset: 3px; }
        .tile:hover .tile-link { color: #4845DA; }

        .tile-emoji { transform-origin: 50% 80%; }
        .tile:hover .tile-emoji { animation: tile-wiggle 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes tile-wiggle {
          0% { transform: rotate(0) scale(1); }
          30% { transform: rotate(-12deg) scale(1.15); }
          60% { transform: rotate(8deg) scale(1.08); }
          100% { transform: rotate(0) scale(1); }
        }

        .tile .shot-img { transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        .tile:hover .shot-img { transform: scale(1.045); }
        .tile:hover .shot-img.-translate-x-1\\/2 { transform: translate(-50%, -6px) scale(1.03); }

        .tile-icon {
          display: flex;
          height: 1.6rem;
          width: 1.6rem;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #9CA3AF;
          transition: color 0.2s ease, background-color 0.2s ease;
        }
        .tile-icon:hover { color: #4845DA; background: #F2F2FF; }
        .tile-icon:focus-visible { outline: 2px solid #4845DA; outline-offset: 1px; }

        .tile-year {
          justify-content: space-between;
          border-color: #4845DA;
          background: #4845DA;
          color: #fff;
        }

        .bento.is-armed [data-year-group].is-waiting .tile {
          opacity: 0;
          transform: translateY(18px) scale(0.97);
        }
        .bento.is-armed [data-year-group] .tile {
          transition-delay: calc(var(--i, 0) * 45ms);
        }
        .bento.is-armed [data-year-group] .tile:hover { transition-delay: 0s; }

        @media (prefers-reduced-motion: reduce) {
          .tile, .tile .shot-img { transition: none; }
          .tile:hover .tile-emoji { animation: none; }
        }
      `,
        }}
      />
    </div>
  );
}
