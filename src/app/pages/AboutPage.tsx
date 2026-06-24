import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useContent, useT } from "../context/ContentContext";

const GOLD  = "#dbbe8c";
const DARK  = "#050f28";
const MID   = "#5a4a3a";
const MUTED = "#a09080";
const CREAM = "#f5f2ed";
const BORDER = "rgba(219,190,140,0.25)";

const HERO_IMGS = [
  "https://www.teymurcontinentalhotel.com/panel/uploads/pages_v/original/11.jpg",
  "https://www.teymurcontinentalhotel.com/assets/img/photo-title.jpg",
  "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/16.jpg",
  "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/1.jpg",
  "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/11.jpg",
];

const services = [
  {
    title: "Lüks Odalar & Süitler",
    desc: "Teymur Continental Hotel'in lüks odaları ve süitleri, konfor ve zarafeti ön planda tutarak huzurlu bir dinlenme ortamı sunar. Şehrin eşsiz ruhuna olan yakınlığımız bizi farklı kılan en önemli unsurdur.",
    link: "/odalar",
    linkText: "Odalar & Süitler",
    img: "https://www.teymurcontinentalhotel.com/panel/uploads/rooms_v/original/16.jpg",
  },
  {
    title: "Sof Restaurant – Fine Dining",
    desc: "Gaziantep mutfağının en seçkin örneklerini uluslararası lezzetlerle harmanlayan ödüllü restoranımızda unutulmaz bir fine dining deneyimi yaşayın. UNESCO Gastronomik Şehri'nin eşsiz tatları masanıza geliyor.",
    link: "/restoran/sof-restaurant",
    linkText: "Restoranlar",
    img: "https://www.teymurcontinentalhotel.com/panel/uploads/product_v/400x400/a-la-carte-ve-cocuk-2.jpg",
  },
  {
    title: "Spa & Sağlık Merkezi",
    desc: "Yoğun bir günün ardından ruhunuzu ve bedeninizi dinlendirebileceğiniz tam donanımlı spa ve sağlık merkezimiz hizmetinizdedir. Türk hamamı ritüelleri ve uzman masaj terapileriyle kendinizi yenileyin.",
    link: "/saglik",
    linkText: "Spa & Sağlık",
    img: "https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=900&q=85&fit=crop",
  },
  {
    title: "Convention Center",
    desc: "Modern teknoloji ile donatılmış esnek toplantı salonlarımız ve balo salonumuz, büyük konferanslardan özel kurumsal davetlere kadar her türlü organizasyon için idealdir. Profesyonel etkinlik ekibimiz kusursuz bir deneyim garanti eder.",
    link: "/etkinlikler",
    linkText: "Toplantı & Etkinlik",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=85&fit=crop",
  },
];



