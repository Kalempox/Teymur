import { useEffect, useRef } from "react";

export function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const el = cursorRef.current;
    const trail = trailRef.current;
    if (!el || !trail) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const { x, y } = posRef.current;
      const tx = trailPosRef.current.x;
      const ty = trailPosRef.current.y;

      trailPosRef.current = {
        x: tx + (x - tx) * 0.12,
        y: ty + (y - ty) * 0.12,
      };

      el.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      trail.style.transform = `translate(${trailPosRef.current.x - 20}px, ${trailPosRef.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      el.style.transform += " scale(2.5)";
      el.style.opacity = "0.6";
      trail.style.opacity = "0";
    };
    const onLeaveLink = () => {
      el.style.opacity = "1";
      trail.style.opacity = "0.25";
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    const links = document.querySelectorAll("a, button");
    links.forEach((l) => {
      l.addEventListener("mouseenter", onEnterLink);
      l.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      links.forEach((l) => {
        l.removeEventListener("mouseenter", onEnterLink);
        l.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#dbbe8c",
          zIndex: 99999,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          boxShadow: "0 0 12px 3px rgba(219,190,140,0.5)",
          mixBlendMode: "normal",
        }}
      />
      {/* Soft glow trail */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(219,190,140,0.6)",
          zIndex: 99998,
          pointerEvents: "none",
          opacity: 0.25,
          transition: "opacity 0.3s ease",
        }}
      />
      <style>{`
        @media (hover: none) {
          /* Hide custom cursor on touch devices */
        }
        @media (hover: hover) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
