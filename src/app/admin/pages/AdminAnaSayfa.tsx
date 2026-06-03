import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";
import { AdminLangTabs, AdminLang, getLangVal } from "../components/AdminLangTabs";
import { AddImageButton } from "../components/AddImageButton";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

function getYoutubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\s]+)/);
  return m ? m[1] : null;
}

export function AdminAnaSayfa() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [local, setLocal] = useState(() => ({ ...content.home }));

  const getStr = (key: keyof typeof local) => {
    if (lang === "tr") return (local[key] as string) ?? "";
    return translations[lang]?.[`home.${key}`] ?? "";
  };
  const setStr = (key: keyof typeof local) => (v: string) => {
    if (lang === "tr") setLocal((p) => ({ ...p, [key]: v as any }));
    else setTranslation(lang, `home.${key}`, v);
  };

  const save = (section?: string) => {
    updateContent((prev) => ({ ...prev, home: local }));
    alert(`✓ ${section ?? "Değişiklikler"} kaydedildi.`);
  };

  const set = <K extends keyof typeof local>(key: K, value: typeof local[K]) => {
    setLocal((p) => ({ ...p, [key]: value }));
  };

  const ytId = getYoutubeId(local.heroVideoUrl);
  const videoPreviewUrl = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=0&controls=1`
    : local.heroVideoUrl;

  return (
    <div>
      <PageHeader title="Ana Sayfa" subtitle="Ana sayfadaki tüm içerikleri buradan yönetin" />
      <AdminLangTabs lang={lang} onChange={setLang} />

      {/* ── HERO VIDEO ── */}
      <AdminCard title="Hero — Video Arka Plan" onSave={() => save("Hero")}>
        <div style={{ backgroundColor: "#fff8e8", border: "1px solid #f0d98a", borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#7a5c00" }}>
          <strong>Video URL:</strong> YouTube linki (youtube.com/watch?v=... veya youtu.be/...) veya doğrudan MP4 linki girebilirsiniz.
        </div>
        <FieldEditor label="Video URL (YouTube veya direkt MP4)" value={local.heroVideoUrl} onChange={setStr("heroVideoUrl")} type="url" />
        <FieldEditor label="Yedek Video URL (MP4)" value={local.heroVideoUrl2} onChange={setStr("heroVideoUrl2")} type="url" />
        <FieldEditor noUpload={false} label="Poster / Ön Yükleme Görseli" value={local.heroPoster} onChange={setStr("heroPoster")} type="image" />

        {/* Video preview */}
        {local.heroVideoUrl && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: "rgba(5,15,40,0.5)", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>Önizleme</div>
            {ytId ? (
              <iframe src={videoPreviewUrl} style={{ width: "100%", aspectRatio: "16/9", border: "none", borderRadius: 6 }} allowFullScreen />
            ) : (
              <video src={local.heroVideoUrl} controls style={{ width: "100%", aspectRatio: "16/9", borderRadius: 6, backgroundColor: "#000" }} />
            )}
          </div>
        )}
      </AdminCard>

      {/* ── HERO YAZILARI ── */}
      <AdminCard title="Hero — Yazılar" onSave={() => save("Hero yazıları")}>
        <FieldEditor label="Otel Adı (büyük harf)" value={getStr("heroName")} onChange={setStr("heroName")} />
        <FieldEditor label="Alt Başlık (HOTEL & CONVENTION CENTER)" value={getStr("heroSubName")} onChange={setStr("heroSubName")} />
        <FieldEditor label="Şehir Etiketi" value={getStr("heroCity")} onChange={setStr("heroCity")} />
      </AdminCard>

      {/* ── ODALAR ── */}
      <AdminCard title="Odalar & Süitler Bölümü" onSave={() => save("Odalar")}>
        <FieldEditor label="Bölüm Başlığı" value={getStr("roomsTitle")} onChange={setStr("roomsTitle")} />
        <FieldEditor label="Bölüm Açıklama Metni" value={getStr("roomsDesc")} onChange={setStr("roomsDesc")} type="textarea" />

        <div style={{ marginTop: 24, marginBottom: 12, fontSize: 12, fontWeight: 600, color: DARK, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Oda Kartları (Liste Sırası)
        </div>
        {local.roomsPreview.map((room, i) => (
          <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 12, backgroundColor: "#fafafa" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Oda #{i + 1}</span>
              <button onClick={() => { const arr = local.roomsPreview.filter((_, idx) => idx !== i); set("roomsPreview", arr); }}
                style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer", padding: "2px 8px" }}>
                Sil
              </button>
            </div>
            <FieldEditor label="Oda Adı"
              value={lang === "tr" ? room.name : (translations[lang]?.[`home.room${i}.name`] ?? "")}
              onChange={(v) => lang === "tr" ? (() => { const arr = [...local.roomsPreview]; arr[i] = { ...arr[i], name: v }; set("roomsPreview", arr); })() : setTranslation(lang, `home.room${i}.name`, v)} />
            <FieldEditor label="Slug (URL)" value={room.slug}
              onChange={(v) => { const arr = [...local.roomsPreview]; arr[i] = { ...arr[i], slug: v }; set("roomsPreview", arr); }} />
            <div style={{ fontSize: 11, color: "rgba(5,15,40,0.5)", marginBottom: 6, marginTop: 8 }}>Görsel URL'leri (her satıra bir URL):</div>
            <textarea
              value={room.imgs.join("\n")}
              onChange={(e) => { const arr = [...local.roomsPreview]; arr[i] = { ...arr[i], imgs: e.target.value.split("\n").filter(Boolean) }; set("roomsPreview", arr); }}
              rows={3}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 6, fontSize: 12, fontFamily: "monospace", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
        ))}
        <button onClick={() => set("roomsPreview", [...local.roomsPreview, { name: "YENİ ODA", slug: "yeni-oda", imgs: [] }])}
          style={{ marginTop: 8, padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          + Oda Ekle
        </button>
      </AdminCard>

      {/* ── DENEYİM PANELLER ── */}
      <AdminCard title="Deneyim Panelleri (UNESCO / Sağlık / Etkinlikler)" onSave={() => save("Deneyim panelleri")}>
        <div style={{ fontSize: 12, color: "rgba(5,15,40,0.5)", marginBottom: 16 }}>
          Ana sayfadaki 3 büyük deneyim kartı (gastronomi, spa, etkinlikler)
        </div>
        {local.experienceItems.map((item, i) => (
          <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 16, backgroundColor: "#fafafa" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Panel #{i + 1}</span>
            </div>
            {[
              { label: "Üst Etiket (eyebrow)", field: "eyebrow" as const },
              { label: "Başlık", field: "title" as const },
              { label: "Başlık (altın renkli kısım)", field: "titleAccent" as const },
              { label: "Buton Yazısı", field: "cta" as const },
            ].map(({ label, field }) => (
              <FieldEditor key={field} label={label}
                value={lang === "tr" ? item[field] : (translations[lang]?.[`home.exp${i}.${field}`] ?? "")}
                onChange={(v) => lang === "tr" ? (() => { const arr = [...local.experienceItems]; arr[i] = { ...arr[i], [field]: v }; set("experienceItems", arr); })() : setTranslation(lang, `home.exp${i}.${field}`, v)} />
            ))}
            <FieldEditor label="Açıklama" type="textarea"
              value={lang === "tr" ? item.desc : (translations[lang]?.[`home.exp${i}.desc`] ?? "")}
              onChange={(v) => lang === "tr" ? (() => { const arr = [...local.experienceItems]; arr[i] = { ...arr[i], desc: v }; set("experienceItems", arr); })() : setTranslation(lang, `home.exp${i}.desc`, v)} />
            <FieldEditor label="Link (/restoran, /saglik, vb.)" value={item.link}
              onChange={(v) => { const arr = [...local.experienceItems]; arr[i] = { ...arr[i], link: v }; set("experienceItems", arr); }} />
            <FieldEditor noUpload={false} label="Arka Plan Görseli" value={item.image} type="image"
              onChange={(v) => { const arr = [...local.experienceItems]; arr[i] = { ...arr[i], image: v }; set("experienceItems", arr); }} />
          </div>
        ))}
      </AdminCard>

      {/* ── GALERİ ── */}
      <AdminCard title="Ana Sayfa Galeri Görselleri" onSave={() => save("Galeri")}>
        <div style={{ fontSize: 12, color: "rgba(5,15,40,0.5)", marginBottom: 16 }}>
          Yatay kaydırmalı galeri bölümü görselleri. Genişlik: vw cinsinden (örn: 44vw, 28vw)
        </div>
        {local.galleryImages.map((img, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "flex-end", marginBottom: 12 }}>
            <FieldEditor noUpload label={`Görsel ${i + 1} URL`} value={img.src} type="image"
              onChange={(v) => { const arr = [...local.galleryImages]; arr[i] = { ...arr[i], src: v }; set("galleryImages", arr); }} />
            <button onClick={() => set("galleryImages", local.galleryImages.filter((_, idx) => idx !== i))}
              style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 1 }}>
              Sil
            </button>
          </div>
        ))}
        <AddImageButton onAdd={(url) => set("galleryImages", [...local.galleryImages, { src: url, w: "32vw" }])} />
      </AdminCard>

      {/* ── HAKKIMIZDA TEASER ── */}
      <AdminCard title="Hakkımızda Tanıtım Bölümü" onSave={() => save("Hakkımızda teaser")}>
        <FieldEditor label="Başlık" value={getStr("aboutTeaserTitle")} onChange={setStr("aboutTeaserTitle")} />
        <FieldEditor label="Başlık (altın renkli)" value={getStr("aboutTeaserTitleAccent")} onChange={setStr("aboutTeaserTitleAccent")} />
        <FieldEditor label="Açıklama" value={getStr("aboutTeaserDesc")} onChange={setStr("aboutTeaserDesc")} type="textarea" />
        <FieldEditor noUpload={false} label="Görsel" value={local.aboutTeaserImg} onChange={(v) => lang === "tr" ? set("aboutTeaserImg", v) : undefined} type="image" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          <FieldEditor label="İstatistik 1 — Sayı" value={local.aboutTeaserStat1n} onChange={(v) => set("aboutTeaserStat1n", v)} />
          <FieldEditor label="İstatistik 1 — Etiket" value={getStr("aboutTeaserStat1l")} onChange={setStr("aboutTeaserStat1l")} />
          <FieldEditor label="İstatistik 2 — Sayı" value={local.aboutTeaserStat2n} onChange={(v) => set("aboutTeaserStat2n", v)} />
          <FieldEditor label="İstatistik 2 — Etiket" value={getStr("aboutTeaserStat2l")} onChange={setStr("aboutTeaserStat2l")} />
        </div>
      </AdminCard>

      {/* ── FINAL CTA ── */}
      <AdminCard title="Son Bölüm (Rezervasyon CTA)" onSave={() => save("Final CTA")}>
        <FieldEditor label="Başlık Satır 1" value={getStr("finalCtaTitle1")} onChange={setStr("finalCtaTitle1")} />
        <FieldEditor label="Başlık Satır 2 (altın renk)" value={getStr("finalCtaTitle2")} onChange={setStr("finalCtaTitle2")} />
        <FieldEditor noUpload={false} label="Arka Plan Görseli" value={local.finalCtaImg} onChange={setStr("finalCtaImg")} type="image" />
      </AdminCard>

      {/* ── YEMİNLER ── */}
      <AdminCard title="Müşteri Yorumları" onSave={() => save("Yorumlar")}>
        {local.testimonials.map((t, i) => (
          <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 12, backgroundColor: "#fafafa" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Yorum #{i + 1}</span>
              <button onClick={() => set("testimonials", local.testimonials.filter((_, idx) => idx !== i))}
                style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}>Sil</button>
            </div>
            <FieldEditor label="Yorum Metni" type="textarea"
              value={lang === "tr" ? t.text : (translations[lang]?.[`home.test${i}.text`] ?? "")}
              onChange={(v) => lang === "tr" ? (() => { const arr = [...local.testimonials]; arr[i] = { ...arr[i], text: v }; set("testimonials", arr); })() : setTranslation(lang, `home.test${i}.text`, v)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FieldEditor label="İsim"
                value={lang === "tr" ? t.author : (translations[lang]?.[`home.test${i}.author`] ?? "")}
                onChange={(v) => lang === "tr" ? (() => { const arr = [...local.testimonials]; arr[i] = { ...arr[i], author: v }; set("testimonials", arr); })() : setTranslation(lang, `home.test${i}.author`, v)} />
              <FieldEditor label="Şehir"
                value={lang === "tr" ? t.city : (translations[lang]?.[`home.test${i}.city`] ?? "")}
                onChange={(v) => lang === "tr" ? (() => { const arr = [...local.testimonials]; arr[i] = { ...arr[i], city: v }; set("testimonials", arr); })() : setTranslation(lang, `home.test${i}.city`, v)} />
            </div>
          </div>
        ))}
        <button onClick={() => set("testimonials", [...local.testimonials, { text: "", author: "", city: "" }])}
          style={{ marginTop: 8, padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          + Yorum Ekle
        </button>
      </AdminCard>

      {/* ── 360° TUR ── */}
      <AdminCard title="360° Sanal Tur Bölümü" onSave={() => save("360° Tur")}>
        <FieldEditor label="Başlık" value={getStr("experience360Title")} onChange={setStr("experience360Title")} />
        <FieldEditor label="Alt Başlık" value={getStr("experience360Subtitle")} onChange={setStr("experience360Subtitle")} type="textarea" />
        <FieldEditor noUpload={false} label="Önizleme Görseli" value={local.experience360PreviewImg} onChange={setStr("experience360PreviewImg")} type="image" />
        <FieldEditor label="360° İframe URL" value={local.experience360IframeUrl} onChange={setStr("experience360IframeUrl")} type="url" />
      </AdminCard>
    </div>
  );
}
