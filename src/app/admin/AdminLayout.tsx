import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Settings,
  Home,
  Info,
  BedDouble,
  UtensilsCrossed,
  CalendarDays,
  Leaf,
  MapPin,
  Phone,
  Briefcase,
  Image,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Navigation,
} from "lucide-react";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminGenelAyarlar } from "./pages/AdminGenelAyarlar";
import { AdminAnaSayfa } from "./pages/AdminAnaSayfa";
import { AdminHakkimizda } from "./pages/AdminHakkimizda";
import { AdminOdalar } from "./pages/AdminOdalar";
import { AdminRestoran } from "./pages/AdminRestoran";
import { AdminEtkinlikler } from "./pages/AdminEtkinlikler";
import { AdminSaglik } from "./pages/AdminSaglik";
import { AdminGaziantep } from "./pages/AdminGaziantep";
import { AdminIletisim } from "./pages/AdminIletisim";
import { AdminKariyer } from "./pages/AdminKariyer";
import { AdminGaleri } from "./pages/AdminGaleri";
import { AdminFooter } from "./pages/AdminFooter";
import { AdminNavbar } from "./pages/AdminNavbar";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminFeedback } from "./pages/AdminFeedback";
import { Users, ShieldCheck, Star as StarIcon } from "lucide-react";

const NAVY = "#050f28";
const GOLD = "#dbbe8c";

const NAV_ITEMS = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/genel-ayarlar", label: "Genel Ayarlar", icon: Settings },
  { path: "/admin/ana-sayfa", label: "Ana Sayfa", icon: Home },
  { path: "/admin/hakkimizda", label: "Hakkımızda", icon: Info },
  { path: "/admin/odalar", label: "Odalar", icon: BedDouble },
  { path: "/admin/restoran", label: "Restoran", icon: UtensilsCrossed },
  { path: "/admin/etkinlikler", label: "Etkinlikler", icon: CalendarDays },
  { path: "/admin/saglik", label: "Sağlık", icon: Leaf },
  { path: "/admin/gaziantep", label: "Gaziantep", icon: MapPin },
  { path: "/admin/iletisim", label: "İletişim", icon: Phone },
  { path: "/admin/kariyer", label: "Kariyer", icon: Briefcase },
  { path: "/admin/galeri", label: "Galeri", icon: Image },
  { path: "/admin/footer", label: "Footer", icon: FileText },
  { path: "/admin/navbar", label: "Menü (Nav)", icon: Navigation },
  { path: "/admin/geri-bildirim", label: "Geri Bildirimler", icon: StarIcon },
];

const ADMIN_ONLY_ITEMS = [
  { path: "/admin/genel-ayarlar", label: "Genel Ayarlar", icon: Settings },
  { path: "/admin/kullanicilar", label: "Kullanıcılar", icon: Users, adminOnly: true },
];

function renderPage(pathname: string) {
  if (pathname === "/admin" || pathname === "/admin/") return <AdminDashboard />;
  if (pathname.startsWith("/admin/genel-ayarlar")) return <AdminGenelAyarlar />;
  if (pathname.startsWith("/admin/ana-sayfa")) return <AdminAnaSayfa />;
  if (pathname.startsWith("/admin/hakkimizda")) return <AdminHakkimizda />;
  if (pathname.startsWith("/admin/odalar")) return <AdminOdalar />;
  if (pathname.startsWith("/admin/restoran")) return <AdminRestoran />;
  if (pathname.startsWith("/admin/etkinlikler")) return <AdminEtkinlikler />;
  if (pathname.startsWith("/admin/saglik")) return <AdminSaglik />;
  if (pathname.startsWith("/admin/gaziantep")) return <AdminGaziantep />;
  if (pathname.startsWith("/admin/iletisim")) return <AdminIletisim />;
  if (pathname.startsWith("/admin/kariyer")) return <AdminKariyer />;
  if (pathname.startsWith("/admin/galeri")) return <AdminGaleri />;
  if (pathname.startsWith("/admin/footer")) return <AdminFooter />;
  if (pathname.startsWith("/admin/navbar")) return <AdminNavbar />;
  if (pathname.startsWith("/admin/kullanicilar")) return <AdminUsers />;
  if (pathname.startsWith("/admin/geri-bildirim")) return <AdminFeedback />;
  return <AdminDashboard />;
}

