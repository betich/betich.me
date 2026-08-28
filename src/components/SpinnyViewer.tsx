import { useEffect, useRef, useState } from "react";
import "./SpinnyViewer.css";

const FRAME_COUNT = 9;
const FRAME_STEP_DISTANCE = 42;
const INERTIA_FRICTION = 0.94;
const frames = Array.from({ length: FRAME_COUNT }, (_, index) => `/images/spinny/${index + 1}.png`);

function wrapFrame(frame: number) {
  return ((Math.floor(frame) % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
}

export default function SpinnyViewer() {
  const [displayedPosition, setDisplayedPosition] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const drag = useRef({ active: false, startX: 0, startPosition: 0, previousX: 0, previousTime: 0 });

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      stopInertia();
      drag.current = {
        active: true,
        startX: touch.clientX,
        startPosition: position.current,
        previousX: touch.clientX,
        previousTime: event.timeStamp,
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!drag.current.active || !touch) return;
      event.preventDefault();

      const elapsed = Math.max(event.timeStamp - drag.current.previousTime, 1);
      const distance = touch.clientX - drag.current.previousX;
      velocity.current = -distance / FRAME_STEP_DISTANCE / elapsed;
      renderPosition(drag.current.startPosition + (drag.current.startX - touch.clientX) / FRAME_STEP_DISTANCE);
      drag.current.previousX = touch.clientX;
      drag.current.previousTime = event.timeStamp;
    };

    const handleTouchEnd = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      animateInertia();
    };

    viewer.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewer.addEventListener("touchmove", handleTouchMove, { passive: false });
    viewer.addEventListener("touchend", handleTouchEnd, { passive: true });
    viewer.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      viewer.removeEventListener("touchstart", handleTouchStart);
      viewer.removeEventListener("touchmove", handleTouchMove);
      viewer.removeEventListener("touchend", handleTouchEnd);
      viewer.removeEventListener("touchcancel", handleTouchEnd);
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  function renderPosition(nextPosition: number) {
    position.current = nextPosition;
    setDisplayedPosition(nextPosition);
  }

  function animateInertia() {
    animationFrame.current = requestAnimationFrame(() => {
      velocity.current *= INERTIA_FRICTION;
      renderPosition(position.current + velocity.current * 16);

      if (Math.abs(velocity.current) > 0.001) {
        animateInertia();
      } else {
        renderPosition(Math.round(position.current));
        animationFrame.current = null;
      }
    });
  }

  function stopInertia() {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
    velocity.current = 0;
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    stopInertia();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      active: true,
      startX: event.clientX,
      startPosition: position.current,
      previousX: event.clientX,
      previousTime: event.timeStamp,
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    if (!drag.current.active) return;

    const elapsed = Math.max(event.timeStamp - drag.current.previousTime, 1);
    const distance = event.clientX - drag.current.previousX;
    velocity.current = -distance / FRAME_STEP_DISTANCE / elapsed;
    renderPosition(drag.current.startPosition + (drag.current.startX - event.clientX) / FRAME_STEP_DISTANCE);
    drag.current.previousX = event.clientX;
    drag.current.previousTime = event.timeStamp;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    if (!drag.current.active) return;
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    animateInertia();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    stopInertia();
    renderPosition(position.current + (event.key === "ArrowLeft" ? 1 : -1));
  }

  const frame = wrapFrame(displayedPosition);
  const nextFrame = (frame + 1) % FRAME_COUNT;
  const blend = displayedPosition - Math.floor(displayedPosition);

  return (
    <div
      ref={viewerRef}
      className="spinny-viewer"
      role="application"
      aria-label="Interactive rotating portrait. Drag or swipe horizontally to turn."
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="spinny-stage">
        <img src={frames[frame]} alt="Thee wearing a traditional white and gold outfit" draggable={false} />
        <img src={frames[nextFrame]} alt="" aria-hidden="true" draggable={false} style={{ opacity: blend }} />
      </div>
      <div className="spinny-preload" aria-hidden="true">
        {frames.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}
