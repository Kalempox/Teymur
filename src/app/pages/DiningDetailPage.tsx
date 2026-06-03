import { useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft, ChevronRight, Clock, Utensils, Users, Wifi, Music, Coffee, Wine, Star, Sun } from "lucide-react";

const BG   = "#f9f9f9";
const DARK = "#1c1209";
const MID  = "#5a4a3a";
const BASE = "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/";

interface VenueData {
  title: string; hours: string; type: string; feature: string;
  tagline: string; desc: string; imgs: string[]; amenities: string[];
}

const VENUES: Record<string, VenueData> = {
  "sof-restaurant": {
    title: "Sof Restaurant",
    hours: "7/24",
    type: "À La Carte",
    feature: "Çocuk Oyun Alanı",
    tagline: "Gaziantep ve dünya mutfağı bir arada.",
    desc: "Otelimiz bünyesinde bulunan Sof Restaurant, Gaziantep ve dünya mutfağını profesyonel bar hizmetiyle misafirlerine sunmaktadır. Gaziantep'in eşsiz yöresel lezzetlerini modern bir yorum ile bir araya getiren restoranımız, hem iş hem de özel yemekler için ideal bir atmosfer sunmaktadır. Aynı zamanda minik misafirlerimizin eğlenceye doyamadığı çocuk oyun alanı ile 7/24 hizmet sunmaktadır.",
    imgs: [BASE + "a-la-carte-ve-cocuk-2.jpg", BASE + "7.jpg"],
    amenities: ["7/24 HİZMET", "À LA CARTE MENÜ", "ÇOCUK OYUN ALANI", "BAR HİZMETİ", "GAZİANTEP MUTFAĞı", "DÜNYA MUTFAĞı", "KABLOSUZ İNTERNET", "VALE HİZMETİ"],
  },
  "kahvalti": {
    title: "Açık Büfe Kahvaltı",
    hours: "07:00 – 11:00",
    type: "Açık Büfe",
    feature: "Şehir Manzarası",
    tagline: "Şehir manzarası eşliğinde sabah şöleni.",
    desc: "Teymur Continental Hotel misafirleri için açık büfe kahvaltımız; çeşitliliği, lezzeti ve yöreselliğiyle 07.00 - 11.00 saatleri arasında şehir manzarası eşliğinde unutulmaz bir sabah şöleni sunuyor. Yöresel Gaziantep lezzetleri, taze meyveler, organik ürünler ve zengin kahvaltı çeşitleriyle güne en iyi başlangıcı yapın.",
    imgs: [BASE + "kahvalti--2.jpg", BASE + "6.jpg"],
    amenities: ["07:00–11:00 ARASI", "AÇIK BÜFE", "ŞEHİR MANZARASI", "YÖRESEL LEZZETLER", "TAZE MEYVE & SEBZE", "ORGANİK ÜRÜNLER", "KABLOSUZ İNTERNET", "ÖZEL DİYET MENÜSÜ"],
  },
  "bar-lounge": {
    title: "Bar & Lounge",
    hours: "18:00 – 01:00",
    type: "Bar",
    feature: "Canlı Müzik",
    tagline: "Gece yarısı özel karışımlar ve seçkin içkiler.",
    desc: "Teymur Continental Hotel'in Bar & Lounge'ı, şık atmosferi ve geniş içecek menüsüyle unutulmaz akşamlar sunar. Özenle hazırlanmış kokteyller, seçkin şaraplar ve yerel lezzetlerle dolu bir deneyim için davetlisiniz. Uzman bartenderlarımızın hazırladığı özel karışımlar ve canlı müzik eşliğinde geceyi taçlandırın.",
    imgs: [BASE + "7.jpg", BASE + "a-la-carte-ve-cocuk-2.jpg"],
    amenities: ["18:00–01:00 ARASI", "KOKTEYL MENÜSÜ", "SEÇKİN ŞARAPLAR", "CANLI MÜZİK", "ATLAŞTIRMALIKLAR", "ÖZEL ETKİNLİKLER", "KABLOSUZ İNTERNET", "VALE HİZMETİ"],
  },
};

