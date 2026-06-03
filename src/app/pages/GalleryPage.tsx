import { useState, useEffect, useCallback } from "react";
import { useContent } from "../context/ContentContext";

const DARK  = "#1c1209";
const GOLD  = "#c0a882";
const WHITE = "#ffffff";

const ROOM  = "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/";
const PROD  = "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/original/";
const GAL   = "https://www.teymurcontinentalhotel.com/panel/uploads/galleries_v/images/galeri/";

interface Img { src: string; cat: string; }
interface Vid { thumb: string; embedId: string; title: string; }

// Balanced mix: every group of 3 has one portrait(460+), one landscape(260-280), one medium(340-380)
// CSS columns fills col1 first, then col2, col3 — so grouping by 3 controls per-column look
const H = [
  460, 270, 360,   // col1:tall  col2:short  col3:medium
  280, 380, 460,   // col1:short col2:medium col3:tall
  370, 460, 270,   // col1:med   col2:tall   col3:short
  460, 280, 370,   // col1:tall  col2:short  col3:medium
  270, 370, 460,   // col1:short col2:medium col3:tall
  380, 460, 280,   // col1:med   col2:tall   col3:short
  460, 270, 380,   // col1:tall  col2:short  col3:medium
  280, 380, 460,   // col1:short col2:medium col3:tall
];

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-ri]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; },
            parseInt(el.dataset.delay ?? "0"));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.04 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [dep]);
}

// ── Photo Item ────────────────────────────────────────────────────────────────
function PhotoItem({ src, h, delay, onClick }: { src: string; h: number; delay: number; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div data-ri data-delay={String(delay)} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        breakInside: "avoid", marginBottom: "8px",
        height: `${h}px`, overflow: "hidden",
        cursor: "zoom-in", position: "relative",
        opacity: 0, transform: "translateY(18px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      <img src={src} alt="" loading="lazy"
        onError={e => { (e.currentTarget.closest("[data-ri]") as HTMLElement).style.display = "none"; }}
        style={{
          width: "100%", height: "100%", display: "block", objectFit: "cover",
          transform: hov ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: hov ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)",
        transition: "background 0.3s ease",
      }} />
    </div>
  );
}

