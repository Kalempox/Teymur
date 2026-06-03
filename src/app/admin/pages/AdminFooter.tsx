import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";

export function AdminFooter() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [global, setGlobal] = useState({ ...content.global, social: { ...content.global.social } });
  const [footer, setFooter] = useState({ ...content.footer });

  const saveGlobal = () => { updateContent(p => ({ ...p, global })); alert("✓ Genel bilgiler kaydedildi."); };
  const saveFooter = () => { updateContent(p => ({ ...p, footer })); alert("✓ Footer içerikleri kaydedildi."); };
  const lv = (prefix: string, key: string, trVal: string) => lang === "tr" ? trVal : (translations[lang]?.[`${prefix}.${key}`] ?? "");
  const ls = (prefix: string, key: string, setter: (v: string) => void) => (v: string) => lang === "tr" ? setter(v) : setTranslation(lang, `${prefix}.${key}`, v);

  return (
    <div>
      <PageHeader title="Footer İçeriği" subtitle="Site alt bilgisi ve global iletişim bilgilerini yönetin" />
      <AdminLangTabs lang={lang} onChange={setLang} />

      {/* LOGO & OTEL BİLGİLERİ */}
      <AdminCard title="Logo & Otel Bilgileri" onSave={saveGlobal}>
        <FieldEditor noUpload={false} label="Logo URL" value={global.logoUrl} onChange={v => setGlobal(p => ({ ...p, logoUrl: v }))} type="image" />
        <FieldEditor label="Otel Adı" value={lv("g","hotelName",global.hotelName)} onChange={ls("g","hotelName",v => setGlobal(p => ({ ...p, hotelName: v })))} />
        <FieldEditor label="Tagline (Footer açıklama)" value={lv("g","tagline",global.tagline)} onChange={ls("g","tagline",v => setGlobal(p => ({ ...p, tagline: v })))} type="textarea" />
        <FieldEditor label="Rezervasyon URL" value={global.reservationUrl} onChange={v => setGlobal(p => ({ ...p, reservationUrl: v }))} type="url" />
      </AdminCard>

      {/* İLETİŞİM BİLGİLERİ */}
      <AdminCard title="İletişim Bilgileri (Footer'da görünür)" onSave={saveGlobal}>
        <FieldEditor label="Telefon" value={global.phone} onChange={v => setGlobal(p => ({ ...p, phone: v }))} />
        <FieldEditor label="E-posta" value={global.email} onChange={v => setGlobal(p => ({ ...p, email: v }))} />
        <FieldEditor label="Adres" value={global.address} onChange={v => setGlobal(p => ({ ...p, address: v }))} type="textarea" />
      </AdminCard>

      {/* SOSYAL MEDYA */}
      <AdminCard title="Sosyal Medya Linkleri" onSave={saveGlobal}>
        <FieldEditor label="Instagram" value={global.social.instagram} onChange={v => setGlobal(p => ({ ...p, social: { ...p.social, instagram: v } }))} type="url" />
        <FieldEditor label="Facebook" value={global.social.facebook} onChange={v => setGlobal(p => ({ ...p, social: { ...p.social, facebook: v } }))} type="url" />
        <FieldEditor label="Twitter / X" value={global.social.twitter} onChange={v => setGlobal(p => ({ ...p, social: { ...p.social, twitter: v } }))} type="url" />
        <FieldEditor label="YouTube" value={global.social.youtube} onChange={v => setGlobal(p => ({ ...p, social: { ...p.social, youtube: v } }))} type="url" />
        <FieldEditor label="LinkedIn" value={global.social.linkedin} onChange={v => setGlobal(p => ({ ...p, social: { ...p.social, linkedin: v } }))} type="url" />
      </AdminCard>

      {/* FOOTER METİNLERİ */}
      <AdminCard title="Footer Metinleri" onSave={saveFooter}>
        <FieldEditor label="Footer Açıklama" value={lv("f","description",footer.description)} onChange={ls("f","description",v => setFooter(p => ({ ...p, description: v })))} type="textarea" />
        <FieldEditor label="Copyright Metni" value={lv("f","copyright",footer.copyright)} onChange={ls("f","copyright",v => setFooter(p => ({ ...p, copyright: v })))} />
      </AdminCard>

      {/* SÜRDÜRÜLEBİLİR TURİZM SERTİFİKASI */}
      <AdminCard title="Sürdürülebilir Turizm Sertifikası" onSave={saveFooter}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FieldEditor label="Buton Başlığı" value={lv("f","certTitle",footer.certTitle)} onChange={ls("f","certTitle",v => setFooter(p => ({ ...p, certTitle: v })))} />
          <FieldEditor label="Buton Alt Yazısı" value={lv("f","certSubtitle",footer.certSubtitle)} onChange={ls("f","certSubtitle",v => setFooter(p => ({ ...p, certSubtitle: v })))} />
        </div>
        <FieldEditor label="Modal Başlığı" value={lv("f","certModalTitle",footer.certModalTitle)} onChange={ls("f","certModalTitle",v => setFooter(p => ({ ...p, certModalTitle: v })))} />
        <FieldEditor label="Modal İçerik Metni" value={lv("f","certModalBody",footer.certModalBody)} onChange={ls("f","certModalBody",v => setFooter(p => ({ ...p, certModalBody: v })))} type="textarea" />
      </AdminCard>
    </div>
  );
}
