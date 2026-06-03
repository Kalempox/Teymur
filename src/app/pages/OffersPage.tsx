import { Link } from "react-router";
import { Tag, Clock, ArrowRight } from "lucide-react";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

const offers = [
  {
    title: "Bahar Kaçamağı",
    subtitle: "Sezon Özel",
    discount: "%20",
    validity: "30 Haziran 2024'e kadar",
    desc: "Bahar mevsiminde Gaziantep'in güzelliğini keşfedin. Erken rezervasyon fırsatıyla oda ücretinde %20 indirim ve zengin kahvaltı dahil.",
    includes: ["Çift kişilik oda", "Türk kahvaltısı dahil", "Welcome drinksi", "Şehir tur rehberi"],
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=700&q=80&fit=crop",
    tag: "Özel Fiyat",
    featured: true,
  },
  {
    title: "Business Excellence",
    subtitle: "Kurumsal Paket",
    discount: "Özel",
    validity: "Yıl boyunca geçerli",
    desc: "İş seyahatleriniz için tasarlanmış kapsamlı kurumsal paket. Hızlı check-in, lounge erişimi ve toplantı odası dahil.",
    includes: ["Executive oda", "Lounge erişimi", "Hızlı check-in/out", "2 saat toplantı odası"],
    img: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=700&q=80&fit=crop",
    tag: "Kurumsal",
    featured: false,
  },
  {
    title: "Gelin & Damat Paketi",
    subtitle: "Düğün Gecesi",
    discount: "Ücretsiz Yükseltme",
    validity: "Rezervasyonla",
    desc: "Düğün gününüzü unutulmaz kılacak özel paket. Çiçek aranjmanı, kabarcıklı şarap ve ücretsiz süit yükseltmesi.",
    includes: ["Ücretsiz Süit Yükseltme", "Romantik dekorasyon", "Şampanya & meyve tabağı", "Geç çıkış (14:00)"],
    img: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=700&q=80&fit=crop",
    tag: "Düğün",
    featured: false,
  },
  {
    title: "Uzun Konaklama",
    subtitle: "7+ Gece",
    discount: "%30",
    validity: "7 ve üzeri konaklamalarda",
    desc: "7 gece ve üzeri konaklamalarınızda oda ücretinde %30 indirim kazanın. Uzun süreli konaklamalar için ideal fırsat.",
    includes: ["Seçilen tüm odalar", "Kahvaltı dahil", "Çamaşır servisi", "Ücretsiz transfer (havalimanı-otel)"],
    img: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=700&q=80&fit=crop",
    tag: "Uzun Konaklama",
    featured: false,
  },
  {
    title: "Gastronomi Turu",
    subtitle: "Lezzet Deneyimi",
    discount: "Paket Fiyatı",
    validity: "Tüm Hafta Sonları",
    desc: "Gaziantep'in UNESCO tescilli gastronomik mirasını keşfetmek için özel tur. Otel konaklaması ve rehberli baklava atölyesi dahil.",
    includes: ["2 gece konaklama", "Baklava atölyesi", "Şehir gastronomik turu", "Geleneksel öğle yemeği"],
    img: "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=700&q=80&fit=crop",
    tag: "Deneyim",
    featured: false,
  },
  {
    title: "Convention Erken Rezervasyon",
    subtitle: "Etkinlik & Organizasyon",
    discount: "%15",
    validity: "3 ay öncesi rezervasyonlarda",
    desc: "Etkinliğinizi 3 ay önceden planlayın, salon ücretinde %15 indirim kazanın. Convention Center ve düğün organizasyonları için geçerli.",
    includes: ["Salon ücreti indirimi", "Teknik ekip desteği", "Ücretsiz keşif turu", "Öncelikli tarih rezervasyonu"],
    img: "https://images.unsplash.com/photo-1759519238029-689e99c6d19e?w=700&q=80&fit=crop",
    tag: "Etkinlik",
    featured: false,
  },
];

