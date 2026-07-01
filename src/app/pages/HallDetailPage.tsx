import { useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft, ChevronRight, Users, Maximize2, Music, Wifi, Car, Volume2, Projector, Wind, Utensils, Star, Layers, Settings } from "lucide-react";

const BG   = "#f9f9f9";
const DARK = "#1c1209";
const MID  = "#5a4a3a";
const HALL_BASE = "/panel/uploads/product_v/400x400/";

interface HallData {
  title: string; capacity: string; area: string; type: string;
  tagline: string; desc: string; imgs: string[]; features: string[];
}

const HALLS: Record<string, HallData> = {
  "beylerbeyi-balo-ve-kongre-salonu": {
    title: "Beylerbeyi Balo Ve Kongre Salonu",
    capacity: "1250 Kişi", area: "1305 m²", type: "Balo & Kongre",
    tagline: "Gaziantep'in en prestijli etkinlik salonu.",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 1305 m² kullanım alanına sahip, 1250 kişilik kapasitesiyle bu özel salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunan salonumuz, size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "beylerbeyi--21.jpg", HALL_BASE + "beylerbeyi--31.jpg"],
    features: ["1250 KİŞİ KAPASİTESİ", "1305 M² ALAN", "TAM DONANIMLI SAHNE", "PROFESYONEL SES", "IŞIK SİSTEMİ", "CATERING HİZMETİ", "KLİMA SİSTEMİ", "GENİŞ OTOPARK"],
  },
  "hayad-salonu": {
    title: "Hayad Salonu",
    capacity: "350 Kişi", area: "512 m²", type: "Çok Amaçlı",
    tagline: "Esnek yapısıyla her organizasyona uyum sağlar.",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 512 m² kullanım alanına sahip, 350 kişilik kapasitesiyle salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Açılıp kapanabilir sistemi sayesinde küçük ya da büyük tüm organizasyonlarınıza uyum sağlayan bu özel salon, toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunar ve size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "hayad-31.jpg", HALL_BASE + "beylerbeyi--21.jpg"],
    features: ["350 KİŞİ KAPASİTESİ", "512 M² ALAN", "AÇILIR KAPANIR SİSTEM", "ESNEK KONFİGÜRASYON", "SES SİSTEMİ", "CATERING HİZMETİ", "KLİMA SİSTEMİ", "GENİŞ OTOPARK"],
  },
  "continental-house-salonu": {
    title: "Continental House Salonu",
    capacity: "90 Kişi", area: "125 m²", type: "Toplantı",
    tagline: "Şık ve işlevsel toplantı ortamı.",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 125 m² kullanım alanına sahip, 90 kişilik kapasitesiyle bu salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunan salonumuz, size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "salonlar1.jpg", HALL_BASE + "salonlar2.jpg"],
    features: ["90 KİŞİ KAPASİTESİ", "125 M² ALAN", "PROJEKSİYON SİSTEMİ", "SES SİSTEMİ", "CATERING HİZMETİ", "KLİMA SİSTEMİ", "KABLOSUZ İNTERNET", "GENİŞ OTOPARK"],
  },
  "ipekyolu-salonu": {
    title: "İpekyolu Salonu",
    capacity: "90 Kişi", area: "125 m²", type: "Toplantı",
    tagline: "Küçük ölçekli etkinlikler için ideal mekan.",
    desc: "Teymur Continental Hotel, özel davetlerinizde fark yaratmanız için mükemmel mekanları ve kusursuz planlamayı bir arada sunuyor. 125 m² kullanım alanına sahip, 90 kişilik kapasitesiyle bu salonumuzda ister görkemli bir ziyafet, isterseniz samimi bir kutlama gerçekleştirebilirsiniz. Toplantı, düğün, nişan ve doğum günü gibi etkinlikleriniz için ideal bir atmosfer sunan salonumuz, size unutulmaz anlar yaşatır.",
    imgs: [HALL_BASE + "ipekyolu-11.jpg", HALL_BASE + "salonlar2.jpg"],
    features: ["90 KİŞİ KAPASİTESİ", "125 M² ALAN", "PROJEKSİYON SİSTEMİ", "SES SİSTEMİ", "CATERING HİZMETİ", "KLİMA SİSTEMİ", "KABLOSUZ İNTERNET", "GENİŞ OTOPARK"],
  },
};

