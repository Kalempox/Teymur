import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useContent } from "../context/ContentContext";

const BASE_IMG = "/panel/uploads/rooms_v/original/";

const WHITE = "#ffffff";
const DARK  = "#1c1209";
const MID   = "#6b5c4e";
const MUTED = "#a09080";
const GOLD  = "#c0a882";

const rooms = [
  {
    id: 1,
    slug: "standart-french-oda",
    title: "Standart French Oda",
    guests: "2",
    size: "28 m²",
    bed: "French Yatak",
    desc: "Fransız ilhamıyla tasarlanmış bu oda, antika mobilyaları ve özenle seçilmiş tekstilleriyle her sabah sizi sessiz bir zarafetle karşılar.",
    imgs: [`${BASE_IMG}1.jpg`, `${BASE_IMG}2.jpg`, `${BASE_IMG}3.jpg`, `${BASE_IMG}4.jpg`],
  },
  {
    id: 2,
    slug: "standart-twin-bed-oda",
    title: "Standart Twin Bed Oda",
    guests: "2",
    size: "30 m²",
    bed: "2 Tek Yatak",
    desc: "İş seyahati ve arkadaş grupları için özenle düzenlenmiş, iki ayrı yatağıyla konforsuz ödün vermeyen bir oda.",
    imgs: [`${BASE_IMG}14.jpg`, `${BASE_IMG}24.jpg`, `${BASE_IMG}34.jpg`],
  },
  {
    id: 3,
    slug: "standart-triple-oda",
    title: "Standart Triple Oda",
    guests: "3",
    size: "36 m²",
    bed: "3 Tek Yatak",
    desc: "Üç kişilik geniş alanı ve oturma köşesiyle aile seyahati için modern tasarım ve pratik lüksü bir arada sunar.",
    imgs: [`${BASE_IMG}15.jpg`, `${BASE_IMG}25.jpg`, `${BASE_IMG}35.jpg`],
  },
  {
    id: 4,
    slug: "engelsiz-oda",
    title: "Engelsiz Oda",
    guests: "2",
    size: "32 m²",
    bed: "French Yatak",
    desc: "Geniş açıklıkları, özel banyo donanımları ve eksiksiz lüksüyle tüm misafirlerimize eşit konfor sunan özel tasarım odamız.",
    imgs: [`${BASE_IMG}12.jpg`, `${BASE_IMG}22.jpg`, `${BASE_IMG}32.jpg`, `${BASE_IMG}41.jpg`],
  },
  {
    id: 5,
    slug: "aile-suiti",
    title: "Aile Süiti",
    guests: "4",
    size: "80 m²",
    bed: "2 Yatak Odası",
    desc: "Ayrı yatak odaları, geniş oturma alanı ve mutfak köşesiyle gerçekten ev hissi veren nadir bir süit deneyimi.",
    imgs: [`${BASE_IMG}11.jpg`, `${BASE_IMG}21.jpg`, `${BASE_IMG}31.jpg`],
  },
  {
    id: 6,
    slug: "kral-suit",
    title: "Kral Süit",
    guests: "2",
    size: "65 m²",
    bed: "King Yatak",
    desc: "Özel jakuzi, ayrı salon, butler hizmeti ve 360° panoramik manzarasıyla otelin en seçkin konaklamasını sunar.",
    imgs: [`${BASE_IMG}16.jpg`, `${BASE_IMG}26.jpg`, `${BASE_IMG}36.jpg`, `${BASE_IMG}43.jpg`, `${BASE_IMG}51.jpg`],
  },
];

