import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { StickyBookingBar } from "./components/StickyBookingBar";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { LanguageProvider, useLang } from "./context/LanguageContext";

function AppContent() {
  const { pathname } = useLocation();
  const { dir, setLang } = useLang();
  const [pageVisible, setPageVisible] = useState(true);

  // Sync language from path segments like /reservation/tr
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (last === "tr" || last === "en" || last === "ar") {
      setLang(last as "tr" | "en" | "ar");
    }
  }, [pathname]);

  useEffect(() => {
    setPageVisible(false);
    const t = setTimeout(() => {
      window.scrollTo(0, 0);
      setPageVisible(true);
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      dir={dir}
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#ffffff",
        color: "#050f28",
        minHeight: "100vh",
        opacity: pageVisible ? 1 : 0,
        transition: "opacity 0.4s ease",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Navigation />
      <main>
        <Outlet />
      </main>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </div>
      <StickyBookingBar />
      <WhatsAppButton />
    </div>
  );
}

export function Root() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
