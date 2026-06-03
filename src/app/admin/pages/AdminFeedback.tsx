import { useState, useEffect } from "react";
import { Trash2, CheckCircle, QrCode, ExternalLink, RefreshCw, Star, AlertTriangle, X, Eye, EyeOff } from "lucide-react";
import type { FeedbackEntry } from "../../pages/FeedbackPage";

const GOLD = "#dbbe8c";
const NAVY = "#050f28";
const G_YELLOW = "#fbbc04";

function loadFeedback(): FeedbackEntry[] {
  try { return JSON.parse(localStorage.getItem("teymur_feedback") || "[]"); }
  catch { return []; }
}
function saveFeedbackList(list: FeedbackEntry[]) {
  localStorage.setItem("teymur_feedback", JSON.stringify(list));
}
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "2-digit", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  } catch { return iso; }
}

const CAT_LABELS: Record<string, string> = {
  hizmet: "Hizmet", temizlik: "Temizlik",
  konum: "Konum", oda: "Odalar", yemek: "Yemek & İçecek",
};
const STAR_LABELS = ["", "Kötü", "Vasat", "Orta", "İyi", "Mükemmel"];
const STAR_COLORS = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];

function StarRow({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= count ? G_YELLOW : "none"}
          stroke={s <= count ? G_YELLOW : "#e5e7eb"}
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  );
}

// ── Silme onay modalı ──────────────────────────────────────────────────────────
function DeleteModal({ entry, onConfirm, onCancel }: {
  entry: FeedbackEntry; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(5,15,40,0.55)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }} onClick={onCancel}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "32px 28px",
        maxWidth: 420, width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        animation: "modalIn 0.18s ease",
      }} onClick={e => e.stopPropagation()}>

        {/* İkon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertTriangle size={26} color="#ef4444" />
          </div>
        </div>

        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: NAVY, textAlign: "center", margin: "0 0 8px" }}>
          Geri bildirimi sil
        </h3>
        <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center", lineHeight: 1.6, margin: "0 0 24px" }}>
          {entry.name ? <><strong style={{ color: NAVY }}>{entry.name}</strong>'nin</> : "Bu"} değerlendirmesini kalıcı olarak silmek istediğinize emin misiniz?
        </p>

        {/* Önizleme */}
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 16px", marginBottom: 24, borderLeft: "3px solid #ef4444" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <StarRow count={entry.stars} size={14} />
            <span style={{ fontSize: 12, color: STAR_COLORS[entry.stars], fontWeight: 600 }}>{STAR_LABELS[entry.stars]}</span>
          </div>
          {entry.message && (
            <p style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
              "{entry.message.length > 80 ? entry.message.slice(0, 80) + "…" : entry.message}"
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel}
            style={{ flex: 1, padding: "12px", border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, color: "#374151", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            Vazgeç
          </button>
          <button onClick={onConfirm}
            style={{ flex: 1, padding: "12px", border: "none", borderRadius: 10, background: "#ef4444", cursor: "pointer", fontSize: 14, color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Evet, Sil
          </button>
        </div>
      </div>
      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.94) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </div>
  );
}

// ── Geri bildirim kartı ────────────────────────────────────────────────────────
function FeedbackCard({ entry, onDelete, onToggleApprove }: {
  entry: FeedbackEntry;
  onDelete: () => void;
  onToggleApprove: () => void;
}) {
  const isPublic = entry.isPublic;
  const isApproved = entry.isApproved;
  const hasCats = entry.categories && Object.keys(entry.categories).length > 0;

  const statusColor  = isPublic ? (isApproved ? "#10b981" : "#f59e0b") : "#ef4444";
  const statusBg     = isPublic ? (isApproved ? "#ecfdf5" : "#fffbeb") : "#fef2f2";
  const statusText   = isPublic ? (isApproved ? "Sitede Görünüyor" : "Onay Bekliyor") : "Özel";

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
      border: "1px solid #f1f5f9",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"}
    >
      {/* Üst şerit — puan rengi */}
      <div style={{ height: 4, background: STAR_COLORS[entry.stars] || "#e5e7eb" }} />

      <div style={{ padding: "20px 22px" }}>
        {/* Satır 1: yıldız + etiket + tarih + aksiyonlar */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
          {/* Yıldız sayı balonu */}
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: statusBg,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: statusColor, lineHeight: 1 }}>{entry.stars}</span>
            <Star size={10} fill={statusColor} color={statusColor} style={{ marginTop: 1 }} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
              <StarRow count={entry.stars} size={15} />
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                background: statusBg, color: statusColor,
                letterSpacing: "0.02em",
              }}>
                {statusText}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>{formatDate(entry.date)}</div>
          </div>

          {/* Aksiyon butonları */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {isPublic && (
              <button onClick={onToggleApprove}
                title={isApproved ? "Siteden kaldır" : "Sitede göster"}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "7px 12px", borderRadius: 8, cursor: "pointer",
                  border: `1px solid ${isApproved ? "#10b981" : "#e5e7eb"}`,
                  background: isApproved ? "#ecfdf5" : "#fff",
                  color: isApproved ? "#10b981" : "#6b7280",
                  fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500,
                  transition: "all 0.18s",
                }}>
                {isApproved ? <><EyeOff size={13} /> Gizle</> : <><Eye size={13} /> Onayla</>}
              </button>
            )}
            <button onClick={onDelete}
              title="Sil"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 34, height: 34, borderRadius: 8, cursor: "pointer",
                border: "1px solid #fecaca", background: "#fff", color: "#ef4444",
                transition: "all 0.18s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fef2f2"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Misafir adı */}
        {entry.name && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#4f46e5" }}>
              {entry.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{entry.name}</span>
          </div>
        )}

        {/* Yorum metni */}
        {entry.message ? (
          <p style={{
            fontSize: 14, color: "#374151", lineHeight: 1.65,
            margin: "0 0 14px",
            padding: "12px 14px",
            background: "#f8fafc",
            borderRadius: 8,
            borderLeft: "3px solid #e2e8f0",
          }}>
            "{entry.message}"
          </p>
        ) : (
          <p style={{ fontSize: 13, color: "#d1d5db", margin: "0 0 14px", fontStyle: "italic" }}>Yorum girilmemiş</p>
        )}

        {/* Kategori puanları */}
        {hasCats && (
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap",
          }}>
            {Object.entries(entry.categories).map(([k, v]) => (
              <div key={k} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 20,
                background: "#f1f5f9", border: "1px solid #e2e8f0",
              }}>
                <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>
                  {CAT_LABELS[k] || k}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: STAR_COLORS[v] }}>
                  {v}★
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Ana sayfa ──────────────────────────────────────────────────────────────────
const FEEDBACK_URL = window.location.origin + "/feedback";