// ─── CAROUSEL ────────────────────────────────────────────────────────────────
function Carousel({ imgs, title }: { imgs: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#d8d0c8" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {imgs.map((src, i) => (
        <img key={i} src={src} alt={title} style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          opacity: idx === i ? 1 : 0,
          transform: idx === i && hovered ? "scale(1.03)" : "scale(1)",
          transition: "opacity 0.7s ease, transform 1.2s cubic-bezier(0.22,1,0.36,1)",
        }} />
      ))}

      {imgs.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setIdx(p => Math.max(0, p - 1)); }} style={{
            position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
            zIndex: 4, width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(255,255,255,0.88)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", opacity: idx === 0 ? 0.3 : 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)", transition: "opacity 0.2s",
          }}>
            <ChevronLeft size={16} color={DARK} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIdx(p => Math.min(imgs.length - 1, p + 1)); }} style={{
            position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
            zIndex: 4, width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(255,255,255,0.88)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", opacity: idx === imgs.length - 1 ? 0.3 : 1,
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)", transition: "opacity 0.2s",
          }}>
            <ChevronRight size={16} color={DARK} />
          </button>

          {/* dots */}
          <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 4 }}>
            {imgs.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
                <div style={{ width: i === idx ? "20px" : "6px", height: "1.5px", backgroundColor: i === idx ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.3s ease", borderRadius: "1px" }} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── ROOM CARD ────────────────────────────────────────────────────────────────
function RoomCard({ room, reverse }: { room: (typeof rooms)[0]; reverse: boolean }) {
  const [exploreHov, setExploreHov] = useState(false);

  const textPanel = (
    <div className="room-card-text" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "72px 56px",
      backgroundColor: WHITE,
    }}>
      {/* Başlık */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(30px, 2.8vw, 44px)",
        fontWeight: 400,
        color: DARK,
        margin: "0 0 28px",
        lineHeight: 1.15,
        letterSpacing: "0.01em",
      }}>
        {room.title}
      </h2>

      {/* Meta — yatay, etiketli */}
      <div style={{ display: "flex", gap: "0", marginBottom: "32px" }}>
        {[
          { label: "Misafir", value: room.guests },
          { label: "Oda Büyüklüğü", value: room.size },
          { label: "Yatak", value: room.bed },
        ].map((m, i) => (
          <div key={m.label} style={{
            paddingRight: i < 2 ? "28px" : "0",
            marginRight: i < 2 ? "28px" : "0",
            borderRight: i < 2 ? `1px solid rgba(192,168,130,0.35)` : "none",
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: "5px",
            }}>
              {m.label}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: DARK,
              fontWeight: 400,
              letterSpacing: "0.03em",
            }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Açıklama */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        lineHeight: 2,
        color: MID,
        margin: "0 0 44px",
        maxWidth: "420px",
      }}>
        {room.desc}
      </p>

      {/* CTA'lar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          to={`/odalar/${room.slug}`}
          onMouseEnter={() => setExploreHov(true)}
          onMouseLeave={() => setExploreHov(false)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: exploreHov ? WHITE : DARK,
            backgroundColor: exploreHov ? DARK : "transparent",
            border: `1px solid ${DARK}`,
            padding: "14px 32px",
            textDecoration: "none",
            display: "inline-block",
            transition: "all 0.28s ease",
            whiteSpace: "nowrap",
          }}
        >
          İNCELE
        </Link>

        <RoomsGoldBtn />
      </div>
    </div>
  );

  const imagePanel = (
    <div className="room-card-img" style={{ overflow: "hidden" }}>
      <Carousel imgs={room.imgs} title={room.title} />
    </div>
  );

  return (
    <div style={{ marginBottom: "64px" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "40% 60%" : "60% 40%",
        height: "560px",
      }}
      className="room-card"
    >
      {reverse ? <>{textPanel}{imagePanel}</> : <>{imagePanel}{textPanel}</>}
    </div>
    </div>
  );
}

// ─── HERO GÖRSELLER ──────────────────────────────────────────────────────────
const HERO_IMGS = [
  `${BASE_IMG}16.jpg`,
  `${BASE_IMG}1.jpg`,
  `${BASE_IMG}11.jpg`,
  `${BASE_IMG}14.jpg`,
  `${BASE_IMG}15.jpg`,
  `${BASE_IMG}26.jpg`,
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function RoomsGoldBtn() {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/rezervasyon"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: hov ? "#fff" : "#1c1209",
        background: hov ? "rgb(195,166,116)" : "rgb(219,190,140)",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 32px",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}
    >
      Rezervasyon
    </Link>
  );
}

export function RoomsPage() {
  const { lang } = useLang();
  const content = useContent();
  const rooms = content.rooms;
  const [heroIdx, setHeroIdx] = useState(0);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const goHero = (next: number) => setHeroIdx((next + HERO_IMGS.length) % HERO_IMGS.length);
  useEffect(() => {
    heroTimer.current = setInterval(() => goHero(heroIdx + 1), 5000);
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, [heroIdx]);

  const tagline =
    lang === "en" ? "157 Rooms, 157 Unique Stories"
    : lang === "ar" ? "١٥٧ غرفة، ١٥٧ قصة فريدة"
    : "157 Oda, 157 Özgün Hikâye";

  const desc =
    lang === "en"
      ? "Each room at Teymur Continental is different, but every room shares a common design language — where modern comfort meets the warm heritage of Gaziantep."
      : lang === "ar"
      ? "كل غرفة في تيمور كونتيننتال مختلفة، لكن كل غرفة تشترك في لغة تصميم واحدة."
      : "Teymur Continental'daki her oda birbirinden farklıdır; ancak her biri ortak bir tasarım dilini paylaşır — modern konfor ile Gaziantep'in sıcak mirasının buluştuğu yer.";

  return (
    <div style={{ backgroundColor: WHITE }}>

      {/* ── HERO CAROUSEL ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#1a1209" }}>

        {/* Görseller */}
        {HERO_IMGS.map((src, i) => (
          <img key={i} src={src} alt="Teymur Continental" style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            objectPosition: "center 35%",
            opacity: heroIdx === i ? 1 : 0,
            transform: heroIdx === i ? "scale(1.04)" : "scale(1)",
            transition: "opacity 1s ease, transform 6s ease",
          }} />
        ))}

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,6,2,0.15) 0%, rgba(10,6,2,0.65) 100%)" }} />

        {/* Nokta gösterge — sağ alt */}
        <div style={{ position: "absolute", bottom: "36px", right: "64px", display: "flex", gap: "8px", zIndex: 5 }}>
          {HERO_IMGS.map((_, i) => (
            <button key={i} onClick={() => goHero(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
              <div style={{ width: i === heroIdx ? "28px" : "7px", height: "1.5px", backgroundColor: i === heroIdx ? "#fff" : "rgba(255,255,255,0.45)", transition: "all 0.35s ease", borderRadius: "1px" }} />
            </button>
          ))}
        </div>

        {/* Sol-alt metin */}
        <div style={{ position: "absolute", bottom: "100px", left: 0, right: 0, padding: "0 6vw" }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 4.2vw, 56px)",
            fontWeight: 400, color: "#ffffff",
            margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "0.02em",
          }}>
            {tagline}
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px", lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "460px", margin: 0,
          }}>
            {desc}
          </p>
        </div>
      </div>

      {/* ── ODA KARTLARI ── */}
      <div style={{ padding: "72px 3vw 0" }}>
        {rooms.map((room, i) => (
          <RoomCard key={room.id} room={room} reverse={i % 2 !== 0} />
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .room-card { grid-template-columns: 1fr !important; height: auto !important; }
          .room-card-img  { order: 1 !important; height: 60vw !important; }
          .room-card-text { order: 2 !important; }
        }
        @media (max-width: 600px) {
          .room-card-img  { height: 64vw !important; }
          .room-card-text { padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
}
