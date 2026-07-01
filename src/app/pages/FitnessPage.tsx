import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";

const CREAM = "#fdf8f1";
const DARK  = "#1c1209";
const MID   = "#5a4a3a";
const GOLD  = "#c0a882";
const WHITE = "#ffffff";

const ORIG = "/panel/uploads/product_v/original/";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const d = parseInt(el.dataset.delay || "0");
            setTimeout(() => el.classList.add("spa-revealed"), d);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Gold filled button ─────────────────────────────────────────────────────────
function BtnGold({ to, label }: { to: string; label: string }) {
  const [hov, setHov] = React.useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Inter, sans-serif", fontSize: "14px",
        letterSpacing: "0.04em", textTransform: "uppercase",
        color: hov ? WHITE : DARK,
        background: hov ? "rgb(195,166,116)" : "rgb(219,190,140)",
        border: "none", padding: "0 48px", height: "52px",
        textDecoration: "none", transition: "all 0.25s ease",
      }}
    >
      {label}
    </Link>
  );
}

// ── Outlined button ────────────────────────────────────────────────────────────
function BtnOutline({ to, label }: { to: string; label: string }) {
  const [hov, setHov] = React.useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Inter, sans-serif", fontSize: "14px",
        letterSpacing: "0.04em", textTransform: "uppercase",
        color: hov ? WHITE : DARK,
        background: hov ? DARK : "transparent",
        border: `1px solid ${DARK}`, padding: "0 48px", height: "52px",
        textDecoration: "none", transition: "all 0.25s ease",
      }}
    >
      {label}
    </Link>
  );
}

