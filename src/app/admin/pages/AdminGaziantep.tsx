import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AddImageButton } from "../components/AddImageButton";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

export function AdminGaziantep() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [local, setLocal] = useState(() => ({
    ...content.gaziantep,
    heroImgs: [...content.gaziantep.heroImgs],
    stats: [...content.gaziantep.stats],
    gastronomyImgs: [...content.gaziantep.gastronomyImgs],
    baklavaImgs: [...content.gaziantep.baklavaImgs],
    attractions: content.gaziantep.attractions.map(a => ({ ...a })),
  }));

  const save = (section?: string) => {
    updateContent(p => ({ ...p, gaziantep: local }));
    alert(`✓ ${section ?? "Değişiklikler"} kaydedildi.`);
  };

  const lv = (key: string, trVal: string) => lang === "tr" ? trVal : (translations[lang]?.[`gz.${key}`] ?? "");
  const ls = (key: string, setter: (v: string) => void) => (v: string) => lang === "tr" ? setter(v) : setTranslation(lang, `gz.${key}`, v);

  return (
    <div>
      <PageHeader title="Gaziantep Sayfası" subtitle="Tüm içerikleri ve görselleri buradan yönetin" />
      <AdminLangTabs lang={lang} onChange={setLang} />

      {/* HERO */}
      <AdminCard title="Hero" onSave={() => save("Hero")}>
        <FieldEditor label="Sayfa Başlığı" value={lv("heroTitle", local.heroTitle)} onChange={ls("heroTitle", v => setLocal(p => ({ ...p, heroTitle: v })))} />
        <FieldEditor label="Alt Başlık" value={lv("heroSubtitle", local.heroSubtitle)} onChange={ls("heroSubtitle", v => setLocal(p => ({ ...p, heroSubtitle: v })))} type="textarea" />
        <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 8, marginTop: 4 }}>Hero Slider Görselleri</div>
        {local.heroImgs.map((img, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <FieldEditor noUpload label={`Görsel ${i + 1}`} value={img} type="image"
                onChange={v => setLocal(p => { const arr = [...p.heroImgs]; arr[i] = v; return { ...p, heroImgs: arr }; })} />
            </div>
            <button onClick={() => setLocal(p => ({ ...p, heroImgs: p.heroImgs.filter((_, idx) => idx !== i) }))}
              style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
              Sil
            </button>
          </div>
        ))}
        <AddImageButton onAdd={(url) => setLocal(p => ({ ...p, heroImgs: [...p.heroImgs, url] }))} />
      </AdminCard>

      {/* GİRİŞ METNİ */}
      <AdminCard title="Giriş Metni" onSave={() => save("Giriş metni")}>
        <FieldEditor label="Başlık" value={lv("introTitle", local.introTitle)} onChange={ls("introTitle", v => setLocal(p => ({ ...p, introTitle: v })))} />
        <FieldEditor label="Açıklama" value={lv("introDesc", local.introDesc)} onChange={ls("introDesc", v => setLocal(p => ({ ...p, introDesc: v })))} type="textarea" />
      </AdminCard>

      {/* İSTATİSTİKLER */}
      <AdminCard title="İstatistikler (Sağ Sütun)" onSave={() => save("İstatistikler")}>
        {local.stats.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "flex-end", marginBottom: 8 }}>
            <FieldEditor label={`${i + 1}. Sayı`} value={s.num}
              onChange={v => setLocal(p => { const arr = [...p.stats]; arr[i] = { ...arr[i], num: v }; return { ...p, stats: arr }; })} />
            <FieldEditor label="Etiket" value={s.label}
              onChange={v => setLocal(p => { const arr = [...p.stats]; arr[i] = { ...arr[i], label: v }; return { ...p, stats: arr }; })} />
            <button onClick={() => setLocal(p => ({ ...p, stats: p.stats.filter((_, idx) => idx !== i) }))}
              style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
              Sil
            </button>
          </div>
        ))}
        <button onClick={() => setLocal(p => ({ ...p, stats: [...p.stats, { num: "", label: "" }] }))}
          style={{ padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          + İstatistik Ekle
        </button>
      </AdminCard>

      {/* GASTRONOMİ BÖLÜMÜ */}
      <AdminCard title="Gastronomi Bölümü" onSave={() => save("Gastronomi")}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FieldEditor label="Etiket" value={lv("gastronomyLabel", local.gastronomyLabel)} onChange={ls("gastronomyLabel", v => setLocal(p => ({ ...p, gastronomyLabel: v })))} />
          <FieldEditor label="Başlık" value={lv("gastronomyTitle", local.gastronomyTitle)} onChange={ls("gastronomyTitle", v => setLocal(p => ({ ...p, gastronomyTitle: v })))} />
        </div>
        <FieldEditor label="Açıklama" value={lv("gastronomyDesc", local.gastronomyDesc)} onChange={ls("gastronomyDesc", v => setLocal(p => ({ ...p, gastronomyDesc: v })))} type="textarea" />
        <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 8 }}>Mozaik Görselleri (5 adet)</div>
        {local.gastronomyImgs.map((img, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <FieldEditor noUpload label={`Görsel ${i + 1}`} value={img} type="image"
                onChange={v => setLocal(p => { const arr = [...p.gastronomyImgs]; arr[i] = v; return { ...p, gastronomyImgs: arr }; })} />
            </div>
            <button onClick={() => setLocal(p => ({ ...p, gastronomyImgs: p.gastronomyImgs.filter((_, idx) => idx !== i) }))}
              style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
              Sil
            </button>
          </div>
        ))}
        <AddImageButton onAdd={(url) => setLocal(p => ({ ...p, gastronomyImgs: [...p.gastronomyImgs, url] }))} />
      </AdminCard>

      {/* BAKLAVA BÖLÜMÜ */}
      <AdminCard title="Baklava / Lezzet Mirası Bölümü" onSave={() => save("Baklava")}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FieldEditor label="Etiket" value={lv("baklavaLabel", local.baklavaLabel)} onChange={ls("baklavaLabel", v => setLocal(p => ({ ...p, baklavaLabel: v })))} />
          <FieldEditor label="Başlık" value={lv("baklavaTitle", local.baklavaTitle)} onChange={ls("baklavaTitle", v => setLocal(p => ({ ...p, baklavaTitle: v })))} />
        </div>
        <FieldEditor label="Açıklama" value={lv("baklavaDesc", local.baklavaDesc)} onChange={ls("baklavaDesc", v => setLocal(p => ({ ...p, baklavaDesc: v })))} type="textarea" />
        <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 8 }}>Mozaik Görselleri (3 adet)</div>
        {local.baklavaImgs.map((img, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <FieldEditor noUpload label={`Görsel ${i + 1}`} value={img} type="image"
                onChange={v => setLocal(p => { const arr = [...p.baklavaImgs]; arr[i] = v; return { ...p, baklavaImgs: arr }; })} />
            </div>
            <button onClick={() => setLocal(p => ({ ...p, baklavaImgs: p.baklavaImgs.filter((_, idx) => idx !== i) }))}
              style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
              Sil
            </button>
          </div>
        ))}
        <AddImageButton onAdd={(url) => setLocal(p => ({ ...p, baklavaImgs: [...p.baklavaImgs, url] }))} />
      </AdminCard>

      {/* GEZİLECEK YERLER */}
      <AdminCard title="Gezilecek Yerler Galerisi" onSave={() => save("Gezilecek yerler")}>
        <FieldEditor label="Bölüm Başlığı" value={lv("attractionsTitle", local.attractionsTitle)} onChange={ls("attractionsTitle", v => setLocal(p => ({ ...p, attractionsTitle: v })))} />
        <div style={{ marginTop: 16 }}>
          {local.attractions.map((a, i) => (
            <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 12, backgroundColor: "#fafafa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Yer #{i + 1}</span>
                <button onClick={() => setLocal(p => ({ ...p, attractions: p.attractions.filter((_, idx) => idx !== i) }))}
                  style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}>Sil</button>
              </div>
              <FieldEditor noUpload={false} label="Görsel" value={a.img} type="image"
                onChange={v => setLocal(p => { const arr = [...p.attractions]; arr[i] = { ...arr[i], img: v }; return { ...p, attractions: arr }; })} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <FieldEditor label="Başlık" value={lv(`att${i}.title`, a.title)}
                  onChange={ls(`att${i}.title`, v => setLocal(p => { const arr = [...p.attractions]; arr[i] = { ...arr[i], title: v }; return { ...p, attractions: arr }; }))} />
                <FieldEditor label="Kategori" value={lv(`att${i}.category`, a.category)}
                  onChange={ls(`att${i}.category`, v => setLocal(p => { const arr = [...p.attractions]; arr[i] = { ...arr[i], category: v }; return { ...p, attractions: arr }; }))} />
                <FieldEditor label="Mesafe" value={lv(`att${i}.distance`, a.distance)}
                  onChange={ls(`att${i}.distance`, v => setLocal(p => { const arr = [...p.attractions]; arr[i] = { ...arr[i], distance: v }; return { ...p, attractions: arr }; }))} />
              </div>
              <FieldEditor label="Dönem / Ünvan" value={lv(`att${i}.period`, a.period)}
                onChange={ls(`att${i}.period`, v => setLocal(p => { const arr = [...p.attractions]; arr[i] = { ...arr[i], period: v }; return { ...p, attractions: arr }; }))} />
              <FieldEditor label="Açıklama" value={lv(`att${i}.desc`, a.desc)} type="textarea"
                onChange={ls(`att${i}.desc`, v => setLocal(p => { const arr = [...p.attractions]; arr[i] = { ...arr[i], desc: v }; return { ...p, attractions: arr }; }))} />
            </div>
          ))}
          <button onClick={() => setLocal(p => ({ ...p, attractions: [...p.attractions, { title: "", period: "", distance: "", desc: "", img: "", category: "" }] }))}
            style={{ padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            + Yer Ekle
          </button>
        </div>
      </AdminCard>
    </div>
  );
}