const ALL_VENUES = [
  { slug: "sof-restaurant", title: "Sof Restaurant",       img: BASE + "a-la-carte-ve-cocuk-2.jpg", hours: "7/24",          type: "À La Carte" },
  { slug: "kahvalti",       title: "Açık Büfe Kahvaltı",   img: BASE + "kahvalti--2.jpg",            hours: "07:00–11:00",    type: "Açık Büfe"  },
  { slug: "bar-lounge",     title: "Bar & Lounge",          img: BASE + "7.jpg",                      hours: "18:00–01:00",    type: "Bar"        },
];

function AmenityIcon({ name }: { name: string }) {
  const p = { size: 22, color: DARK, strokeWidth: 1.3 };
  if (name.includes("HİZMET") || name.includes("ARASI")) return <Clock {...p} />;
  if (name.includes("MENÜ") || name.includes("MUTFAĞı") || name.includes("LEZZET")) return <Utensils {...p} />;
  if (name.includes("BÜFE") || name.includes("KAHVALTI")) return <Coffee {...p} />;
  if (name.includes("BAR") || name.includes("KOKTEYL") || name.includes("ŞARAP")) return <Wine {...p} />;
  if (name.includes("MÜZİK") || name.includes("ETKİNLİK")) return <Music {...p} />;
  if (name.includes("MANZARA") || name.includes("GÜNEŞ")) return <Sun {...p} />;
  if (name.includes("İNTERNET") || name.includes("WİFİ")) return <Wifi {...p} />;
  if (name.includes("OYUN") || name.includes("ÇOCUK")) return <Users {...p} />;
  return <Star {...p} />;
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h6 style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, textTransform: "uppercase", color: "#000", margin: "0 0 4px" }}>
        {eyebrow}
      </h6>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "58px", fontWeight: 400, color: "#000", margin: 0, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0.03em" }}>
        {title}
      </h4>
    </div>
  );
}

