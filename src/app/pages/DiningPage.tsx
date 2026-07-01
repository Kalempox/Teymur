import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

const WHITE  = "#ffffff";
const DARK   = "#1c1209";
const MID    = "#5a4a3a";
const MUTED  = "#999999";
const BASE   = "/panel/uploads/product_v/400x400/";

const venues = [
  {
    id: 1,
    slug: "sof-restaurant",
    title: "Sof Restaurant",
    tagline: "Gaziantep ve dünya mutfağı bir arada.",
    guests: "7/24",
    type: "À La Carte",
    feature: "Çocuk Oyun Alanı",
    desc: "Otelimiz bünyesinde bulunan Sof Restaurant, Gaziantep ve dünya mutfağını profesyonel bar hizmetiyle misafirlerine sunmaktadır. Aynı zamanda minik misafirlerimizin eğlenceye doyamadığı çocuk oyun alanı ile 7/24 hizmet sunmaktadır.",
    imgs: [BASE + "a-la-carte-ve-cocuk-2.jpg", BASE + "7.jpg"],
  },
  {
    id: 2,
    slug: "kahvalti",
    title: "Açık Büfe Kahvaltı",
    tagline: "Şehir manzarası eşliğinde sabah şöleni.",
    guests: "07:00 – 11:00",
    type: "Açık Büfe",
    feature: "Şehir Manzarası",
    desc: "Teymur Continental Hotel misafirleri için açık büfe kahvaltımız; çeşitliliği, lezzeti ve yöreselliğiyle 07.00 - 11.00 saatleri arasında şehir manzarası eşliğinde unutulmaz bir sabah şöleni sunuyor.",
    imgs: [BASE + "kahvalti--2.jpg", BASE + "6.jpg"],
  },
  {
    id: 3,
    slug: "bar-lounge",
    title: "Bar & Lounge",
    tagline: "Gece yarısı özel karışımlar ve seçkin içkiler.",
    guests: "18:00 – 01:00",
    type: "Bar",
    feature: "Canlı Müzik",
    desc: "Teymur Continental Hotel'in Bar & Lounge'ı, şık atmosferi ve geniş içecek menüsüyle unutulmaz akşamlar sunar. Özenle hazırlanmış kokteyller, seçkin şaraplar ve yerel lezzetlerle dolu bir deneyim için davetlisiniz.",
    imgs: [BASE + "7.jpg", BASE + "a-la-carte-ve-cocuk-2.jpg"],
  },
];