const ALL_HALLS = [
  { slug: "beylerbeyi-balo-ve-kongre-salonu", title: "Beylerbeyi Balo Ve Kongre Salonu", img: HALL_BASE + "beylerbeyi--21.jpg", capacity: "1250 Kişi", area: "1305 m²" },
  { slug: "hayad-salonu",                     title: "Hayad Salonu",                     img: HALL_BASE + "hayad-31.jpg",       capacity: "350 Kişi",  area: "512 m²"  },
  { slug: "continental-house-salonu",         title: "Continental House Salonu",         img: HALL_BASE + "salonlar1.jpg",      capacity: "90 Kişi",   area: "125 m²"  },
  { slug: "ipekyolu-salonu",                  title: "İpekyolu Salonu",                  img: HALL_BASE + "ipekyolu-11.jpg",    capacity: "90 Kişi",   area: "125 m²"  },
];

function FeatureIcon({ name }: { name: string }) {
  const p = { size: 22, color: DARK, strokeWidth: 1.3 };
  if (name.includes("KAPASİTE") || name.includes("KİŞİ")) return <Users {...p} />;
  if (name.includes("ALAN") || name.includes("M²"))       return <Maximize2 {...p} />;
  if (name.includes("SAHNE") || name.includes("IŞIK"))    return <Music {...p} />;
  if (name.includes("SES"))                                return <Volume2 {...p} />;
  if (name.includes("PROJEKSİYON"))                       return <Projector {...p} />;
  if (name.includes("KLİMA"))                              return <Wind {...p} />;
  if (name.includes("CATERING") || name.includes("YİYECEK")) return <Utensils {...p} />;
  if (name.includes("OTOPARK") || name.includes("PARK"))  return <Car {...p} />;
  if (name.includes("İNTERNET") || name.includes("WİFİ")) return <Wifi {...p} />;
  if (name.includes("KONFİGÜRASYON") || name.includes("ESNEK")) return <Settings {...p} />;
  if (name.includes("SİSTEM") || name.includes("AÇILIR")) return <Layers {...p} />;
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

export function HallDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const hall = slug ? HALLS[slug] : undefined;
  const [galIdx,  setGalIdx]  = useState(0);
  const [resHov,  setResHov]  = useState(false);
  const touchX = { current: 0 };

  if (!hall) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif", color: MID }}>
      Salon bulunamadı
    </div>
  );

  const others = ALL_HALLS.filter(h => h.slug !== slug);

  return (
    <div style={{ background: BG, fontFamily: "Inter, sans-serif" }}>

      {/* ══ HERO — position:fixed ══ */}
      <section style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 0, overflow: "hidden", background: "#111" }}>
        <img src={hall.imgs[0]} alt={hall.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)" }} />

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 52px", zIndex: 2, background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "55px", fontWeight: 400, color: "#fff", margin: "0", lineHeight: 1.1, textTransform: "uppercase" }}>
            {hall.title}
          </h1>
          <div style={{ display: "flex", gap: "48px", paddingTop: "32px" }}>
            {[
              { label: "Kapasite", value: hall.capacity },
              { label: "Alan",     value: hall.area     },
              { label: "Tip",      value: hall.type     },
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

      {/* ══ CONTENT ══ */}
      <div style={{ position: "relative", zIndex: 1, background: BG, padding: "125px 0 68px" }}>

        {/* ── AÇIKLAMA + ÖZELLİKLER ── */}
        <div style={{ padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-start" }} className="hd-desc-grid">

            {/* Sol */}
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.85, color: MID, margin: "0 0 40px" }}>
                {hall.desc}
              </p>
              <div className="hd-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/iletisim" onMouseEnter={() => setResHov(true)} onMouseLeave={() => setResHov(false)} style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  color: resHov ? "#fff" : DARK,
                  background: resHov ? "rgb(195,166,116)" : "rgb(219,190,140)",
                  border: "none", padding: "0 48px", height: "52px",
                  textDecoration: "none", transition: "all 0.25s ease",
                }}>
                  TEKLİF AL
                </Link>
                <RezervasjonBtn />
              </div>
            </div>

            {/* Sağ: özellikler */}
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "28px" }}>
                SALON ÖZELLİKLERİ
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 16px", alignItems: "flex-start" }}>
                {hall.features.map(f => (
                  <div key={f} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "96px" }}>
                    <div style={{ width: "64px", height: "64px", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0 }}>
                      <FeatureIcon name={f} />
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#555", marginTop: "10px", textAlign: "center", lineHeight: 1.4 }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── GALERİ ── */}
        <div style={{ padding: "96px 40px 0", marginBottom: "74px" }}>
          <SectionHead eyebrow={hall.title.toUpperCase()} title="Galeri" />

          <div
            className="hd-gallery"
            onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const diff = touchX.current - e.changedTouches[0].clientX;
              if (diff > 40)  setGalIdx(p => (p + 1) % hall.imgs.length);
              if (diff < -40) setGalIdx(p => (p - 1 + hall.imgs.length) % hall.imgs.length);
            }}
            style={{ position: "relative", overflow: "hidden", height: "755px" }}
          >
            {hall.imgs.map((src, i) => (
              <img key={i} src={src} alt={`${hall.title} ${i + 1}`} style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "755px",
                objectFit: "cover", display: "block",
                opacity: galIdx === i ? 1 : 0, transition: "opacity 0.7s ease",
              }} />
            ))}
            <div style={{ position: "absolute", bottom: "83px", right: "54px", fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: 400, color: "rgba(255,255,255,0.9)", zIndex: 2 }}>
              {galIdx + 1} / {hall.imgs.length}
            </div>
            <button onClick={() => setGalIdx(p => (p - 1 + hall.imgs.length) % hall.imgs.length)} style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>
              <ChevronLeft size={22} color={DARK} strokeWidth={2} />
            </button>
            <button onClick={() => setGalIdx(p => (p + 1) % hall.imgs.length)} style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>
              <ChevronRight size={22} color={DARK} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── DİĞER SALONLAR ── */}
        <div style={{ padding: "0 40px", marginBottom: "80px" }}>
          <SectionHead eyebrow="ETKİNLİK & TOPLANTI MERKEZİ" title="Diğer Salonlar" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="hd-others-grid">
            {others.map(h => <OtherHallCard key={h.slug} hall={h} />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hd-desc-grid   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hd-others-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          /* Galeri: mobil yüksekliği */
          .hd-gallery { height: 72vw !important; }
          .hd-gallery img { height: 72vw !important; }
          /* Butonlar: yan yana tam genişlik */
          .hd-btns {
            flex-wrap: nowrap !important;
            gap: 8px !important;
          }
          .hd-btns a {
            flex: 1 !important;
            padding: 0 12px !important;
            font-size: 12px !important;
            white-space: nowrap !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}

function RezervasjonBtn() {
  const [hov, setHov] = useState(false);
  return (
    <Link to="/rezervasyon" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, sans-serif", fontSize: "14px",
      letterSpacing: "0.04em", textTransform: "uppercase",
      color: hov ? "#fff" : DARK, background: hov ? DARK : "transparent",
      border: `1px solid ${DARK}`, padding: "0 48px", height: "52px",
      textDecoration: "none", transition: "all 0.25s ease",
    }}>
      REZERVASYON
    </Link>
  );
}

function OtherHallCard({ hall }: { hall: typeof ALL_HALLS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/etkinlikler/${hall.slug}`} style={{ display: "block", position: "relative", height: "440px", overflow: "hidden", textDecoration: "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <img src={hall.img} alt={hall.title} style={{
        width: "100%", height: "100%", objectFit: "cover", display: "block",
        transform: hov ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        filter: hov ? "brightness(0.55)" : "brightness(0.45)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 2.2vw, 32px)", fontWeight: 400, color: "#ffffff", margin: 0, lineHeight: 1.15, letterSpacing: "0.03em", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
          {hall.title}
        </h3>
      </div>
    </Link>
  );
}
