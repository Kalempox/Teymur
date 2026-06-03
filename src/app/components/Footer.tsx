import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Twitter, Youtube, X, Leaf } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useContent } from "../context/ContentContext";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

export function Footer() {
  const [showCert, setShowCert] = useState(false);
  const { t } = useLang();
  const { global: g, footer: f } = useContent();

  const openCert = () => {
    setShowCert(true);
    document.body.style.overflow = "hidden";
  };

  const closeCert = () => {
    setShowCert(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!showCert) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeCert(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showCert]);

  const exploreLinks = [
    { label: t("nav.rooms"), href: "/odalar" },
    { label: t("nav.dining"), href: "/restoran" },
    { label: t("nav.convention"), href: "/etkinlikler" },
    { label: t("nav.wellness"), href: "/saglik" },
    { label: t("nav.gallery"), href: "/galeri" },
    { label: t("nav.offers"), href: "/teklifler" },
  ];

  const infoLinks = [
    { label: t("footer.about"), href: "/hakkimizda" },
    { label: t("footer.gaziantep"), href: "/gaziantep" },
    { label: t("nav.contact"), href: "/iletisim" },
    { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  ];

  return (
    <>
      <footer style={{ backgroundColor: DARK }}>

        {/* ══ MASAÜSTÜ: 4 kolon ══ */}
        <div className="footer-desktop">
          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 6vw", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "5vw", alignItems: "start" }}>

            {/* Brand */}
            <div>
              <div style={{ marginBottom: "28px" }}>
                <img src={g.logoUrl} alt={g.hotelName} style={{ height: "52px", width: "auto", display: "block", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.9, color: "rgba(255,255,255,0.4)", maxWidth: "240px", marginBottom: "28px" }}>
                {f.description}
              </p>
              <div style={{ display: "flex", gap: "18px", alignItems: "center", marginBottom: "36px" }}>
                {[
                  { icon: Instagram, href: g.social.instagram },
                  { icon: Facebook,  href: g.social.facebook },
                  { icon: Twitter,   href: g.social.twitter },
                  { icon: Youtube,   href: g.social.youtube },
                  { icon: Linkedin,  href: g.social.linkedin },
                ].map(({ icon: Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.3s", lineHeight: 0 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = GOLD)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
                  ><Icon size={15} /></a>
                ))}
              </div>
              <button onClick={openCert}
                style={{ padding: "18px 20px", backgroundColor: "#ffffff", border: `1px solid ${GOLD}`, borderRadius: "2px", cursor: "pointer", width: "100%", maxWidth: "220px", textAlign: "center", transition: "all 0.35s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", boxShadow: "0 4px 20px rgba(219,190,140,0.12)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#faf8f4"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(219,190,140,0.08)" }}>
                  <Leaf size={16} color={GOLD} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: 500, color: DARK, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "4px", lineHeight: 1.3 }}>
                    {f.certTitle}
                  </h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: "rgba(5,15,40,0.4)", lineHeight: 1.5, margin: 0 }}>
                    {f.certSubtitle}
                  </p>
                </div>
              </button>
            </div>

            {/* Keşfet */}
            <div>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "28px", fontWeight: 400 }}>
                {t("footer.explore")}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {exploreLinks.map((link) => (
                  <li key={link.href} style={{ marginBottom: "14px" }}>
                    <Link to={link.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bilgi */}
            <div>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "28px", fontWeight: 400 }}>
                {t("footer.info")}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {infoLinks.map((link) => (
                  <li key={link.label} style={{ marginBottom: "14px" }}>
                    <Link to={link.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "28px", fontWeight: 400 }}>
                {t("footer.contact")}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <MapPin size={14} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                    {g.address}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <Phone size={14} color={GOLD} />
                  <a href={`tel:${g.phone.replace(/\s/g,"")}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                  >{g.phone}</a>
                </div>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <Mail size={14} color={GOLD} />
                  <a href={`mailto:${g.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                  >{g.email}</a>
                </div>
              </div>
              <a href={g.reservationUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: DARK, backgroundColor: GOLD, padding: "14px 28px", textDecoration: "none", transition: "background 0.3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#c9a96e")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = GOLD)}
              >{t("footer.reserve")}</a>
            </div>
          </div>
        </div>

        {/* ══ MOBİL: kompakt layout ══ */}
        <div className="footer-mobile">
          {/* Üst: Logo + Sosyal + Rezervasyon */}
          <div style={{ borderBottom: "1px solid rgba(219,190,140,0.12)", padding: "40px 6vw 32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <img src={g.logoUrl} alt={g.hotelName} style={{ height: "40px", width: "auto", display: "block", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", lineHeight: 1.7, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                {f.description}
              </p>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                {[
                  { icon: Instagram, href: g.social.instagram },
                  { icon: Facebook,  href: g.social.facebook },
                  { icon: Twitter,   href: g.social.twitter },
                  { icon: Youtube,   href: g.social.youtube },
                  { icon: Linkedin,  href: g.social.linkedin },
                ].map(({ icon: Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", lineHeight: 0 }}
                  ><Icon size={14} /></a>
                ))}
              </div>
              <a href={g.reservationUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: DARK, backgroundColor: GOLD, padding: "12px 24px", textDecoration: "none", alignSelf: "flex-start" }}
              >{t("footer.reserve")}</a>
            </div>
          </div>

          {/* Orta: Keşfet | Bilgi */}
          <div style={{ borderBottom: "1px solid rgba(219,190,140,0.08)", padding: "32px 6vw" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5vw" }}>
              <div>
                <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 400 }}>
                  {t("footer.explore")}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {exploreLinks.map((link) => (
                    <li key={link.href} style={{ marginBottom: "10px" }}>
                      <Link to={link.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 400 }}>
                  {t("footer.info")}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {infoLinks.map((link) => (
                    <li key={link.label} style={{ marginBottom: "10px" }}>
                      <Link to={link.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Alt: İletişim */}
          <div style={{ borderBottom: "1px solid rgba(219,190,140,0.08)", padding: "24px 6vw" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <MapPin size={13} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                  {g.address}
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone size={13} color={GOLD} />
                <a href={`tel:${g.phone.replace(/\s/g,"")}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{g.phone}</a>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Mail size={13} color={GOLD} />
                <a href={`mailto:${g.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{g.email}</a>
              </div>
              <button onClick={openCert} style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: `1px solid rgba(219,190,140,0.2)`, padding: "10px 18px", cursor: "pointer", color: "rgba(255,255,255,0.4)", alignSelf: "flex-start", marginTop: "4px" }}>
                <Leaf size={13} color={GOLD} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>{t("cert.title")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div style={{ padding: "24px 6vw", maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em", margin: 0 }}>
            {f.copyright}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em", margin: 0 }}>
            {t("footer.design")}{" "}
            <a href="https://taaf.com.tr" target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(219,190,140,0.55)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(219,190,140,0.55)"; }}
            >Taaf Medya</a>
          </p>
        </div>

        <style>{`
          .footer-mobile { display: none; }
          .footer-desktop { display: block; border-bottom: 1px solid rgba(219,190,140,0.12); }
          @media (max-width: 640px) {
            .footer-desktop { display: none; }
            .footer-mobile { display: block; }
          }
        `}</style>
      </footer>

      {/* ── SUSTAINABLE TOURISM CERTIFICATE MODAL ── */}
      {showCert && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(5,12,30,0.97)", backdropFilter: "blur(24px) saturate(180%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", animation: "fadeInCert 0.35s cubic-bezier(0.22,1,0.36,1)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeCert(); }}
        >
          <button onClick={closeCert}
            style={{ position: "absolute", top: "24px", right: "24px", zIndex: 10001, width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)", transition: "background 0.3s, border-color 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(219,190,140,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(219,190,140,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)"; }}
          ><X size={16} /></button>

          <div style={{ position: "absolute", top: "32px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Inter', sans-serif", fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", zIndex: 10001 }}>ESC</div>

          <div style={{ maxWidth: "560px", width: "100%", textAlign: "center", padding: "60px 40px", border: "1px solid rgba(219,190,140,0.12)", backgroundColor: "rgba(5,15,40,0.6)" }}>
            <div style={{ width: "56px", height: "56px", border: `1px solid rgba(219,190,140,0.3)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
              <Leaf size={20} color={GOLD} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
              <div style={{ width: "32px", height: "1px", backgroundColor: GOLD, opacity: 0.4 }} />
              <div style={{ width: "4px", height: "4px", border: `1px solid ${GOLD}`, transform: "rotate(45deg)", opacity: 0.5 }} />
              <div style={{ width: "32px", height: "1px", backgroundColor: GOLD, opacity: 0.4 }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 300, color: "#ffffff", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 24px", lineHeight: 1.1 }}>
              {f.certModalTitle}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.95, color: "rgba(255,255,255,0.45)", margin: "0 0 40px" }}>
              {f.certModalBody}
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "14px 28px", border: "1px solid rgba(219,190,140,0.2)", marginBottom: "32px" }}>
              <Leaf size={13} color={GOLD} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>TURSAB · STR · ISO 14001</span>
            </div>
            <button onClick={closeCert}
              style={{ display: "block", width: "100%", fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: "8px", transition: "color 0.3s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
            >KAPAT</button>
          </div>

          <style>{`@keyframes fadeInCert { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
      )}
    </>
  );
}
