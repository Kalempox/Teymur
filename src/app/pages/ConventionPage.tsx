import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

const WHITE = "#ffffff";
const DARK  = "#1c1209";
const MID   = "#5a4a3a";
const MUTED = "#999999";
const HALL_BASE = "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/";

const halls = [
  {
    id: 1,
    slug: "beylerbeyi-balo-ve-kongre-salonu",
    title: "Beylerbeyi Balo Ve Kongre Salonu",
    tagline: "Gaziantep'in en prestijli etkinlik salonu.",
    capacity: "1250 Kişi",
    area: "1305 m²",
    type: "Balo & Kongre",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 1305 m² kullanım alanına sahip, 1250 kişilik kapasitesiyle bu özel salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunan salonumuz, size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "beylerbeyi.jpg", HALL_BASE + "beylerbeyi--21.jpg"],
  },
  {
    id: 2,
    slug: "hayad-salonu",
    title: "Hayad Salonu",
    tagline: "Esnek yapısıyla her organizasyona uyum sağlar.",
    capacity: "350 Kişi",
    area: "512 m²",
    type: "Çok Amaçlı Salon",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 512 m² kullanım alanına sahip, 350 kişilik kapasitesiyle salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Açılıp kapanabilir sistemi sayesinde küçük ya da büyük tüm organizasyonlarınıza uyum sağlayan bu özel salon, toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunar ve size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "hayad-3.jpg"],
  },
  {
    id: 3,
    slug: "continental-house-salonu",
    title: "Continental House Salonu",
    tagline: "Şık ve işlevsel toplantı ortamı.",
    capacity: "90 Kişi",
    area: "125 m²",
    type: "Toplantı Salonu",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 125 m² kullanım alanına sahip, 90 kişilik kapasitesiyle bu salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunan salonumuz, size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "5e6d3d45-aac1-4484-8f40-803b86003c3b.jpg"],
  },
  {
    id: 4,
    slug: "ipekyolu-salonu",
    title: "İpekyolu Salonu",
    tagline: "Küçük ölçekli etkinlikler için ideal mekan.",
    capacity: "90 Kişi",
    area: "125 m²",
    type: "Toplantı Salonu",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 125 m² kullanım alanına sahip, 90 kişilik kapasitesiyle bu salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunan salonumuz, size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "a.jpg"],
  },
];

// ─── Carousel ─────────────────────────────────────────────────────────────────
function HallCarousel({ imgs, title }: { imgs: string[]; title: string }) {
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
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          }}>
            <ChevronLeft size={16} color={DARK} />
          </button>
          <button onClick={() => setIdx(p => Math.min(imgs.length - 1, p + 1))} style={{
            position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
            zIndex: 4, width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(255,255,255,0.88)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", opacity: idx === imgs.length - 1 ? 0.3 : 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          }}>
            <ChevronRight size={16} color={DARK} />
          </button>
        </>
      )}
    </div>
  );
}

// ─── Hall Card ────────────────────────────────────────────────────────────────
function HallCard({ hall, reverse }: { hall: typeof halls[0]; reverse: boolean }) {
  const [exploreHov, setExploreHov] = useState(false);
  const [resHov, setResHov] = useState(false);

  const textPanel = (
    <div className="hall-card-text" style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "72px 56px", backgroundColor: WHITE,
    }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(30px, 2.8vw, 44px)", fontWeight: 400,
        color: DARK, margin: "0 0 28px", lineHeight: 1.15, letterSpacing: "0.01em",
      }}>
        {hall.title}
      </h2>

      {/* Meta */}
      <div style={{ display: "flex", gap: "0", marginBottom: "32px" }}>
        {[
          { label: "Kapasite", value: hall.capacity },
          { label: "Alan",     value: hall.area      },
          { label: "Tip",      value: hall.type       },
        ].map((m, i) => (
          <div key={m.label} style={{
            paddingRight: i < 2 ? "28px" : "0",
            marginRight:  i < 2 ? "28px" : "0",
            borderRight:  i < 2 ? "1px solid rgba(192,168,130,0.35)" : "none",
          }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: "5px" }}>
              {m.label}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: DARK, fontWeight: 400, letterSpacing: "0.03em" }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: "14px",
        lineHeight: 2, color: MID, margin: "0 0 44px", maxWidth: "420px",
      }}>
        {hall.desc}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          to={`/etkinlikler/${hall.slug}`}
          onMouseEnter={() => setExploreHov(true)}
          onMouseLeave={() => setExploreHov(false)}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "11px",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: exploreHov ? WHITE : DARK,
            backgroundColor: exploreHov ? DARK : "transparent",
            border: `1px solid ${DARK}`, padding: "14px 32px",
            textDecoration: "none", display: "inline-block",
            transition: "all 0.28s ease", whiteSpace: "nowrap",
          }}
        >
          İNCELE
        </Link>
        <Link
          to="/iletisim"
          onMouseEnter={() => setResHov(true)}
          onMouseLeave={() => setResHov(false)}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "11px",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: resHov ? "#fff" : DARK,
            background: resHov ? "rgb(195,166,116)" : "rgb(219,190,140)",
            padding: "14px 32px",
            textDecoration: "none", display: "inline-block",
            transition: "all 0.25s ease", whiteSpace: "nowrap",
          }}
        >
          Teklif Al
        </Link>
      </div>
    </div>
  );

  const imagePanel = (
    <div className="hall-card-img" style={{ overflow: "hidden", minHeight: "520px" }}>
      <HallCarousel imgs={hall.imgs} title={hall.title} />
    </div>
  );

  return (
    <div style={{ paddingBottom: "110px", backgroundColor: WHITE }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: reverse ? "42% 58%" : "58% 42%",
          minHeight: "520px",
          overflow: "hidden",
        }}
        className="hall-card"
      >
        {reverse ? <>{textPanel}{imagePanel}</> : <>{imagePanel}{textPanel}</>}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ConventionPage() {
  const content = useContent();
  const halls = content.halls;
  return (
    <div style={{ backgroundColor: WHITE }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#1a1209" }}>
        <img
          src={HALL_BASE + "beylerbeyi.jpg"}
          alt="Teymur Continental Convention Center"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,6,2,0.15) 0%, rgba(10,6,2,0.65) 100%)" }} />

        <div style={{ position: "absolute", bottom: "100px", left: 0, right: 0, padding: "0 6vw" }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 4.2vw, 56px)",
            fontWeight: 400, color: "#ffffff",
            margin: 0, lineHeight: 1.1, letterSpacing: "0.02em",
            fontStyle: "normal",
          }}>
            Büyük Anlar İçin
            <br />
            Büyük Mekanlar
          </h1>
        </div>
      </div>

      {/* ── SALON KARTLARI ── */}
      <div style={{ padding: "72px 3vw 0" }}>
        {halls.map((hall, i) => (
          <HallCard key={hall.id} hall={hall} reverse={i % 2 !== 0} />
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hall-card { grid-template-columns: 1fr !important; height: auto !important; }
          .hall-card-img  { order: 1 !important; height: 60vw !important; min-height: unset !important; }
          .hall-card-text { order: 2 !important; }
        }
        @media (max-width: 600px) {
          .hall-card-img  { height: 64vw !important; }
          .hall-card-text { padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
}