export function OffersPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1646991761123-d83ce47c30c9?w=1920&q=85&fit=crop"
          alt="Offers"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,15,40,0.65)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: "16px" }}>
            Özel Teklifler
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 7vw, 80px)", fontWeight: 300, color: "#ffffff", lineHeight: 1.1, margin: "0 0 20px" }}>
            Ayrıcalıklı
            <br />
            <span style={{ color: GOLD }}>Fırsatlar</span>
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontStyle: "normal", color: "rgba(255,255,255,0.75)" }}>
            Size özel kampanya ve paketlerimizi keşfedin
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: "20px 2rem", maxWidth: "1400px", margin: "0 auto", borderBottom: "1px solid rgba(5,15,40,0.08)" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link to="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: GOLD, textDecoration: "none" }}>Ana Sayfa</Link>
          <span style={{ color: "rgba(5,15,40,0.3)", fontSize: "12px" }}>/</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(5,15,40,0.5)" }}>Teklifler & Kampanyalar</span>
        </div>
      </div>

      {/* Featured Offer */}
      <section style={{ padding: "80px 2rem 40px", maxWidth: "1400px", margin: "0 auto" }}>
        {offers.filter((o) => o.featured).map((offer) => (
          <div
            key={offer.title}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              overflow: "hidden",
              boxShadow: "0 8px 60px rgba(5,15,40,0.12)",
            }}
          >
            <div style={{ position: "relative", overflow: "hidden", minHeight: "500px" }}>
              <img
                src={offer.img}
                alt={offer.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  backgroundColor: GOLD,
                  color: DARK,
                  padding: "8px 20px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                }}
              >
                ÖNE ÇIKAN TEKLİF
              </div>
            </div>
            <div style={{ padding: "60px", backgroundColor: "#f9f7f3", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "12px" }}>
                {offer.subtitle} · {offer.validity}
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 300, color: DARK, lineHeight: 1.1, marginBottom: "12px" }}>
                {offer.title}
              </h2>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 600, color: GOLD, marginBottom: "24px" }}>
                {offer.discount} İndirim
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.8, color: "rgba(5,15,40,0.65)", marginBottom: "28px" }}>
                {offer.desc}
              </p>
              <div style={{ marginBottom: "36px" }}>
                {offer.includes.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid rgba(5,15,40,0.06)" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: GOLD, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(5,15,40,0.7)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/iletisim"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  backgroundColor: DARK,
                  padding: "16px 32px",
                  textDecoration: "none",
                  alignSelf: "flex-start",
                }}
              >
                Hemen Rezervasyon <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* All Offers */}
      <section style={{ padding: "60px 2rem 100px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: DARK }}>
            Diğer Fırsatlar
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "32px" }}>
          {offers.filter((o) => !o.featured).map((offer) => (
            <div
              key={offer.title}
              style={{
                overflow: "hidden",
                boxShadow: "0 4px 30px rgba(5,15,40,0.06)",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 12px 60px rgba(5,15,40,0.12)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(5,15,40,0.06)")}
            >
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                <img
                  src={offer.img}
                  alt={offer.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", gap: "8px" }}>
                  <span style={{ backgroundColor: GOLD, color: DARK, padding: "4px 12px", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 700 }}>
                    {offer.tag}
                  </span>
                  <span style={{ backgroundColor: DARK, color: GOLD, padding: "4px 12px", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.1em", fontWeight: 700 }}>
                    {offer.discount} ↓
                  </span>
                </div>
              </div>
              <div style={{ padding: "36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Clock size={13} color={GOLD} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(5,15,40,0.5)" }}>{offer.validity}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 400, color: DARK, marginBottom: "12px" }}>{offer.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.8, color: "rgba(5,15,40,0.6)", marginBottom: "20px" }}>{offer.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
                  {offer.includes.slice(0, 3).map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Tag size={11} color={GOLD} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(5,15,40,0.6)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/iletisim"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: DARK,
                    textDecoration: "none",
                    borderBottom: `1px solid ${GOLD}`,
                    paddingBottom: "2px",
                  }}
                >
                  Teklif Al <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ backgroundColor: DARK, padding: "80px 2rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#ffffff", marginBottom: "16px" }}>
            Özel Tekliflerden İlk Siz Haberdar Olun
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "36px" }}>
            Sezon kampanyaları, özel etkinlikler ve misafir ayrıcalıkları için bültenimize kaydolun
          </p>
          <div style={{ display: "flex", gap: "0", maxWidth: "480px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              style={{
                flex: 1,
                padding: "16px 20px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                border: "none",
                borderBottom: "2px solid rgba(219,190,140,0.5)",
                backgroundColor: "rgba(255,255,255,0.07)",
                color: "#ffffff",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: GOLD,
                color: DARK,
                border: "none",
                padding: "16px 24px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Abone Ol
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
