import { forwardRef } from "react";

export const COMPASS_CENTER: [number, number] = [200, 200];

const [CX, CY] = COMPASS_CENTER;
const TICK_OUTER = 170;
const TICK_COUNT = 120; // One every 3°.
const CARDINALS: Array<{ label: string; at: number; turn: number }> = [
  { label: "N", at: 0, turn: 0 },
  { label: "E", at: 90, turn: 90 },
  { label: "S", at: 180, turn: 0 },
  { label: "W", at: 270, turn: -90 },
];

const NEEDLE_HEAD = "M 200 34 L 210 196 Q 200 203 190 196 Z";
const NEEDLE_TAIL = "M 200 322 L 209 204 Q 200 197 191 204 Z";

interface CompassProps {
  ringRef: React.Ref<SVGGElement>;
  needleRef: React.Ref<SVGGElement>;
  /** False while there is no fix, or no location of our own to measure from. */
  hasTarget: boolean;
}

/**
 * A rotating compass card with a needle over it: the card carries true north,
 * the needle points at the bundit. Both groups are rotated from a rAF loop
 * outside React (see `useAngleDriver`), so this only draws the face.
 */
const Compass = forwardRef<SVGSVGElement, CompassProps>(function Compass(
  { ringRef, needleRef, hasTarget },
  ref,
) {
  return (
    <svg ref={ref} viewBox="0 0 400 400" className="h-full w-full" role="img" aria-hidden="true">
      {/* Lubber line: fixed to the screen, marking straight ahead. */}
      <path d="M 200 6 L 209 24 L 191 24 Z" fill="var(--ink)" opacity={0.9} />

      <g ref={ringRef} style={{ opacity: hasTarget ? 1 : 0.5, transition: "opacity 400ms ease" }}>
        {Array.from({ length: TICK_COUNT }, (_, index) => {
          const angle = index * (360 / TICK_COUNT);
          const major = angle % 15 === 0;
          const radians = ((angle - 90) * Math.PI) / 180;
          const inner = major ? 144 : 154;
          return (
            <line
              key={angle}
              x1={CX + inner * Math.cos(radians)}
              y1={CY + inner * Math.sin(radians)}
              x2={CX + TICK_OUTER * Math.cos(radians)}
              y2={CY + TICK_OUTER * Math.sin(radians)}
              stroke={major ? "var(--tick-major)" : "var(--tick)"}
              strokeWidth={major ? 3 : 1.7}
            />
          );
        })}

        {CARDINALS.map(({ label, at, turn }) => {
          const radians = ((at - 90) * Math.PI) / 180;
          const x = CX + 112 * Math.cos(radians);
          const y = CY + 112 * Math.sin(radians);
          return (
            <text
              key={label}
              x={x}
              y={y}
              transform={`rotate(${turn} ${x} ${y})`}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--ink)"
              fontSize={44}
              fontWeight={700}
              fontFamily="inherit"
            >
              {label}
            </text>
          );
        })}
      </g>

      <g ref={needleRef} style={{ opacity: hasTarget ? 1 : 0, transition: "opacity 400ms ease" }}>
        <path d={NEEDLE_TAIL} fill="var(--needle-tail)" />
        <path d={NEEDLE_HEAD} fill="var(--ink)" />
      </g>

      <circle cx={CX} cy={CY} r={7} fill="var(--ground)" />
    </svg>
  );
});

export default Compass;
