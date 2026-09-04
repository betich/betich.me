import type { Update } from "@tracker/protocol";
import { photoUrl } from "./config";
import { formatAge } from "./geo";

interface TimelineProps {
  updates: Update[];
  /** Ticking clock from the parent, so every card ages on the same beat. */
  now: number;
}

/**
 * Status updates as a horizontal reel of full-bleed cards. One card fills the
 * screen and snaps, so reading is a swipe rather than a scroll through a feed —
 * and the text stays at the same absurd size as the distance readout.
 */
export default function Timeline({ updates, now }: TimelineProps) {
  if (updates.length === 0) {
    return (
      <div className="grid h-full place-items-center px-8 text-center">
        <p className="track-label text-[11px] font-bold text-[var(--muted)]">No updates yet</p>
      </div>
    );
  }

  return (
    <div
      className="flex h-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      // Newest first, so opening the tab lands on the latest.
      aria-label="Status updates"
    >
      {updates.map((update, index) => (
        <article
          key={update.id}
          className="flex h-full w-[86vw] max-w-xl shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-[var(--hairline)] bg-white/[0.07]"
        >
          {update.hasPhoto && (
            <img
              src={photoUrl(update.id)}
              alt=""
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              className="min-h-0 w-full flex-1 object-cover"
            />
          )}

          <div className={`flex shrink-0 flex-col gap-3 px-6 py-6 ${update.hasPhoto ? "" : "min-h-0 flex-1 justify-center"}`}>
            {update.text && (
              <p
                className="font-bold leading-[0.95]"
                style={{
                  // A photoless card gives the words the whole surface.
                  fontSize: update.hasPhoto ? "clamp(1.4rem, 6vw, 2.25rem)" : "clamp(2rem, 10vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {update.text}
              </p>
            )}
            <p className="track-label text-[10px] font-bold text-[var(--muted)]">
              {formatAge(now - update.ts)}
              {updates.length > 1 && <span className="opacity-60"> · {index + 1}/{updates.length}</span>}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
