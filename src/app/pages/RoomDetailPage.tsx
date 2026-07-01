import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ChevronLeft, ChevronRight,
  Wind, Square, Lock, Wifi, Coffee, Tv, Phone, Wine, Key,
  AlertCircle, Shirt, Monitor, Clock, Droplets, GlassWater,
  UserCheck, Radio, HeartHandshake, CheckCircle,
} from "lucide-react";

// ─── Playwright‑verified exact values ────────────────────────────────────────
const BG   = "#f9f9f9";   // rgb(249,249,249) – body bg
const BASE = "/panel/uploads/rooms_v/original/";

// ─── Room data ────────────────────────────────────────────────────────────────
interface RoomData {
  title: string; guests: string; size: string; bed: string;
  desc: string; imgs: string[]; amenities: string[];
}

const ROOMS_DATA: Record<string, RoomData> = {
  "standart-french-oda": {
    title: "Standart French Oda", guests: "2", size: "28 m²", bed: "French Yatak",
    desc: "Modern, ferah ve konforlu odamızla evinizin rahatlığını yaşayın. Fransız ilhamıyla tasarlanmış dekorasyonu, antika mobilyaları ve özenle seçilmiş tekstilleriyle her sabah sizi sessiz bir zarafetle karşılar. Tüm detaylar, konforlu ve huzurlu günler geçirmeniz için düşünülmüştür.",
    imgs: [BASE+"1.jpg", BASE+"2.jpg", BASE+"3.jpg", BASE+"4.jpg"],
    amenities: ["KLİMA","AÇILIR PENCERE","ELEKTRONİK KASA","KABLOSUZ İNTERNET","ÇAY / KAHVE","SAÇ KURUTMA","LED TV","TELEFON","MİNİBAR","KAPI KİLİDİ","DUMAN DETEKTÖRÜ","ÜTÜCÜ","HDMI / USB","24 SAAT ODA SERVİSİ"],
  },
  "standart-twin-bed-oda": {
    title: "Standart Twin Bed Oda", guests: "2", size: "30 m²", bed: "2 Tek Yatak",
    desc: "İş seyahati ve arkadaş grupları için özenle düzenlenmiş iki ayrı yatağıyla, konforsuz ödün vermeyen modern ve rahat bir konaklama deneyimi sunar. Geniş ve konforlu alanlarda, büyük pencerelerden yayılan gün ışığıyla güne başlayın.",
    imgs: [BASE+"14.jpg", BASE+"24.jpg", BASE+"34.jpg"],
    amenities: ["KLİMA","AÇILIR PENCERE","ELEKTRONİK KASA","KABLOSUZ İNTERNET","ÇAY / KAHVE","SAÇ KURUTMA","LED TV","TELEFON","MİNİBAR","KAPI KİLİDİ","DUMAN DETEKTÖRÜ","ÜTÜCÜ","HDMI / USB","24 SAAT ODA SERVİSİ"],
  },
  "standart-triple-oda": {
    title: "Standart Triple Oda", guests: "3", size: "36 m²", bed: "3 Tek Yatak",
    desc: "Aileler ve üç kişilik gruplar için tasarlanmış geniş ve şık odamız; modern tasarımın zarafetini yüksek konfor standartlarıyla buluşturuyor. Tüm detaylar konforu ve huzuru bir arada yaşatmak için özenle seçilmiştir.",
    imgs: [BASE+"15.jpg", BASE+"25.jpg", BASE+"35.jpg"],
    amenities: ["KLİMA","AÇILIR PENCERE","ELEKTRONİK KASA","KABLOSUZ İNTERNET","ÇAY / KAHVE","SAÇ KURUTMA","LED TV","TELEFON","MİNİBAR","KAPI KİLİDİ","DUMAN DETEKTÖRÜ","ÜTÜCÜ","HDMI / USB","24 SAAT ODA SERVİSİ"],
  },
  "engelsiz-oda": {
    title: "Engelsiz Oda", guests: "2", size: "32 m²", bed: "French Yatak",
    desc: "Tüm misafirlerimize eşit konfor sunmak için özel olarak tasarlanmış odamız; geniş açıklıkları ve uzman banyo donanımıyla istisna olmaksızın tam lüks sunar. Gaziantep'in tarihi dokusunu keşfederken konfor ve erişilebilirlikten ödün vermeyin.",
    imgs: [BASE+"12.jpg", BASE+"22.jpg", BASE+"32.jpg", BASE+"41.jpg"],
    amenities: ["KLİMA","AÇILIR PENCERE","ELEKTRONİK KASA","KABLOSUZ İNTERNET","ÇAY / KAHVE","SAÇ KURUTMA","LED TV","TELEFON","MİNİBAR","YARDIM SİSTEMİ","DUMAN DETEKTÖRÜ","ÜTÜCÜ","HDMI / USB","24 SAAT ODA SERVİSİ"],
  },
  "aile-suiti": {
    title: "Aile Süiti", guests: "4", size: "80 m²", bed: "2 Yatak Odası",
    desc: "Ayrı yatak odaları, geniş bir oturma alanı ve mutfak köşesiyle gerçekten ev hissi veren nadir bir süit deneyimi. Ailenizle birlikte Gaziantep'i keşfederken tüm konforunuz sağlanır.",
    imgs: [BASE+"11.jpg", BASE+"21.jpg", BASE+"31.jpg"],
    amenities: ["KLİMA","AÇILIR PENCERE","ELEKTRONİK KASA","KABLOSUZ İNTERNET","ÇAY / KAHVE","SAÇ KURUTMA","LED TV","TELEFON","MİNİBAR","KAPI KİLİDİ","DUMAN DETEKTÖRÜ","ÜTÜCÜ","HDMI / USB","24 SAAT ODA SERVİSİ","UYDU / KABLO YAYIN"],
  },
  "kral-suit": {
    title: "Kral Süit", guests: "2", size: "65 m²", bed: "King Yatak",
    desc: "Otelin en seçkin süiti; özel jakuzi, ayrı salon, bar ve butler hizmetiyle eşsiz bir konfor sunar. Panoramik manzarasıyla Gaziantep'i tüm ihtişamıyla deneyimleyin.",
    imgs: [BASE+"16.jpg", BASE+"26.jpg", BASE+"36.jpg", BASE+"43.jpg", BASE+"51.jpg"],
    amenities: ["KLİMA","AÇILIR PENCERE","ELEKTRONİK KASA","KABLOSUZ İNTERNET","ÇAY / KAHVE","SAÇ KURUTMA","LED TV","TELEFON","MİNİBAR","BAR","ÖZEL JAKUZİ","BUTLER HİZMETİ","DUMAN DETEKTÖRÜ","ÜTÜCÜ","HDMI / USB","24 SAAT ODA SERVİSİ"],
  },
};