export function AdminLayout({ session, onLogout }: { session: { username: string; role: string; name: string }; onLogout: () => void }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isAdmin = session?.role === "admin";

  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          backgroundColor: NAVY,
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 100,
          transition: "width 0.25s ease",
          overflow: "hidden",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            padding: collapsed ? "20px 0" : "24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            minHeight: 72,
            flexShrink: 0,
          }}
        >
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 400, color: GOLD, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                Teymur Continental
              </div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "2px", whiteSpace: "nowrap" }}>
                Admin Panel
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              padding: "4px",
              flexShrink: 0,
            }}
          >
            {collapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* User info */}
        {!collapsed && (
          <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: isAdmin ? "rgba(212,129,10,0.2)" : "rgba(10,122,74,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ShieldCheck size={14} color={isAdmin ? "#f0a830" : "#2ecc71"} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>{session.name}</div>
                <div style={{ fontSize: 10, color: isAdmin ? "#f0a830" : "#2ecc71", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {isAdmin ? "Yönetici" : "Editör"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "12px 0" }}>
          {/* Admin-only items */}
          {isAdmin && (
            <>
              {[
                { path: "/admin/genel-ayarlar", label: "Genel Ayarlar", icon: Settings },
              ].map(item => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link key={item.path} to={item.path} title={collapsed ? item.label : undefined}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: collapsed ? "12px 0" : "10px 20px", justifyContent: collapsed ? "center" : "flex-start", textDecoration: "none", color: isActive ? GOLD : "rgba(255,255,255,0.55)", backgroundColor: isActive ? "rgba(219,190,140,0.08)" : "transparent", borderLeft: isActive ? `2px solid ${GOLD}` : "2px solid transparent", transition: "all 0.18s ease", whiteSpace: "nowrap", fontSize: "13px", fontWeight: isActive ? 500 : 400 }}
                    onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)"; } }}
                    onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; } }}>
                    <item.icon size={16} style={{ flexShrink: 0 }} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </>
          )}
          {[...NAV_ITEMS.filter(i => i.path !== "/admin/genel-ayarlar"), ...(isAdmin ? [{ path: "/admin/kullanicilar", label: "Kullanıcılar", icon: Users, exact: false }] : [])].map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path || location.pathname === "/admin/"
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: collapsed ? "12px 0" : "10px 20px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  textDecoration: "none",
                  color: isActive ? GOLD : "rgba(255,255,255,0.55)",
                  backgroundColor: isActive
                    ? "rgba(219,190,140,0.08)"
                    : "transparent",
                  borderLeft: isActive
                    ? `2px solid ${GOLD}`
                    : "2px solid transparent",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                  fontSize: "13px",
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.55)";
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "transparent";
                  }
                }}
              >
                <item.icon size={16} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "12px 0",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onLogout}
            title={collapsed ? "Çıkış Yap" : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: collapsed ? "12px 0" : "10px 20px",
              justifyContent: collapsed ? "center" : "flex-start",
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              whiteSpace: "nowrap",
              transition: "color 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(220,80,80,0.85)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.4)";
            }}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          marginLeft: sidebarWidth,
          flex: 1,
          transition: "margin-left 0.25s ease",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            padding: "0 32px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ fontSize: "14px", color: "rgba(5,15,40,0.45)" }}>
            Admin Panel
            <span style={{ margin: "0 8px", color: "rgba(5,15,40,0.2)" }}>
              /
            </span>
            <span style={{ color: "#050f28", fontWeight: 500 }}>
              {NAV_ITEMS.find((n) =>
                n.exact
                  ? location.pathname === n.path ||
                    location.pathname === "/admin/"
                  : location.pathname.startsWith(n.path)
              )?.label ?? "Dashboard"}
            </span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px",
              color: "rgba(5,15,40,0.45)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Siteyi Görüntüle →
          </a>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: "32px" }}>
          {renderPage(location.pathname)}
        </div>
      </div>
    </div>
  );
}
