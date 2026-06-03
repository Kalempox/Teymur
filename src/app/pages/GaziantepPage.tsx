import { useState, useEffect, useRef } from "react";

import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent, useT } from "../context/ContentContext";

function HeroSlider() {
  const { gaziantep } = useContent();
  const HERO_IMGS = gaziantep.heroImgs;
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timer.current = setInterval(() => setIdx(p => (p + 1) % HERO_IMGS.length), 5000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);
  return (
    <>
      {HERO_IMGS.map((src, i) => (
        <img key={i} src={src} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? "scale(1.04)" : "scale(1)",
          transition: "opacity 1s ease, transform 6s ease",
        }} />
      ))}
      <div style={{ position: "absolute", bottom: "36px", right: "64px", display: "flex", gap: "8px", zIndex: 3 }}>
        {HERO_IMGS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
            <div style={{ width: i === idx ? "28px" : "7px", height: "1.5px", backgroundColor: i === idx ? "#fff" : "rgba(255,255,255,0.45)", transition: "all 0.35s ease", borderRadius: "1px" }} />
          </button>
        ))}
      </div>
    </>
  );
}

const GOLD = "#dbbe8c";
const DARK = "#050f28";


const gastronomy = [
  { name: "Baklava", desc: "Fıstıklı, cevizli, antepli — dünyaca ünlü tatlının en otantik versiyonu" },
  { name: "Beyran Çorbası", desc: "Sabahın erken saatlerinde tüketilen, kuzu eti ve pirinçten yapılan güçlü çorba" },
  { name: "Lahmacun", desc: "İnce hamur üzerine yayılan baharatlı kıyma harciyle Antep'e özgü lezzet" },
  { name: "Katmer", desc: "'Sabahçı katmeri' olarak bilinen, fıstık ve kaymakla hazırlanan özel hamur işi" },
  { name: "Fıstıklı Sarma", desc: "İç Antep fıstığı ile hazırlanan sarma — tatlıların kraliçesi" },
  { name: "Ali Nazik Kebabı", desc: "Közlenmiş patlıcan üzerine yoğurt ve kıyma harciyle servis edilen imzalı kebap" },
];

// ── SpaHamam tarzı staggered mosaic ──────────────────────────────────────────
function GzMosaic({ cols }: { cols: { imgs: { src: string; h: number }[] }[] }) {
  return (
    <div className="spa-mosaic" style={{ display: "flex", alignItems: "center", gap: "24px", width: "100%" }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          {col.imgs.map((img, ii) => (
            <div key={ii} className="spa-mosaic-img" style={{ height: img.h, overflow: "hidden", flexShrink: 0 }}>
              <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)" }}
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

// ── Metin bloğu (her panel altında) ──────────────────────────────────────────
function ItemInfo({ a, side = false }: { a: typeof attractions[0]; side?: boolean }) {
  return (
    <div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "8px" }}>
        {a.category}
      </div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: side ? "clamp(16px,1.4vw,22px)" : "clamp(20px,2vw,28px)", fontWeight: 400, color: DARK, margin: "0 0 10px", lineHeight: 1.2 }}>
        {a.title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Clock size={12} color={GOLD} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(5,15,40,0.5)" }}>{a.period}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <MapPin size={12} color={GOLD} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(5,15,40,0.5)" }}>{a.distance}</span>
        </div>
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: side ? "12px" : "13px", lineHeight: 1.75, color: "rgba(5,15,40,0.6)", margin: 0 }}>
        {a.desc}
      </p>
    </div>
  );
}

