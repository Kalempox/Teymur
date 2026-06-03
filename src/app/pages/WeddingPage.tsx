import { Link } from "react-router";
import { Heart, ArrowRight } from "lucide-react";
import { AnimatedSection, AnimatedImage, SectionLabel } from "../components/AnimatedSection";

const GOLD = "#dbbe8c";
const DARK = "#050f28";
const CREAM = "#f7f4ef";

const packages = [
  {
    name: "Pearl",
    guests: "Maks. 100",
    price: "₺85.000",
    features: ["Küçük Salon", "Akşam Yemeği", "Düğün Pastası", "Dekorasyon", "Fotoğraf"],
  },
  {
    name: "Gold",
    guests: "Maks. 300",
    price: "₺185.000",
    features: ["Mezopotamya Salonu", "Yemek & İçecek", "Premium Dekor", "Fotoğraf & Video", "Müzik"],
    featured: true,
  },
  {
    name: "Diamond",
    guests: "Maks. 2.000",
    price: "Özel Fiyat",
    features: ["Grand Ballroom", "Açık Büfe", "Lüks Dekor", "Fotoğraf & Video", "Canlı Müzik", "Butler", "Konaklama"],
  },
];

export function WeddingPage() {
  return (
    <div>
      {/* CINEMATIC HERO */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1759519238029-689e99c6d19e?w=1920&q=90&fit=crop"
          alt="Wedding"
          style={{ position: "absolute", inset: 0, width: "100%", height: "120%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,15,40,0.4) 0%, rgba(5,15,40,0.65) 100%)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 6vw",
          }}
        >
          <Heart size={28} color={GOLD} style={{ marginBottom: "24px" }} />
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.45em", color: GOLD, textTransform: "uppercase", marginBottom: "24px" }}>
            Düğün & Özel Etkinlikler
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 11vw, 160px)",
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 0.88,
              margin: "0 0 28px",
              letterSpacing: "-0.02em",
            }}
          >
            Hayalinizdeki
            <br />
            <span style={{ color: GOLD }}>Düğün</span>
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontStyle: "normal",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "560px",
              lineHeight: 1.4,
              marginBottom: "48px",
            }}
          >
            En özel gününüzü Teymur Continental Hotel'in eşsiz zarafetinde yaşayın
          </p>
          <Link
            to="#packages"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: DARK,
              backgroundColor: GOLD,
              padding: "18px 52px",
              textDecoration: "none",
            }}
          >
            Paketleri İncele
          </Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: "20px 6vw", borderBottom: "1px solid rgba(5,15,40,0.07)" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link to="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: GOLD, textDecoration: "none" }}>Ana Sayfa</Link>
          <span style={{ color: "rgba(5,15,40,0.25)", fontSize: "10px" }}>·</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(5,15,40,0.45)" }}>Düğün</span>
        </div>
      </div>

      {/* EDITORIAL INTRO */}
      <section style={{ padding: "160px 6vw", maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8vw", alignItems: "center" }}>
        <AnimatedImage
          src="https://images.unsplash.com/photo-1759730840961-09faa5731a3b?w=900&q=80&fit=crop"
          alt="Wedding venue"
          style={{ aspectRatio: "4/5" }}
          delay={0}
        />
        <AnimatedSection direction="right" delay={0.15}>
          <SectionLabel>Düğün Hikayeniz</SectionLabel>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 6vw, 80px)",
              fontWeight: 300,
              color: DARK,
              lineHeight: 1.0,
              margin: "0 0 32px",
            }}
          >
            Her Detay
            <br />
            <span style={{ color: GOLD }}>Mükemmel</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.9, color: "rgba(5,15,40,0.55)", marginBottom: "24px", maxWidth: "420px" }}>
            Teymur Continental Hotel'in deneyimli düğün ekibi, hayalinizdeki düğünü tasarlamak için başından sonuna kadar yanınızdadır.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.9, color: "rgba(5,15,40,0.55)", marginBottom: "48px", maxWidth: "420px" }}>
            Grand Ballroom'dan romantik küçük törenlere, geleneksel Gaziantep lezzetlerinden uluslararası menülere kadar her isteğiniz gerçeğe dönüşür.
          </p>

          {/* Services */}
          {[
            { title: "Kişisel Koordinatör", desc: "Seçilmiş düğün koordinatörünüz tüm süreçte yanınızda" },
            { title: "Premium Mutfak", desc: "Özel menü ve uluslararası açık büfe seçenekleri" },
            { title: "Dekor & Çiçek", desc: "Vizyonunuzu hayata geçiren usta dekor ekibi" },
          ].map((s) => (
            <div key={s.title} style={{ padding: "20px 0", borderBottom: "1px solid rgba(5,15,40,0.07)" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 500, color: DARK, marginBottom: "4px" }}>{s.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(5,15,40,0.5)", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}

          <Link
            to="/iletisim"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: DARK,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              borderBottom: `1px solid ${GOLD}`,
              paddingBottom: "4px",
              marginTop: "40px",
            }}
          >
            Ücretsiz Danışma <ArrowRight size={13} />
          </Link>
        </AnimatedSection>
      </section>

      {/* PHOTO TRIPTYCH */}
      <section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", height: "65vh", gap: "3px" }}>
          <AnimatedImage
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80&fit=crop"
            alt="Wedding 1"
            style={{}}
            delay={0}
          />
          <AnimatedImage
            src="https://images.unsplash.com/photo-1759519238029-689e99c6d19e?w=1000&q=80&fit=crop"
            alt="Wedding 2"
            style={{}}
            delay={0.1}
          />
          <AnimatedImage
            src="https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=600&q=80&fit=crop"
            alt="Wedding 3"
            style={{}}
            delay={0.2}
          />
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ padding: "160px 6vw", backgroundColor: CREAM }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <SectionLabel>Düğün Paketleri</SectionLabel>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 300, color: DARK, lineHeight: 1.05 }}>
                Size Özel
                <br />
                <span style={{ color: GOLD }}>Düğün Paketleri</span>
              </h2>
            </AnimatedSection>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px" }}>
            {packages.map((pkg, i) => (
              <AnimatedSection key={pkg.name} direction="up" delay={i * 0.1}>
                <div
                  style={{
                    backgroundColor: pkg.featured ? DARK : "#ffffff",
                    padding: "60px 48px",
                    position: "relative",
                    textAlign: "center",
                    borderTop: `2px solid ${pkg.featured ? GOLD : "transparent"}`,
                  }}
                >
                  {pkg.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: GOLD,
                        color: DARK,
                        padding: "5px 24px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      En Popüler
                    </div>
                  )}

                  <Heart size={20} color={GOLD} style={{ marginBottom: "24px" }} />

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "48px",
                      fontWeight: 300,
                      color: pkg.featured ? "#ffffff" : DARK,
                      letterSpacing: "0.05em",
                      marginBottom: "8px",
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: pkg.featured ? "rgba(255,255,255,0.4)" : "rgba(5,15,40,0.4)", marginBottom: "20px", textTransform: "uppercase" }}>
                    {pkg.guests} Kişi
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontStyle: "normal", color: GOLD, marginBottom: "36px" }}>
                    {pkg.price}
                  </div>

                  <div style={{ width: "40px", height: "1px", backgroundColor: pkg.featured ? "rgba(255,255,255,0.15)" : "rgba(5,15,40,0.1)", margin: "0 auto 36px" }} />

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          color: pkg.featured ? "rgba(255,255,255,0.6)" : "rgba(5,15,40,0.65)",
                          padding: "11px 0",
                          borderBottom: `1px solid ${pkg.featured ? "rgba(255,255,255,0.06)" : "rgba(5,15,40,0.05)"}`,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: GOLD, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/iletisim"
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: pkg.featured ? DARK : "#ffffff",
                      backgroundColor: pkg.featured ? GOLD : DARK,
                      padding: "16px 24px",
                      textDecoration: "none",
                      transition: "background 0.3s",
                    }}
                  >
                    Bilgi Al
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — immersive */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden" }}>
        <AnimatedImage
          src="https://images.unsplash.com/photo-1759730840961-09faa5731a3b?w=1920&q=80&fit=crop"
          alt="Wedding CTA"
          style={{ position: "absolute", inset: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,15,40,0.72)" }} />
        <AnimatedSection direction="up" delay={0} style={{ position: "relative", padding: "100px 6vw" }}>
          <Heart size={24} color={GOLD} style={{ marginBottom: "20px" }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 8vw, 112px)", fontWeight: 300, color: "#ffffff", lineHeight: 0.95, margin: "0 0 24px" }}>
            Hayalinizi
            <br />
            <span style={{ color: GOLD }}>Birlikte</span>
            <br />
            Planlayalım
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontStyle: "normal", color: "rgba(255,255,255,0.55)", marginBottom: "52px" }}>
            Ücretsiz danışma toplantısı için iletişime geçin
          </p>
          <Link
            to="/iletisim"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: DARK,
              backgroundColor: GOLD,
              padding: "18px 56px",
              textDecoration: "none",
            }}
          >
            İletişime Geçin
          </Link>
        </AnimatedSection>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 2fr 1fr"] { grid-template-columns: 1fr !important; height: auto !important; }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
