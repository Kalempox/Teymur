import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollY, useInView } from "../hooks/useInView";
import { useLang } from "../context/LanguageContext";
import { ExperienceCinematicSlider } from "../components/ExperienceCinematicSlider";
import { useContent, useT } from "../context/ContentContext";

function getYoutubeEmbedUrl(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\s]+)/);
  if (!m) return null;
  const id = m[1];
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&playlist=${id}&showinfo=0&rel=0&vq=hd1080`;
}

const GOLD = "#dbbe8c";
const DARK = "#050f28";
const CREAM = "#f5f2ed";

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  y = 36,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const [ref, inView] = useInView(0.07);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}


function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  const [ref, inView] = useInView(0.1);
  return (
    null
  );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  const [ready, setReady] = useState(false);
  const scrollY = useScrollY();
  const { home } = useContent();
  const t = useT();
  const ytEmbed = getYoutubeEmbedUrl(home.heroVideoUrl);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{ position: "relative", height: "100dvh", overflow: "hidden", backgroundColor: DARK }}>
      {/* Parallax video background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${scrollY * 0.18}px)`,
          willChange: "transform",
        }}
      >
        {ytEmbed ? (
          <iframe
            src={ytEmbed}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "177.78vh", minWidth: "100%", height: "56.25vw", minHeight: "115%", border: "none", pointerEvents: "none" }}
            allow="autoplay; encrypted-media"
          />
        ) : (
          <video
            autoPlay muted loop playsInline
            poster={home.heroPoster}
            style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 40%", display: "block", marginTop: "-7.5%" }}
          >
            {home.heroVideoUrl && <source src={home.heroVideoUrl} type="video/mp4" />}
            {home.heroVideoUrl2 && <source src={home.heroVideoUrl2} type="video/mp4" />}
          </video>
        )}
      </div>

      {/* Üst karartma — navbar görünürlüğü için */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "220px", zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(5,15,40,0.55) 0%, transparent 100%)",
      }} />

      {/* Cinematic overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(170deg, rgba(5,15,40,0.28) 0%, rgba(5,15,40,0.12) 50%, rgba(5,15,40,0.72) 100%)",
        }}
      />

      {/* Brand mark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        {/* Ornament top */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "32px",
            opacity: ready ? 0.7 : 0,
            transition: "opacity 2s ease 1s",
          }}
        >
          <div style={{ width: "44px", height: "1px", backgroundColor: "rgba(219,190,140,0.5)" }} />
          <div style={{ width: "3px", height: "3px", border: "1px solid rgba(219,190,140,0.55)", transform: "rotate(45deg)" }} />
          <div style={{ width: "44px", height: "1px", backgroundColor: "rgba(219,190,140,0.5)" }} />
        </div>

        {/* Hero title — 25% bigger than original clamp(16px,2.4vw,38px) */}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(16px)",
            transition: "opacity 2s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 2s cubic-bezier(0.22,1,0.36,1) 0.5s",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(26px, 3.8vw, 58px)",
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "0.2em",
              lineHeight: 1.15,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {t("home.heroName", home.heroName)}
          </h1>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 1.8vw, 28px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff", marginTop: "8px", fontWeight: 300, lineHeight: 1.25, opacity: 0.9 }}>
            {t("home.heroSubName", home.heroSubName)}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(7px, 0.75vw, 9px)", letterSpacing: "0.5em", textTransform: "uppercase", color: GOLD, marginTop: "14px", opacity: 0.85, fontWeight: 300 }}>
            {t("home.heroCity", home.heroCity)}
          </div>
        </div>

        {/* Ornament bottom */}
        
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          opacity: ready ? 0.5 : 0,
          transition: "opacity 2s ease 2.2s",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45))",
            animation: "scrollDrop 2.4s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "7px",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          SCROLL
        </span>
      </div>

      <style>{`
        @keyframes heroKen {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        @keyframes scrollDrop {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

// ─── 2. 360° EXPERIENCE ──────────────────────────────────────────────────────
function Experience360() {
  const [showModal, setShowModal] = useState(false);
  const { t: tLang } = useLang();
  const { home } = useContent();

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };

  // Close on Escape key
  useEffect(() => {
    if (!showModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showModal]);

  return (
    <>
      <section style={{ position: "relative", backgroundColor: "#080d18" }}>
        {/* Section header */}
        <div
          style={{
            padding: "100px 6vw 60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
          className="exp-header"
        >
          <Reveal delay={0}>
            <Eyebrow>{tLang("360.eyebrow")}</Eyebrow>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 300,
                color: "#ffffff",
                letterSpacing: "0.1em",
                margin: 0,
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {tLang("360.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.3)",
                maxWidth: "240px",
                margin: 0,
                textAlign: "right",
              }}
            >
              {tLang("360.subtitle")}
            </p>
          </Reveal>
        </div>

        {/* Preview area — always shows preview, click → modal */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "80vh",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={openModal}
        >
          <img
            src={home.experience360PreviewImg}
            alt="360 Preview"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.4)",
              transition: "filter 0.5s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = "brightness(0.4)")}
          />

          {/* CTA overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                border: `2px solid ${GOLD}`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "32px",
                position: "relative",
                backgroundColor: GOLD,
                backdropFilter: "blur(8px)",
                transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
                animation: "pulse360 2.5s ease-in-out infinite",
                boxShadow: "0 8px 32px rgba(219,190,140,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a96e";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 12px rgba(219,190,140,0.15), 0 16px 48px rgba(219,190,140,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.backgroundColor = GOLD;
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(219,190,140,0.35)";
              }}
            >
              <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L24 15L2 28V2Z" fill="#050f28" stroke="#050f28" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>

            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                fontWeight: 500,
              }}
            >
              {tLang("360.enter")}
            </span>

            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "11px",
                fontStyle: "normal",
                color: "rgba(255,255,255,0.4)",
                marginTop: "12px",
                letterSpacing: "0.08em",
              }}
            >
              {tLang("360.hint")}
            </span>
          </div>

          <style>{`
            @keyframes pulse360 {
              0%, 100% {
                box-shadow: 0 8px 32px rgba(219,190,140,0.35), 0 0 0 0 rgba(219,190,140,0.5);
              }
              60% {
                box-shadow: 0 8px 32px rgba(219,190,140,0.35), 0 0 0 22px rgba(219,190,140,0);
              }
            }
          `}</style>
        </div>

        <div style={{ height: "1px", backgroundColor: "rgba(219,190,140,0.08)" }} />

        <style>{`
          @media (max-width: 768px) {
            .exp-header { flex-direction: column; align-items: flex-start; gap: 20px; }
            .exp-header p { text-align: left !important; }
          }
        `}</style>
      </section>

      {/* ── FULLSCREEN 360 MODAL ──────────────────────────────────────── */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(5,12,30,0.97)",
            backdropFilter: "blur(24px) saturate(180%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeInModal 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              zIndex: 10001,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              transition: "background 0.3s, border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(219,190,140,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(219,190,140,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
            }}
          >
            <X size={16} />
          </button>

          {/* ESC hint */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "8px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              zIndex: 10001,
            }}
          >
            {tLang("360.esc")}
          </div>

          {/* Iframe */}
          <iframe
            src={home.experience360IframeUrl}
            title="Teymur Continental Hotel 360° Experience"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
            allowFullScreen
            allow="xr-spatial-tracking; gyroscope; accelerometer; autoplay; fullscreen"
            loading="eager"
          />

          {/* Direct link fallback */}
          <a
            href="https://www.teymurcontinentalhotel.com/360/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 10001,
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
          >
            {tLang("360.esc")} · Yeni sekmede aç <ArrowRight size={10} />
          </a>

          <style>{`
            @keyframes fadeInModal {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}

// ─── 3. ROOMS PREVIEW ────────────────────────────────────────────────────────
function RoomsPreview() {
  const { home } = useContent();
  const t = useT();
  const ROOMS_PREVIEW = home.roomsPreview;
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [mobIdx, setMobIdx] = useState(0);
  const mobTrackRef = useRef<HTMLDivElement>(null);
  const { t: tLang } = useLang();

  const currentImgs = ROOMS_PREVIEW[selectedRoom].imgs;

  const selectRoom = (roomIdx: number) => { setSelectedRoom(roomIdx); setImgIdx(0); };
  const prevImg = () => setImgIdx(i => Math.max(0, i - 1));
  const nextImg = () => setImgIdx(i => Math.min(currentImgs.length - 1, i + 1));

  const arrowBtn = (dir: "left" | "right", disabled: boolean, onClick: () => void) => (
    <button onClick={onClick} disabled={disabled} style={{ position: "absolute", [dir === "left" ? "left" : "right"]: "20px", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "48px", height: "48px", borderRadius: "50%", background: disabled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "default" : "pointer", backdropFilter: "blur(8px)", transition: "all 0.3s ease", opacity: disabled ? 0.3 : 1, boxShadow: disabled ? "none" : "0 4px 20px rgba(0,0,0,0.15)" }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = GOLD; }}
      onMouseLeave={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.92)"; }}
    >
      {dir === "left" ? <ChevronLeft size={20} color={disabled ? "#fff" : DARK} /> : <ChevronRight size={20} color={disabled ? "#fff" : DARK} />}
    </button>
  );

  // Mobile carousel scroll sync
  const onMobScroll = () => {
    const track = mobTrackRef.current;
    if (!track) return;
    const cardW = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
    setMobIdx(Math.max(0, Math.min(ROOMS_PREVIEW.length - 1, Math.round(track.scrollLeft / cardW))));
  };

  const mobScrollTo = (i: number) => {
    setMobIdx(i);
    const card = mobTrackRef.current?.children[i] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <>
      {/* ── DESKTOP: sticky image + text list ── */}
      <section style={{ display: "grid", gridTemplateColumns: "52% 48%", minHeight: "90vh" }} className="rooms-preview rooms-desktop">
        <Link to={`/odalar/${ROOMS_PREVIEW[selectedRoom].slug}`} className="rooms-img-panel" style={{ display: "block", position: "sticky", top: 0, height: "100vh", overflow: "hidden", textDecoration: "none", cursor: "pointer" }}>
          {currentImgs.map((src, i) => (
            <img key={`${selectedRoom}-${i}`} src={src} alt={ROOMS_PREVIEW[selectedRoom].name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: imgIdx === i ? 1 : 0, transform: imgIdx === i ? "scale(1)" : "scale(1.03)", transition: "opacity 0.7s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)" }} />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 70%, rgba(245,242,237,0.4) 100%)", pointerEvents: "none" }} />
          {arrowBtn("left", imgIdx === 0, prevImg)}
          {arrowBtn("right", imgIdx === currentImgs.length - 1, nextImg)}
          <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
            {currentImgs.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 3px" }}>
                <div style={{ width: i === imgIdx ? "32px" : "8px", height: "1px", backgroundColor: i === imgIdx ? GOLD : "rgba(255,255,255,0.5)", transition: "all 0.4s ease" }} />
              </button>
            ))}
          </div>
        </Link>

        <div style={{ backgroundColor: CREAM, display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 64px" }}>
          <Reveal delay={0}>
            <Eyebrow>{tLang("rooms.eyebrow")}</Eyebrow>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 4vw, 58px)", fontWeight: 300, color: DARK, lineHeight: 1.05, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {t("home.roomsTitle", home.roomsTitle)}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.95, color: "rgba(5,15,40,0.48)", marginBottom: "56px", maxWidth: "300px" }}>
              {t("home.roomsDesc", home.roomsDesc)}
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ROOMS_PREVIEW.map((room, i) => (
              <Link key={room.name} to={`/odalar/${room.slug}`} onMouseEnter={() => selectRoom(i)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", borderBottom: i < ROOMS_PREVIEW.length - 1 ? "1px solid rgba(5,15,40,0.07)" : "none", textDecoration: "none", cursor: "pointer" }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: selectedRoom === i ? DARK : "rgba(5,15,40,0.6)", textTransform: "uppercase", letterSpacing: "0.07em", transition: "color 0.3s ease" }}>
                  {room.name}
                </div>
                <ArrowRight size={14} color={selectedRoom === i ? GOLD : "rgba(5,15,40,0.2)"} style={{ transition: "color 0.3s ease, transform 0.3s ease", transform: selectedRoom === i ? "translateX(4px)" : "none" }} />
              </Link>
            ))}
          </div>
          <Reveal delay={0.2} style={{ marginTop: "48px" }}>
            <Link to="/odalar" style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: DARK, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "12px", paddingBottom: "3px", borderBottom: `1px solid ${GOLD}` }}>
              {tLang("rooms.all")} <ArrowRight size={11} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── MOBİL: görsel üzerinde başlık carousel ── */}
      <section style={{ backgroundColor: CREAM, overflow: "hidden" }} className="rooms-mobile">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "40px 24px 28px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 7vw, 38px)", fontWeight: 300, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
              {tLang("rooms.title1")}
            </h2>
          </div>
          <Link to="/odalar" style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: DARK, textDecoration: "none", paddingBottom: "2px", borderBottom: `1px solid ${DARK}` }}>
            {tLang("rooms.all")}
          </Link>
        </div>

        <div ref={mobTrackRef} onScroll={onMobScroll}
          style={{ display: "flex", gap: "0", overflowX: "auto", scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingBottom: "0" }}
          className="rooms-mob-track"
        >
          {ROOMS_PREVIEW.map(room => (
            <Link key={room.slug} to={`/odalar/${room.slug}`}
              style={{ flexShrink: 0, width: "82vw", marginRight: "10px", aspectRatio: "3/4", position: "relative", overflow: "hidden", textDecoration: "none", display: "block", scrollSnapAlign: "start" }}
            >
              <img src={room.imgs[0]} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,15,40,0.85) 0%, rgba(5,15,40,0.05) 55%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 400, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {room.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "20px 0 36px" }}>
          {ROOMS_PREVIEW.map((_, i) => (
            <button key={i} onClick={() => mobScrollTo(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
              <div style={{ width: i === mobIdx ? "28px" : "7px", height: "1.5px", backgroundColor: i === mobIdx ? DARK : "rgba(5,15,40,0.2)", transition: "all 0.35s ease", borderRadius: "1px" }} />
            </button>
          ))}
        </div>
      </section>

      <style>{`
        .rooms-mob-track::-webkit-scrollbar { display: none; }
        /* Desktop: show original, hide mobile */
        .rooms-desktop { display: grid !important; }
        .rooms-mobile  { display: none !important; }
        /* Mobile: hide original, show carousel */
        @media (max-width: 960px) {
          .rooms-desktop { display: none !important; }
          .rooms-mobile  { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ─── 4. GALLERY — HORIZONTAL SCROLL ─────────────────────────────────────────
function GallerySection() {
  const { home } = useContent();
  const GALLERY = home.galleryImages;
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const { t: tLang } = useLang();
  const sx = useRef(0);
  const ss = useRef(0);

  const onWheel = (e: React.WheelEvent) => {
    if (trackRef.current && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault(); trackRef.current.scrollLeft += e.deltaX;
    }
  };

  return (
    <section style={{ backgroundColor: "#ffffff", overflow: "clip" }}>
      <div
        style={{
          padding: "80px 6vw 44px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Reveal delay={0.15}>
          <Link
            to="/galeri"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: DARK,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "2px",
              borderBottom: `1px solid ${GOLD}`,
            }}
          >
            {tLang("gallery.link")} <ArrowRight size={11} />
          </Link>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onWheel={onWheel}
        onMouseDown={(e) => { setDragging(true); sx.current = e.clientX; ss.current = trackRef.current?.scrollLeft ?? 0; }}
        onMouseMove={(e) => { if (dragging && trackRef.current) trackRef.current.scrollLeft = ss.current - (e.clientX - sx.current); }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        className="gallery-track"
        style={{
          display: "flex",
          gap: "3px",
          overflowX: "auto",
          paddingLeft: "6vw",
          paddingRight: "6vw",
          paddingBottom: "80px",
          scrollbarWidth: "none",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        {GALLERY.map((g, i) => (
          <div key={i} className="gallery-item" style={{ flexShrink: 0, width: g.w, height: "56vh", overflow: "hidden", scrollSnapAlign: "start" }}>
            <img
              src={g.src}
              alt=""
              draggable={false}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                pointerEvents: "none",
                transition: "transform 0.7s ease",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 5. TESTIMONIALS ─────────────────────────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const { home } = useContent();

  const approvedFeedback: { text: string; author: string; city: string }[] = (() => {
    try {
      const entries = JSON.parse(localStorage.getItem("teymur_feedback") || "[]");
      return entries
        .filter((e: { isPublic: boolean; isApproved: boolean; message: string }) => e.isPublic && e.isApproved && e.message)
        .map((e: { message: string; name: string; stars: number }) => ({
          text: e.message,
          author: e.name || "Misafirimiz",
          city: `${"★".repeat(e.stars)} Değerlendirme`,
        }));
    } catch { return []; }
  })();

  const quotes = [...home.testimonials, ...approvedFeedback];
  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section style={{ backgroundColor: CREAM, padding: "140px 6vw" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0}>
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "48px" }}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill={GOLD} color={GOLD} />)}
          </div>

          <blockquote
            key={idx}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(20px, 2.5vw, 32px)",
              fontWeight: 300,
              fontStyle: "normal",
              color: DARK,
              lineHeight: 1.6,
              margin: "0 0 36px",
              animation: "fadeQ 0.8s ease",
              letterSpacing: "0.02em",
            }}
          >
            "{quotes[idx]?.text}"
          </blockquote>

          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(5,15,40,0.55)" }}>
            {quotes[idx]?.author}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: GOLD, letterSpacing: "0.1em", marginTop: "5px" }}>
            {quotes[idx]?.city}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "44px" }}>
            {quotes.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px" }}>
                <div
                  style={{
                    width: i === idx ? "40px" : "10px",
                    height: "1px",
                    backgroundColor: i === idx ? GOLD : "rgba(5,15,40,0.16)",
                    transition: "all 0.45s ease",
                  }}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`
        @keyframes fadeQ { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

// ─── 6. FINAL CTA ────────────────────────────────────────────────────────────
function FinalCTA() {
  const { t: tLang } = useLang();
  const scrollY = useScrollY();
  const { home } = useContent();
  const t = useT();

  return (
    <section
      style={{
        position: "relative",
        height: "88vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: DARK,
      }}
    >
      {/* Parallax background with subtle zoom */}
      <div
        style={{
          position: "absolute",
          inset: "-12%",
          transform: `translateY(${Math.min(scrollY * 0.04, 80)}px) scale(1.08)`,
          willChange: "transform"
        }}
      >
        <img
          src={home.finalCtaImg}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block" }}
        />
      </div>

      {/* Dark editorial overlay — premium hotel feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(5,15,40,0.55) 0%, rgba(5,15,40,0.62) 100%)",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,15,40,0.5) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 6vw", width: "100%" }}>
        <Reveal delay={0} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {/* Main heading */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px, 5.5vw, 72px)",
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 1.05,
              margin: "0 0 52px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textAlign: "center",
              fontStyle: "normal",
            }}
          >
            {t("home.finalCtaTitle1", home.finalCtaTitle1)}
            <br />
            <span style={{ color: GOLD, fontWeight: 300, fontStyle: "normal" }}>{t("home.finalCtaTitle2", home.finalCtaTitle2)}</span>
          </h2>

          {/* Large round arrow button */}
          <Link
            to="/rezervasyon"
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "50%",
              border: `1.5px solid rgba(219,190,140,0.7)`,
              backgroundColor: "rgba(219,190,140,0.08)",
              backdropFilter: "blur(12px)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
              animation: "ctaPulse 3s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#ffffff";
              el.style.transform = "scale(1.09)";
              el.style.boxShadow = "0 16px 40px rgba(255,255,255,0.2)";
              el.style.borderColor = "#ffffff";
              el.style.animationPlayState = "paused";
              const arrow = el.querySelector("svg") as SVGElement;
              if (arrow) arrow.style.color = DARK;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "rgba(219,190,140,0.08)";
              el.style.transform = "scale(1)";
              el.style.boxShadow = "none";
              el.style.borderColor = "rgba(219,190,140,0.7)";
              el.style.animationPlayState = "running";
              const arrow = el.querySelector("svg") as SVGElement;
              if (arrow) arrow.style.color = GOLD;
            }}
          >
            <ArrowRight size={26} color={GOLD} strokeWidth={1.5} style={{ transition: "color 0.3s ease" }} />
          </Link>
        </Reveal>
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(219,190,140,0.4); }
          60% { box-shadow: 0 0 0 16px rgba(219,190,140,0); }
        }
      `}</style>
    </section>
  );
}

// ─── ABOUT TEASER ────────────────────────────────────────────────────────────
function AboutTeaser() {
  const { lang } = useLang();
  const { home } = useContent();
  const t = useT();

  const c = {
    eyebrow: t("about.label", "HAKKIMIZDA"),
    title: t("home.aboutTeaserTitle", home.aboutTeaserTitle),
    titleItalic: t("home.aboutTeaserTitleAccent", home.aboutTeaserTitleAccent),
    desc: t("home.aboutTeaserDesc", home.aboutTeaserDesc),
    cta: t("about.cta", "HİKAYEMİZİ KEŞFEDİN"),
    stat1n: home.aboutTeaserStat1n, stat1l: t("home.aboutTeaserStat1l", home.aboutTeaserStat1l),
    stat2n: home.aboutTeaserStat2n, stat2l: t("home.aboutTeaserStat2l", home.aboutTeaserStat2l),
  };

  return (
    <section style={{ backgroundColor: CREAM, padding: "120px 6vw" }}>
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="about-teaser-grid"
      >
        {/* Left: text */}
        <Reveal delay={0}>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 4vw, 56px)",
              fontWeight: 300,
              color: DARK,
              lineHeight: 1.1,
              margin: "0 0 28px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {c.title}
            <br />
            <span style={{ color: GOLD }}>{c.titleItalic}</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 2, color: "rgba(5,15,40,0.55)", marginBottom: "40px", maxWidth: "380px" }}>
            {c.desc}
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "48px", marginBottom: "44px" }}>
            {[{ n: c.stat1n, l: c.stat1l }, { n: c.stat2n, l: c.stat2l }].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 300, color: GOLD, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.22em", color: "rgba(5,15,40,0.4)", textTransform: "uppercase", marginTop: "5px" }}>{s.l}</div>
              </div>
            ))}
          </div>

          <Link
            to="/hakkimizda"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: DARK,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "3px",
              borderBottom: `1px solid ${GOLD}`,
            }}
          >
            {c.cta} <ArrowRight size={11} />
          </Link>
        </Reveal>

        {/* Right: image */}
        <Reveal delay={0.2}>
          <div style={{ position: "relative" }}>
            <img
              src={home.aboutTeaserImg}
              alt="About Teymur Continental"
              style={{ width: "100%", display: "block", objectFit: "cover", height: "540px" }}
            />
            {/* Gold accent block */}
            <div
              style={{
                position: "absolute",
                bottom: "-28px",
                right: "-28px",
                backgroundColor: GOLD,
                padding: "28px 36px",
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "44px", fontWeight: 600, color: DARK, lineHeight: 1 }}>5★</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.18em", color: DARK, textTransform: "uppercase", marginTop: "5px", whiteSpace: "nowrap" }}>
                {lang === "ar" ? "فندق" : lang === "en" ? "Hotel" : "Otel"}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-teaser-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
function LuxuryDivider({ bg = "#ffffff" }: { bg?: string }) {
  return (
    <div style={{ backgroundColor: bg, padding: "72px 6vw 0", display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ flex: 1, height: "1px", background: "rgba(219,190,140,0.12)" }} />
      <div style={{ width: "4px", height: "4px", border: "1px solid rgba(219,190,140,0.3)", transform: "rotate(45deg)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: "1px", background: "rgba(219,190,140,0.12)" }} />
    </div>
  );
}

// ─── PAGE COMPOSITION ────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <Hero />
      <div style={{ height: "80px", backgroundColor: "#f5f2ed" }} />
      <RoomsPreview />
      <LuxuryDivider bg="#f5f2ed" />
      
      <ExperienceCinematicSlider />
      <AboutTeaser />
      <GallerySection />
      <Experience360 />
      <Testimonials />
      <FinalCTA />

      <style>{`
        @media (max-width: 600px) {
          .gallery-track { padding-left: 0 !important; padding-right: 0 !important; gap: 0 !important; }
          .gallery-item { width: 100vw !important; height: 72vw !important; }
        }
        main > div > section:last-child { padding-bottom: 80px; }
        @media (max-width: 900px) { main > div > section:last-child { padding-bottom: 0; } }
      `}</style>
    </div>
  );
}