// ── Video Item ────────────────────────────────────────────────────────────────
function VideoItem({ vid, delay, onClick }: { vid: Vid; delay: number; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div data-ri data-delay={String(delay)} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        breakInside: "avoid", marginBottom: "8px",
        height: "320px", overflow: "hidden",
        cursor: "pointer", position: "relative",
        opacity: 0, transform: "translateY(18px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      <img src={vid.thumb} alt="" loading="lazy"
        style={{
          width: "100%", height: "100%", display: "block", objectFit: "cover",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s ease",
          filter: "brightness(0.75)",
        }}
      />
      {/* Play button */}
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "12px",
      }}>
        <div style={{
          width: "60px", height: "60px", borderRadius: "50%",
          background: hov ? "rgba(192,168,130,0.95)" : "rgba(255,255,255,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.25s",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}>
          <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `18px solid ${hov ? WHITE : DARK}`, marginLeft: "4px", transition: "border-left-color 0.25s" }} />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function GalleryPage() {
  const { gallery } = useContent();
  const PHOTOS: Img[] = gallery.photos;
  const VIDEOS: Vid[] = gallery.videos;

  const [tab, setTab]     = useState<"Galeri" | "Video">("Galeri");
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [lbOp, setLbOp]   = useState(1);
  const [vidOpen, setVidOpen] = useState<Vid | null>(null);

  useReveal(tab);

  const open  = (i: number) => { setLbOp(1); setLbIdx(i); };
  const close = useCallback(() => setLbIdx(null), []);

  const nav = useCallback((dir: 1 | -1) => {
    if (lbIdx === null) return;
    setLbOp(0);
    setTimeout(() => {
      setLbIdx(prev => prev === null ? null : (prev + dir + PHOTOS.length) % PHOTOS.length);
      setLbOp(1);
    }, 160);
  }, [lbIdx]);

  useEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  nav(-1);
      if (e.key === "ArrowRight") nav(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lbIdx, close, nav]);

  useEffect(() => {
    if (vidOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [vidOpen]);

  const cur = lbIdx !== null ? PHOTOS[lbIdx] : null;

  return (
    <div style={{ background: "#f9f8f5", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ position: "relative", height: "72vh", overflow: "hidden" }}>
        <img src={gallery.heroImg} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,18,9,0.75) 0%, rgba(28,18,9,0.18) 60%)" }} />
        <div style={{ position: "absolute", bottom: "48px", left: "64px" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(42px,5vw,68px)", fontWeight: 400, color: WHITE, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>
            {gallery.heroTitle}
          </h1>
        </div>
      </div>

      {/* Galeri / Video tabs — rezervasyon buton stili */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", padding: "40px 64px 32px" }}>
        {(["Galeri", "Video"] as const).map(t => {
          const active = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "0 48px", height: "52px",
              fontFamily: "Inter,sans-serif", fontSize: "14px",
              letterSpacing: "0.04em", textTransform: "uppercase",
              border: active ? "none" : `1px solid ${DARK}`,
              borderRadius: 0, cursor: "pointer",
              background: active ? "rgb(219,190,140)" : "transparent",
              color: active ? DARK : DARK,
              transition: "all 0.25s", outline: "none",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              {t}
            </button>
          );
        })}
      </div>

      {/* ── PHOTO GRID ── */}
      {tab === "Galeri" && (
        <div style={{ padding: "0 40px 100px", maxWidth: "1520px", margin: "0 auto", columns: "3", columnGap: "8px" }} className="gal-grid">
          {PHOTOS.map((img, i) => (
            <PhotoItem key={img.src} src={img.src} h={H[i % H.length]} delay={(i % 3) * 90} onClick={() => open(i)} />
          ))}
        </div>
      )}

      {/* ── VIDEO GRID ── */}
      {tab === "Video" && (
        <div style={{ padding: "0 40px 100px", maxWidth: "1520px", margin: "0 auto", columns: "3", columnGap: "8px" }} className="gal-grid">
          {VIDEOS.map((v, i) => (
            <VideoItem key={v.embedId + i} vid={v} delay={i * 120} onClick={() => setVidOpen(v)} />
          ))}
        </div>
      )}

      {/* ── PHOTO LIGHTBOX ── */}
      {lbIdx !== null && cur && (
        <div onClick={close} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ position: "absolute", top: "22px", left: "28px", fontFamily: "Inter,sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", userSelect: "none" }}>
            {lbIdx + 1} / {PHOTOS.length}
          </div>
          <button onClick={close} style={{ position: "absolute", top: "14px", right: "22px", background: "none", border: "none", color: WHITE, fontSize: "38px", cursor: "pointer", lineHeight: 1, padding: "4px 8px" }}>×</button>
          <button onClick={e => { e.stopPropagation(); nav(-1); }} style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: WHITE, fontSize: "28px", cursor: "pointer", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>‹</button>
          <button onClick={e => { e.stopPropagation(); nav(1); }} style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: WHITE, fontSize: "28px", cursor: "pointer", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>›</button>
          <img src={cur.src} alt="" onClick={e => e.stopPropagation()} style={{ width: "min(84vw, 1200px)", height: "auto", maxHeight: "90vh", objectFit: "contain", display: "block", opacity: lbOp, transition: "opacity 0.16s ease", boxShadow: "0 16px 80px rgba(0,0,0,0.7)" }} />
        </div>
      )}

      {/* ── VIDEO LIGHTBOX ── */}
      {vidOpen && (
        <div onClick={() => setVidOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setVidOpen(null)} style={{ position: "absolute", top: "14px", right: "22px", background: "none", border: "none", color: WHITE, fontSize: "38px", cursor: "pointer", lineHeight: 1, padding: "4px 8px" }}>×</button>
          <div onClick={e => e.stopPropagation()} style={{ width: "min(90vw, 1100px)", aspectRatio: "16/9" }}>
            <iframe
              src={`https://www.youtube.com/embed/${vidOpen.embedId}?autoplay=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px)  { .gal-grid { columns: 2 !important; padding: 0 32px 80px !important; } }
        @media (max-width: 540px)  { .gal-grid { columns: 1 !important; padding: 0 16px 60px !important; } }
      `}</style>
    </div>
  );
}
