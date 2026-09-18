import { FiGithub, FiExternalLink, FiFileText } from "react-icons/fi";
import type { Project } from "@/data/projects";

/** "https://track.betich.me/" → "track.betich.me" */
export function hostLabel(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** The code / live / writeup chips every project view shares. */
export function ProjectLinks({ project, focusable = true }: { project: Project; focusable?: boolean }) {
  const tabIndex = focusable ? undefined : -1;
  return (
    <div className="flex flex-wrap gap-2">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="card-chip" tabIndex={tabIndex}>
        <FiGithub className="h-3 w-3 shrink-0" /> code
      </a>
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="card-chip" tabIndex={tabIndex}>
          <FiExternalLink className="h-3 w-3 shrink-0" />
          <span className="truncate">{hostLabel(project.live)}</span>
        </a>
      )}
      {project.writeup && (
        <a href={project.writeup} className="card-chip" tabIndex={tabIndex}>
          <FiFileText className="h-3 w-3 shrink-0" /> writeup
        </a>
      )}
    </div>
  );
}

/**
 * A project's screenshot in a hairline frame. Browser captures fill the frame from the top of the page;
 * phone captures sit upright on an indigo wash, framed like the device they came from.
 */
export function ProjectShot({ project, className = "" }: { project: Project; className?: string }) {
  const image = project.image;
  if (!image) return null;
  return (
    <div
      className={`shot relative overflow-hidden rounded-2xl border border-betich-light ${
        image.phone ? "bg-[#F2F2FF]" : "bg-gray-50"
      } ${className}`}
    >
      {image.phone ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="shot-img absolute left-1/2 top-3 w-[42%] min-w-[5.5rem] max-w-[9rem] -translate-x-1/2 rounded-[14px] border-[3px] border-gray-900 shadow-[0_10px_24px_-10px_rgb(17_24_39/0.45)]"
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className={`shot-img h-full w-full ${image.contain ? "bg-white object-contain p-3" : "object-cover object-top"}`}
        />
      )}
    </div>
  );
}
