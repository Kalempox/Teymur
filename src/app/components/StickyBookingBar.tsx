import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Calendar, Users, BedDouble, ChevronLeft, ChevronRight, X, Minus, Plus } from "lucide-react";
import { useLang } from "../context/LanguageContext";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

// ─── ROOM DATA ────────────────────────────────────────────────────────────────
const ROOMS = [
  {
    id: "all",
    name: { tr: "Tüm Odalar", en: "All Rooms", ar: "جميع الغرف" },
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=85&fit=crop",
    feature: { tr: "Tüm oda tipleri", en: "All room types", ar: "جميع الأنواع" },
    capacity: "",
  },
  {
    id: "standard-french",
    name: { tr: "Standard French", en: "Standard French", ar: "ستاندرد فرنش" },
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=85&fit=crop",
    feature: { tr: "28 m² · Fransız Yatak", en: "28 m² · French Bed", ar: "28 م² · سرير فرنسي" },
    capacity: "2",
  },
  {
    id: "standard-twin",
    name: { tr: "Standard Twin", en: "Standard Twin", ar: "ستاندرد تويم" },
    image: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=400&q=85&fit=crop",
    feature: { tr: "30 m² · İki Ayrı Yatak", en: "30 m² · Twin Beds", ar: "30 م² · سريران" },
    capacity: "2",
  },
  {
    id: "standard-triple",
    name: { tr: "Standard Triple", en: "Standard Triple", ar: "ستاندرد تريبل" },
    image: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?w=400&q=85&fit=crop",
    feature: { tr: "34 m² · Üç Yatak", en: "34 m² · Triple Beds", ar: "34 م² · ثلاثة أسرة" },
    capacity: "3",
  },
  {
    id: "family-suite",
    name: { tr: "Family Suite", en: "Family Suite", ar: "جناح عائلي" },
    image: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?w=400&q=85&fit=crop",
    feature: { tr: "80 m² · Aile Süiti", en: "80 m² · Family Suite", ar: "80 م² · جناح عائلي" },
    capacity: "4",
  },
  {
    id: "king-suite",
    name: { tr: "King Suite", en: "King Suite", ar: "جناح كينج" },
    image: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=400&q=85&fit=crop",
    feature: { tr: "65 m² · King Yatak · Şehir Manzarası", en: "65 m² · King Bed · City View", ar: "65 م² · سرير كينج · إطلالة المدينة" },
    capacity: "2",
  },
];

// ─── CALENDAR ────────────────────────────────────────────────────────────────
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isInRange(d: Date, s: Date | null, e: Date | null) {
  if (!s || !e) return false;
  return d.getTime() > s.getTime() && d.getTime() < e.getTime();
}
function formatShort(d: Date | null) {
  if (!d) return "";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

interface CalendarPopupProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (ci: Date | null, co: Date | null) => void;
  onClose: () => void;
}

