import SpinnyViewer from "../SpinnyViewer";

/**
 * The site's spinny portrait, shrunk to a footer mark. It sits above the tab
 * bar on every tab — a signature on the tool, and still draggable.
 */
interface SpinnyMarkProps {
  /** Live compass heading, so he turns as the phone does. */
  headingRef?: React.MutableRefObject<number | null>;
}

export default function SpinnyMark({ headingRef }: SpinnyMarkProps) {
  return (
    <div className="flex shrink-0 items-center gap-4 px-5 pb-3 pt-1">
      <div className="h-[66px] w-[58px] shrink-0 overflow-hidden rounded-2xl">
        <SpinnyViewer compact headingRef={headingRef} />
      </div>
      {/* The rule stops short of the contact buttons that sit fixed on the right. */}
      <span className="mr-[13.5rem] h-px flex-1 bg-[var(--hairline)]" />
    </div>
  );
}
