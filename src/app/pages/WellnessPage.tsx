import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Wind, Droplets, Dumbbell, Heart, Users, Clock, Leaf, Flame } from "lucide-react";
import { useContent } from "../context/ContentContext";

const BG   = "#f9f9f9";
const DARK = "#1c1209";
const MID  = "#5a4a3a";

const FEATURES = [
  { icon: <Droplets size={22} color={DARK} strokeWidth={1.3} />, label: "TÜRK HAMAMI" },
  { icon: <Leaf size={22} color={DARK} strokeWidth={1.3} />, label: "AROMATERAPİ" },
  { icon: <Flame size={22} color={DARK} strokeWidth={1.3} />, label: "SAUNA & BUHAR" },
  { icon: <Heart size={22} color={DARK} strokeWidth={1.3} />, label: "MASAJ TERAPİSİ" },
  { icon: <Dumbbell size={22} color={DARK} strokeWidth={1.3} />, label: "FITNESS MERKEZİ" },
  { icon: <Users size={22} color={DARK} strokeWidth={1.3} />, label: "GRUP DERSLERİ" },
  { icon: <Wind size={22} color={DARK} strokeWidth={1.3} />, label: "KLİMA SİSTEMİ" },
  { icon: <Clock size={22} color={DARK} strokeWidth={1.3} />, label: "07:00–22:00" },
];