const ALL_ROOMS = [
  { slug: "standart-french-oda",   title: "Standart French Oda",   img: BASE+"1.jpg",  guests:"2", size:"28 m²" },
  { slug: "standart-twin-bed-oda", title: "Standart Twin Bed Oda", img: BASE+"14.jpg", guests:"2", size:"30 m²" },
  { slug: "standart-triple-oda",   title: "Standart Triple Oda",   img: BASE+"15.jpg", guests:"3", size:"36 m²" },
  { slug: "engelsiz-oda",          title: "Engelsiz Oda",          img: BASE+"12.jpg", guests:"2", size:"32 m²" },
  { slug: "aile-suiti",            title: "Aile Süiti",            img: BASE+"11.jpg", guests:"4", size:"80 m²" },
  { slug: "kral-suit",             title: "Kral Süit",             img: BASE+"16.jpg", guests:"2", size:"65 m²" },
];

// ─── Amenity icon ─────────────────────────────────────────────────────────────
function AmenityIcon({ name }: { name: string }) {
  const p = { size: 24, strokeWidth: 1.2, color: "#333" };
  const m: Record<string, React.ReactElement> = {
    "KLİMA": <Wind {...p} />, "SAÇ KURUTMA": <Wind {...p} />,
    "AÇILIR PENCERE": <Square {...p} />, "ELEKTRONİK KASA": <Lock {...p} />,
    "KABLOSUZ İNTERNET": <Wifi {...p} />, "ÇAY / KAHVE": <Coffee {...p} />,
    "LED TV": <Tv {...p} />, "TELEFON": <Phone {...p} />,
    "MİNİBAR": <Wine {...p} />, "KAPI KİLİDİ": <Key {...p} />,
    "DUMAN DETEKTÖRÜ": <AlertCircle {...p} />, "ÜTÜCÜ": <Shirt {...p} />,
    "HDMI / USB": <Monitor {...p} />, "24 SAAT ODA SERVİSİ": <Clock {...p} />,
    "ÖZEL JAKUZİ": <Droplets {...p} />, "BAR": <GlassWater {...p} />,
    "BUTLER HİZMETİ": <UserCheck {...p} />, "UYDU / KABLO YAYIN": <Radio {...p} />,
    "YARDIM SİSTEMİ": <HeartHandshake {...p} />,
  };
  return m[name] ?? <CheckCircle {...p} />;
}

