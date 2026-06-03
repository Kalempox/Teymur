import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "tr" | "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Lang, Record<string, string>> = {
  tr: {
    // ── Navigation
    "nav.rooms": "Odalar",
    "nav.dining": "Restoran",
    "nav.events": "Etkinlikler",
    "nav.convention": "Konvansiyon Merkezi",
    "nav.wedding": "Düğün",
    "nav.gallery": "Galeri",
    "nav.destination": "Gaziantep",
    "nav.corporate": "Kurumsal",
    "nav.about": "Hakkımızda",
    "nav.career": "Kariyer",
    "nav.contact": "İletişim",
    "nav.wellness": "Sağlık",
    "nav.spa": "Spa & Hamam",
    "nav.fitness": "Fitness Merkezi",
    "nav.offers": "Teklifler",
    "nav.reserve": "Rezervasyon",
    "nav.book": "REZERVASYON",

    // ── Hero
    "hero.country": "Türkiye · Gaziantep",
    "hero.title1": "Zamansız",
    "hero.title2": "Lüks",
    "hero.subtitle": "Gaziantep'in kalbinde beş yıldızlı bir deneyim",
    "hero.cta_rooms": "Odaları Keşfet",
    "hero.cta_convention": "Konvansiyon Merkezi",
    "hero.scroll": "KAYDIR",

    // ── Booking bar
    "book.checkin": "Giriş Tarihi",
    "book.checkout": "Çıkış Tarihi",
    "book.guests": "Misafir",
    "book.rooms": "Oda Tipi",
    "book.cta": "Müsaitlik Sorgula",
    "book.adults": "Yetişkin",
    "book.children": "Çocuk",
    "book.adults_sub": "12 yaş ve üzeri",
    "book.children_sub": "2–11 yaş",
    "book.confirm": "ONAYLA",
    "book.all_rooms": "Tüm Odalar",
    "book.guests_label": "kişi",

    // ── 360 Experience
    "360.eyebrow": "İMMERSİF TUR",
    "360.title": "360° DENEYİM",
    "360.subtitle": "Varmadan önce her mekanı keşfedin.",
    "360.enter": "DENEYİME GİR",
    "360.hint": "İmmersif 360° görüntüleyiciyi açmak için tıklayın",
    "360.esc": "KAPATMAK İÇİN ESC",

    // ── Rooms
    "rooms.eyebrow": "ODALAR & SÜİTLER",
    "rooms.title1": "ODALAR",
    "rooms.desc": "Altı kategori, her biri sessiz bir özenle hazırlanmış — mütevazı Standard French'ten geniş King Suite'e kadar.",
    "rooms.all": "TÜM ODALAR",

    // ── Experience slider
    "exp.gastronomy.eyebrow": "RESTORAN",
    "exp.gastronomy.t1": "UNESCO",
    "exp.gastronomy.t2": "LEZZET",
    "exp.gastronomy.t3": "MİRASI",
    "exp.gastronomy.desc": "Gaziantep'in gastronomi mirası — modern bir mutfak anlayışıyla yeniden yorumlanmış, zamanın durduğu lüks bir ortamda.",
    "exp.gastronomy.cta": "RESTORAN",

    "exp.spa.eyebrow": "SAĞLIK MERKEZİ",
    "exp.spa.t1": "KÖKLEŞMİŞ",
    "exp.spa.t2": "RİTÜELLER,",
    "exp.spa.t3": "MODERN",
    "exp.spa.t4": "ODALAR",
    "exp.spa.desc": "Antik hamam sanatına teslim olun — buharla arındırılmış, kese ile canlandırılmış ve mutlak bir sükûnette dinlenin.",
    "exp.spa.cta": "WELLNESS",

    "exp.convention.eyebrow": "ETKİNLİKLER",
    "exp.convention.t1": "BÜYÜK MEKANLAR",
    "exp.convention.t2": "BÜYÜK",
    "exp.convention.t3": "ANLAR İÇİN",
    "exp.convention.desc": "3.500 m² mükemmel yapılandırılmış alan — zirveler, galalar ve küresel standartlarda organizasyonlar.",
    "exp.convention.cta": "KEŞFET",

    // ── Gallery
    "gallery.eyebrow": "GÖRSEL DÜNYA",
    "gallery.link": "GALERİ",

    // ── Testimonials
    "test.q1": "Ziyaret edilen bir otel değil — kısa da olsa içinde yaşanılan bir dünya.",
    "test.q2": "Her anlamda dünya standartlarında. Suitin sessizliği, ışığın kalitesi — olağanüstü.",
    "test.q3": "Avrupa zarafetini Doğu'nun özgün sıcaklığıyla bir araya getiren eşsiz bir deneyim.",

    // ── Final CTA / Book section
    "finalcta.eyebrow": "REZERVASYON",
    "finalcta.title1": "KONAKLAMANIZI",
    "finalcta.title2": "PLANLAYINIZ",
    "finalcta.cta": "REZERVASYON YAPIN",

    // ── Certificate
    "cert.title": "Sürdürülebilir Turizm Sertifikası",
    "cert.subtitle": "Çevre dostu ve sorumlu turizm standartları",
    "cert.view": "Sertifikayı Görüntüle",
    "cert.modal.title": "Sürdürülebilir Turizm Sertifikası",
    "cert.modal.body": "Teymur Continental Hotel, uluslararası sürdürülebilir turizm standartlarını karşılamakta ve çevreye duyarlı işletme uygulamalarına bağlılığını sürdürmektedir.",

    // ── Footer
    "footer.tagline": "Gaziantep'te Lüksün Adresi",
    "footer.explore": "Keşfet",
    "footer.info": "Bilgi",
    "footer.contact": "İletişim",
    "footer.reserve": "Rezervasyon",
    "footer.rights": "© 2026 Teymur Continental Hotel. Tüm hakları saklıdır.",
    "footer.design": "Design & Software by",
    "footer.address": "Mücahitler Mah. Kudüs Cad. No:31 27090 Şehitkamil / Gaziantep",
    "footer.privacy": "Gizlilik Politikası",
    "footer.cookie": "Çerez Politikası",
    "footer.about": "Hakkımızda",
    "footer.sustainability": "Sürdürülebilirlik",
    "footer.gaziantep": "Gaziantep'i Keşfet",

    // ── Misc
    "misc.guests": "Misafir",
    "misc.arrival": "Varış",
    "misc.departure": "Ayrılış",
  },

  en: {
    // ── Navigation
    "nav.rooms": "Rooms",
    "nav.dining": "Dining",
    "nav.events": "Events",
    "nav.convention": "Convention Center",
    "nav.wedding": "Weddings",
    "nav.gallery": "Gallery",
    "nav.destination": "Gaziantep",
    "nav.corporate": "Corporate",
    "nav.about": "About Us",
    "nav.career": "Careers",
    "nav.contact": "Contact",
    "nav.wellness": "Health",
    "nav.spa": "Spa & Hammam",
    "nav.fitness": "Fitness Center",
    "nav.offers": "Offers",
    "nav.reserve": "Reserve",
    "nav.book": "BOOK",

    // ── Hero
    "hero.country": "Turkey · Gaziantep",
    "hero.title1": "Timeless",
    "hero.title2": "Luxury",
    "hero.subtitle": "A five-star experience in the heart of Gaziantep",
    "hero.cta_rooms": "Discover Rooms",
    "hero.cta_convention": "Convention Center",
    "hero.scroll": "SCROLL",

    // ── Booking bar
    "book.checkin": "Check-In",
    "book.checkout": "Check-Out",
    "book.guests": "Guests",
    "book.rooms": "Room Type",
    "book.cta": "Check Availability",
    "book.adults": "Adults",
    "book.children": "Children",
    "book.adults_sub": "Age 12+",
    "book.children_sub": "Ages 2–11",
    "book.confirm": "CONFIRM",
    "book.all_rooms": "All Rooms",
    "book.guests_label": "Guests",

    // ── 360 Experience
    "360.eyebrow": "IMMERSIVE TOUR",
    "360.title": "360° EXPERIENCE",
    "360.subtitle": "Explore every space before you arrive.",
    "360.enter": "ENTER EXPERIENCE",
    "360.hint": "Click to open immersive 360° viewer",
    "360.esc": "ESC TO CLOSE",

    // ── Rooms
    "rooms.eyebrow": "ROOMS & SUITES",
    "rooms.title1": "PERSONAL",
    "rooms.title2": "SANCTUARIES",
    "rooms.desc": "Six categories, each curated with quiet precision — from the intimate Standard French to the expansive King Suite.",
    "rooms.all": "ALL ROOMS",

    // ── Experience slider
    "exp.gastronomy.eyebrow": "RESTAURANT",
    "exp.gastronomy.t1": "UNESCO",
    "exp.gastronomy.t2": "FLAVOUR",
    "exp.gastronomy.t3": "LEGACY",
    "exp.gastronomy.desc": "Gaziantep's gastronomic heritage — reinterpreted through a modern culinary lens in a setting of unhurried luxury.",
    "exp.gastronomy.cta": "DINING",

    "exp.spa.eyebrow": "HEALTH CENTER",
    "exp.spa.t1": "ANCIENT",
    "exp.spa.t2": "RITUALS,",
    "exp.spa.t3": "MODERN",
    "exp.spa.t4": "SANCTUARY",
    "exp.spa.desc": "Surrender to the ancient art of hammam — steam-cleansed, kese-scrubbed, and rinsed in absolute stillness.",
    "exp.spa.cta": "WELLNESS",

    "exp.convention.eyebrow": "EVENTS",
    "exp.convention.t1": "GRAND SPACES",
    "exp.convention.t2": "FOR GRAND",
    "exp.convention.t3": "MOMENTS",
    "exp.convention.desc": "3,500 m² of impeccably engineered space — summits, galas, and celebrations curated at a global standard.",
    "exp.convention.cta": "DISCOVER",

    // ── Gallery
    "gallery.eyebrow": "VISUAL JOURNAL",
    "gallery.link": "GALLERY",

    // ── Testimonials
    "test.q1": "Not a hotel one visits — a world one inhabits, however briefly.",
    "test.q2": "World-class in every sense. The silence of the suite, the quality of the light — extraordinary.",
    "test.q3": "A unique experience blending European elegance with the warmth of the authentic East.",

    // ── Final CTA / Book section
    "finalcta.eyebrow": "RESERVATIONS",
    "finalcta.title1": "PLAN YOUR",
    "finalcta.title2": "STAY",
    "finalcta.cta": "BOOK NOW",

    // ── Certificate
    "cert.title": "Sustainable Tourism Certificate",
    "cert.subtitle": "Eco-friendly & responsible tourism standards",
    "cert.view": "View Certificate",
    "cert.modal.title": "Sustainable Tourism Certificate",
    "cert.modal.body": "Teymur Continental Hotel meets international sustainable tourism standards and maintains its commitment to environmentally responsible business practices.",

    // ── Footer
    "footer.tagline": "The Address of Luxury in Gaziantep",
    "footer.explore": "Explore",
    "footer.info": "Information",
    "footer.contact": "Contact",
    "footer.reserve": "Reserve",
    "footer.rights": "© 2026 Teymur Continental Hotel. All rights reserved.",
    "footer.design": "Design & Software by",
    "footer.address": "Mücahitler Mah. Kudüs Cad. No:31 27090 Şehitkamil / Gaziantep",
    "footer.privacy": "Privacy Policy",
    "footer.cookie": "Cookie Policy",
    "footer.about": "About Us",
    "footer.sustainability": "Sustainability",
    "footer.gaziantep": "Discover Gaziantep",

    // ── Misc
    "misc.guests": "Guests",
    "misc.arrival": "Arrival",
    "misc.departure": "Departure",
  },

  ar: {
    // ── Navigation
    "nav.rooms": "الغرف والأجنحة",
    "nav.dining": "المطعم",
    "nav.events": "الاجتماعات والفعاليات",
    "nav.convention": "مركز المؤتمرات",
    "nav.wedding": "حفلات الزفاف",
    "nav.gallery": "المعرض",
    "nav.destination": "غازيانتيب",
    "nav.corporate": "الشركة",
    "nav.about": "عنّا",
    "nav.career": "الوظائف",
    "nav.contact": "اتصل بنا",
    "nav.wellness": "الصحة والعافية",
    "nav.spa": "سبا والحمام التركي",
    "nav.fitness": "مركز اللياقة",
    "nav.offers": "العروض",
    "nav.reserve": "احجز الآن",
    "nav.book": "احجز",

    // ── Hero
    "hero.country": "تركيا · غازيانتيب",
    "hero.title1": "فخامة",
    "hero.title2": "خالدة",
    "hero.subtitle": "تجربة خمسة نجوم في قلب غازيانتيب",
    "hero.cta_rooms": "اكتشف الغرف",
    "hero.cta_convention": "مركز المؤتمرات",
    "hero.scroll": "مرر",

    // ── Booking bar
    "book.checkin": "تاريخ الوصول",
    "book.checkout": "تاريخ المغادرة",
    "book.guests": "الضيوف",
    "book.rooms": "نوع الغرفة",
    "book.cta": "تحقق من التوفر",
    "book.adults": "البالغون",
    "book.children": "الأطفال",
    "book.adults_sub": "12 سنة فأكثر",
    "book.children_sub": "2–11 سنة",
    "book.confirm": "تأكيد",
    "book.all_rooms": "جميع الغرف",
    "book.guests_label": "ضيوف",

    // ── 360 Experience
    "360.eyebrow": "جولة افتراضية",
    "360.title": "تجربة 360°",
    "360.subtitle": "استكشف كل مساحة قبل وصولك.",
    "360.enter": "ادخل التجربة",
    "360.hint": "انقر لفتح عارض 360° الغامر",
    "360.esc": "ESC للإغلاق",

    // ── Rooms
    "rooms.eyebrow": "الغرف والأجنحة",
    "rooms.title1": "ملاذات",
    "rooms.title2": "شخصية",
    "rooms.desc": "ست فئات، كل منها منسقة بعناية هادئة — من الغرفة الفردية المريحة إلى الجناح الملكي الفسيح.",
    "rooms.all": "جميع الغرف",

    // ── Experience slider
    "exp.gastronomy.eyebrow": "المطعم",
    "exp.gastronomy.t1": "اليونسكو",
    "exp.gastronomy.t2": "إرث",
    "exp.gastronomy.t3": "النكهات",
    "exp.gastronomy.desc": "إرث غازيانتيب الغني — يُعاد تفسيره من خلال عدسة طهوية حديثة في بيئة من الفخامة الهادئة.",
    "exp.gastronomy.cta": "المطعم",

    "exp.spa.eyebrow": "مركز الصحة",
    "exp.spa.t1": "طقوس",
    "exp.spa.t2": "عريقة،",
    "exp.spa.t3": "ملاذ",
    "exp.spa.t4": "حديث",
    "exp.spa.desc": "استسلم لفن الحمام العريق — تنقية بالبخار، وتجديد بالكيس، وراحة في هدوء مطلق.",
    "exp.spa.cta": "العافية",

    "exp.convention.eyebrow": "الفعاليات",
    "exp.convention.t1": "مساحات كبرى",
    "exp.convention.t2": "لمناسبات",
    "exp.convention.t3": "استثنائية",
    "exp.convention.desc": "3,500 م² من المساحات المصممة بإتقان — للقمم والحفلات والاحتفالات وفق معايير عالمية.",
    "exp.convention.cta": "اكتشف",

    // ── Gallery
    "gallery.eyebrow": "مجلة بصرية",
    "gallery.link": "معرض الصور",

    // ── Testimonials
    "test.q1": "ليس فندقاً يُزار — بل عالم يُعاش فيه، مهما قصرت المدة.",
    "test.q2": "عالمي المستوى بكل المقاييس. صمت الجناح وجودة الإضاءة — استثنائي.",
    "test.q3": "تجربة فريدة تجمع بين الفخامة الأوروبية والدفء الشرقي الأصيل.",

    // ── Final CTA / Book section
    "finalcta.eyebrow": "الحجوزات",
    "finalcta.title1": "خطط لإقامتك",
    "finalcta.title2": "معنا",
    "finalcta.cta": "احجز الآن",

    // ── Certificate
    "cert.title": "شهادة السياحة المستدامة",
    "cert.subtitle": "معايير السياحة الصديقة للبيئة",
    "cert.view": "عرض الشهادة",
    "cert.modal.title": "شهادة السياحة المستدامة",
    "cert.modal.body": "يستوفي فندق تيمور كونتيننتال المعايير الدولية للسياحة المستدامة ويحافظ على التزامه بممارسات الأعمال الصديقة للبيئة.",

    // ── Footer
    "footer.tagline": "عنوان الفخامة في غازيانتيب",
    "footer.explore": "استكشف",
    "footer.info": "معلومات",
    "footer.contact": "اتصل بنا",
    "footer.reserve": "احجز",
    "footer.rights": "© 2026 فندق تيمور كونتيننتال. جميع الحقوق محفوظة.",
    "footer.design": "Design & Software by",
    "footer.address": "حي مجاهدلر، شارع القدس رقم 31، 27090 شهيت كامل / غازيانتيب",
    "footer.privacy": "سياسة الخصوصية",
    "footer.cookie": "سياسة ملفات تعريف الارتباط",
    "footer.about": "عنّا",
    "footer.sustainability": "الاستدامة",
    "footer.gaziantep": "اكتشف غازيانتيب",

    // ── Misc
    "misc.guests": "ضيوف",
    "misc.arrival": "الوصول",
    "misc.departure": "المغادرة",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "tr",
  setLang: () => {},
  t: (k) => k,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.setAttribute("lang", l);
    document.documentElement.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
    // Sync URL param for reference
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState({}, "", url.toString());
  };

  // Read lang from URL param on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const paramLang = url.searchParams.get("lang") as Lang | null;
    if (paramLang && ["tr", "en", "ar"].includes(paramLang)) {
      setLangState(paramLang);
      document.documentElement.setAttribute("lang", paramLang);
      document.documentElement.setAttribute("dir", paramLang === "ar" ? "rtl" : "ltr");
    } else {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  }, []);

  const t = (key: string): string => translations[lang][key] ?? translations.en[key] ?? key;
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
