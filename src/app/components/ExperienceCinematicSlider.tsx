import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useLang } from "../context/LanguageContext";
import { useContent } from "../context/ContentContext";

const GOLD = "#dbbe8c";

export function ExperienceCinematicSlider() {
  const { t, lang } = useLang();
  const { home } = useContent();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const dragStartX = useRef(0);
  const didDrag = useRef(false);

  const experiences = home.experienceItems.map((item, i) => ({
    id: item.eyebrow.toLowerCase().replace(/\s+/g, "-") + i,
    eyebrow: item.eyebrow,
    titleLines: [
      { text: item.title },
      { text: item.titleAccent, gold: true },
    ],
    description: item.desc,
    link: item.link,
    cta: item.cta,
    image: item.image,
    stats: null as null,
  }));

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    didDrag.current = false;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 48) {
      didDrag.current = true;
      const direction = lang === "ar" ? -1 : 1;
      if (diff * direction > 0) setActive(p => Math.min(p + 1, experiences.length - 1));
      else setActive(p => Math.max(p - 1, 0));
    }
  };

  return (
    <section
      className="exp-cinematic"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{
        position: "relative",
        display: "flex",
        height: "92vh",
        overflow: "clip",
        userSelect: "none",
        touchAction: "pan-y",
        direction: "ltr",
      }}
    >
      {experiences.map((exp, i) => {
        const isActive = i === active;
        return (
          <div
            key={exp.id}
            onMouseEnter={() => { if (!didDrag.current) setActive(i); }}
            onClick={() => { if (!didDrag.current) navigate(exp.link); }}
            style={{
              position: "relative",
              flex: isActive ? 2.8 : 0.6,
              transition: "flex 0.72s cubic-bezier(0.22,1,0.36,1)",
              overflow: "hidden",
              borderRight: i < experiences.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              cursor: "pointer",
            }}
          >
            {/* Parallax zoom bg */}
            <div
              className="exp-panel-bg"
              style={{
                position: "absolute",
                inset: "-5%",
                transform: isActive ? "scale(1.0)" : "scale(1.08)",
                transition: "transform 1.6s cubic-bezier(0.22,1,0.36,1)",
                willChange: "transform",
              }}
            >
              <img
                src={exp.image}
                alt={exp.eyebrow}
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Gradient overlay */}
            <div
              className="exp-panel-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: isActive
                  ? "linear-gradient(150deg, rgba(5,15,40,0.86) 0%, rgba(5,15,40,0.52) 55%, rgba(5,15,40,0.18) 100%)"
                  : "linear-gradient(180deg, rgba(5,15,40,0.42) 0%, rgba(5,15,40,0.82) 100%)",
                transition: "background 0.72s ease",
              }}
            />

            {/* CLOSED STATE: large vertical label */}
            <div
              className="exp-panel-closed"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isActive ? 0 : 1,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(21px, 2.4vw, 39px)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.88)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  lineHeight: 1,
                  textShadow: "0 2px 16px rgba(0,0,0,0.3)",
                }}
              >
                {exp.eyebrow}
              </span>
            </div>

            {/* ACTIVE STATE: full content */}
            <div
              className="exp-panel-content"
              style={{
                position: "absolute",
                inset: 0,
                padding: "0 52px 68px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "none" : "translateX(-18px)",
                transition: `opacity 0.55s ease ${isActive ? "0.18s" : "0s"}, transform 0.55s ease ${isActive ? "0.18s" : "0s"}`,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(34px, 3.8vw, 60px)",
                  fontWeight: 300,
                  color: "#ffffff",
                  lineHeight: 0.95,
                  margin: "0 0 22px",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontStyle: "normal",
                }}
              >
                {exp.titleLines.map((line, li) => (
                  <span key={li} style={{ display: "block", color: line.gold ? GOLD : "#ffffff" }}>
                    {line.text}
                  </span>
                ))}
              </h2>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 2, color: "rgba(255,255,255,0.48)", marginBottom: exp.stats ? "24px" : "32px", maxWidth: "300px" }}>
                {exp.description}
              </p>

              {exp.stats && (
                <div style={{ display: "flex", gap: "36px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: "28px" }}>
                  {exp.stats.map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 28px)", fontWeight: 300, color: GOLD, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "7px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginTop: "5px" }}>{l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Navigation dots */}
      <div
        className="exp-dots-mob"
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
          zIndex: 10,
        }}
      >
        {experiences.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); didDrag.current = false; }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 4px" }}
          >
            <div
              style={{
                width: i === active ? "40px" : "10px",
                height: "1px",
                backgroundColor: i === active ? GOLD : "rgba(255,255,255,0.28)",
                transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Mobile: alt alta, kaydırmasız */}
      <style>{`
        @media (max-width: 768px) {
          /* Kapsayıcı: dikey yığın */
          .exp-cinematic {
            flex-direction: column !important;
            height: auto !important;
            overflow: visible !important;
            touch-action: auto !important;
          }
          /* Her panel: blok + aralarında boşluk */
          .exp-cinematic > div {
            flex: none !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            margin-bottom: 20px !important;
          }
          .exp-cinematic > div:last-child {
            margin-bottom: 0 !important;
          }
          /* Görsel alanı: sabit yükseklik */
          .exp-panel-bg {
            position: relative !important;
            inset: 0 !important;
            height: 60vw !important;
            width: 100% !important;
            transform: none !important;
            overflow: hidden !important;
            display: block !important;
          }
          .exp-panel-bg img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          /* Overlay ve kapalı etiket gizle */
          .exp-panel-overlay { display: none !important; }
          .exp-panel-closed  { display: none !important; }
          /* İçerik: her zaman görünür, görselin altında */
          .exp-panel-content {
            position: relative !important;
            inset: auto !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
            padding: 28px 24px 36px !important;
            background: #050f28 !important;
            display: flex !important;
          }
          .exp-panel-content p { max-width: 100% !important; }
          /* Dots gizle */
          .exp-dots-mob { display: none !important; }
        }
      `}</style>
    </section>
  );
}