export function AboutPage() {
  const siteContent = useContent();
  const about = siteContent.about;
  const t = useT();
  const HERO_IMGS_DYNAMIC = about.heroImages;
  const services = about.services;

  const [heroIdx, setHeroIdx] = useState(0);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goHero = (next: number) => setHeroIdx((next + HERO_IMGS_DYNAMIC.length) % HERO_IMGS_DYNAMIC.length);

  useEffect(() => {
    heroTimer.current = setInterval(() => goHero(heroIdx + 1), 5000);
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, [heroIdx]);

  return (
    <div style={{ color: DARK, backgroundColor: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>

      {/* ── HERO CAROUSEL — fixed ── */}
      <div className="about-hero-fixed" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 0, overflow: "hidden", backgroundColor: "#1a1209" }}>
        {HERO_IMGS_DYNAMIC.map((src, i) => (
          <img key={i} src={src} alt="Teymur Continental Hotel" style={{
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

        {/* Dots */}
        <div style={{ position: "absolute", bottom: "36px", right: "64px", display: "flex", gap: "8px", zIndex: 5 }}>
          {HERO_IMGS_DYNAMIC.map((_, i) => (
            <button key={i} onClick={() => goHero(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
              <div style={{ width: i === heroIdx ? "28px" : "7px", height: "1.5px", backgroundColor: i === heroIdx ? "#fff" : "rgba(255,255,255,0.45)", transition: "all 0.35s ease", borderRadius: "1px" }} />
            </button>
          ))}
        </div>

        {/* Bottom text */}
        <div style={{ position: "absolute", bottom: "100px", left: 0, right: 0, padding: "0 6vw" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "14px" }}>
            Hakkımızda
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4.2vw, 56px)", fontWeight: 400, color: "#ffffff", margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "0.02em" }}>
            Gaziantep'in Kalbinde Beş Yıldızlı Lüks
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "460px", margin: 0 }}>
            Geleneksel misafirperverliği modern lüksle buluşturan, kültür, lezzet ve iş dünyasının kesişim noktasındaki 5 yıldızlı otel.
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="about-hero-spacer" style={{ height: "100vh" }} />

      {/* ══ İÇERİK ══ */}
      <div style={{ position: "relative", zIndex: 1, backgroundColor: "#fff" }}>

        {/* ── Hero: split layout (breadcrumb yok) ── */}
        <section style={{ display: "grid", gridTemplateColumns: "45fr 55fr", minHeight: "90vh" }} className="about-hero-grid">
          <div style={{ padding: "80px 56px 80px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }} className="about-hero-text">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.2vw, 50px)", fontWeight: 400, lineHeight: 1.2, color: DARK, margin: "0 0 32px" }}>
              {t("about.heroTitle", about.heroTitle)}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.85, color: MID, maxWidth: "500px", margin: "0 0 20px" }}>
              {t("about.heroText1", about.heroText1)}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.85, color: MID, maxWidth: "500px", margin: 0 }}>
              {t("about.heroText2", about.heroText2)}
            </p>
          </div>
          <div className="about-hero-img" style={{ overflow: "hidden", minHeight: "500px" }}>
            <img
              src={about.heroImg}
              alt="Teymur Continental Hotel"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </section>

        {/* ── Boşluk + full-width bina görseli (sadece mobil) ── */}
        <div className="about-gap about-building-wrap" style={{ height: "48px" }} />
        <section style={{ height: "58vh", overflow: "hidden", margin: "0 48px" }} className="about-building-img about-building-wrap">
          <img
            src="https://www.teymurcontinentalhotel.com/panel/uploads/pages_v/original/11.jpg"
            alt="Teymur Continental Hotel binası"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
          />
        </section>
        <div className="about-building-wrap" style={{ height: "48px" }} />
        <div className="about-section-gap" style={{ height: "64px" }} />

        {/* ── Sürdürülebilirlik / Story ── */}
        <section style={{ display: "grid", gridTemplateColumns: "55fr 45fr", minHeight: "600px" }} className="about-story-grid">
          <div style={{ overflow: "hidden", minHeight: "480px" }}>
            <img
              src={about.storyImg}
              alt="Sürdürülebilir otelcilik"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ padding: "80px 80px 80px 56px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }} className="about-story-text">
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: MUTED, marginBottom: "32px" }}>
              {t("about.storyLabel", about.storyLabel)}
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 2.4vw, 38px)", fontWeight: 400, fontStyle: "normal", lineHeight: 1.3, color: DARK, marginBottom: "28px" }}>
              {t("about.storyTitle", about.storyTitle)}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.85, color: MID, marginBottom: "20px", maxWidth: "460px" }}>
              {t("about.storyText1", about.storyText1)}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.85, color: MID, marginBottom: "28px", maxWidth: "460px" }}>
              {t("about.storyText2", about.storyText2)}
            </p>
            <Link to="/iletisim" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: DARK, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", paddingBottom: "2px", borderBottom: `1px solid ${GOLD}`, alignSelf: "flex-start" }}>
              Bizimle iletişime geçin
            </Link>
          </div>
        </section>

        {/* ── HİZMETLERİMİZ — görsel + metin kartları ── */}
        <section style={{ padding: "100px 0 60px" }}>
          <div style={{ padding: "0 80px 64px" }} className="about-padded">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 300, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
              Teymur Continental'da
            </h2>
          </div>

          {services.map((s, i) => {
            const reverse = i % 2 !== 0;
            const textPanel = (
              <div className="service-text-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 64px", backgroundColor: CREAM }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: MUTED, marginBottom: "20px" }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 2.4vw, 38px)", fontWeight: 400, color: DARK, margin: "0 0 24px", lineHeight: 1.15, letterSpacing: "0.01em" }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 2, color: MID, margin: "0 0 40px", maxWidth: "400px" }}>
                  {s.desc}
                </p>
                <Link
                  to={s.link}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: DARK, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", paddingBottom: "2px", borderBottom: `1px solid ${GOLD}`, alignSelf: "flex-start" }}
                >
                  {s.linkText}
                </Link>
              </div>
            );
            const imgPanel = (
              <div className="service-img-panel" style={{ overflow: "hidden", minHeight: "480px" }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            );
            return (
              <div key={s.title} style={{ display: "grid", gridTemplateColumns: "50% 50%", height: "480px", marginBottom: "40px" }} className={`service-card${reverse ? " service-card-rev" : ""}`}>
                {imgPanel}{textPanel}
              </div>
            );
          })}
        </section>

        {/* ── Vizyon & Misyon — alt alta, detaylı ── */}
        <div style={{ height: "48px" }} />
        <section style={{ backgroundColor: CREAM, padding: "100px 80px" }} className="about-padded">
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>

            {/* Başlık */}
            <div style={{ marginBottom: "80px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 3vw, 48px)", fontWeight: 300, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                Vizyon & Misyon
              </h2>
            </div>

            {/* Vizyon */}
            <div style={{ marginBottom: "72px" }}>
              {about.visionTitle && (
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 2.8vw, 42px)", fontWeight: 400, color: DARK, marginBottom: "24px", lineHeight: 1.2 }}>
                  {about.visionTitle}
                </h3>
              )}
              {about.visionTexts.map((text, i) => (
                <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.95, color: MID, marginBottom: "20px" }}>
                  {text}
                </p>
              ))}
            </div>

            {/* Ayraç */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "72px" }}>
              <div style={{ flex: 1, height: "1px", backgroundColor: BORDER }} />
              <div style={{ width: "6px", height: "6px", backgroundColor: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
              <div style={{ flex: 1, height: "1px", backgroundColor: BORDER }} />
            </div>

            {/* Misyon */}
            <div style={{ marginBottom: "0" }}>
              {about.missionTitle && (
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 2.8vw, 42px)", fontWeight: 400, color: DARK, marginBottom: "24px", lineHeight: 1.2 }}>
                  {about.missionTitle}
                </h3>
              )}
              {about.missionTexts.map((text, i) => (
                <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.95, color: MID, marginBottom: "20px" }}>
                  {text}
                </p>
              ))}
            </div>

          </div>
        </section>

        <div style={{ height: "48px" }} />

      </div>{/* /İÇERİK */}

      <style>{`
        .about-building-wrap { display: none !important; }
        /* Desktop: reverse cards show text first, image second */
        @media (min-width: 1025px) {
          .service-card-rev .service-img-panel { order: 2; }
          .service-card-rev .service-text-panel { order: 1; }
        }
        @media (max-width: 1024px) {
          .about-hero-grid,
          .about-story-grid { grid-template-columns: 1fr !important; }
          .about-hero-text,
          .about-story-text { padding: 60px 40px !important; }
          .service-card { grid-template-columns: 1fr !important; height: auto !important; }
          .service-img-panel { min-height: 56vw; }
        }
        @media (max-width: 640px) {
          .about-hero-img { display: none !important; }
          .about-section-gap { display: none !important; }
          .about-hero-grid { min-height: unset !important; }
          .about-hero-text { padding: 28px 24px !important; }
          .about-gap { height: 16px !important; }
        }
        @media (max-width: 768px) {
          .about-padded { padding: 60px 24px !important; }
          .about-building-img { margin: 0 !important; height: 50vw !important; }
          .about-hero-text,
          .about-story-text { padding: 44px 24px !important; }
          .service-img-panel { min-height: 64vw; }
        }
      `}</style>
    </div>
  );
}
