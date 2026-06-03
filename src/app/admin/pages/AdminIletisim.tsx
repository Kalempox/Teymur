import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

export function AdminIletisim() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [local, setLocal] = useState(() => ({
    ...content.contact,
    subjectOptions: content.contact.subjectOptions.map(o => ({ ...o })),
  }));

  const save = (section?: string) => {
    updateContent(p => ({ ...p, contact: local }));
    alert(`✓ ${section ?? "Değişiklikler"} kaydedildi.`);
  };
  const lv = (key: string, trVal: string) => lang === "tr" ? trVal : (translations[lang]?.[`contact.${key}`] ?? "");
  const ls = (key: string, setter: (v: string) => void) => (v: string) => lang === "tr" ? setter(v) : setTranslation(lang, `contact.${key}`, v);

  return (
    <div>
      <PageHeader title="İletişim Sayfası" subtitle="İletişim sayfasındaki tüm içerikleri yönetin" />
      <AdminLangTabs lang={lang} onChange={setLang} />

      {/* HERO */}
      <AdminCard title="Hero" onSave={() => save("Hero")}>
        <FieldEditor label="Sayfa Başlığı" value={lv("heroTitle", local.heroTitle)} onChange={ls("heroTitle", v => setLocal(p => ({ ...p, heroTitle: v })))} />
        <FieldEditor noUpload={false} label="Hero Görseli" value={local.heroImg} onChange={v => setLocal(p => ({ ...p, heroImg: v }))} type="image" />
      </AdminCard>

      {/* İLETİŞİM BİLGİLERİ */}
      <AdminCard title="İletişim Bilgileri" onSave={() => save("İletişim bilgileri")}>
        <FieldEditor label="Sol Kolon Başlığı" value={lv("infoTitle", local.infoTitle)} onChange={ls("infoTitle", v => setLocal(p => ({ ...p, infoTitle: v })))} />
        <FieldEditor label="Adres (her satır ayrı)" value={local.address} onChange={v => setLocal(p => ({ ...p, address: v }))} type="textarea" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FieldEditor label="Telefon 1" value={local.phone1} onChange={v => setLocal(p => ({ ...p, phone1: v }))} />
          <FieldEditor label="Telefon 2" value={local.phone2} onChange={v => setLocal(p => ({ ...p, phone2: v }))} />
        </div>
        <FieldEditor label="E-posta" value={local.email} onChange={v => setLocal(p => ({ ...p, email: v }))} />
        <FieldEditor label="Resepsiyon Saatleri" value={local.receptionHours} onChange={v => setLocal(p => ({ ...p, receptionHours: v }))} />
      </AdminCard>

      {/* FORM */}
      <AdminCard title="İletişim Formu" onSave={() => save("Form")}>
        <FieldEditor label="Sağ Kolon Başlığı (form üstü)" value={lv("formTitle", local.formTitle)} onChange={ls("formTitle", v => setLocal(p => ({ ...p, formTitle: v })))} />
        <FieldEditor label="Gönder Butonu Yazısı" value={lv("submitButtonText", local.submitButtonText)} onChange={ls("submitButtonText", v => setLocal(p => ({ ...p, submitButtonText: v })))} />

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 12 }}>Konu Seçenekleri (Dropdown)</div>
          {local.subjectOptions.map((opt, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "flex-end", marginBottom: 8 }}>
              <FieldEditor label={i === 0 ? "Değer (value)" : ""} value={opt.value}
                onChange={v => setLocal(p => { const arr = [...p.subjectOptions]; arr[i] = { ...arr[i], value: v }; return { ...p, subjectOptions: arr }; })} />
              <FieldEditor label={i === 0 ? "Görünen Etiket" : ""} value={lv(`subj${i}`, opt.label)}
                onChange={ls(`subj${i}`, v => setLocal(p => { const arr = [...p.subjectOptions]; arr[i] = { ...arr[i], label: v }; return { ...p, subjectOptions: arr }; }))} />
              <button onClick={() => setLocal(p => ({ ...p, subjectOptions: p.subjectOptions.filter((_, idx) => idx !== i) }))}
                style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: i === 0 ? 20 : 0 }}>
                Sil
              </button>
            </div>
          ))}
          <button onClick={() => setLocal(p => ({ ...p, subjectOptions: [...p.subjectOptions, { value: "", label: "" }] }))}
            style={{ marginTop: 8, padding: "8px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            + Seçenek Ekle
          </button>
        </div>
      </AdminCard>

      {/* HARİTA */}
      <AdminCard title="Google Harita" onSave={() => save("Harita")}>
        <FieldEditor label="Harita iframe URL (Google Maps embed linki)" value={local.mapUrl} onChange={v => setLocal(p => ({ ...p, mapUrl: v }))} type="url" />
        <div style={{ marginTop: 12, fontSize: 11, color: "rgba(5,15,40,0.4)", lineHeight: 1.6 }}>
          Google Maps'te otel konumunu bulun → Paylaş → Haritayı yerleştir → iframe src linkini buraya yapıştırın.
        </div>
        {local.mapUrl && (
          <div style={{ marginTop: 16, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
            <iframe src={local.mapUrl} width="100%" height="240" style={{ border: 0, display: "block" }} loading="lazy" />
          </div>
        )}
      </AdminCard>
    </div>
  );
}
