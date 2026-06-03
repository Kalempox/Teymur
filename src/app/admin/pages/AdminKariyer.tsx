import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

export function AdminKariyer() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [local, setLocal] = useState(() => ({
    ...content.career,
    positions: content.career.positions.map(p => ({ ...p })),
  }));

  const save = (section?: string) => {
    updateContent(p => ({ ...p, career: local }));
    alert(`✓ ${section ?? "Değişiklikler"} kaydedildi.`);
  };
  const lv = (key: string, trVal: string) => lang === "tr" ? trVal : (translations[lang]?.[`career.${key}`] ?? "");
  const ls = (key: string, setter: (v: string) => void) => (v: string) => lang === "tr" ? setter(v) : setTranslation(lang, `career.${key}`, v);

  return (
    <div>
      <PageHeader title="Kariyer Sayfası" subtitle="Kariyer sayfasındaki tüm içerikleri yönetin" />
      <AdminLangTabs lang={lang} onChange={setLang} />

      {/* HERO */}
      <AdminCard title="Hero" onSave={() => save("Hero")}>
        <FieldEditor label="Sayfa Başlığı" value={lv("heroTitle", local.heroTitle)} onChange={ls("heroTitle", v => setLocal(p => ({ ...p, heroTitle: v })))} />
        <FieldEditor noUpload={false} label="Hero Görseli" value={local.heroImg} onChange={v => setLocal(p => ({ ...p, heroImg: v }))} type="image" />
      </AdminCard>

      {/* GİRİŞ METNİ */}
      <AdminCard title="Giriş Bölümü" onSave={() => save("Giriş")}>
        <FieldEditor label="Başlık" value={lv("introTitle", local.introTitle)} onChange={ls("introTitle", v => setLocal(p => ({ ...p, introTitle: v })))} />
        <FieldEditor label="Açıklama" value={lv("introDesc", local.introDesc)} onChange={ls("introDesc", v => setLocal(p => ({ ...p, introDesc: v })))} type="textarea" />
      </AdminCard>

      {/* BAŞVURU FORMU */}
      <AdminCard title="Başvuru Formu" onSave={() => save("Form")}>
        <FieldEditor label="Gönder Butonu Yazısı" value={lv("submitButtonText", local.submitButtonText)} onChange={ls("submitButtonText", v => setLocal(p => ({ ...p, submitButtonText: v })))} />
      </AdminCard>

      {/* AÇIK POZİSYONLAR */}
      <AdminCard title="Açık Pozisyonlar" onSave={() => save("Pozisyonlar")}>
        <div style={{ fontSize: 12, color: "rgba(5,15,40,0.5)", marginBottom: 16 }}>
          Sol taraftaki iş ilanı kartları. Başvuru formunda bu pozisyonlar seçilebilir.
        </div>
        {local.positions.map((pos, i) => (
          <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: 16, marginBottom: 12, backgroundColor: "#fafafa" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>Pozisyon #{i + 1}</span>
              <button onClick={() => setLocal(p => ({ ...p, positions: p.positions.filter((_, idx) => idx !== i) }))}
                style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}>Sil</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FieldEditor label="Pozisyon Adı" value={lv(`pos${i}.title`, pos.title)}
                onChange={ls(`pos${i}.title`, v => setLocal(p => { const arr = [...p.positions]; arr[i] = { ...arr[i], title: v }; return { ...p, positions: arr }; }))} />
              <FieldEditor label="Departman" value={lv(`pos${i}.department`, pos.department)}
                onChange={ls(`pos${i}.department`, v => setLocal(p => { const arr = [...p.positions]; arr[i] = { ...arr[i], department: v }; return { ...p, positions: arr }; }))} />
              <FieldEditor label="Çalışma Tipi" value={lv(`pos${i}.type`, pos.type)}
                onChange={ls(`pos${i}.type`, v => setLocal(p => { const arr = [...p.positions]; arr[i] = { ...arr[i], type: v }; return { ...p, positions: arr }; }))} />
              <FieldEditor label="Şehir / Konum" value={pos.location}
                onChange={v => setLocal(p => { const arr = [...p.positions]; arr[i] = { ...arr[i], location: v }; return { ...p, positions: arr }; })} />
            </div>
          </div>
        ))}
        <button
          onClick={() => setLocal(p => ({ ...p, positions: [...p.positions, { id: `pos-${Date.now()}`, title: "", department: "", type: "Tam Zamanlı", location: "Gaziantep" }] }))}
          style={{ marginTop: 8, padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          + Pozisyon Ekle
        </button>
      </AdminCard>
    </div>
  );
}