// ─── Carousel ─────────────────────────────────────────────────────────────────
function VenueCarousel({ imgs, title }: { imgs: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#d4cfc8" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {imgs.map((src, i) => (
        <img key={i} src={src} alt={title} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          opacity: idx === i ? 1 : 0,
          transform: idx === i && hov ? "scale(1.04)" : "scale(1)",
          transition: "opacity 0.7s ease, transform 1.2s cubic-bezier(0.22,1,0.36,1)",
        }} />
      ))}
      {imgs.length > 1 && (
        <>
          <button onClick={() => setIdx(p => Math.max(0, p - 1))} style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            zIndex: 4, width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(255,255,255,0.88)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", opacity: idx === 0 ? 0.3 : 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)", transition: "opacity 0.2s",
          }}>
            <ChevronLeft size={16} color={DARK} />
          </button>
          <button onClick={() => setIdx(p => Math.min(imgs.length - 1, p + 1))} style={{
            position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
            zIndex: 4, width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(255,255,255,0.88)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", opacity: idx === imgs.length - 1 ? 0.3 : 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)", transition: "opacity 0.2s",
          }}>
            <ChevronRight size={16} color={DARK} />
          </button>
          <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 4 }}>
            {imgs.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
                <div style={{ width: i === idx ? "20px" : "6px", height: "1.5px", backgroundColor: i === idx ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.3s ease", borderRadius: "1px" }} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Venue Card ───────────────────────────────────────────────────────────────
function VenueCard({ venue, reverse }: { venue: (typeof venues)[0]; reverse: boolean }) {
  const [hov, setHov] = useState(false);

  const textPanel = (
    <div className="venue-card-text" style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "56px 44px",
      backgroundColor: WHITE,
    }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(26px, 2.4vw, 38px)", fontWeight: 400,
        color: DARK, margin: "0 0 10px", lineHeight: 1.15,
        letterSpacing: "0.01em",
      }}>
        {venue.title}
      </h2>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "16px", fontStyle: "normal",
        color: "#c0a882", margin: "0 0 28px", fontWeight: 400,
      }}>
        {venue.tagline}
      </p>

      {/* Meta */}
      <div style={{ display: "flex", gap: "0", marginBottom: "28px" }}>
        {[
          { label: "Saatler", value: venue.guests },
          { label: "Tip",     value: venue.type   },
          { label: "Özellik", value: venue.feature },
        ].map((m, i) => (
          <div key={m.label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ paddingRight: "24px", paddingLeft: i === 0 ? "0" : "24px" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: "4px" }}>{m.label}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: DARK }}>{m.value}</div>
            </div>
            {i < 2 && <div style={{ width: "1px", height: "38px", background: "rgba(0,0,0,0.12)", flexShrink: 0 }} />}
          </div>
        ))}
      </div>

      <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "24px" }} />

      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: "13px",
        lineHeight: 1.9, color: MID, margin: "0 0 36px",
      }}>
        {venue.desc}
      </p>

      <Link
        to={`/restoran/${venue.slug}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Inter, sans-serif", fontSize: "9px",
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: hov ? WHITE : DARK,
          background: hov ? DARK : "transparent",
          border: `1px solid ${DARK}`,
          padding: "13px 36px", textDecoration: "none",
          transition: "all 0.25s ease", alignSelf: "flex-start",
        }}
      >
        İNCELE
      </Link>
    </div>
  );

  const imagePanel = (
    <div className="venue-card-img" style={{ overflow: "hidden" }}>
      <VenueCarousel imgs={venue.imgs} title={venue.title} />
    </div>
  );

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: reverse ? "42% 58%" : "58% 42%",
          height: "560px",
          borderBottom: "1px solid rgba(200,185,165,0.2)",
        }}
        className="venue-card"
      >
        {reverse ? <>{textPanel}{imagePanel}</> : <>{imagePanel}{textPanel}</>}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function DiningPage() {
  const content = useContent();
  const venues = content.dining;
  return (
    <div style={{ backgroundColor: WHITE }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#1a1209" }}>
        <img
          src={BASE + "a-la-carte-ve-cocuk-2.jpg"}
          alt="Teymur Continental Restoran"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,6,2,0.15) 0%, rgba(10,6,2,0.65) 100%)" }} />

        <div style={{ position: "absolute", bottom: "100px", left: 0, right: 0, padding: "0 6vw" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "8px", letterSpacing: "0.55em", color: "#c0a882", textTransform: "uppercase", marginBottom: "20px", opacity: 0.9 }}>
            TEYMUR CONTINENTAL · RESTORAN & BAR
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 4.2vw, 56px)",
            fontWeight: 400, color: "#ffffff",
            margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "0.02em",
          }}>
            Lezzet, Keyif
            <br />
            <span style={{ color: "#c0a882" }}>& Atmosfer</span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "13px",
            lineHeight: 1.75, color: "rgba(255,255,255,0.6)",
            maxWidth: "460px", margin: 0,
          }}>
            Gaziantep mutfağının eşsiz lezzetlerinden dünya mutfağına, kahvaltıdan geç saatlere kadar her anınızda yanınızdayız.
          </p>
        </div>
      </div>

      {/* ── VENUE CARDS ── */}
      <div style={{ padding: "72px 3vw 0", maxWidth: "1400px", margin: "0 auto" }}>
        {venues.map((venue, i) => (
          <div key={venue.id} style={{ marginBottom: "64px" }}>
            <VenueCard venue={venue} reverse={i % 2 !== 0} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .venue-card { grid-template-columns: 1fr !important; height: auto !important; }
          .venue-card-img  { order: 1 !important; height: 60vw !important; }
          .venue-card-text { order: 2 !important; }
        }
        @media (max-width: 600px) {
          .venue-card-img  { height: 64vw !important; }
          .venue-card-text { padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
}