function CalendarPopup({ checkIn, checkOut, onChange, onClose }: CalendarPopupProps) {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(checkIn ? checkIn.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(checkIn ? checkIn.getMonth() : today.getMonth());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"in" | "out">(checkIn ? "out" : "in");

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const rawFirstDay = new Date(viewYear, viewMonth, 1).getDay();
  const firstDay = rawFirstDay === 0 ? 6 : rawFirstDay - 1; // Mon = 0

  const handleDayClick = (d: Date) => {
    if (d < today) return;
    if (selecting === "in") {
      onChange(d, null);
      setSelecting("out");
    } else {
      if (checkIn && d <= checkIn) {
        onChange(d, null);
        setSelecting("out");
      } else {
        onChange(checkIn, d);
        setSelecting("in");
        onClose();
      }
    }
  };

  const displayEnd = hoverDate && checkIn && selecting === "out" && hoverDate > checkIn ? hoverDate : checkOut;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(viewYear, viewMonth, i));

  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(100% + 12px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        background: "#ffffff",
        boxShadow: "0 24px 80px rgba(5,15,40,0.18), 0 0 0 1px rgba(219,190,140,0.18)",
        borderRadius: "2px",
        padding: "28px 32px 24px",
        minWidth: "340px",
        animation: "fadeUpPop 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(5,15,40,0.4)", padding: "4px", display: "flex" }}>
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 400, color: DARK, letterSpacing: "0.08em" }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(5,15,40,0.4)", padding: "4px", display: "flex" }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day names */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "6px" }}>
        {DAY_NAMES.map((d) => (
          <div key={d} style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(5,15,40,0.35)", padding: "4px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const isPast = d < today;
          const isStart = checkIn && isSameDay(d, checkIn);
          const isEnd = checkOut && isSameDay(d, checkOut);
          const isHoverEnd = hoverDate && selecting === "out" && isSameDay(d, hoverDate);
          const inRange = isInRange(d, checkIn, displayEnd);

          return (
            <button
              key={d.toISOString()}
              onClick={() => handleDayClick(d)}
              onMouseEnter={() => setHoverDate(d)}
              onMouseLeave={() => setHoverDate(null)}
              disabled={isPast}
              style={{
                border: "none",
                borderRadius: "1px",
                cursor: isPast ? "default" : "pointer",
                padding: "7px 4px",
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                color: isPast
                  ? "rgba(5,15,40,0.2)"
                  : isStart || isEnd || isHoverEnd
                  ? "#ffffff"
                  : inRange
                  ? DARK
                  : DARK,
                backgroundColor: isStart || isEnd || isHoverEnd
                  ? GOLD
                  : inRange
                  ? "rgba(219,190,140,0.12)"
                  : "transparent",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      {/* Selection hint */}
      <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1px solid rgba(5,15,40,0.06)", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(5,15,40,0.42)", letterSpacing: "0.1em" }}>
        {selecting === "in" ? "Select check-in date" : "Select check-out date"}
      </div>
    </div>
  );
}

// ─── GUEST POPUP ─────────────────────────────────────────────────────────────
interface GuestPopupProps {
  adults: number;
  children: number;
  onChange: (adults: number, children: number) => void;
  lang: string;
  onClose: () => void;
}

function GuestPopup({ adults, children, onChange, lang, onClose }: GuestPopupProps) {
  const labels = {
    adults: { tr: "Yetişkin", en: "Adults", ar: "البالغون" },
    adultsSub: { tr: "12 yaş ve üzeri", en: "Age 12+", ar: "12 سنة فأكثر" },
    children: { tr: "Çocuk", en: "Children", ar: "الأطفال" },
    childrenSub: { tr: "2–11 yaş", en: "Ages 2–11", ar: "2–11 سنة" },
  };
  const l = (key: keyof typeof labels) => labels[key][lang as keyof (typeof labels)[typeof key]] ?? labels[key].en;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(100% + 12px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        background: "#ffffff",
        boxShadow: "0 24px 80px rgba(5,15,40,0.18), 0 0 0 1px rgba(219,190,140,0.18)",
        borderRadius: "2px",
        padding: "24px 32px",
        minWidth: "260px",
        animation: "fadeUpPop 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {[
        { label: l("adults"), sub: l("adultsSub"), value: adults, min: 1, set: (v: number) => onChange(v, children) },
        { label: l("children"), sub: l("childrenSub"), value: children, min: 0, set: (v: number) => onChange(adults, v) },
      ].map(({ label, sub, value, min, set }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: DARK, fontWeight: 400 }}>{label}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: "rgba(5,15,40,0.35)", letterSpacing: "0.06em", marginTop: "2px" }}>{sub}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => set(Math.max(min, value - 1))}
              style={{
                width: "28px", height: "28px", border: "1px solid rgba(5,15,40,0.12)",
                borderRadius: "50%", background: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(5,15,40,0.5)", transition: "border-color 0.2s",
              }}
            >
              <Minus size={11} />
            </button>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 400, color: DARK, minWidth: "18px", textAlign: "center" }}>
              {value}
            </span>
            <button
              onClick={() => set(value + 1)}
              style={{
                width: "28px", height: "28px", border: "1px solid rgba(5,15,40,0.12)",
                borderRadius: "50%", background: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(5,15,40,0.5)", transition: "border-color 0.2s",
              }}
            >
              <Plus size={11} />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={onClose}
        style={{
          width: "100%", padding: "10px", border: "none",
          background: GOLD, color: DARK, cursor: "pointer",
          fontFamily: "'Inter', sans-serif", fontSize: "9px",
          letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600,
          marginTop: "6px",
        }}
      >
        CONFIRM
      </button>
    </div>
  );
}

// ─── ROOM PICKER POPUP ────────────────────────────────────────────────────────
interface RoomPopupProps {
  selectedId: string;
  lang: string;
  onChange: (id: string) => void;
  onClose: () => void;
}

