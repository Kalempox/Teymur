import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AddImageButton } from "../components/AddImageButton";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

type Tab = "photos" | "videos";

export function AdminGaleri() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [tab, setTab] = useState<Tab>("photos");
  const [local, setLocal] = useState(() => ({
    ...content.gallery,
    photos: content.gallery.photos.map(p => ({ ...p })),
    videos: content.gallery.videos.map(v => ({ ...v })),
  }));

  const save = (section?: string) => {
    updateContent(p => ({ ...p, gallery: local }));
    alert(`✓ ${section ?? "Değişiklikler"} kaydedildi.`);
  };
  const lv = (key: string, trVal: string) => lang === "tr" ? trVal : (translations[lang]?.[`gallery.${key}`] ?? "");
  const ls = (key: string, setter: (v: string) => void) => (v: string) => lang === "tr" ? setter(v) : setTranslation(lang, `gallery.${key}`, v);

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: "10px 24px",
    border: "none",
    borderBottom: tab === t ? `2px solid ${GOLD}` : "2px solid transparent",
    backgroundColor: "transparent",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: tab === t ? 600 : 400,
    color: tab === t ? DARK : "rgba(5,15,40,0.45)",
    cursor: "pointer",
    transition: "all 0.2s",
  });

  return (
    <div>
      <PageHeader title="Galeri Yönetimi" subtitle="Galeri sayfasındaki tüm fotoğraf ve videoları yönetin" />
      <AdminLangTabs lang={lang} onChange={setLang} />

      {/* Hero */}
      <AdminCard title="Hero" onSave={() => save("Hero")}>
        <FieldEditor label="Sayfa Başlığı" value={lv("heroTitle", local.heroTitle)} onChange={ls("heroTitle", v => setLocal(p => ({ ...p, heroTitle: v })))} />
        <FieldEditor noUpload={false} label="Hero Görseli" value={local.heroImg} onChange={v => setLocal(p => ({ ...p, heroImg: v }))} type="image" />
      </AdminCard>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.08)", marginBottom: 24, backgroundColor: "#fff", borderRadius: "8px 8px 0 0" }}>
        <button style={tabStyle("photos")} onClick={() => setTab("photos")}>
          Fotoğraflar ({local.photos.length})
        </button>
        <button style={tabStyle("videos")} onClick={() => setTab("videos")}>
          Videolar ({local.videos.length})
        </button>
      </div>

      {/* ── FOTOĞRAFLAR ── */}
      {tab === "photos" && (
        <AdminCard title="Galeri Fotoğrafları" onSave={() => save("Fotoğraflar")}>
          <div style={{ fontSize: 12, color: "rgba(5,15,40,0.5)", marginBottom: 16 }}>
            Her fotoğraf için URL veya cihazdan yükleme yapabilirsiniz. Kategori alanı bilgi amaçlıdır.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {local.photos.map((photo, i) => (
              <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 14, backgroundColor: "#fafafa", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: DARK }}>#{i + 1}</span>
                  <button onClick={() => setLocal(p => ({ ...p, photos: p.photos.filter((_, idx) => idx !== i) }))}
                    style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer", padding: "2px 6px" }}>
                    Sil
                  </button>
                </div>
                <FieldEditor label="Görsel" value={photo.src} type="image"
                  onChange={v => setLocal(p => { const arr = [...p.photos]; arr[i] = { ...arr[i], src: v }; return { ...p, photos: arr }; })} />
                <FieldEditor label="Kategori" value={photo.cat}
                  onChange={v => setLocal(p => { const arr = [...p.photos]; arr[i] = { ...arr[i], cat: v }; return { ...p, photos: arr }; })} />
              </div>
            ))}
          </div>
          <AddImageButton label="Fotoğraf Ekle" onAdd={(url) => setLocal(p => ({ ...p, photos: [...p.photos, { src: url, cat: "Galeri" }] }))} />
        </AdminCard>
      )}

      {/* ── VİDEOLAR ── */}
      {tab === "videos" && (
        <AdminCard title="Galeri Videoları" onSave={() => save("Videolar")}>
          <div style={{ fontSize: 12, color: "rgba(5,15,40,0.5)", marginBottom: 16 }}>
            YouTube video ID'si girin (URL'den kopyalayın: youtube.com/watch?v=<strong>BU_KISIM</strong>)
          </div>
          {local.videos.map((vid, i) => (
            <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 12, backgroundColor: "#fafafa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Video #{i + 1}</span>
                <button onClick={() => setLocal(p => ({ ...p, videos: p.videos.filter((_, idx) => idx !== i) }))}
                  style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}>Sil</button>
              </div>
              <FieldEditor label="Video Başlığı" value={vid.title}
                onChange={v => setLocal(p => { const arr = [...p.videos]; arr[i] = { ...arr[i], title: v }; return { ...p, videos: arr }; })} />
              <FieldEditor label="YouTube Video ID (örn: dQw4w9WgXcQ)" value={vid.embedId}
                onChange={v => {
                  const thumb = v ? `https://img.youtube.com/vi/${v}/maxresdefault.jpg` : "";
                  setLocal(p => { const arr = [...p.videos]; arr[i] = { ...arr[i], embedId: v, thumb }; return { ...p, videos: arr }; });
                }} />
              {vid.embedId && (
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
                  <img src={`https://img.youtube.com/vi/${vid.embedId}/mqdefault.jpg`} alt="thumb"
                    style={{ width: 120, height: 68, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(0,0,0,0.08)" }} />
                  <a href={`https://youtube.com/watch?v=${vid.embedId}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12, color: GOLD }}>
                    YouTube'da Aç
                  </a>
                </div>
              )}
            </div>
          ))}
          <button onClick={() => setLocal(p => ({ ...p, videos: [...p.videos, { embedId: "", thumb: "", title: "" }] }))}
            style={{ marginTop: 8, padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            + Video Ekle
          </button>
        </AdminCard>
      )}
    </div>
  );
}
