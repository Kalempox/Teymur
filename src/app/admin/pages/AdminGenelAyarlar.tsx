import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";

export function AdminGenelAyarlar() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [local, setLocal] = useState(content.global);

  const save = () => {
    updateContent((prev) => ({ ...prev, global: local }));
  };

  const set = (key: keyof typeof local, value: string) => {
    setLocal((p) => ({ ...p, [key]: value }));
  };

  const setSocial = (key: keyof typeof local.social, value: string) => {
    setLocal((p) => ({ ...p, social: { ...p.social, [key]: value } }));
  };
  const lv = (key: string, trVal: string) => lang === "tr" ? trVal : (translations[lang]?.[`global.${key}`] ?? "");
  const ls = (key: string, setter: (v: string) => void) => (v: string) => lang === "tr" ? setter(v) : setTranslation(lang, `global.${key}`, v);

  return (
    <div>
      <PageHeader title="Genel Ayarlar" subtitle="Otel adı, iletişim bilgileri ve sosyal medya bağlantıları" />
      <AdminLangTabs lang={lang} onChange={setLang} />

      <AdminCard title="Temel Bilgiler" onSave={save}>
        <FieldEditor label="Otel Adı" value={lv("hotelName", local.hotelName)} onChange={ls("hotelName", v => set("hotelName", v))} />
        <FieldEditor label="Tagline / Slogan" value={lv("tagline", local.tagline)} onChange={ls("tagline", v => set("tagline", v))} type="textarea" />
        <FieldEditor noUpload={false} label="Logo URL" value={local.logoUrl} onChange={(v) => set("logoUrl", v)} type="image" />
        <FieldEditor label="Rezervasyon URL" value={local.reservationUrl} onChange={(v) => set("reservationUrl", v)} type="url" />
      </AdminCard>

      <AdminCard title="İletişim Bilgileri" onSave={save}>
        <FieldEditor label="Telefon" value={local.phone} onChange={(v) => set("phone", v)} placeholder="+90 342 999 1111" />
        <FieldEditor label="E-posta" value={local.email} onChange={(v) => set("email", v)} placeholder="info@teymurcontinental.com" />
        <FieldEditor label="Adres" value={local.address} onChange={(v) => set("address", v)} type="textarea" />
      </AdminCard>

      <AdminCard title="Sosyal Medya Bağlantıları" onSave={save}>
        <FieldEditor label="Instagram" value={local.social.instagram} onChange={(v) => setSocial("instagram", v)} type="url" />
        <FieldEditor label="Facebook" value={local.social.facebook} onChange={(v) => setSocial("facebook", v)} type="url" />
        <FieldEditor label="Twitter / X" value={local.social.twitter} onChange={(v) => setSocial("twitter", v)} type="url" />
        <FieldEditor label="YouTube" value={local.social.youtube} onChange={(v) => setSocial("youtube", v)} type="url" />
        <FieldEditor label="LinkedIn" value={local.social.linkedin} onChange={(v) => setSocial("linkedin", v)} type="url" />
      </AdminCard>
    </div>
  );
}
