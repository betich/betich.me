import SpinnyViewer from "../SpinnyViewer";

/**
 * The site's spinny portrait, shrunk to a footer mark. It sits above the tab
 * bar on every tab — a signature on the tool, and still draggable.
 */
export default function SpinnyMark() {
  return (
    <div className="flex shrink-0 items-center gap-4 px-6 pb-3 pt-1">
      <span className="h-px flex-1 bg-[var(--hairline)]" />
      <div className="h-[66px] w-[58px] shrink-0 overflow-hidden rounded-2xl">
        <SpinnyViewer compact />
      </div>
      <span className="h-px flex-1 bg-[var(--hairline)]" />
    </div>
  );
}
