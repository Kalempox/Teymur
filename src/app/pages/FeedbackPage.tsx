import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";

// ── Google renk paleti ──
const G_BLUE   = "#1a73e8";
const G_YELLOW = "#fbbc04";
const G_GRAY1  = "#202124";
const G_GRAY2  = "#5f6368";
const G_GRAY3  = "#dadce0";
const G_BG     = "#f8f9fa";

export interface FeedbackEntry {
  id: string;
  stars: number;
  categories: Record<string, number>;
  name: string;
  message: string;
  date: string;
  isPublic: boolean;
  isApproved: boolean;
}

export function saveFeedbackEntry(data: { stars: number; categories: Record<string, number>; name: string; message: string }) {
  try {
    const existing: FeedbackEntry[] = JSON.parse(localStorage.getItem("teymur_feedback") || "[]");
    const entry: FeedbackEntry = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      stars: data.stars,
      categories: data.categories,
      name: data.name,
      message: data.message,
      date: new Date().toISOString(),
      isPublic: data.stars >= 4,
      isApproved: false,
    };
    existing.push(entry);
    localStorage.setItem("teymur_feedback", JSON.stringify(existing));
  } catch {}
}

const STAR_LABELS = ["", "Kötü", "Vasat", "Orta", "İyi", "Mükemmel"];
const STAR_COLORS = ["", "#ea4335", "#ea4335", "#fbbc04", "#34a853", "#34a853"];

const CATEGORIES = [
  { key: "hizmet",   label: "Hizmet" },
  { key: "temizlik", label: "Temizlik" },
  { key: "konum",    label: "Konum" },
  { key: "oda",      label: "Odalar" },
  { key: "yemek",    label: "Yemek & İçecek" },
];

// Google Maps ikonu (pin)
function MapsPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={G_BLUE}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}

// Google logosu (4 renk)
function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

// Geri ok
function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={G_GRAY2}>
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  );
}

// Büyük yıldız seçici (Google stili)
function BigStars({ value, hover, onHover, onClick }: {
  value: number; hover: number;
  onHover: (v: number) => void; onClick: (v: number) => void;
}) {
  const active = hover || value;
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => onClick(s)}
          onMouseEnter={() => onHover(s)} onMouseLeave={() => onHover(0)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4,
            transition: "transform 0.12s", transform: active >= s ? "scale(1.1)" : "scale(1)" }}
          aria-label={`${s} yıldız`}
        >
          <svg width="48" height="48" viewBox="0 0 24 24"
            fill={active >= s ? G_YELLOW : "none"}
            stroke={active >= s ? G_YELLOW : G_GRAY3}
            strokeWidth="1.5"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      ))}
    </div>
  );
}

// Küçük yıldız (kategori)
function MiniStars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [h, setH] = useState(0);
  const active = h || value;
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => onChange(s)}
          onMouseEnter={() => setH(s)} onMouseLeave={() => setH(0)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24"
            fill={active >= s ? G_YELLOW : "none"}
            stroke={active >= s ? G_YELLOW : G_GRAY3}
            strokeWidth="1.5"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </button>
      ))}
    </div>
  );
}

// Küçük yıldız gösterimi (static)
function StarDisplay({ count }: { count: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="16" height="16" viewBox="0 0 24 24"
          fill={s <= count ? G_YELLOW : "none"}
          stroke={s <= count ? G_YELLOW : G_GRAY3}
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  );
}