// ── SixSenses tarzı gezilecek yerler galerisi ─────────────────────────────────
function PlacesGallery() {
  const { gaziantep } = useContent();
  const t = useT();
  const attractions = gaziantep.attractions.map((a, i) => ({
    ...a,
    title: t(`gz.att${i}.title`, a.title),
    category: t(`gz.att${i}.category`, a.category),
    period: t(`gz.att${i}.period`, a.period),
    distance: t(`gz.att${i}.distance`, a.distance),
    desc: t(`gz.att${i}.desc`, a.desc),
  }));
  const [current, setCurrent] = useState(0);
  const [leftMouse,  setLeftMouse]  = useState<{x:number;y:number}|null>(null);
  const [rightMouse, setRightMouse] = useState<{x:number;y:number}|null>(null);
  const touchX = { current: 0 };
  const LEN = attractions.length;
  const prevIdx = (current - 1 + LEN) % LEN;
  const nextIdx = (current + 1) % LEN;
  const item = attractions[current];

  const track = (e: React.MouseEvent<HTMLDivElement>, setter: (v:{x:number;y:number})=>void) => {
    const r = e.currentTarget.getBoundingClientRect();
    setter({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const GAP = 12;
  const COLS = "1fr 1fr 1fr";

  return (
    <div>
      {/* Desktop: 3-column görsel strip */}
      <div className="gz-gallery-desktop" style={{ display: "grid", gridTemplateColumns: COLS, gap: `${GAP}px`, height: "480px", paddingLeft: "40px", paddingRight: "40px" }}>

        {/* Sol — prev */}
        <div onClick={() => setCurrent(prevIdx)}
          onMouseMove={e => track(e, setLeftMouse)}
          onMouseLeave={() => setLeftMouse(null)}
          style={{ overflow: "hidden", position: "relative", cursor: "none" }}>
          <img src={attractions[prevIdx].img} alt="prev"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {leftMouse && (
            <div style={{ position: "absolute", left: leftMouse.x, top: leftMouse.y, transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 5 }}>
              <ChevronLeft size={40} color="#fff" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Orta — current */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          {attractions.map((a, i) => (
            <img key={i} src={a.img} alt={a.title} style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", display: "block",
              opacity: i === current ? 1 : 0, transition: "opacity 0.6s ease",
            }} />
          ))}
        </div>

        {/* Sağ — next */}
        <div onClick={() => setCurrent(nextIdx)}
          onMouseMove={e => track(e, setRightMouse)}
          onMouseLeave={() => setRightMouse(null)}
          style={{ overflow: "hidden", position: "relative", cursor: "none" }}>
          <img src={attractions[nextIdx].img} alt="next"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {rightMouse && (
            <div style={{ position: "absolute", left: rightMouse.x, top: rightMouse.y, transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 5 }}>
              <ChevronRight size={40} color="#fff" strokeWidth={1.5} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile: tek görsel tam ekran */}
      <div className="gz-gallery-mobile"
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = touchX.current - e.changedTouches[0].clientX;
          if (diff > 40) setCurrent(nextIdx);
          if (diff < -40) setCurrent(prevIdx);
        }}
        style={{ display: "none", position: "relative", width: "100%", height: "72vw", overflow: "hidden" }}
      >
        {attractions.map((a, i) => (
          <img key={i} src={a.img} alt={a.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: i === current ? 1 : 0, transition: "opacity 0.5s ease" }} />
        ))}
        <button onClick={() => setCurrent(prevIdx)} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 5, width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronLeft size={16} color={DARK} />
        </button>
        <button onClick={() => setCurrent(nextIdx)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 5, width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronRight size={16} color={DARK} />
        </button>
      </div>

      {/* Metin strip — aynı grid, görsellerle piksel piksel hizalı */}
      <div className="gz-gallery-caption" style={{ display: "grid", gridTemplateColumns: COLS, gap: `${GAP}px`, marginTop: "24px", paddingLeft: "40px", paddingRight: "40px" }}>

        {/* Sol metin */}
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent(prevIdx)}>
          <ItemInfo a={attractions[prevIdx]} side />
        </div>

        {/* Orta metin + dots */}
        <div>
          <ItemInfo a={item} />
          <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
            {attractions.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 3px" }}>
                <div style={{ width: i === current ? "28px" : "7px", height: "1.5px", backgroundColor: i === current ? DARK : "rgba(0,0,0,0.2)", transition: "all 0.35s ease", borderRadius: "1px" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Sağ metin */}
        <div style={{ cursor: "pointer" }} onClick={() => setCurrent(nextIdx)}>
          <ItemInfo a={attractions[nextIdx]} side />
        </div>
      </div>
    </div>
  );
}

export function GaziantepPage() {
  const { gaziantep: gz } = useContent();
  const t = useT();
  // Apply translations to all text fields
  const gzT = {
    ...gz,
    heroTitle: t("gzT.heroTitle", gzT.heroTitle),
    heroSubtitle: t("gzT.heroSubtitle", gzT.heroSubtitle),
    introTitle: t("gzT.introTitle", gzT.introTitle),
    introDesc: t("gzT.introDesc", gzT.introDesc),
    gastronomyLabel: t("gzT.gastronomyLabel", gzT.gastronomyLabel),
    gastronomyTitle: t("gzT.gastronomyTitle", gzT.gastronomyTitle),
    gastronomyDesc: t("gzT.gastronomyDesc", gzT.gastronomyDesc),
    baklavaLabel: t("gzT.baklavaLabel", gzT.baklavaLabel),
    baklavaTitle: t("gzT.baklavaTitle", gzT.baklavaTitle),
    baklavaDesc: t("gzT.baklavaDesc", gzT.baklavaDesc),
    attractionsTitle: t("gzT.attractionsTitle", gzT.attractionsTitle),
    attractions: gzT.attractions.map((a, i) => ({
      ...a,
      title: t(`gz.att${i}.title`, a.title),
      category: t(`gz.att${i}.category`, a.category),
      period: t(`gz.att${i}.period`, a.period),
      distance: t(`gz.att${i}.distance`, a.distance),
      desc: t(`gz.att${i}.desc`, a.desc),
    })),
    stats: gzT.stats,
  };

  return (
    <div>

      {/* ── HERO — fixed, slider ── */}
      <section style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 0, overflow: "hidden", background: "#111" }}>
        <HeroSlider />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,15,40,0.15) 0%, rgba(5,15,40,0.6) 100%)" }} />
        <div style={{ position: "absolute", bottom: "80px", left: "clamp(24px, 4vw, 64px)", zIndex: 2 }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(42px, 5vw, 68px)",
            fontWeight: 400, color: "#ffffff",
            margin: "0 0 16px", lineHeight: 1.05,
            letterSpacing: "0.02em", textTransform: "uppercase",
          }}>
            {gzT.heroTitle}
          </h1>
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: "14px",
            lineHeight: 1.75, color: "rgba(255,255,255,0.65)",
            maxWidth: "450px", margin: 0,
          }}>
            {gzT.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: "100vh" }} />

      {/* ── İÇERİK — slide-over ── */}
      <div style={{ position: "relative", zIndex: 1, background: "#ffffff", overflowX: "clip" }}>

      {/* Intro + Stats — 2 sütun */}
      <section className="gz-intro-section" style={{ padding: "100px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="gz-2col">

          {/* Sol: metin */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: DARK, lineHeight: 1.2, marginBottom: "28px" }}>
              {gzT.introTitle}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.9, color: "rgba(5,15,40,0.6)", margin: 0 }}>
              {gzT.introDesc}
            </p>
          </div>

          {/* Sağ: istatistikler 2×2 */}
          <div className="gz-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "52px 80px", paddingLeft: "100px" }}>
            {gzT.stats.map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(26px, 2.6vw, 38px)", fontWeight: 700, color: DARK, lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginTop: "10px" }}>{label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── GASTRONOMİ BÖLÜMİ — SpaHamam Section 1 tarzı ── */}
      <section className="spa-section" style={{ background: "#f9f8f5", padding: "100px 64px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "48px", alignItems: "flex-start", maxWidth: "1400px", margin: "0 auto" }} className="spa-outer-grid">

          {/* Sol: sticky metin */}
          <div className="spa-text-col" style={{ position: "sticky", top: "120px" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: "16px" }}>
              {gzT.gastronomyLabel}
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 2.6vw, 40px)", fontWeight: 400, color: DARK, margin: "0 0 24px", lineHeight: 1.12, textTransform: "uppercase" }}>
              {gzT.gastronomyTitle}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.9, color: "#5a4a3a", margin: "0 0 40px" }}>
              {gzT.gastronomyDesc}
            </p>
          </div>

          {/* Sağ: 5 görsel mosaic — Teymur yemek görselleri */}
          <GzMosaic cols={[
            { imgs: [
              { src: gz.gastronomyImgs[0] ?? "", h: 560 },
              { src: gz.gastronomyImgs[1] ?? "", h: 264 },
              { src: gz.gastronomyImgs[2] ?? "", h: 524 },
            ]},
            { imgs: [
              { src: gz.gastronomyImgs[3] ?? "", h: 560 },
              { src: gz.gastronomyImgs[4] ?? "", h: 420 },
            ]},
          ]} />
        </div>
      </section>

      {/* ── BAKLAVA BÖLÜMİ — SpaHamam Section 2 tarzı (ters) ── */}
      <section className="spa-section" style={{ background: "#ffffff", padding: "100px 64px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: "48px", alignItems: "flex-start", maxWidth: "1400px", margin: "0 auto" }} className="spa-outer-grid spa-img-first">

          {/* Sol: mosaic */}
          <GzMosaic cols={[
            { imgs: [
              { src: gz.baklavaImgs[0] ?? "", h: 590 },
              { src: gz.baklavaImgs[1] ?? "", h: 264 },
            ]},
            { imgs: [
              { src: gz.baklavaImgs[2] ?? "", h: 524 },
            ]},
          ]} />

          {/* Sağ: sticky metin */}
          <div className="spa-text-col" style={{ position: "sticky", top: "120px" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: "16px" }}>
              {gzT.baklavaLabel}
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 2.6vw, 40px)", fontWeight: 400, color: DARK, margin: "0 0 24px", lineHeight: 1.12, textTransform: "uppercase" }}>
              {gzT.baklavaTitle}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.9, color: "#5a4a3a", margin: 0 }}>
              {gzT.baklavaDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Attractions — SixSenses galeri */}
      <section style={{ padding: "100px 0 80px", width: "100%", boxSizing: "border-box" }}>
        <div style={{ padding: "0 40px", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: DARK, margin: 0 }}>
            {gzT.attractionsTitle}
          </h2>
        </div>
        <PlacesGallery />
      </section>


      <style>{`
        @media (max-width: 1024px) {
          .spa-outer-grid { grid-template-columns: 1fr !important; padding: 60px 32px 40px !important; }
        }
        @media (max-width: 768px) {
          .gz-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .gz-intro-section { padding: 60px 20px !important; overflow: hidden !important; }
          .gz-stats-grid { padding-left: 0 !important; gap: 32px 40px !important; }
        }
        @media (max-width: 640px) {
          /* Section padding kaldır */
          .spa-section { padding-left: 0 !important; padding-right: 0 !important; overflow: hidden !important; }
          .spa-outer-grid { padding: 20px 0 32px !important; gap: 0 !important; }

          /* Ters sıralı: metin önce, görsel sonra */
          .spa-img-first { display: flex !important; flex-direction: column !important; }
          .spa-img-first .spa-text-col { order: 1 !important; padding: 20px 20px 16px !important; }
          .spa-img-first .spa-mosaic   { order: 2 !important; }

          /* Sticky kaldır */
          .spa-text-col { position: static !important; }
          .spa-outer-grid > div[style*="sticky"] { position: static !important; }

          /* Metin padding */
          .spa-outer-grid > div:not(.spa-mosaic) { padding-left: 20px !important; padding-right: 20px !important; }

          /* Mosaic → yatay swipeable */
          .spa-mosaic {
            display: flex !important; flex-direction: row !important;
            overflow-x: scroll !important; scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 0 !important; width: 100vw !important; scrollbar-width: none !important;
          }
          .spa-mosaic::-webkit-scrollbar { display: none; }
          .spa-mosaic > div { flex: none !important; display: flex !important; flex-direction: row !important; gap: 0 !important; }
          .spa-mosaic-img {
            flex: none !important; width: 100vw !important;
            height: 70vw !important; scroll-snap-align: start !important;
            margin: 0 !important; padding: 0 16px !important; box-sizing: border-box !important;
          }

          /* PlacesGallery: masaüstü gizle, mobil göster */
          .gz-gallery-desktop { display: none !important; }
          .gz-gallery-mobile  { display: block !important; }
          .gz-gallery-caption { grid-template-columns: 1fr !important; padding: 0 20px !important; }
          .gz-gallery-caption > div:not(:first-child) { display: none !important; }
        }
      `}</style>
      </div>{/* içerik wrapper kapanış */}
    </div>
  );
}