function RoomPopup({ selectedId, lang, onChange, onClose }: RoomPopupProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(100% + 12px)",
        right: 0,
        zIndex: 200,
        background: "#ffffff",
        boxShadow: "0 24px 80px rgba(5,15,40,0.18), 0 0 0 1px rgba(219,190,140,0.18)",
        borderRadius: "2px",
        padding: "12px",
        width: "340px",
        maxHeight: "420px",
        overflowY: "auto",
        animation: "fadeUpPopRight 0.22s cubic-bezier(0.22,1,0.36,1)",
        scrollbarWidth: "none",
      }}
    >
      {ROOMS.map((room) => {
        const isSelected = room.id === selectedId;
        const name = room.name[lang as keyof typeof room.name] ?? room.name.en;
        const feature = room.feature[lang as keyof typeof room.feature] ?? room.feature.en;
        return (
          <button
            key={room.id}
            onClick={() => { onChange(room.id); onClose(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              width: "100%",
              padding: "12px",
              background: isSelected ? "rgba(219,190,140,0.08)" : "none",
              border: "none",
              borderRadius: "1px",
              cursor: "pointer",
              textAlign: "left",
              outline: isSelected ? `1px solid rgba(219,190,140,0.3)` : "none",
              marginBottom: "4px",
              transition: "background 0.18s",
            }}
            onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "rgba(5,15,40,0.03)"; }}
            onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "none"; }}
          >
            {/* Room thumbnail */}
            <div style={{ width: "60px", height: "44px", flexShrink: 0, overflow: "hidden", borderRadius: "1px" }}>
              <img src={room.image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, color: DARK, marginBottom: "3px", letterSpacing: "0.04em" }}>
                {name}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: "rgba(5,15,40,0.4)", letterSpacing: "0.06em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {feature}
              </div>
              {room.capacity && (
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "8px", color: GOLD, letterSpacing: "0.12em", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Users size={8} /> {room.capacity} {lang === "tr" ? "Kişi" : lang === "ar" ? "أشخاص" : "Guests"}
                </div>
              )}
            </div>
            {isSelected && (
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── MAIN BOOKING BAR ─────────────────────────────────────────────────────────
type Panel = "date" | "guests" | "room" | null;

export function StickyBookingBar() {
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState("all");
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const { lang, t } = useLang();
  const location = useLocation();
  const barRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === "/" || location.pathname === "/tr" || location.pathname === "/en" || location.pathname === "/ar" || location.pathname === "/odalar";

  const togglePanel = (p: Panel) => setOpenPanel((cur) => (cur === p ? null : p));

  // Close on outside click
  useEffect(() => {
    if (!isHome) return;
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isHome]);

  const dateLabel = checkIn && checkOut
    ? `${formatShort(checkIn)}  →  ${formatShort(checkOut)}`
    : checkIn
    ? `${formatShort(checkIn)}  →  ?`
    : t("book.checkin");

  const guestLabel = (() => {
    const parts = [`${adults} ${lang === "tr" ? "Yetişkin" : lang === "ar" ? "بالغ" : "Adult"}`];
    if (children > 0) parts.push(`${children} ${lang === "tr" ? "Çocuk" : lang === "ar" ? "طفل" : "Child"}`);
    return parts.join(", ");
  })();

  const roomName = (() => {
    const r = ROOMS.find((r) => r.id === roomId);
    return r ? (r.name[lang as keyof typeof r.name] ?? r.name.en) : "";
  })();

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "8px",
    letterSpacing: "0.38em",
    textTransform: "uppercase",
    color: GOLD,
    display: "block",
    marginBottom: "5px",
  };
  const valueStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "12px",
    color: DARK,
    fontWeight: 400,
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const fieldDivider = "1px solid rgba(5,15,40,0.07)";

  if (!isHome) return null;

  return (
    <>
      {/* ── DESKTOP ──────────────────────────────────────────────────────────── */}
      <div
        className="booking-bar-desktop"
        ref={barRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: "#ffffff",
          borderTop: "1px solid rgba(219,190,140,0.18)",
          boxShadow: "0 -8px 48px rgba(5,15,40,0.10)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 48px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1.4fr auto",
            alignItems: "center",
            height: "68px",
          }}
        >
          {/* DATE RANGE */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => togglePanel("date")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "0 32px 0 0",
                borderRight: fieldDivider,
                width: "100%",
                height: "68px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span style={labelStyle}>
                <Calendar size={8} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                {checkIn && !checkOut ? t("book.checkout") : t("book.checkin")}
                {checkIn && checkOut ? " → " + t("book.checkout") : ""}
              </span>
              <span style={{ ...valueStyle, color: checkIn ? DARK : "rgba(5,15,40,0.35)" }}>
                {dateLabel}
              </span>
            </button>
            {openPanel === "date" && (
              <CalendarPopup
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={(ci, co) => { setCheckIn(ci); setCheckOut(co); }}
                onClose={() => setOpenPanel(null)}
              />
            )}
          </div>

          {/* GUESTS */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => togglePanel("guests")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "0 28px",
                borderRight: fieldDivider,
                width: "100%",
                height: "68px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span style={labelStyle}>
                <Users size={8} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                {t("book.guests")}
              </span>
              <span style={valueStyle}>{guestLabel}</span>
            </button>
            {openPanel === "guests" && (
              <GuestPopup
                adults={adults}
                children={children}
                lang={lang}
                onChange={(a, c) => { setAdults(a); setChildren(c); }}
                onClose={() => setOpenPanel(null)}
              />
            )}
          </div>

          {/* ROOM TYPE */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => togglePanel("room")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "0 28px",
                width: "100%",
                height: "68px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span style={labelStyle}>
                <BedDouble size={8} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                {t("book.rooms")}
              </span>
              <span style={valueStyle}>{roomName}</span>
            </button>
            {openPanel === "room" && (
              <RoomPopup
                selectedId={roomId}
                lang={lang}
                onChange={(id) => setRoomId(id)}
                onClose={() => setOpenPanel(null)}
              />
            )}
          </div>

          {/* CTA */}
          <a
            href="https://teymur-continental-hotel.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#ffffff",
              backgroundColor: DARK,
              padding: "0 36px",
              textDecoration: "none",
              fontWeight: 600,
              height: "68px",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              transition: "background 0.3s, color 0.3s",
              marginLeft: "24px",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = GOLD; (e.currentTarget as HTMLElement).style.color = DARK; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = DARK; (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
          >
            {t("book.cta")}
          </a>
        </div>
      </div>

      {/* ── MOBILE ───────────────────────────────────────────────────────────── */}
      <div
        className="booking-bar-mobile"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 90,
          width: mobileExpanded ? "calc(100% - 32px)" : "auto",
          maxWidth: "460px",
        }}
      >
        {!mobileExpanded && (
          <button
            onClick={() => setMobileExpanded(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#ffffff",
              boxShadow: "0 8px 32px rgba(5,15,40,0.14)",
              border: `1px solid rgba(219,190,140,0.25)`,
              borderRadius: "2px",
              padding: "13px 24px",
              cursor: "pointer",
              color: DARK,
              whiteSpace: "nowrap",
            }}
          >
            <Calendar size={13} color={GOLD} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: DARK }}>
              {t("book.cta")}
            </span>
          </button>
        )}

        {mobileExpanded && (
          <div
            style={{
              background: "#ffffff",
              boxShadow: "0 16px 64px rgba(5,15,40,0.18)",
              border: `1px solid rgba(219,190,140,0.2)`,
              borderRadius: "2px",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>
                RESERVATION
              </span>
              <button onClick={() => setMobileExpanded(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(5,15,40,0.3)" }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <span style={{ ...labelStyle, color: GOLD }}>CHECK-IN</span>
                <input
                  type="date"
                  value={checkIn ? checkIn.toISOString().slice(0, 10) : ""}
                  onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: DARK, border: "none", outline: "none", background: "transparent", width: "100%", padding: 0 }}
                />
              </div>
              <div>
                <span style={{ ...labelStyle, color: GOLD }}>CHECK-OUT</span>
                <input
                  type="date"
                  value={checkOut ? checkOut.toISOString().slice(0, 10) : ""}
                  onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: DARK, border: "none", outline: "none", background: "transparent", width: "100%", padding: 0 }}
                />
              </div>
              <div>
                <span style={{ ...labelStyle, color: GOLD }}>{t("book.guests")}</span>
                <span style={{ ...valueStyle, fontSize: "11px" }}>{guestLabel}</span>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => setAdults((a) => Math.max(1, a - 1))} style={{ width: "22px", height: "22px", border: "1px solid rgba(5,15,40,0.15)", background: "none", cursor: "pointer", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={9} /></button>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: DARK }}>{adults}</span>
                  <button onClick={() => setAdults((a) => a + 1)} style={{ width: "22px", height: "22px", border: "1px solid rgba(5,15,40,0.15)", background: "none", cursor: "pointer", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={9} /></button>
                </div>
              </div>
              <div>
                <span style={{ ...labelStyle, color: GOLD }}>{t("book.rooms")}</span>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: DARK, border: "none", outline: "none", background: "transparent", width: "100%", padding: 0 }}
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name[lang as keyof typeof r.name] ?? r.name.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <a
              href="https://teymur-continental-hotel.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#ffffff",
                backgroundColor: DARK,
                padding: "14px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {t("book.cta")}
            </a>
          </div>
        )}
      </div>

      <style>{`
        .booking-bar-desktop { display: flex; }
        .booking-bar-mobile  { display: none; }
        @media (max-width: 900px) {
          .booking-bar-desktop { display: none !important; }
          .booking-bar-mobile  { display: block !important; }
        }
        footer { padding-bottom: 68px; }
        @media (max-width: 900px) { footer { padding-bottom: 0; } }
        @keyframes fadeUpPop {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeUpPopRight {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
