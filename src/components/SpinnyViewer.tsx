import { useEffect, useLayoutEffect, useRef } from "react";
import "./SpinnyViewer.css";

const FRAME_COUNT = 9;

/** Horizontal drag distance, in px, that advances the sequence by one frame. */
const PIXELS_PER_FRAME = 42;
/** Only pointer samples this recent feed the release velocity. */
const VELOCITY_WINDOW_MS = 90;
/** A release coasts as far as its velocity would carry it in this many seconds. */
const COAST_SECONDS = 0.28;
/** Ceiling on that coast, so even a violent flick settles promptly. */
const MAX_COAST_FRAMES = FRAME_COUNT * 2.5;
/** Settle spring. Damping ratio ~0.65: one small overshoot, then rest, in about 0.9s. */
const SPRING_STIFFNESS = 140;
const SPRING_DAMPING = 15.4;
/** Spin speed, in frames/second, at which neighbouring frames cross-fade fully. */
const BLEND_SPEED = 7;
/** Fixed physics substep, so the spring feels identical at 60Hz and 120Hz. */
const SUBSTEP_SECONDS = 1 / 240;
/** Below this displacement and speed the spring has arrived. */
const REST_DISTANCE = 0.001;
const REST_SPEED = 0.05;

const frames = Array.from({ length: FRAME_COUNT }, (_, index) => `/images/spinny/${index + 1}.png`);

const wrapFrame = (frame: number) => ((frame % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;

const prefersReducedMotion = () =>
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SpinnyViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  /** Continuous frame position. Integers are exact frames; the fraction is in-between. */
  const position = useRef(0);
  /** Frames per second, signed. */
  const velocity = useRef(0);
  /** Where the settle spring is pulling to — always a whole frame. */
  const target = useRef(0);
  const animation = useRef<number | null>(null);
  const lastTick = useRef(0);
  const drag = useRef<{ pointerId: number | null; lastX: number; samples: { time: number; position: number }[] }>({
    pointerId: null,
    lastX: 0,
    samples: [],
  });

  /** Show the nearest frame, ghosting the one we are turning into while moving. */
  function paint() {
    const nearest = Math.round(position.current);
    const offset = position.current - nearest;
    const speedBlend = Math.min(Math.abs(velocity.current) / BLEND_SPEED, 1);
    const ghostOpacity = Math.abs(offset) * speedBlend;
    const nearestIndex = wrapFrame(nearest);
    const ghostIndex = wrapFrame(nearest + Math.sign(offset));

    imageRefs.current.forEach((image, index) => {
      if (!image) return;
      const isGhost = index === ghostIndex && index !== nearestIndex;
      image.style.opacity = String(index === nearestIndex ? 1 : isGhost ? ghostOpacity : 0);
      image.style.zIndex = isGhost ? "1" : "0";
    });
  }

  // Frames are driven imperatively, so re-sync the DOM after any React render.
  useLayoutEffect(paint);

  function stopAnimation() {
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    animation.current = null;
  }

  function tick(now: number) {
    const elapsed = Math.min((now - lastTick.current) / 1000, 0.064);
    lastTick.current = now;

    let remaining = elapsed;
    while (remaining > 0) {
      const step = Math.min(SUBSTEP_SECONDS, remaining);
      remaining -= step;
      const pull = -SPRING_STIFFNESS * (position.current - target.current);
      const damping = -SPRING_DAMPING * velocity.current;
      velocity.current += (pull + damping) * step;
      position.current += velocity.current * step;
    }

    if (Math.abs(position.current - target.current) < REST_DISTANCE && Math.abs(velocity.current) < REST_SPEED) {
      // Land exactly on the frame, and keep the running position small.
      position.current = wrapFrame(target.current);
      velocity.current = 0;
      animation.current = null;
      paint();
      return;
    }

    paint();
    animation.current = requestAnimationFrame(tick);
  }

  /** Spring onto a whole frame, carrying whatever velocity we already have. */
  function settleTo(frame: number) {
    target.current = frame;
    stopAnimation();

    if (prefersReducedMotion()) {
      position.current = wrapFrame(frame);
      velocity.current = 0;
      paint();
      return;
    }

    lastTick.current = performance.now();
    animation.current = requestAnimationFrame(tick);
  }

  /** Project where the flick was headed, then settle on the frame nearest to it. */
  function release() {
    let coast = velocity.current * COAST_SECONDS;
    if (Math.abs(coast) > MAX_COAST_FRAMES) {
      // Scale velocity with the coast so the spring keeps its shape.
      const scale = MAX_COAST_FRAMES / Math.abs(coast);
      coast *= scale;
      velocity.current *= scale;
    }
    settleTo(Math.round(position.current + coast));
  }

  function dismissHint() {
    viewerRef.current?.classList.remove("is-hinting");
  }

  function beginDrag(x: number, pointerId: number) {
    stopAnimation();
    velocity.current = 0;
    drag.current = { pointerId, lastX: x, samples: [{ time: performance.now(), position: position.current }] };
    dismissHint();
  }

  function moveDrag(x: number) {
    const state = drag.current;
    position.current -= (x - state.lastX) / PIXELS_PER_FRAME;
    state.lastX = x;

    const now = performance.now();
    state.samples.push({ time: now, position: position.current });
    while (state.samples.length > 2 && now - state.samples[0].time > VELOCITY_WINDOW_MS) state.samples.shift();

    const oldest = state.samples[0];
    const span = (now - oldest.time) / 1000;
    velocity.current = span > 0 ? (position.current - oldest.position) / span : 0;
    paint();
  }

  function endDrag() {
    const samples = drag.current.samples;
    // A finger that came to rest before lifting should not fling.
    if (performance.now() - samples[samples.length - 1].time > VELOCITY_WINDOW_MS) velocity.current = 0;
    drag.current.pointerId = null;
    release();
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (drag.current.pointerId !== null) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    beginDrag(event.clientX, event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current.pointerId) return;
    moveDrag(event.clientX);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    endDrag();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    dismissHint();
    stopAnimation();
    velocity.current = 0;
    settleTo(Math.round(position.current) + (event.key === "ArrowLeft" ? 1 : -1));
  }

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    // touch-action alone still lets iOS start a rubber-band scroll mid-drag.
    const blockTouchScroll = (event: TouchEvent) => {
      if (drag.current.pointerId !== null) event.preventDefault();
    };
    viewer.addEventListener("touchmove", blockTouchScroll, { passive: false });

    return () => {
      viewer.removeEventListener("touchmove", blockTouchScroll);
      stopAnimation();
    };
  }, []);

  return (
    <div
      ref={viewerRef}
      className="spinny-viewer is-hinting"
      role="img"
      aria-label="Thee in a graduation gown. Drag horizontally to turn the portrait."
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <div className="spinny-stage">
        <div className="spinny-figure">
          {frames.map((src, index) => (
            <img
              key={src}
              ref={(element) => {
                imageRefs.current[index] = element;
              }}
              src={src}
              alt=""
              draggable={false}
              style={{ opacity: index === 0 ? 1 : 0 }}
            />
          ))}
        </div>
      </div>

      <p className="spinny-hint" aria-hidden="true">
        <span className="spinny-hint-arrow">&lsaquo;&lsaquo;&lsaquo;</span>
        drag to spin
        <span className="spinny-hint-arrow">&rsaquo;&rsaquo;&rsaquo;</span>
      </p>
    </div>
  );
}
