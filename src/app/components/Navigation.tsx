import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useLang, type Lang } from "../context/LanguageContext";
import { useScrollY } from "../hooks/useInView";

const GOLD = "#c9a96e";
const DARK = "#1c1c1c";

const LANG_OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: "tr", label: "TR", flag: "https://flagcdn.com/w20/tr.png" },
  { code: "en", label: "EN", flag: "https://flagcdn.com/w20/gb.png" },
  { code: "ar", label: "AR", flag: "https://flagcdn.com/w20/sa.png" },
];

type Photo    = { src: string; label: string; href: string };
type DropMeta = { heading: string; desc: string; viewAll: string; viewHref: string };
type SimpleLink = { label: string; href: string; drop?: false };
type DropLink   = { label: string; href: string; drop: true; meta: DropMeta; photos: Photo[] };
type NavLink    = SimpleLink | DropLink;

function buildMenu(t: (k: string) => string, lang: string): { left: NavLink[]; right: NavLink[] } {
  const l = (tr: string, en: string, ar: string) =>
    lang === "en" ? en : lang === "ar" ? ar : tr;

  const left: NavLink[] = [
    {
      label: t("nav.rooms"), href: "#", drop: true,
      meta: {
        heading:  l("Odalar & Süitler", "Rooms & Suites", "الغرف والأجنحة"),
        desc:     l("Gaziantep'in kalbinde, her konforu düşünülerek tasarlanmış birbirinden özel oda ve süitlerimizi keşfedin.", "Discover our thoughtfully designed rooms and suites in the heart of Gaziantep.", "اكتشف غرفنا وأجنحتنا المصممة بعناية في قلب غازيانتيب."),
        viewAll:  l("Tüm Odaları Gör", "View All Rooms", "عرض جميع الغرف"),
        viewHref: "/odalar",
      },
      photos: [
        { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85&fit=crop", label: l("Standart French Oda", "Standard French Room", "غرفة فرنسية قياسية"), href: "/odalar/standart-french-oda" },
        { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=85&fit=crop", label: l("Standart Twin Bed",   "Standard Twin Bed",    "غرفة توأم"),          href: "/odalar/standart-twin-bed-oda" },
        { src: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&q=85&fit=crop", label: l("Standart Triple Oda", "Standard Triple Room", "غرفة ثلاثية"),       href: "/odalar/standart-triple-oda" },
        { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=85&fit=crop", label: l("Aile Süiti",          "Family Suite",         "جناح عائلي"),        href: "/odalar/aile-suiti" },
        { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=85&fit=crop", label: l("Kral Süit",           "King Suite",           "جناح كينج"),         href: "/odalar/kral-suit" },
        { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=85&fit=crop", label: l("Engelsiz Oda",        "Accessible Room",      "غرفة ذوي الاحتياجات"), href: "/odalar/engelsiz-oda" },
      ],
    },
    {
      label: t("nav.dining"), href: "#", drop: true,
      meta: {
        heading:  l("Restoran & Bar", "Dining & Bar", "المطعم والبار"),
        desc:     l("Gaziantep'in eşsiz gastronomi mirasından ilham alan menülerimizle unutulmaz bir lezzet yolculuğuna çıkın.", "Embark on a culinary journey inspired by Gaziantep's rich gastronomic heritage.", "انطلق في رحلة طهوية مستوحاة من إرث غازيانتيب الغني."),
        viewAll:  "",
        viewHref: "/restoran",
      },
      photos: [
        { src: "/panel/uploads/product_v/400x400/a-la-carte-ve-cocuk-2.jpg", label: l("Sof Restaurant",      "Sof Restaurant",  "مطعم سوف"),       href: "/restoran/sof-restaurant" },
        { src: "/panel/uploads/product_v/400x400/7.jpg",                    label: l("Bar & Lounge",        "Bar & Lounge",    "البار والصالة"),   href: "/restoran/bar-lounge"     },
        { src: "/panel/uploads/product_v/400x400/kahvalti--2.jpg",          label: l("Açık Büfe Kahvaltı",  "Breakfast",       "الإفطار"),         href: "/restoran/kahvalti"        },
      ],
    },
    {
      label: t("nav.events"), href: "#", drop: true,
      meta: {
        heading:  l("Toplantı & Etkinlikler", "Meetings & Events", "الاجتماعات والفعاليات"),
        desc:     l("2067 m² toplam alan ve 4 farklı salonumuzla her ölçekte etkinliğiniz için profesyonel hizmet sunuyoruz.", "With 2,067 m² of total space and 4 halls, we offer professional service for events of any scale.", "مع 2,067 م² من المساحة الإجمالية و4 قاعات، نقدم خدمة احترافية لجميع الفعاليات."),
        viewAll:  l("Tüm Salonları Gör", "View All Halls", "عرض جميع القاعات"),
        viewHref: "/etkinlikler",
      },
      photos: [
        { src: "/panel/uploads/product_v/400x400/beylerbeyi.jpg",                              label: l("Beylerbeyi Balo Ve Kongre Salonu", "Beylerbeyi Ballroom",      "قاعة بيليربيي"),       href: "/etkinlikler/beylerbeyi-balo-ve-kongre-salonu" },
        { src: "/panel/uploads/product_v/400x400/hayad-3.jpg",                                 label: l("Hayad Salonu",                    "Hayad Hall",               "قاعة هياد"),           href: "/etkinlikler/hayad-salonu"                    },
        { src: "/panel/uploads/product_v/400x400/5e6d3d45-aac1-4484-8f40-803b86003c3b.jpg",   label: l("Continental House Salonu",        "Continental House Hall",   "قاعة كونتيننتال هاوس"), href: "/etkinlikler/continental-house-salonu"        },
        { src: "/panel/uploads/product_v/400x400/a.jpg",                                       label: l("İpekyolu Salonu",                 "İpekyolu Hall",            "قاعة إيبكيولو"),       href: "/etkinlikler/ipekyolu-salonu"                 },
      ],
    },
    {
      label: t("nav.wellness"), href: "#", drop: true,
      meta: {
        heading:  l("Sağlık Kulübü", "Health Club", "نادي الصحة"),
        desc:     l("Antik hamam ritüelleri ve modern spa tedavileriyle beden ve ruhunuzu yenileyin.", "Renew body and soul with ancient hammam rituals and modern spa treatments.", "جدد جسدك وروحك بطقوس الحمام التركي القديمة وعلاجات السبا الحديثة."),
        viewAll:  l("Sağlığı Keşfet", "Explore Health", "استكشف الصحة"),
        viewHref: "/saglik",
      },
      photos: [
        { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=85&fit=crop", label: l("Spa & Hamam", "Spa & Hammam", "سبا والحمام التركي"), href: "/saglik/spa-hamam" },
        { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=85&fit=crop", label: l("Fitness Merkezi", "Fitness Center", "مركز اللياقة البدنية"), href: "/saglik/fitness" },
      ],
    },
  ];

  const right: NavLink[] = [
    { label: t("nav.gallery"),     href: "/galeri" },
    { label: t("nav.destination"), href: "/gaziantep" },
    {
      label: t("nav.corporate"), href: "#", drop: true,
      meta: {
        heading:  l("Kurumsal", "Corporate", "الشركة"),
        desc:     l("Teymur Continental Hotel hakkında daha fazla bilgi edinin ve kariyer fırsatlarımızı keşfedin.", "Learn more about Teymur Continental Hotel and explore career opportunities.", "تعرف على فندق تيمور كونتيننتال واستكشف فرص العمل لدينا."),
        viewAll:  "",
        viewHref: "/hakkimizda",
      },
      photos: [
        { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85&fit=crop", label: t("nav.about"),  href: "/hakkimizda" },
        { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=85&fit=crop", label: t("nav.career"), href: "/kariyer" },
      ],
    },
    { label: t("nav.contact"), href: "/iletisim" },
  ];

  return { left, right };
}

function PhotoCard({ photo }: { photo: Photo }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={photo.href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "block", textDecoration: "none" }}>
      <div style={{ overflow: "hidden", width: "100%", height: "170px" }}>
        <img src={photo.src} alt={photo.label} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          transform: hov ? "scale(1.06)" : "scale(1.0)",
        }} />
      </div>
      <div style={{
        marginTop: "10px", fontFamily: "'Inter', sans-serif", fontSize: "11px",
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: hov ? GOLD : DARK, fontWeight: 400, transition: "color 0.25s",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {photo.label}
      </div>
    </Link>
  );
}

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeKey,  setActiveKey]  = useState<string | null>(null);
  const [langOpen,   setLangOpen]   = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollY    = useScrollY();
  const location   = useLocation();
  const { lang, setLang, t } = useLang();

  const isHome   = location.pathname === "/";
  const scrolled = scrollY > 50;
  const dropOpen = activeKey !== null;
  const isLight  = scrolled || !isHome || dropOpen;

  const navBg     = isLight ? "#ffffff" : "transparent";
  const textColor = isLight ? DARK : "#ffffff";
  const navH      = scrolled ? 64 : 100;

  const { left: leftLinks, right: rightLinks } = buildMenu(t, lang);
  const allLinks    = [...leftLinks, ...rightLinks];
  const activeItem  = allLinks.find((l): l is DropLink => l.drop === true && l.label === activeKey);

  const open   = (key: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveKey(key); };
  const close  = () => { closeTimer.current = setTimeout(() => setActiveKey(null), 130); };
  const cancel = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const openL  = () => { if (langTimer.current) clearTimeout(langTimer.current); setLangOpen(true); };
  const closeL = () => { langTimer.current = setTimeout(() => setLangOpen(false), 180); };

  useEffect(() => { setMobileOpen(false); setActiveKey(null); setLangOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobileOpen]);
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (langTimer.current)  clearTimeout(langTimer.current);
  }, []);

  const currentLang = LANG_OPTIONS.find(l => l.code === lang)!;

  const allMobileLinks = [
    { label: t("nav.rooms"),       href: "/odalar" },
    { label: t("nav.dining"),      href: "/restoran" },
    { label: t("nav.events"),      href: "/etkinlikler" },
    { label: t("nav.wellness"),    href: "/saglik" },
    { label: t("nav.gallery"),     href: "/galeri" },
    { label: t("nav.destination"), href: "/gaziantep" },
    { label: t("nav.about"),       href: "/hakkimizda" },
    { label: t("nav.career"),      href: "/kariyer" },
    { label: t("nav.contact"),     href: "/iletisim" },
  ];

  const linkCss = (active: boolean): React.CSSProperties => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: "11px",
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    fontWeight: 400,
    color: active ? GOLD : textColor,
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
    transition: "color 0.25s",
  });

  const renderLinks = (links: NavLink[]) =>
    links.map(link =>
      link.drop ? (
        <button key={link.label} onMouseEnter={() => open(link.label)}
          className="nav-item"
          style={{ ...linkCss(activeKey === link.label), color: activeKey === link.label ? GOLD : textColor }}>
          {link.label}
          <ChevronDown size={10} style={{ transition: "transform 0.25s", transform: activeKey === link.label ? "rotate(180deg)" : "none", opacity: 0.6, flexShrink: 0 }} />
        </button>
      ) : (
        <Link key={link.label} to={link.href}
          className="nav-item"
          style={linkCss(location.pathname === link.href)}
          onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={e => (e.currentTarget.style.color = location.pathname === link.href ? GOLD : textColor)}>
          {link.label}
        </Link>
      )
    );

  return (
    <>
      <div
        onMouseLeave={close}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: navBg,
          borderBottom: isLight && !dropOpen ? "1px solid rgba(28,28,28,0.09)" : "none",
          boxShadow: scrolled && !dropOpen ? "0 2px 16px rgba(28,28,28,0.06)" : "none",
          transition: "background 0.45s ease, box-shadow 0.45s ease",
        }}
      >
        {/*
         * LAYOUT:
         *   [SOL flex:1, justify-end, paddingRight=logoClearance]
         *   [LOGO absolute left:50%]
         *   [SAĞ flex:1, paddingLeft=logoClearance]
         *     [Galeri…İletişim]  [marginLeft:auto]  [TR | REZERVASYON]
         *
         * paddingRight/Left logoyu çerçeveler, sol itemlar logoya doğru
         * sağa hizalanır, sağ itemlar logodan uzakta başlar.
         * maxWidth YOK — her zaman tam ekran genişliği.
         */}
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "0 40px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: `${navH}px`,
            transition: "height 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >

          {/* ── SOL GRUP ──
              flex:1         → sol yarıyı kaplar
              justify-end    → itemlar sağa (logoya doğru) hizalanır
              paddingRight   → logo ile çakışmaz                    */}
          <div
            className="nav-desktop nav-group-left"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {renderLinks(leftLinks)}
          </div>

          {/* ── LOGO — her zaman ekranın tam ortasında ── */}
          <Link
            to="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <img
              src="/otellogo.png"
              alt="Teymur Continental Hotel"
              className="nav-logo-img"
              style={{
                height: scrolled ? "40px" : "50px",
                width: "auto",
                display: "block",
                objectFit: "contain",
                transition: "height 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.45s ease",
                filter: isLight ? "none" : "brightness(0) invert(1)",
              }}
            />
          </Link>

          {/* ── SAĞ GRUP ──
              flex:1         → sağ yarıyı kaplar
              paddingLeft    → logo ile çakışmaz
              nav linkleri   → grubun solundan başlar
              nav-util       → marginLeft:auto → ekranın sağ kenarına yapışır  */}
          <div
            className="nav-desktop nav-group-right"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {renderLinks(rightLinks)}

            {/* DİL + REZERVASYON — tam sağa */}
            <div
              className="nav-util"
              style={{ display: "flex", alignItems: "center", marginLeft: "auto", flexShrink: 0 }}
            >
              {/* Dil seçici */}
              <div style={{ position: "relative" }} onMouseEnter={openL} onMouseLeave={closeL}>
                <button
                  className="nav-item"
                  style={{ ...linkCss(false), color: textColor, gap: "6px" }}
                >
                  <img src={currentLang.flag} alt={currentLang.label}
                    style={{ width: "18px", height: "13px", objectFit: "cover", borderRadius: "1px", display: "block" }} />
                  <span>{currentLang.label}</span>
                  <ChevronDown size={9} style={{ transition: "transform 0.25s", transform: langOpen ? "rotate(180deg)" : "none", opacity: 0.55 }} />
                </button>

                {/* Dil dropdown */}
                <div
                  onMouseEnter={openL} onMouseLeave={closeL}
                  style={{
                    position: "absolute", top: "calc(100% + 10px)", right: 0,
                    background: "#fff", boxShadow: "0 16px 48px rgba(28,28,28,0.12)",
                    borderTop: `2px solid ${GOLD}`, minWidth: "140px", zIndex: 300,
                    opacity: langOpen ? 1 : 0, pointerEvents: langOpen ? "auto" : "none",
                    transform: langOpen ? "translateY(0)" : "translateY(-4px)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {LANG_OPTIONS.map(lo => (
                    <button key={lo.code} onClick={() => { setLang(lo.code); setLangOpen(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        width: "100%", padding: "12px 18px",
                        background: lang === lo.code ? "rgba(201,169,110,0.08)" : "none",
                        border: "none", cursor: "pointer",
                        fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.14em",
                        color: lang === lo.code ? GOLD : DARK, textTransform: "uppercase",
                        fontWeight: lang === lo.code ? 600 : 400, transition: "background 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,169,110,0.08)")}
                      onMouseLeave={e => (e.currentTarget.style.background = lang === lo.code ? "rgba(201,169,110,0.08)" : "none")}
                    >
                      <img src={lo.flag} alt={lo.label} style={{ width: "18px", height: "13px", objectFit: "cover", borderRadius: "1px", display: "block" }} />
                      {lo.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rezervasyon */}
              <a
                href="https://teymur-continental-hotel.hotelrunner.com/bv3/search"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-book-btn"
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "#fff", backgroundColor: DARK,
                  padding: "13px 28px", textDecoration: "none", fontWeight: 500,
                  flexShrink: 0, transition: "background 0.3s", display: "block", whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = DARK)}
              >
                {t("nav.book")}
              </a>
            </div>
          </div>

          {/* ── MOBİL TOGGLE ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-toggle"
            style={{ background: "none", border: "none", cursor: "pointer", color: textColor, display: "none", padding: "4px", marginLeft: "auto" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Dropdown ── */}
        <div
          onMouseEnter={cancel} onMouseLeave={close}
          className="nav-desktop-block"
          style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "#ffffff",
            borderTop: dropOpen ? "1px solid rgba(28,28,28,0.1)" : "none",
            boxShadow: dropOpen ? "0 30px 80px rgba(28,28,28,0.12)" : "none",
            opacity: dropOpen ? 1 : 0, pointerEvents: dropOpen ? "auto" : "none",
            transform: dropOpen ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {activeItem && (
            <div style={{
              maxWidth: "1440px", margin: "0 auto", padding: "52px 60px",
              display: "grid", gridTemplateColumns: "280px 1fr", gap: "60px", alignItems: "start",
            }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 400, color: DARK, lineHeight: 1.15, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {activeItem.meta.heading}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.7, color: "rgba(28,28,28,0.55)", margin: "0 0 28px 0", fontWeight: 400 }}>
                  {activeItem.meta.desc}
                </p>
                {activeItem.meta.viewAll && (
                  <Link to={activeItem.meta.viewHref}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: DARK, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 500, borderBottom: `1px solid ${DARK}`, paddingBottom: "2px", transition: "color 0.25s, border-color 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD; }}
                    onMouseLeave={e => { e.currentTarget.style.color = DARK; e.currentTarget.style.borderColor = DARK; }}
                  >
                    {activeItem.meta.viewAll} <ArrowRight size={12} />
                  </Link>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(activeItem.photos.length, 3)}, 1fr)`, gap: "20px 16px" }}>
                {activeItem.photos.map(photo => <PhotoCard key={photo.label} photo={photo} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBİL OVERLAY ── */}
      <div style={{
        position: "fixed", inset: 0, backgroundColor: "#111", zIndex: 110,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        pointerEvents: mobileOpen ? "auto" : "none",
        opacity: mobileOpen ? 1 : 0, transition: "opacity 0.45s ease",
      }}>
        <div style={{ position: "absolute", top: "24px", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <img src="/otellogo.png" alt="Teymur Continental Hotel" style={{ height: "52px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
        <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: "28px", right: "36px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          <X size={22} />
        </button>
        <nav style={{ textAlign: "center" }}>
          {allMobileLinks.map((link, i) => (
            <div key={link.href} style={{ animation: mobileOpen ? `mUp 0.5s ease ${i * 0.05 + 0.06}s both` : "none" }}>
              <Link to={link.href} style={{
                display: "block", fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 3.5vw, 22px)", fontWeight: 400,
                color: location.pathname === link.href ? GOLD : "#fff",
                textDecoration: "none", letterSpacing: "0.12em", lineHeight: 1,
                padding: "14px 0",
                textTransform: "uppercase", transition: "color 0.3s",
              }}>
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        <div style={{ position: "absolute", bottom: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
          <a href="https://teymur-continental-hotel.hotelrunner.com/bv3/search" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#fff", backgroundColor: GOLD, padding: "14px 48px", textDecoration: "none" }}>
            {t("nav.book")}
          </a>
          <div style={{ display: "flex", gap: "20px" }}>
            {LANG_OPTIONS.map(lo => (
              <button key={lo.code} onClick={() => setLang(lo.code)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.12em", color: lang === lo.code ? GOLD : "rgba(255,255,255,0.35)", fontWeight: lang === lo.code ? 600 : 400 }}>
                <img src={lo.flag} alt={lo.label} style={{ width: "18px", height: "13px", objectFit: "cover", borderRadius: "1px", display: "block" }} />
                {lo.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Mobil / Masaüstü ── */
        @media (max-width: 1300px) {
          .nav-desktop       { display: none !important; }
          .nav-desktop-block { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 1301px) {
          .nav-mobile-toggle { display: none !important; }
          .nav-desktop       { display: flex !important; }
          .nav-desktop-block { display: block !important; }
        }

        /* ── Nav item ── */
        .nav-item {
          font-size: 11px !important;
          letter-spacing: 0.13em !important;
          flex-shrink: 0 !important;
          white-space: nowrap !important;
        }

        /*
         * LOGO CLEARANCE + GAP
         * paddingRight (sol) ve paddingLeft (sağ) logoyu her boyutta korur.
         * Sol grup justify-content:flex-end ile itemları merkeze doğru iter.
         */

        /* 1920px+ */
        .nav-group-left  { gap: 32px; padding-right: 130px; }
        .nav-group-right { gap: 28px; padding-left:  130px; }
        .nav-util        { gap: 20px; }

        /* 1600px altı */
        @media (max-width: 1600px) {
          .nav-group-left  { gap: 28px !important; padding-right: 120px !important; }
          .nav-group-right { gap: 24px !important; padding-left:  120px !important; }
          .nav-util        { gap: 18px !important; }
        }

        /* 1440px altı */
        @media (max-width: 1440px) {
          .nav-group-left  { gap: 24px !important; padding-right: 110px !important; }
          .nav-group-right { gap: 20px !important; padding-left:  110px !important; }
          .nav-util        { gap: 16px !important; }
        }

        /* 1380px altı */
        @media (max-width: 1380px) {
          .nav-item { font-size: 10.5px !important; letter-spacing: 0.11em !important; }
          .nav-group-left  { gap: 20px !important; padding-right: 100px !important; }
          .nav-group-right { gap: 16px !important; padding-left:  100px !important; }
          .nav-util        { gap: 14px !important; }
          .nav-book-btn    { padding: 12px 22px !important; }
        }

        /* 1340px altı */
        @media (max-width: 1340px) {
          .nav-item { font-size: 10px !important; letter-spacing: 0.10em !important; }
          .nav-group-left  { gap: 16px !important; padding-right: 88px !important; }
          .nav-group-right { gap: 14px !important; padding-left:  88px !important; }
          .nav-util        { gap: 12px !important; }
          .nav-book-btn    { padding: 11px 18px !important; font-size: 9.5px !important; letter-spacing: 0.16em !important; }
          .nav-logo-img    { height: 36px !important; }
        }

        /* 1301px altı (mobile tam geçişten önce) */
        @media (max-width: 1310px) {
          .nav-group-left  { gap: 13px !important; padding-right: 80px !important; }
          .nav-group-right { gap: 12px !important; padding-left:  80px !important; }
          .nav-util        { gap: 10px !important; }
          .nav-item { font-size: 9.5px !important; letter-spacing: 0.09em !important; }
          .nav-book-btn    { padding: 10px 14px !important; font-size: 9px !important; }
        }

        @keyframes mUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