export function AdminFeedback() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "private" | "public">("all");
  const [deleteTarget, setDeleteTarget] = useState<FeedbackEntry | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [googleUrlSaved, setGoogleUrlSaved] = useState(false);

  const DEFAULT_GOOGLE_URL = "https://search.google.com/local/writereview?placeid=ChIJ-2t9xVvhMRURZnZqvnALis0";
  const [googleUrl, setGoogleUrl] = useState(() => {
    const stored = localStorage.getItem("teymur_google_review_url") || "";
    return (stored.includes("writereview") || stored.includes("g.page/r")) ? stored : DEFAULT_GOOGLE_URL;
  });

  useEffect(() => { setEntries(loadFeedback()); }, []);

  function confirmDelete() {
    if (!deleteTarget) return;
    const updated = entries.filter(e => e.id !== deleteTarget.id);
    saveFeedbackList(updated);
    setEntries(updated);
    setDeleteTarget(null);
  }

  function toggleApprove(id: string) {
    const updated = entries.map(e => e.id === id ? { ...e, isApproved: !e.isApproved } : e);
    saveFeedbackList(updated);
    setEntries(updated);
  }

  function saveGoogleUrl() {
    localStorage.setItem("teymur_google_review_url", googleUrl);
    setGoogleUrlSaved(true);
    setTimeout(() => setGoogleUrlSaved(false), 2000);
  }

  const totalCount   = entries.length;
  const publicCount  = entries.filter(e => e.isPublic).length;
  const privateCount = entries.filter(e => !e.isPublic).length;
  const approvedCount = entries.filter(e => e.isApproved).length;
  const avgStars = entries.length > 0
    ? (entries.reduce((s, e) => s + e.stars, 0) / entries.length).toFixed(1) : "—";

  const filtered = entries
    .filter(e => filter === "all" ? true : filter === "private" ? !e.isPublic : e.isPublic)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Silme modalı ── */}
      {deleteTarget && (
        <DeleteModal entry={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {/* ── Başlık ── */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, color: NAVY, margin: "0 0 6px" }}>
          Geri Bildirimler
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>
          QR kod ile gelen misafir değerlendirmeleri
        </p>
      </div>

      {/* ── İstatistik kartları ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }} className="fb-stats-grid">
        {[
          { label: "Toplam Değerlendirme", value: String(totalCount), sub: "tüm zamanlar", color: NAVY, bg: "#f0f4ff", icon: "📋" },
          { label: "Ortalama Puan", value: avgStars, sub: "genel ortalama", color: "#f59e0b", bg: "#fffbeb", icon: "⭐" },
          { label: "Özel (1–3★)", value: String(privateCount), sub: "sadece size iletildi", color: "#ef4444", bg: "#fef2f2", icon: "🔒" },
          { label: "Sitede Onaylı", value: String(approvedCount), sub: `${publicCount} kamuya açık`, color: "#10b981", bg: "#ecfdf5", icon: "✓" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 12, padding: "18px 20px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            border: "1px solid #f1f5f9",
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, color: s.color, lineHeight: 1, marginTop: 8 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── QR & Google ayarları ── */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>QR Kod & Yönlendirme</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Misafirlere QR kodu gösterin, 4-5 yıldız sonrası Google'a yönlendirin</div>
          </div>
          <button onClick={() => setShowQr(s => !s)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: showQr ? NAVY : "#fff", border: `1px solid ${showQr ? NAVY : "#e5e7eb"}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer", color: showQr ? "#fff" : NAVY, fontSize: 13, fontWeight: 500, transition: "all 0.2s" }}>
            <QrCode size={14} />
            {showQr ? "QR'ı Gizle" : "QR Kodu Göster"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: showQr ? "1fr auto" : "1fr", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Feedback URL */}
            <div>
              <label style={lblStyle}>Feedback Sayfası Linki</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input readOnly value={FEEDBACK_URL}
                  style={{ ...inputStyle, flex: 1, background: "#f9fafb", color: "#6b7280", cursor: "default" }} />
                <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 16px", background: NAVY, borderRadius: 8, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
                  <ExternalLink size={13} /> Önizle
                </a>
              </div>
            </div>

            {/* Google Reviews URL */}
            <div>
              <label style={lblStyle}>
                Google Reviews Linki
                <span style={{ fontWeight: 400, color: "#9ca3af", marginLeft: 6 }}>4–5 yıldız için otomatik yönlendirme</span>
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={googleUrl} onChange={e => setGoogleUrl(e.target.value)}
                  placeholder="https://search.google.com/local/writereview?placeid=..."
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={saveGoogleUrl}
                  style={{ padding: "0 18px", background: googleUrlSaved ? "#10b981" : GOLD, border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: NAVY, whiteSpace: "nowrap", transition: "background 0.3s", minWidth: 90 }}>
                  {googleUrlSaved ? "✓ Kaydedildi" : "Kaydet"}
                </button>
              </div>
            </div>
          </div>

          {showQr && (
            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 16, display: "inline-block", border: "1px solid #e2e8f0" }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(FEEDBACK_URL)}&bgcolor=f8fafc&color=050f28&margin=0`}
                  alt="QR Kod"
                  style={{ display: "block", borderRadius: 4 }}
                />
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>İndirip yazdırın</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Filtre + Yenile ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {([
            { key: "all",     label: "Tümü",         count: totalCount },
            { key: "public",  label: "Kamuya Açık",  count: publicCount },
            { key: "private", label: "Özel",          count: privateCount },
          ] as const).map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              style={{
                padding: "8px 16px", borderRadius: 20, border: "1px solid",
                borderColor: filter === f.key ? NAVY : "#e5e7eb",
                background: filter === f.key ? NAVY : "#fff",
                color: filter === f.key ? "#fff" : "#6b7280",
                fontSize: 13, fontWeight: filter === f.key ? 600 : 400,
                cursor: "pointer", transition: "all 0.18s",
              }}>
              {f.label} <span style={{ opacity: 0.65, fontSize: 12 }}>({f.count})</span>
            </button>
          ))}
        </div>
        <button onClick={() => setEntries(loadFeedback())}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13, color: "#6b7280" }}>
          <RefreshCw size={13} /> Yenile
        </button>
      </div>

      {/* ── Geri bildirim listesi ── */}
      {filtered.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 12, padding: "56px 24px", textAlign: "center", border: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: NAVY, marginBottom: 6 }}>Henüz geri bildirim yok</div>
          <div style={{ fontSize: 13, color: "#9ca3af" }}>QR kodu misafirlerle paylaşarak değerlendirme almaya başlayın</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(entry => (
            <FeedbackCard
              key={entry.id}
              entry={entry}
              onDelete={() => setDeleteTarget(entry)}
              onToggleApprove={() => toggleApprove(entry.id)}
            />
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 800px) { .fb-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 500px) { .fb-stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

const lblStyle: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 600, color: NAVY,
  marginBottom: 8, letterSpacing: "0.01em",
};
const inputStyle: React.CSSProperties = {
  width: "100%", border: "1px solid #e5e7eb", borderRadius: 8,
  padding: "10px 13px", fontSize: 13, color: NAVY, outline: "none",
  fontFamily: "'Inter', sans-serif", boxSizing: "border-box",
  transition: "border-color 0.18s",
};