export function FeedbackPage() {
  const { global: g } = useContent();
  const [step, setStep] = useState<"rate" | "form" | "done-private" | "redirecting">("rate");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [cats, setCats] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJ-2t9xVvhMRURZnZqvnALis0";
  const stored = localStorage.getItem("teymur_google_review_url") || "";
  const isValidReviewUrl = stored.includes("writereview") || stored.includes("g.page/r");
  const googleUrl = isValidReviewUrl ? stored : GOOGLE_REVIEW_URL;


  function handleStarClick(s: number) {
    setStars(s);
    if (s >= 4) {
      // 4-5 yıldız → formsuz direkt Google'a yönlendir
      saveFeedbackEntry({ stars: s, categories: {}, name: "", message: "" });
      setStep("redirecting");
      setTimeout(() => { window.location.href = googleUrl; }, 1000);
    } else {
      // 1-3 yıldız → formu göster
      setTimeout(() => setStep("form"), 200);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    saveFeedbackEntry({ stars, categories: cats, name, message });
    setTimeout(() => {
      setSubmitting(false);
      setStep("done-private");
    }, 600);
  }

  const activeColor = stars ? STAR_COLORS[stars] : G_GRAY2;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: G_BG,
      fontFamily: "'Google Sans', Roboto, 'Helvetica Neue', Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* ── HEADER (Google Maps tarzı) ── */}
      <div style={{
        width: "100%",
        backgroundColor: "#fff",
        borderBottom: `1px solid ${G_GRAY3}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        height: 56,
        boxSizing: "border-box",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        {step === "form" && (
          <button type="button" onClick={() => { setStep("rate"); setStars(0); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", marginRight: 8, display: "flex", borderRadius: "50%" }}>
            <BackArrow />
          </button>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <GoogleLogo size={22} />
          <span style={{ fontSize: 16, fontWeight: 500, color: G_GRAY1 }}>Google</span>
          <span style={{ fontSize: 14, color: G_GRAY2, marginLeft: 2 }}>Maps</span>
        </div>
      </div>

      {/* ── İÇERİK ── */}
      <div style={{ width: "100%", maxWidth: 540, padding: "0 0 40px" }}>

        {/* Otel bilgisi */}
        <div style={{
          backgroundColor: "#fff",
          padding: "20px 20px 16px",
          borderBottom: `1px solid ${G_GRAY3}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 8,
            backgroundColor: "#e8f0fe",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <MapsPinIcon />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: G_GRAY1, lineHeight: 1.3 }}>
              {g.hotelName || "Teymur Continental Hotel"}
            </div>
            <div style={{ fontSize: 13, color: G_GRAY2, marginTop: 2 }}>
              Otel · Gaziantep
            </div>
          </div>
        </div>

        {/* ── ADIM 1: Yıldız seç ── */}
        {step === "rate" && (
          <div style={{ backgroundColor: "#fff", marginTop: 8, padding: "32px 24px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: G_GRAY1, marginBottom: 8 }}>
              Değerlendirme bırakın
            </div>
            <div style={{ fontSize: 14, color: G_GRAY2, marginBottom: 32 }}>
              Bu oteli nasıl değerlendirirsiniz?
            </div>

            <BigStars value={stars} hover={hover} onHover={setHover} onClick={handleStarClick} />

            <div style={{
              marginTop: 16, fontSize: 14, fontWeight: 500,
              color: activeColor,
              minHeight: 22, transition: "color 0.2s",
            }}>
              {(hover || stars) ? STAR_LABELS[hover || stars] : ""}
            </div>

            {/* Sayı etiketi */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 4px" }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ fontSize: 11, color: G_GRAY3, width: 48, textAlign: "center" }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── ADIM 2: Form ── */}
        {step === "form" && (
          <form onSubmit={handleSubmit}>
            <div style={{ backgroundColor: "#fff", marginTop: 8, padding: "24px 20px" }}>

              {/* Seçilen yıldız özeti */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "12px 16px", backgroundColor: G_BG, borderRadius: 8 }}>
                <StarDisplay count={stars} />
                <span style={{ fontSize: 14, fontWeight: 500, color: STAR_COLORS[stars] }}>
                  {STAR_LABELS[stars]}
                </span>
                <button type="button" onClick={() => { setStep("rate"); setStars(0); }}
                  style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: G_BLUE, fontWeight: 500, padding: "4px 8px" }}>
                  Değiştir
                </button>
              </div>

              {/* Yorum alanı */}
              <div style={{ marginBottom: 20 }}>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  placeholder={
                    stars >= 4
                      ? "Bu otelde neler harika gitti? Hizmet, temizlik, konum..."
                      : "Deneyiminizi paylaşın. Neler geliştirilmeli?"
                  }
                  style={{
                    width: "100%",
                    border: `1px solid ${G_GRAY3}`,
                    borderRadius: 8,
                    padding: "14px",
                    fontSize: 14,
                    color: G_GRAY1,
                    fontFamily: "inherit",
                    resize: "none",
                    outline: "none",
                    boxSizing: "border-box",
                    lineHeight: 1.6,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => (e.target.style.borderColor = G_BLUE)}
                  onBlur={e => (e.target.style.borderColor = G_GRAY3)}
                />
              </div>
            </div>

            {/* Kategori puanları */}
            <div style={{ backgroundColor: "#fff", marginTop: 8, padding: "20px" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: G_GRAY2, marginBottom: 16, letterSpacing: "0.01em" }}>
                Ayrıntılı puanlama <span style={{ fontWeight: 400, color: G_GRAY3 }}>(isteğe bağlı)</span>
              </div>
              {CATEGORIES.map((cat, i) => (
                <div key={cat.key} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: i < CATEGORIES.length - 1 ? `1px solid ${G_BG}` : "none",
                }}>
                  <span style={{ fontSize: 14, color: G_GRAY1, minWidth: 120 }}>{cat.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MiniStars
                      value={cats[cat.key] || 0}
                      onChange={v => setCats(p => ({ ...p, [cat.key]: v }))}
                    />
                    <span style={{ fontSize: 12, color: cats[cat.key] ? STAR_COLORS[cats[cat.key]] : G_GRAY3, minWidth: 52, textAlign: "right", fontWeight: 500 }}>
                      {cats[cat.key] ? STAR_LABELS[cats[cat.key]] : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* İsim */}
            <div style={{ backgroundColor: "#fff", marginTop: 8, padding: "20px" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: G_GRAY2, marginBottom: 10 }}>
                Adınız <span style={{ fontWeight: 400, color: G_GRAY3 }}>(isteğe bağlı)</span>
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nasıl hitap edelim?"
                style={{
                  width: "100%", border: `1px solid ${G_GRAY3}`, borderRadius: 8,
                  padding: "12px 14px", fontSize: 14, color: G_GRAY1, fontFamily: "inherit",
                  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                onFocus={e => (e.target.style.borderColor = G_BLUE)}
                onBlur={e => (e.target.style.borderColor = G_GRAY3)}
              />
            </div>

            {/* Gönder butonu */}
            <div style={{ padding: "16px 20px" }}>
              <button type="submit" disabled={submitting}
                style={{
                  width: "100%",
                  backgroundColor: submitting ? "#a8c7fa" : G_BLUE,
                  color: "#fff",
                  border: "none",
                  borderRadius: 24,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                  letterSpacing: "0.01em",
                }}
              >
                {submitting ? "Gönderiliyor..." : "Değerlendirmeyi Yayınla"}
              </button>
              <div style={{ fontSize: 11, color: G_GRAY2, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
                Değerlendirmeniz {g.hotelName || "otele"} iletilecektir.
              </div>
            </div>
          </form>
        )}

        {/* ── ADIM 3a: Özel teşekkür (1-3★) ── */}
        {step === "done-private" && (
          <div style={{ backgroundColor: "#fff", marginTop: 8, padding: "48px 24px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill={G_BLUE}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: G_GRAY1, marginBottom: 12 }}>
              Geri bildiriminiz alındı
            </div>
            <div style={{ fontSize: 14, color: G_GRAY2, lineHeight: 1.7 }}>
              Görüşlerinizi bizimle paylaştığınız için teşekkür ederiz. Konaklamanızı daha iyi hale getirmek için değerlendirmenizi dikkate alacağız.
            </div>
            <div style={{ marginTop: 32, padding: "14px 20px", backgroundColor: G_BG, borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
              <MapsPinIcon />
              <span style={{ fontSize: 14, fontWeight: 500, color: G_GRAY1 }}>{g.hotelName || "Teymur Continental Hotel"}</span>
            </div>
          </div>
        )}

        {/* ── YÖNLENDIRME (4-5★) ── */}
        {step === "redirecting" && (
          <div style={{ backgroundColor: "#fff", marginTop: 8, padding: "56px 24px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#fef7e0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill={G_YELLOW}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: G_GRAY1, marginBottom: 10 }}>
              Teşekkür ederiz!
            </div>
            <div style={{ fontSize: 14, color: G_GRAY2, lineHeight: 1.7, marginBottom: 32 }}>
              Google'da yorum bırakarak diğer misafirlere yardımcı olun.
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px", backgroundColor: G_BG, borderRadius: 10 }}>
              <div style={{ width: 18, height: 18, border: `2.5px solid ${G_BLUE}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <span style={{ fontSize: 14, color: G_BLUE, fontWeight: 500 }}>Google'a yönlendiriliyorsunuz...</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        textarea::placeholder, input::placeholder { color: #9aa0a6; }
      `}</style>
    </div>
  );
}