// ── Staggered mosaic ──────────────────────────────────────────────────────────
function Mosaic({ cols }: { cols: { imgs: { src: string; h: number }[] }[] }) {
  return (
    <div className="spa-mosaic" style={{ display: "flex", alignItems: "center", gap: "24px", width: "100%" }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          {col.imgs.map((img, ii) => (
            <div key={ii} className="spa-mosaic-img" data-reveal data-delay={String((ci * 2 + ii) * 80 + 100)}
              style={{ height: img.h, overflow: "hidden", flexShrink: 0 }}>
              <img src={img.src} alt="" style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Hero Slider ────────────────────────────────────────────────────────────────
function HeroSlider() {
  const { fitness } = useContent();
  const HERO_IMGS = fitness.heroImgs;
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const go = (next: number) => setIdx((next + HERO_IMGS.length) % HERO_IMGS.length);

  useEffect(() => {
    timer.current = setInterval(() => go(idx + 1), 5000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [idx]);

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "clip", background: "#0a0705" }}>
      {HERO_IMGS.map((src, i) => (
        <img key={i} src={src} alt="Fitness" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? "scale(1.04)" : "scale(1)",
          transition: "opacity 1s ease, transform 6s ease",
        }} />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.6) 100%)" }} />

      <div style={{ position: "absolute", bottom: "80px", left: "64px", zIndex: 2 }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(42px, 5vw, 68px)",
          fontWeight: 400, color: WHITE,
          margin: 0, lineHeight: 1.05, letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}>
          {fitness.heroTitle}
        </h1>
      </div>

      <div style={{
        position: "absolute", bottom: "36px", right: "64px",
        display: "flex", gap: "8px", zIndex: 3,
      }}>
        {HERO_IMGS.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
            <div style={{
              width: i === idx ? "28px" : "7px", height: "1.5px",
              backgroundColor: i === idx ? WHITE : "rgba(255,255,255,0.45)",
              transition: "all 0.35s ease", borderRadius: "1px",
            }} />
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function FitnessPage() {
  useReveal();
  const { fitness } = useContent();
  const f0 = fitness.sections[0] ?? { label: "Fitness", title: "", desc: "", hours: "", imgs: [] };
  const f1 = fitness.sections[1] ?? { label: "", title: "", desc: "", hours: "", imgs: [] };

  return (
    <div style={{ background: CREAM, fontFamily: "Inter, sans-serif" }}>

      <HeroSlider />

      {/* ══ SECTION 1 — cream, text left / mosaic right ══ */}
      <section className="spa-section" style={{ background: CREAM, padding: "100px 64px 64px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "4fr 8fr",
          gap: "48px", maxWidth: "1400px", margin: "0 auto",
          alignItems: "flex-start",
        }} className="spa-outer-grid">

          <div style={{ position: "sticky", top: "120px" }}>
            <div data-reveal style={{
              fontFamily: "Inter, sans-serif", fontSize: "11px",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD, marginBottom: "16px",
            }}>
              {f0.label}
            </div>
            <h2 data-reveal data-delay="100" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 2.6vw, 40px)",
              fontWeight: 400, color: DARK,
              margin: "0 0 24px", lineHeight: 1.12, textTransform: "uppercase",
            }}>
              {f0.title}
            </h2>
            <p data-reveal data-delay="150" style={{
              fontSize: "14px", lineHeight: 1.85, color: MID, margin: "0 0 40px",
            }}>
              {f0.desc}
            </p>
            <div data-reveal data-delay="200" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
              <BtnGold to="/iletisim" label="PROGRAM AL" />
            </div>
            <div data-reveal data-delay="250">
              <div style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: MID, marginBottom: "10px" }}>
                Çalışma Saatleri
              </div>
              <div style={{ fontSize: "14px", color: DARK, marginBottom: "2px" }}>Pzt – Paz</div>
              <div style={{ fontSize: "14px", color: GOLD, fontWeight: 500 }}>07:00 – 22:00</div>
            </div>
          </div>

          <Mosaic cols={[
            { imgs: [
              { src: ORIG + "3.jpg", h: 560 },
              { src: ORIG + "6.jpg", h: 264 },
              { src: ORIG + "4.jpg", h: 524 },
            ]},
            { imgs: [
              { src: ORIG + "5.jpg", h: 560 },
              { src: ORIG + "11.jpg", h: 420 },
            ]},
          ]} />
        </div>
      </section>

      {/* ══ SECTION 2 — cream, mosaic left / text right ══ */}
      <section className="spa-section" style={{ background: WHITE, padding: "100px 64px 64px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "8fr 4fr",
          gap: "48px", maxWidth: "1400px", margin: "0 auto",
          alignItems: "flex-start",
        }} className="spa-outer-grid spa-img-first">

          <Mosaic cols={[
            { imgs: [
              { src: ORIG + "5.jpg", h: 590 },
              { src: ORIG + "4.jpg", h: 264 },
            ]},
            { imgs: [
              { src: ORIG + "3.jpg", h: 524 },
            ]},
          ]} />

          <div className="spa-text-col" style={{ position: "sticky", top: "120px" }}>
            <div data-reveal style={{
              fontSize: "11px", letterSpacing: "0.22em",
              textTransform: "uppercase", color: GOLD, marginBottom: "16px",
            }}>
              {f1.label}
            </div>
            <h2 data-reveal data-delay="100" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 2.6vw, 40px)",
              fontWeight: 400, color: DARK,
              margin: "0 0 24px", lineHeight: 1.12, textTransform: "uppercase",
            }}>
              Profesyonel<br />Ekipmanlar
            </h2>
            <p data-reveal data-delay="150" style={{
              fontSize: "14px", lineHeight: 1.85, color: MID, margin: "0 0 40px",
            }}>
              Technogym marka son teknoloji kardiyo aletleri, serbest ağırlıklar ve kablo makineleriyle donatılmış fitness merkezimiz, her seviyedeki sporcunun hedeflerine ulaşmasına yardımcı olur. Uzman personal trainer kadromuz sizinle birlikte programınızı oluşturur.
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — cream, text left / mosaic right ══ */}
      <section className="spa-section" style={{ background: CREAM, padding: "100px 64px 64px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "4fr 8fr",
          gap: "48px", maxWidth: "1400px", margin: "0 auto",
          alignItems: "flex-start",
        }} className="spa-outer-grid">

          <div style={{ position: "sticky", top: "120px", paddingLeft: "40px" }} className="spa-no-indent">
            <div data-reveal style={{
              fontSize: "11px", letterSpacing: "0.22em",
              textTransform: "uppercase", color: GOLD, marginBottom: "16px",
            }}>
              Grup Dersleri
            </div>
            <h2 data-reveal data-delay="100" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 2.6vw, 40px)",
              fontWeight: 400, color: DARK,
              margin: "0 0 24px", lineHeight: 1.12, textTransform: "uppercase",
            }}>
              Yoga &<br />Pilates
            </h2>
            <p data-reveal data-delay="150" style={{
              fontSize: "14px", lineHeight: 1.85, color: MID, margin: 0,
            }}>
              Uzman eğitmenler rehberliğinde yoga, pilates ve stretching dersleriyle beden ve zihin dengesini kurun. Küçük gruplarla yürütülen seanslarımız, her katılımcıya kişisel ilgi ve doğru teknik rehberliği sağlar.
            </p>
          </div>

          <Mosaic cols={[
            { imgs: [{ src: ORIG + "2.jpg", h: 380 }] },
            { imgs: [{ src: ORIG + "4.jpg", h: 500 }] },
          ]} />
        </div>
      </section>

      {/* ══ SECTION 4 — white, mosaic left / text right ══ */}
      <section className="spa-section" style={{ background: WHITE, padding: "100px 64px 64px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "8fr 4fr",
          gap: "48px", maxWidth: "1400px", margin: "0 auto",
          alignItems: "flex-start",
        }} className="spa-outer-grid spa-img-first">

          <Mosaic cols={[
            { imgs: [{ src: ORIG + "6.jpg", h: 500 }] },
            { imgs: [{ src: ORIG + "11.jpg", h: 340 }] },
          ]} />

          <div className="spa-text-col spa-no-indent" style={{ position: "sticky", top: "120px", paddingRight: "40px" }}>
            <div data-reveal style={{
              fontSize: "11px", letterSpacing: "0.22em",
              textTransform: "uppercase", color: GOLD, marginBottom: "16px",
            }}>
              Yüzme Havuzu
            </div>
            <h2 data-reveal data-delay="100" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 2.6vw, 40px)",
              fontWeight: 400, color: DARK,
              margin: "0 0 24px", lineHeight: 1.12, textTransform: "uppercase",
            }}>
              Kapalı<br />Havuz
            </h2>
            <p data-reveal data-delay="150" style={{
              fontSize: "14px", lineHeight: 1.85, color: MID, margin: "0 0 40px",
            }}>
              Sıcaklığı düzenlenmiş kapalı yüzme havuzumuzda yüzme, aqua aerobik ve su sporları programlarına katılın. Dinlendirici bir seanstan yoğun bir yüzme antrenmanına kadar havuzumuz her ihtiyacınıza uygun seçenekler sunar.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        [data-reveal].spa-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 1024px) {
          .spa-outer-grid { grid-template-columns: 1fr !important; padding: 80px 32px 48px !important; }
          .spa-no-indent { padding-left: 0 !important; padding-right: 0 !important; }
        }
        @media (max-width: 640px) {
          .spa-section { padding-left: 0 !important; padding-right: 0 !important; overflow: hidden !important; }
          .spa-outer-grid { padding: 20px 0 32px !important; gap: 0 !important; }

          /* Sıralama: metin önce, görsel sonra */
          .spa-img-first { display: flex !important; flex-direction: column !important; }
          .spa-img-first .spa-text-col { order: 1 !important; padding: 40px 20px 24px !important; }
          .spa-img-first .spa-mosaic   { order: 2 !important; }

          /* Sticky kaldır */
          .spa-outer-grid > div[style*="sticky"],
          .spa-text-col { position: static !important; }

          /* Metin kenar boşluğu */
          .spa-outer-grid > div:not(.spa-mosaic) { padding-left: 20px !important; padding-right: 20px !important; }

          /* Mosaic: yatay kaydırmalı, iki yanda boşluklu */
          .spa-mosaic {
            display: flex !important; flex-direction: row !important;
            overflow-x: scroll !important; scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 0 !important; width: 100vw !important; scrollbar-width: none !important;
          }
          .spa-mosaic::-webkit-scrollbar { display: none; }
          /* Her sütun: tam viewport genişliği (snap birimi) */
          .spa-mosaic > div {
            flex: none !important; display: flex !important;
            flex-direction: row !important; gap: 0 !important;
          }
          /* Her görsel: snap birimi içinde padding ile boşluk */
          .spa-mosaic-img {
            flex: none !important;
            width: 100vw !important;
            height: 70vw !important;
            scroll-snap-align: start !important;
            margin: 0 !important;
            padding: 0 16px !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </div>
  );
}