// ─── Section head (H6 eyebrow + H4 title) ────────────────────────────────────
// Exact values from Playwright: H6 13px Space Grotesk uppercase black; H4 65px Cormorant weight 400 black
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h6 style={{
        fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400,
        textTransform: "uppercase", color: "#000", letterSpacing: "normal",
        margin: "0 0 0",
      }}>
        {eyebrow}
      </h6>
      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: "58px",
        fontWeight: 400, color: "#000", margin: "0", lineHeight: 1.1,
        textTransform: "uppercase", letterSpacing: "0.03em",
      }}>
        {title}
      </h4>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const room = slug ? ROOMS_DATA[slug] : undefined;
  const [galIdx, setGalIdx] = useState(0);
  const [resHov,  setResHov]  = useState(false);
  const touchX = { current: 0 };

  if (!room) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif", color: "#666" }}>
      Oda bulunamadı
    </div>
  );


  return (
    <div style={{ background: BG, fontFamily: "Inter, sans-serif" }}>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — position:fixed (Playwright: .room-detail-hero position:fixed)
          İçerik scroll edilince beyaz zemin üzerine kayar
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "100vh", zIndex: 0, overflow: "hidden", background: "#111",
      }}>
        <img src={room.imgs[0]} alt={room.title} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", display: "block",
        }} />

        {/* Alt: H1 55px + stats — Playwright: container padding 0 40px */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 40px 48px", zIndex: 2,
          background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)",
        }}>
          {/* H1 — Playwright: 55px Cormorant, weight 400, white */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "55px", fontWeight: 400,
            color: "#ffffff", margin: "0",
            lineHeight: 1.1, paddingRight: "50px",
            textTransform: "uppercase",
          }}>
            {room.title}
          </h1>

          {/* Stats — Playwright: padding-top:40px, display:flex */}
          <div style={{ display: "flex", gap: "48px", paddingTop: "40px" }}>
            {[
              { label: "Misafir",       value: room.guests },
              { label: "Oda Büyüklüğü", value: room.size   },
              { label: "Yatak",         value: room.bed     },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#ffffff" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SPACER 100vh ════ */}
      <div style={{ height: "100vh" }} />

      {/* ════════════════════════════════════════════════════════════════════
          CONTENT — zIndex:1, background:#f9f9f9
          Playwright: .content-area { padding:125px 0 68px }
          Container: padding 0 40px
      ════════════════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 1, background: BG, padding: "125px 0 68px" }}>

        {/* ── AÇIKLAMA (col-lg-6 / col-lg-6) ────────────────────────── */}
        {/* Playwright: .experience .row — two col-lg-6 columns */}
        <div style={{ padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-start" }} className="rd-desc-grid">

            {/* Sol: açıklama + buton */}
            <div>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "15px",
                lineHeight: 1.85, color: "#444",
                margin: "0 0 48px",
              }}>
                {room.desc}
              </p>

              {/* REZERVASYON + BROŞÜR butonları */}
              <div className="rd-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  to="/rezervasyon"
                  onMouseEnter={() => setResHov(true)}
                  onMouseLeave={() => setResHov(false)}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Inter, sans-serif", fontSize: "14px",
                    letterSpacing: "0.04em", textTransform: "uppercase",
                    color: resHov ? "#fff" : "#000",
                    background: resHov ? "#000" : "transparent",
                    border: "1px solid #000",
                    padding: "0 48px", height: "52px",
                    textDecoration: "none", transition: "all 0.25s ease",
                  }}
                >
                  REZERVASYON
                </Link>
                <RoomGoldBtn />
              </div>
            </div>

            {/* Sağ: oda özellikleri grid */}
            <div>
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: "11px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#999", marginBottom: "28px",
              }}>
                ODA ÖZELLİKLERİ
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 16px", alignItems: "flex-start" }}>
                {room.amenities.map(a => (
                  <div key={a} style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center",
                    width: "96px",
                  }}>
                    <div style={{
                      width: "64px", height: "64px", flexShrink: 0,
                      border: "1px solid #ddd",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#fff",
                    }}>
                      <AmenityIcon name={a} />
                    </div>
                    <span style={{
                      fontFamily: "Inter, sans-serif", fontSize: "11px",
                      color: "#555", marginTop: "10px",
                      textAlign: "center", lineHeight: 1.4,
                    }}>
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* ── GALLERY ────────────────────────────────────────────────── */}
        {/* Playwright: .room-detail-gallery { padding:96px 0 0; margin-bottom:74px }
            Gallery is Owl carousel — ONE full‑width image at a time (1360×755px)
            gallery-slider-item: width:1360px, height:755.156px
            gallery-slider-item-count: 21px Cormorant white, position:absolute, bottom:83px, right:54px */}
        <div style={{ padding: "96px 40px 0", marginBottom: "74px" }}>
          <SectionHead eyebrow={room.title.toUpperCase()} title="Galeri" />

          <div
            className="rd-gallery"
            onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const diff = touchX.current - e.changedTouches[0].clientX;
              if (diff > 40)  setGalIdx(p => (p + 1) % room.imgs.length);
              if (diff < -40) setGalIdx(p => (p - 1 + room.imgs.length) % room.imgs.length);
            }}
            style={{ position: "relative", overflow: "hidden", height: "755px" }}
          >
            {/* Images — only current one visible */}
            {room.imgs.map((src, i) => (
              <img key={i} src={src} alt={`${room.title} ${i + 1}`} style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "755px",
                objectFit: "cover", display: "block",
                opacity: galIdx === i ? 1 : 0,
                transition: "opacity 0.7s ease",
              }} />
            ))}

            {/* Counter — bottom‑right, 21px Cormorant white */}
            <div style={{
              position: "absolute", bottom: "83px", right: "54px",
              fontFamily: "'Cormorant Garamond', serif", fontSize: "21px",
              fontWeight: 400, color: "rgba(255,255,255,0.9)",
              zIndex: 2,
            }}>
              {galIdx + 1} / {room.imgs.length}
            </div>

            {/* Prev/Next arrows over gallery */}
            <button onClick={() => setGalIdx(p => (p - 1 + room.imgs.length) % room.imgs.length)} style={{
              position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)",
              zIndex: 2, width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <ChevronLeft size={18} color="#fff" />
            </button>
            <button onClick={() => setGalIdx(p => (p + 1) % room.imgs.length)} style={{
              position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)",
              zIndex: 2, width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <ChevronRight size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* ── ACCOMMODATION — bireysel oda kartları ──────────────────── */}
        <div style={{ padding: "0 40px", marginBottom: "112px" }}>
          <SectionHead eyebrow="ODALAR & SÜİTLER" title="Diğer Odalar" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="rd-acc-grid">
            {ALL_ROOMS.filter(r => r.slug !== slug).map(r => (
              <SmallRoomCard key={r.slug} room={r} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .rd-desc-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .rd-acc-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .rd-gallery { height: 72vw !important; }
          .rd-gallery img { height: 72vw !important; }
          .rd-btns { flex-wrap: nowrap !important; gap: 8px !important; }
          .rd-btns a, .rd-btns button {
            flex: 1 !important;
            padding: 0 12px !important;
            font-size: 12px !important;
            white-space: nowrap !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Small room card (Accommodation grid) ────────────────────────────────────
function SmallRoomCard({ room }: { room: typeof ALL_ROOMS[0] }) {
  const [hov, setHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
      {/* Görsel */}
      <div style={{ height: "220px", overflow: "hidden" }}>
        <img src={room.img} alt={room.title} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
        />
      </div>
      {/* Metin */}
      <div style={{ padding: "20px 24px 24px" }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(24px, 1.8vw, 30px)", fontWeight: 400,
          color: "rgb(28, 18, 9)", margin: "0 0 24px",
          lineHeight: 1.15, letterSpacing: "0.01em",
        }}>
          {room.title}
        </h3>
        <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}>
          {[{ l: "Misafir", v: room.guests }, { l: "Büyüklük", v: room.size }].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: "Inter,sans-serif", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginBottom: "3px" }}>{s.l}</div>
              <div style={{ fontFamily: "Inter,sans-serif", fontSize: "13px", color: "#000" }}>{s.v}</div>
            </div>
          ))}
        </div>
        <Link
          to={`/odalar/${room.slug}`}
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          style={{
            fontFamily: "Inter,sans-serif", fontSize: "11px",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: btnHov ? "#fff" : "#000",
            background: btnHov ? "#000" : "transparent",
            border: "1px solid #000",
            padding: "9px 20px", textDecoration: "none",
            display: "inline-block", transition: "all 0.22s ease",
          }}
        >
          İNCELE
        </Link>
      </div>
    </div>
  );
}

function RoomGoldBtn() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => alert("Broşür yakında eklenecektir.")}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Inter, sans-serif", fontSize: "14px",
        letterSpacing: "0.04em", textTransform: "uppercase",
        color: hov ? "#fff" : "#1c1209",
        background: hov ? "rgb(195,166,116)" : "rgb(219,190,140)",
        border: "none", padding: "0 48px", height: "52px",
        cursor: "pointer", transition: "all 0.25s ease",
      }}
    >
      BROŞÜR
    </button>
  );
}