export function DiningDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const venue = slug ? VENUES[slug] : undefined;
  const [galIdx, setGalIdx] = useState(0);
  const [resHov, setResHov] = useState(false);
  const touchX = { current: 0 };

  if (!venue) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif", color: MID }}>
      Mekan bulunamadı
    </div>
  );

  const others = ALL_VENUES.filter(v => v.slug !== slug);

  return (
    <div style={{ background: BG, fontFamily: "Inter, sans-serif" }}>

      {/* ══ HERO — position:fixed ══ */}
      <section style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 0, overflow: "hidden", background: "#111" }}>
        <img src={venue.imgs[0]} alt={venue.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)" }} />

        {/* Sol-alt: başlık + stats */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 52px", zIndex: 2, background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "55px", fontWeight: 400, color: "#fff", margin: "0", lineHeight: 1.1, textTransform: "uppercase" }}>
            {venue.title}
          </h1>
          <div style={{ display: "flex", gap: "48px", paddingTop: "32px" }}>
            {[
              { label: "Saatler", value: venue.hours },
              { label: "Tip",     value: venue.type   },
              { label: "Özellik", value: venue.feature },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#fff" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPACER ══ */}
      <div style={{ height: "100vh" }} />

      {/* ══ CONTENT — zIndex:1, slides over hero ══ */}
      <div style={{ position: "relative", zIndex: 1, background: BG, padding: "125px 0 68px" }}>

        {/* ── AÇIKLAMA + ÖZELLİKLER ── */}
        <div style={{ padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-start" }} className="dd-desc-grid">

            {/* Sol */}
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.85, color: MID, margin: "0 0 40px" }}>
                {venue.desc}
              </p>
              <div className="dd-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/rezervasyon" onMouseEnter={() => setResHov(true)} onMouseLeave={() => setResHov(false)} style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  color: resHov ? "#fff" : DARK,
                  background: resHov ? "rgb(195,166,116)" : "rgb(219,190,140)",
                  border: "none", padding: "0 48px", height: "52px",
                  textDecoration: "none", transition: "all 0.25s ease",
                }}>
                  REZERVASYON
                </Link>
                <MenuBtn />
              </div>
            </div>

            {/* Sağ: özellikler */}
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "28px" }}>
                MEKAN ÖZELLİKLERİ
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 16px", alignItems: "flex-start" }}>
                {venue.amenities.map(a => (
                  <div key={a} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "96px" }}>
                    <div style={{ width: "64px", height: "64px", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0 }}>
                      <AmenityIcon name={a} />
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#555", marginTop: "10px", textAlign: "center", lineHeight: 1.4 }}>
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── GALERİ ── */}
        <div style={{ padding: "96px 40px 0", marginBottom: "74px" }}>
          <SectionHead eyebrow={venue.title.toUpperCase()} title="Galeri" />

          <div
            className="dd-gallery"
            onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const diff = touchX.current - e.changedTouches[0].clientX;
              if (diff > 40)  setGalIdx(p => (p + 1) % venue.imgs.length);
              if (diff < -40) setGalIdx(p => (p - 1 + venue.imgs.length) % venue.imgs.length);
            }}
            style={{ position: "relative", overflow: "hidden", height: "755px" }}
          >
            {venue.imgs.map((src, i) => (
              <img key={i} src={src} alt={`${venue.title} ${i + 1}`} style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "755px",
                objectFit: "cover", display: "block",
                opacity: galIdx === i ? 1 : 0, transition: "opacity 0.7s ease",
              }} />
            ))}
            <div style={{ position: "absolute", bottom: "83px", right: "54px", fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: 400, color: "rgba(255,255,255,0.9)", zIndex: 2 }}>
              {galIdx + 1} / {venue.imgs.length}
            </div>
            <button onClick={() => setGalIdx(p => (p - 1 + venue.imgs.length) % venue.imgs.length)} style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.92)")}
            >
              <ChevronLeft size={22} color="#1c1209" strokeWidth={2} />
            </button>
            <button onClick={() => setGalIdx(p => (p + 1) % venue.imgs.length)} style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.92)")}
            >
              <ChevronRight size={22} color="#1c1209" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── DİĞER MEKANLAR ── */}
        <div style={{ padding: "0 40px", marginBottom: "80px" }}>
          <SectionHead eyebrow="RESTORAN & BAR" title="Diğer Mekanlar" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }} className="dd-others-grid">
            {others.map(v => <OtherCard key={v.slug} venue={v} />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .dd-desc-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dd-others-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .dd-gallery { height: 72vw !important; }
          .dd-gallery img { height: 72vw !important; }
          .dd-btns { flex-wrap: nowrap !important; gap: 8px !important; }
          .dd-btns a, .dd-btns button {
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

function MenuBtn() {
  const [hov, setHov] = useState(false);
  const GOLD = "#c0a882";
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => alert("Menü yakında eklenecektir.")}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Inter, sans-serif", fontSize: "14px",
        letterSpacing: "0.04em", textTransform: "uppercase",
        color: hov ? DARK : DARK,
        background: hov ? "rgba(0,0,0,0.05)" : "transparent",
        border: `1px solid ${DARK}`, padding: "0 48px", height: "52px",
        cursor: "pointer", transition: "all 0.25s ease",
      }}
    >
      MENÜ
    </button>
  );
}

function OtherCard({ venue }: { venue: typeof ALL_VENUES[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
      {/* Görsel — sadece başlık üstte */}
      <Link
        to={`/restoran/${venue.slug}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: "block", position: "relative", height: "440px", overflow: "hidden", textDecoration: "none" }}
      >
        <img src={venue.img} alt={venue.title} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          filter: "brightness(0.75)",
        }} />

        {/* Hafif gradient */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />

        {/* Sadece başlık — ortada */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "24px",
        }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 2.8vw, 42px)", fontWeight: 400,
            color: "#ffffff", margin: 0, lineHeight: 1.15,
            letterSpacing: "0.03em",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}>
            {venue.title}
          </h3>
        </div>
      </Link>

    </div>
  );
}
