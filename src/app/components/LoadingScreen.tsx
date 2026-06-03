import { useEffect, useState } from "react";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "exit">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(() => onComplete(), 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: DARK,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.9s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
      }}
    >
      {/* Progress bar — top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "1px",
          backgroundColor: GOLD,
          opacity: 0.5,
          width: phase === "in" ? "0%" : "100%",
          transition: phase !== "in" ? "width 2s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      />

      {/* Brand mark */}
      <div
        style={{
          textAlign: "center",
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "translateY(20px)" : "none",
          transition: "opacity 1s ease 0.3s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
        }}
      >
        {/* Top ornament */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "32px",
            opacity: phase === "hold" || phase === "exit" ? 1 : 0,
            transition: "opacity 0.8s ease 0.8s",
          }}
        >
          <div style={{ width: "44px", height: "1px", backgroundColor: `rgba(219,190,140,0.4)` }} />
          <div
            style={{
              width: "4px",
              height: "4px",
              border: `1px solid rgba(219,190,140,0.5)`,
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ width: "44px", height: "1px", backgroundColor: `rgba(219,190,140,0.4)` }} />
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 300,
            color: "#ffffff",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: "14px",
          }}
        >
          TEYMUR
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "8px",
            fontWeight: 300,
            color: GOLD,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
          }}
        >
          CONTINENTAL HOTEL
        </div>

        {/* Bottom ornament */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginTop: "32px",
            opacity: phase === "hold" || phase === "exit" ? 1 : 0,
            transition: "opacity 0.8s ease 1s",
          }}
        >
          <div style={{ width: "44px", height: "1px", backgroundColor: `rgba(219,190,140,0.4)` }} />
          <div
            style={{
              width: "4px",
              height: "4px",
              border: `1px solid rgba(219,190,140,0.5)`,
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ width: "44px", height: "1px", backgroundColor: `rgba(219,190,140,0.4)` }} />
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px",
            fontStyle: "normal",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.15em",
            marginTop: "28px",
          }}
        >
          Gaziantep, Türkiye
        </div>
      </div>

      {/* Bottom progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "44px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: GOLD,
            opacity: 0.6,
            width: phase === "in" ? "0%" : "100%",
            transition: phase !== "in" ? "width 2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s" : "none",
          }}
        />
      </div>
    </div>
  );
}