// ─── Six Senses galeri ────────────────────────────────────────────────────────
function SixSensesGallery() {
  const { wellness } = useContent();
  const GALLERY_ITEMS = wellness.galleryItems;
  const [current, setCurrent] = useState(0);
  const [leftMouse,  setLeftMouse]  = useState<{x:number;y:number}|null>(null);
  const [rightMouse, setRightMouse] = useState<{x:number;y:number}|null>(null);
  const touchX = { current: 0 };
  const LEN = GALLERY_ITEMS.length;
  const prevIdx = (current - 1 + LEN) % LEN;
  const nextIdx = (current + 1) % LEN;
  const item = GALLERY_ITEMS[current];

  const trackMouse = (e: React.MouseEvent<HTMLDivElement>, setter: (v:{x:number;y:number})=>void) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setter({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (diff > 40)  setCurrent(nextIdx);
    if (diff < -40) setCurrent(prevIdx);
  };

  return (
    <div style={{ padding: "96px 0 0" }}>
      <div style={{ padding: "0 40px", marginBottom: "48px" }} className="wl-gallery-header">
        <h6 style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, textTransform: "uppercase", color: "#000", margin: "0 0 4px" }}>SPA & HAMAM</h6>
        <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "58px", fontWeight: 400, color: "#000", margin: 0, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0.03em" }}>GALERİ</h4>
      </div>

      {/* Desktop: 3-column */}
      <div className="wl-gallery-grid" style={{ display: "grid", gridTemplateColumns: "25% 50% 25%", gap: "12px", height: "520px" }}>
        <div className="wl-gallery-side" onClick={() => setCurrent(prevIdx)} onMouseMove={e => trackMouse(e, setLeftMouse)} onMouseLeave={() => setLeftMouse(null)} style={{ overflow: "hidden", position: "relative", height: "100%", cursor: "none" }}>
          <img src={GALLERY_ITEMS[prevIdx].img} alt="prev" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.55 }} />
          {leftMouse && <div style={{ position: "absolute", left: leftMouse.x, top: leftMouse.y, transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 5 }}><ChevronLeft size={40} color="#fff" strokeWidth={1.5} /></div>}
        </div>
        <div style={{ overflow: "hidden", position: "relative", height: "100%" }}>
          {GALLERY_ITEMS.map((gi, i) => (
            <img key={i} src={gi.img} alt={gi.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: i === current ? 1 : 0, transition: "opacity 0.6s ease" }} />
          ))}
        </div>
        <div className="wl-gallery-side" onClick={() => setCurrent(nextIdx)} onMouseMove={e => trackMouse(e, setRightMouse)} onMouseLeave={() => setRightMouse(null)} style={{ overflow: "hidden", position: "relative", height: "100%", cursor: "none" }}>
          <img src={GALLERY_ITEMS[nextIdx].img} alt="next" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.55 }} />
          {rightMouse && <div style={{ position: "absolute", left: rightMouse.x, top: rightMouse.y, transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 5 }}><ChevronRight size={40} color="#fff" strokeWidth={1.5} /></div>}
        </div>
      </div>

      {/* Mobile: full-screen swipeable */}
      <div className="wl-gallery-mobile"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ display: "none", position: "relative", width: "100%", height: "85vw", overflow: "hidden" }}
      >
        {GALLERY_ITEMS.map((gi, i) => (
          <img key={i} src={gi.img} alt={gi.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: i === current ? 1 : 0, transition: "opacity 0.5s ease" }} />
        ))}
        {/* Arrow buttons */}
        <button onClick={() => setCurrent(prevIdx)} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 5, width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronLeft size={18} color={DARK} />
        </button>
        <button onClick={() => setCurrent(nextIdx)} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", zIndex: 5, width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronRight size={18} color={DARK} />
        </button>
        {/* Dots */}
        <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 5 }}>
          {GALLERY_ITEMS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
              <div style={{ width: i === current ? "24px" : "6px", height: "1.5px", backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.3s ease", borderRadius: "1px" }} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: "28px", paddingLeft: "calc(25% + 12px)", paddingRight: "calc(25% + 12px)" }} className="wl-gallery-caption">
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "10px" }}>{item.category}</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 2.2vw, 34px)", fontWeight: 400, color: DARK, margin: "0 0 12px", lineHeight: 1.2 }}>{item.title}</h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.8, color: MID, margin: "0 0 28px", maxWidth: "520px" }}>{item.desc}</p>
        <div style={{ display: "flex", gap: "8px" }}>
          {GALLERY_ITEMS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 3px" }}>
              <div style={{ width: i === current ? "28px" : "7px", height: "1.5px", backgroundColor: i === current ? DARK : "rgba(0,0,0,0.2)", transition: "all 0.35s ease", borderRadius: "1px" }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Diğer Hizmetler kart (DiningDetailPage OtherCard ile aynı stil) ──────────
function ServiceCard({ service }: { service: typeof OTHER_SERVICES[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/saglik/${service.slug}`} style={{ display: "block", position: "relative", height: "440px", overflow: "hidden", textDecoration: "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <img src={service.img} alt={service.title} style={{
        width: "100%", height: "100%", objectFit: "cover", display: "block",
        transform: hov ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        filter: hov ? "brightness(0.55)" : "brightness(0.45)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 2.6vw, 40px)", fontWeight: 400, color: "#fff", margin: 0, letterSpacing: "0.03em", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
          {service.title}
        </h3>
      </div>
    </Link>
  );
}

// ─── Sayfa ────────────────────────────────────────────────────────────────────
export function WellnessPage() {
  const { wellness } = useContent();
  const OTHER_SERVICES = wellness.otherServices;

  return (
    <div style={{ background: BG, fontFamily: "Inter, sans-serif" }}>

      {/* HERO */}
      <section style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 0, overflow: "hidden", background: "#111" }}>
        <img src={wellness.heroImg} alt="Spa & Sağlık"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 52px", zIndex: 2, background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "55px", fontWeight: 400, color: "#fff", margin: "0 0 20px", lineHeight: 1.1, textTransform: "uppercase" }}>Spa & Hamam</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", maxWidth: "450px", margin: 0 }}>
            Türk hamamı, masaj terapileri, sauna ve kapalı havuzdan oluşan<br />eksiksiz bir sağlık ve dinlenme deneyimi.
          </p>
        </div>
      </section>

      <div style={{ height: "100vh" }} />

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, background: BG, padding: "125px 0 80px" }}>

        {/* Açıklama + Özellikler */}
        <div style={{ padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-start" }} className="wl-desc-grid">
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.85, color: MID, margin: "0 0 40px" }}>
                Teymur Continental Hotel Spa & Sağlık merkezi, yüzyıllık Osmanlı hamam geleneğini çağdaş tedavilerle bir araya getirerek misafirlerimize eşsiz bir iyileşme ve dinlenme deneyimi sunar. Uzman terapistlerimiz, size özel hazırlanmış programlarla beden ve ruhunuzu yenilemenize yardımcı olur. Kapalı yüzme havuzu, sauna, buhar odası ve fitness merkezi ile tam bir sağlık deneyimi sizi bekliyor.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <RezBtn />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "28px" }}>HİZMETLERİMİZ</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 16px", alignItems: "flex-start" }}>
                {FEATURES.map(f => (
                  <div key={f.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "96px" }}>
                    <div style={{ width: "64px", height: "64px", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0 }}>{f.icon}</div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#555", marginTop: "10px", textAlign: "center", lineHeight: 1.4 }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Galeri */}
        <SixSensesGallery />

        {/* Diğer Hizmetler — DiningDetailPage OtherCard ile aynı stil */}
        <div style={{ padding: "96px 40px 0" }}>
          <div style={{ marginBottom: "48px" }}>
            <h6 style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, textTransform: "uppercase", color: "#000", margin: "0 0 4px" }}>SAĞLIK MERKEZİ</h6>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "58px", fontWeight: 400, color: "#000", margin: 0, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0.03em" }}>DİĞER HİZMETLER</h4>
          </div>
          <div className="wl-other-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {OTHER_SERVICES.map(s => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) { .wl-desc-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        @media (max-width: 600px) {
          .wl-desc-grid { padding: 0 !important; }
          .wl-desc-grid p { font-size: 14px !important; }

          /* Galeri: masaüstü gizle, mobil göster */
          .wl-gallery-grid    { display: none !important; }
          .wl-gallery-mobile  { display: block !important; }
          .wl-gallery-header  { padding: 0 20px !important; }
          .wl-gallery-header h4 { font-size: 36px !important; }
          /* Altyazı: tam genişlik */
          .wl-gallery-caption {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          /* Diğer Hizmetler: tek sütun tam genişlik */
          .wl-other-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function RezBtn() {
  const [hov, setHov] = useState(false);
  return (
    <Link to="/rezervasyon" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, sans-serif", fontSize: "14px", letterSpacing: "0.04em", textTransform: "uppercase",
      color: hov ? "#fff" : DARK, background: hov ? DARK : "transparent",
      border: `1px solid ${DARK}`, padding: "0 48px", height: "52px",
      textDecoration: "none", transition: "all 0.25s ease",
    }}>REZERVASYON</Link>
  );
}
