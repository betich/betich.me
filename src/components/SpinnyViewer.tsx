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
  const position = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const drag = useRef({ active: false, startX: 0, startPosition: 0, previousX: 0, previousTime: 0 });

  useEffect(() => {
    return () => {
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
    if (!drag.current.active) return;

    const elapsed = Math.max(event.timeStamp - drag.current.previousTime, 1);
    const distance = event.clientX - drag.current.previousX;
    velocity.current = -distance / FRAME_STEP_DISTANCE / elapsed;
    renderPosition(drag.current.startPosition + (drag.current.startX - event.clientX) / FRAME_STEP_DISTANCE);
    drag.current.previousX = event.clientX;
    drag.current.previousTime = event.timeStamp;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    animateInertia();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    stopInertia();
    renderPosition(position.current + (event.key === "ArrowLeft" ? 1 : -1));
  }

  const frame = wrapFrame(displayedPosition);
  const nextFrame = (frame + 1) % FRAME_COUNT;
  const blend = displayedPosition - Math.floor(displayedPosition);

  return (
    <div
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
