"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const moveGlow = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      glow.dataset.active = "true";
    };
    const hideGlow = () => {
      delete glow.dataset.active;
    };
    const leaveWindow = (event: PointerEvent) => {
      if (!event.relatedTarget) hideGlow();
    };

    window.addEventListener("pointermove", moveGlow, { passive: true });
    window.addEventListener("pointerout", leaveWindow);
    window.addEventListener("pointercancel", hideGlow);
    window.addEventListener("blur", hideGlow);

    return () => {
      window.removeEventListener("pointermove", moveGlow);
      window.removeEventListener("pointerout", leaveWindow);
      window.removeEventListener("pointercancel", hideGlow);
      window.removeEventListener("blur", hideGlow);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden mix-blend-screen">
      <div ref={glowRef} className="cursor-glow" />
    </div>
  );
}
