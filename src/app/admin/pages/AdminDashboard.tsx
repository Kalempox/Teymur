import { Link } from "react-router";
import { useContent } from "../../context/ContentContext";
import { BedDouble, UtensilsCrossed, CalendarDays, Image, Settings, Home, Info, Leaf, MapPin, Phone, Briefcase, FileText, Star as StarIcon } from "lucide-react";

const GOLD = "#dbbe8c";
const NAVY = "#050f28";

const QUICK_LINKS = [
  { path: "/admin/genel-ayarlar", label: "Genel Ayarlar", icon: Settings, color: "#6366f1" },
  { path: "/admin/ana-sayfa", label: "Ana Sayfa", icon: Home, color: "#0ea5e9" },
  { path: "/admin/hakkimizda", label: "Hakkımızda", icon: Info, color: "#8b5cf6" },
  { path: "/admin/odalar", label: "Odalar", icon: BedDouble, color: "#f59e0b" },
  { path: "/admin/restoran", label: "Restoran", icon: UtensilsCrossed, color: "#ef4444" },
  { path: "/admin/etkinlikler", label: "Etkinlikler", icon: CalendarDays, color: "#10b981" },
  { path: "/admin/saglik", label: "Sağlık", icon: Leaf, color: "#06b6d4" },
  { path: "/admin/gaziantep", label: "Gaziantep", icon: MapPin, color: "#f97316" },
  { path: "/admin/iletisim", label: "İletişim", icon: Phone, color: "#84cc16" },
  { path: "/admin/kariyer", label: "Kariyer", icon: Briefcase, color: "#ec4899" },
  { path: "/admin/galeri", label: "Galeri", icon: Image, color: "#a855f7" },
  { path: "/admin/footer", label: "Footer", icon: FileText, color: "#64748b" },
  { path: "/admin/geri-bildirim", label: "Geri Bildirimler", icon: StarIcon, color: "#8b5cf6" },
];

export function AdminDashboard() {
  const content = useContent();

  const stats = [
    { label: "Sayfa", value: "13", desc: "Düzenlenebilir sayfa" },
    { label: "Oda", value: String(content.rooms.length), desc: "Oda tipi" },
    { label: "Restoran", value: String(content.dining.length), desc: "Yemek mekanı" },
    { label: "Salon", value: String(content.halls.length), desc: "Etkinlik salonu" },
  ];

  return (
    <div>
      {/* Welcome */}
      <div
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0d1f4f 100%)`,
          borderRadius: "12px",
          padding: "32px",
          marginBottom: "24px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "28px",
            fontWeight: 300,
            marginBottom: "8px",
            letterSpacing: "0.04em",
          }}
        >
          Hoş geldiniz, Admin
        </div>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.55)",
            margin: 0,
          }}
        >
          {content.global.hotelName} içerik yönetim paneline hoş geldiniz. Sol menüden düzenlemek istediğiniz bölümü seçin.
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
        className="admin-stats-grid"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "20px 24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "40px",
                fontWeight: 300,
                color: GOLD,
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: NAVY,
                marginTop: "4px",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(5,15,40,0.4)",
                marginTop: "2px",
              }}
            >
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20px",
            color: NAVY,
            marginBottom: "20px",
          }}
        >
          Hızlı Erişim
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "12px",
          }}
        >
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(5,15,40,0.06)",
                textDecoration: "none",
                color: NAVY,
                transition: "all 0.2s",
                gap: "10px",
                backgroundColor: "#fafafa",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "rgba(219,190,140,0.06)";
                el.style.borderColor = "rgba(219,190,140,0.3)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "#fafafa";
                el.style.borderColor = "rgba(5,15,40,0.06)";
                el.style.transform = "none";
                el.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: link.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <link.icon size={18} color={link.color} />
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .admin-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
