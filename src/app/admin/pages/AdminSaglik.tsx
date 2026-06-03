import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AddImageButton } from "../components/AddImageButton";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

type Tab = "wellness" | "spa" | "fitness";

export function AdminSaglik() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [tab, setTab] = useState<Tab>("wellness");
  const [wellness, setWellness] = useState(() => ({ ...content.wellness, galleryItems: [...content.wellness.galleryItems], otherServices: [...content.wellness.otherServices] }));
  const [spa, setSpa] = useState(() => ({ ...content.spa, heroImgs: [...content.spa.heroImgs], sections: content.spa.sections.map(s => ({ ...s, imgs: [...s.imgs] })) }));
  const [fitness, setFitness] = useState(() => ({ ...content.fitness, heroImgs: [...content.fitness.heroImgs], sections: content.fitness.sections.map(s => ({ ...s, imgs: [...s.imgs] })) }));

  const saveWellness = () => { updateContent(p => ({ ...p, wellness })); alert("✓ Sağlık Merkezi kaydedildi."); };
  const saveSpa = () => { updateContent(p => ({ ...p, spa })); alert("✓ Spa & Hamam kaydedildi."); };
  const saveFitness = () => { updateContent(p => ({ ...p, fitness })); alert("✓ Fitness kaydedildi."); };
  const lv = (prefix: string, key: string, trVal: string) => lang === "tr" ? trVal : (translations[lang]?.[`${prefix}.${key}`] ?? "");
  const ls = (prefix: string, key: string, setter: (v: string) => void) => (v: string) => lang === "tr" ? setter(v) : setTranslation(lang, `${prefix}.${key}`, v);

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
      <PageHeader title="Sağlık Merkezi" subtitle="Wellness, Spa & Hamam ve Fitness sayfalarını yönetin" />
      <AdminLangTabs lang={lang} onChange={setLang} />
      {lang !== "tr" && (
        <div style={{ backgroundColor: "#fff8e8", border: "1px solid #f0d98a", borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#7a5c00" }}>İngilizce/Arapça çeviri düzenliyorsunuz. Değişiklikler kaydedildiğinde bu dil için içerik güncellenir. Boş bırakılan alanlar Türkçeyi gösterir.</div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.08)", marginBottom: 24, backgroundColor: "#fff", borderRadius: "8px 8px 0 0" }}>
        <button style={tabStyle("wellness")} onClick={() => setTab("wellness")}>Sağlık Merkezi</button>
        <button style={tabStyle("spa")} onClick={() => setTab("spa")}>Spa & Hamam</button>
        <button style={tabStyle("fitness")} onClick={() => setTab("fitness")}>Fitness</button>
      </div>

      {/* ── WELLNESS ── */}
      {tab === "wellness" && (
        <>
          <AdminCard title="Hero" onSave={saveWellness}>
            <FieldEditor label="Sayfa Başlığı"
              value={lang === "tr" ? wellness.heroTitle : (translations[lang]?.["wellness.heroTitle"] ?? "")}
              onChange={v => lang === "tr" ? setWellness(p => ({ ...p, heroTitle: v })) : setTranslation(lang, "wellness.heroTitle", v)} />
            <FieldEditor noUpload={false} label="Hero Arka Plan Görseli" value={wellness.heroImg} onChange={v => setWellness(p => ({ ...p, heroImg: v }))} type="image" />
          </AdminCard>

          <AdminCard title="Galeri Kartları" onSave={saveWellness}>
            <div style={{ fontSize: 12, color: "rgba(5,15,40,0.5)", marginBottom: 16 }}>Wellness sayfasındaki sürüklemeli galeri</div>
            {wellness.galleryItems.map((item, i) => (
              <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 12, backgroundColor: "#fafafa" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Kart #{i + 1}</span>
                  <button onClick={() => setWellness(p => ({ ...p, galleryItems: p.galleryItems.filter((_, idx) => idx !== i) }))}
                    style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}>Sil</button>
                </div>
                <FieldEditor noUpload={false} label="Görsel" value={item.img} type="image"
                  onChange={v => setWellness(p => { const arr = [...p.galleryItems]; arr[i] = { ...arr[i], img: v }; return { ...p, galleryItems: arr }; })} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FieldEditor label="Kategori" value={item.category}
                    onChange={v => setWellness(p => { const arr = [...p.galleryItems]; arr[i] = { ...arr[i], category: v }; return { ...p, galleryItems: arr }; })} />
                  <FieldEditor label="Başlık" value={item.title}
                    onChange={v => setWellness(p => { const arr = [...p.galleryItems]; arr[i] = { ...arr[i], title: v }; return { ...p, galleryItems: arr }; })} />
                </div>
                <FieldEditor label="Açıklama" value={item.desc} type="textarea"
                  onChange={v => setWellness(p => { const arr = [...p.galleryItems]; arr[i] = { ...arr[i], desc: v }; return { ...p, galleryItems: arr }; })} />
              </div>
            ))}
            <button onClick={() => setWellness(p => ({ ...p, galleryItems: [...p.galleryItems, { img: "", category: "", title: "", desc: "" }] }))}
              style={{ padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              + Kart Ekle
            </button>
          </AdminCard>

          <AdminCard title="Diğer Hizmetler Kartları" onSave={saveWellness}>
            {wellness.otherServices.map((s, i) => (
              <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 12, backgroundColor: "#fafafa" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Kart #{i + 1}</span>
                  <button onClick={() => setWellness(p => ({ ...p, otherServices: p.otherServices.filter((_, idx) => idx !== i) }))}
                    style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}>Sil</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FieldEditor label="Başlık" value={s.title}
                    onChange={v => setWellness(p => { const arr = [...p.otherServices]; arr[i] = { ...arr[i], title: v }; return { ...p, otherServices: arr }; })} />
                  <FieldEditor label="Slug (saglik/...)" value={s.slug}
                    onChange={v => setWellness(p => { const arr = [...p.otherServices]; arr[i] = { ...arr[i], slug: v }; return { ...p, otherServices: arr }; })} />
                </div>
                <FieldEditor noUpload={false} label="Görsel" value={s.img} type="image"
                  onChange={v => setWellness(p => { const arr = [...p.otherServices]; arr[i] = { ...arr[i], img: v }; return { ...p, otherServices: arr }; })} />
              </div>
            ))}
            <button onClick={() => setWellness(p => ({ ...p, otherServices: [...p.otherServices, { slug: "", title: "", img: "" }] }))}
              style={{ padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              + Kart Ekle
            </button>
          </AdminCard>
        </>
      )}

      {/* ── SPA & HAMAM ── */}
      {tab === "spa" && (
        <>
          <AdminCard title="Hero" onSave={saveSpa}>
            <FieldEditor label="Sayfa Başlığı"
              value={lang === "tr" ? spa.heroTitle : (translations[lang]?.["spa.heroTitle"] ?? "")}
              onChange={v => lang === "tr" ? setSpa(p => ({ ...p, heroTitle: v })) : setTranslation(lang, "spa.heroTitle", v)} />
            <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 8, marginTop: 4 }}>Hero Slider Görselleri</div>
            {spa.heroImgs.map((img, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <FieldEditor noUpload label={`Görsel ${i + 1}`} value={img} type="image"
                    onChange={v => setSpa(p => { const arr = [...p.heroImgs]; arr[i] = v; return { ...p, heroImgs: arr }; })} />
                </div>
                <button onClick={() => setSpa(p => ({ ...p, heroImgs: p.heroImgs.filter((_, idx) => idx !== i) }))}
                  style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
                  Sil
                </button>
              </div>
            ))}
            <AddImageButton onAdd={(url) => setSpa(p => ({ ...p, heroImgs: [...p.heroImgs, url] }))} />
          </AdminCard>

          {spa.sections.map((section, i) => (
            <AdminCard key={i} title={`Bölüm ${i + 1}${section.label ? ": " + section.label : ""}`} onSave={saveSpa}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FieldEditor label="Etiket" value={lv("spa", `s${i}.label`, section.label)}
                  onChange={ls("spa", `s${i}.label`, v => setSpa(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, label: v } : s); return { ...p, sections: arr }; }))} />
                <FieldEditor label="Başlık" value={lv("spa", `s${i}.title`, section.title)}
                  onChange={ls("spa", `s${i}.title`, v => setSpa(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, title: v } : s); return { ...p, sections: arr }; }))} />
              </div>
              <FieldEditor label="Açıklama" value={lv("spa", `s${i}.desc`, section.desc)} type="textarea"
                onChange={ls("spa", `s${i}.desc`, v => setSpa(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, desc: v } : s); return { ...p, sections: arr }; }))} />
              <FieldEditor label="Çalışma Saatleri (boş bırakılabilir)" value={section.hours}
                onChange={v => setSpa(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, hours: v } : s); return { ...p, sections: arr }; })} />
              <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 8 }}>Görseller</div>
              {section.imgs.map((img, j) => (
                <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    <FieldEditor noUpload label={`Görsel ${j + 1}`} value={img} type="image"
                      onChange={v => setSpa(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, imgs: s.imgs.map((im, jj) => jj === j ? v : im) } : s); return { ...p, sections: arr }; })} />
                  </div>
                  <button onClick={() => setSpa(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, imgs: s.imgs.filter((_, jj) => jj !== j) } : s); return { ...p, sections: arr }; })}
                    style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
                    Sil
                  </button>
                </div>
              ))}
              <AddImageButton onAdd={(url) => setSpa(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, imgs: [...s.imgs, url] } : s); return { ...p, sections: arr }; })} />
            </AdminCard>
          ))}
        </>
      )}

      {/* ── FITNESS ── */}
      {tab === "fitness" && (
        <>
          <AdminCard title="Hero" onSave={saveFitness}>
            <FieldEditor label="Sayfa Başlığı" value={lv("fit", "heroTitle", fitness.heroTitle)} onChange={ls("fit", "heroTitle", v => setFitness(p => ({ ...p, heroTitle: v })))} />
            <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 8, marginTop: 4 }}>Hero Slider Görselleri</div>
            {fitness.heroImgs.map((img, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <FieldEditor noUpload label={`Görsel ${i + 1}`} value={img} type="image"
                    onChange={v => setFitness(p => { const arr = [...p.heroImgs]; arr[i] = v; return { ...p, heroImgs: arr }; })} />
                </div>
                <button onClick={() => setFitness(p => ({ ...p, heroImgs: p.heroImgs.filter((_, idx) => idx !== i) }))}
                  style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
                  Sil
                </button>
              </div>
            ))}
            <AddImageButton onAdd={(url) => setFitness(p => ({ ...p, heroImgs: [...p.heroImgs, url] }))} />
          </AdminCard>

          {fitness.sections.map((section, i) => (
            <AdminCard key={i} title={`Bölüm ${i + 1}${section.label ? ": " + section.label : ""}`} onSave={saveFitness}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FieldEditor label="Etiket" value={lv("fit", `s${i}.label`, section.label)}
                  onChange={ls("fit", `s${i}.label`, v => setFitness(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, label: v } : s); return { ...p, sections: arr }; }))} />
                <FieldEditor label="Başlık" value={lv("fit", `s${i}.title`, section.title)}
                  onChange={ls("fit", `s${i}.title`, v => setFitness(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, title: v } : s); return { ...p, sections: arr }; }))} />
              </div>
              <FieldEditor label="Açıklama" value={lv("fit", `s${i}.desc`, section.desc)} type="textarea"
                onChange={ls("fit", `s${i}.desc`, v => setFitness(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, desc: v } : s); return { ...p, sections: arr }; }))} />
              <FieldEditor label="Çalışma Saatleri (boş bırakılabilir)" value={section.hours}
                onChange={v => setFitness(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, hours: v } : s); return { ...p, sections: arr }; })} />
              <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 8 }}>Görseller</div>
              {section.imgs.map((img, j) => (
                <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    <FieldEditor noUpload label={`Görsel ${j + 1}`} value={img} type="image"
                      onChange={v => setFitness(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, imgs: s.imgs.map((im, jj) => jj === j ? v : im) } : s); return { ...p, sections: arr }; })} />
                  </div>
                  <button onClick={() => setFitness(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, imgs: s.imgs.filter((_, jj) => jj !== j) } : s); return { ...p, sections: arr }; })}
                    style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
                    Sil
                  </button>
                </div>
              ))}
              <AddImageButton onAdd={(url) => setFitness(p => { const arr = p.sections.map((s, idx) => idx === i ? { ...s, imgs: [...s.imgs, url] } : s); return { ...p, sections: arr }; })} />
            </AdminCard>
          ))}
        </>
      )}
    </div>
  );
}
