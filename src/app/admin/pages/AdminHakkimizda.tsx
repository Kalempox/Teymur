import { useState } from "react";
import { useContent, useUpdateContent, useTranslations } from "../../context/ContentContext";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AddImageButton } from "../components/AddImageButton";

const NAVY = "#050f28";
const GOLD = "#dbbe8c";

export function AdminHakkimizda() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [local, setLocal] = useState(content.about);

  const save = () => {
    updateContent((prev) => ({ ...prev, about: local }));
  };

  const set = <K extends keyof typeof local>(key: K, value: typeof local[K]) => {
    setLocal((p) => ({ ...p, [key]: value }));
  };

  const setHeroImg = (idx: number, value: string) => {
    const imgs = [...local.heroImages];
    imgs[idx] = value;
    set("heroImages", imgs);
  };

  const setService = (idx: number, field: string, value: string) => {
    const services = local.services.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s
    );
    set("services", services);
  };

  const setVisionText = (idx: number, value: string) => {
    const texts = [...local.visionTexts];
    texts[idx] = value;
    set("visionTexts", texts);
  };

  const setMissionText = (idx: number, value: string) => {
    const texts = [...local.missionTexts];
    texts[idx] = value;
    set("missionTexts", texts);
  };

  return (
    <div>
      <PageHeader title="Hakkımızda Sayfası" subtitle="Hero carousel, metin bölümleri, hizmetler, vizyon ve misyon" />
      <AdminLangTabs lang={lang} onChange={setLang} />
      {lang !== "tr" && (
        <div style={{ backgroundColor: "#fff8e8", border: "1px solid #f0d98a", borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#7a5c00" }}>İngilizce/Arapça çeviri düzenliyorsunuz. Değişiklikler kaydedildiğinde bu dil için içerik güncellenir. Boş bırakılan alanlar Türkçeyi gösterir.</div>
      )}

      <AdminCard title="Hero Carousel Görselleri" onSave={save}>
        {local.heroImages.map((img, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <FieldEditor noUpload label={`Görsel ${i + 1}`} value={img} onChange={(v) => setHeroImg(i, v)} type="image" />
            </div>
            <button onClick={() => set("heroImages", local.heroImages.filter((_, idx) => idx !== i))}
              style={{ padding: "8px 12px", color: "#dc3545", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>
              Sil
            </button>
          </div>
        ))}
        <AddImageButton onAdd={(url) => set("heroImages", [...local.heroImages, url])} />
      </AdminCard>

      <AdminCard title="Hero Metin Bölümü" onSave={save}>
        <FieldEditor label="Başlık"
          value={lang === "tr" ? local.heroTitle : (translations[lang]?.["about.heroTitle"] ?? "")}
          onChange={v => lang === "tr" ? set("heroTitle", v) : setTranslation(lang, "about.heroTitle", v)} />
        <FieldEditor label="Metin 1"
          value={lang === "tr" ? local.heroText1 : (translations[lang]?.["about.heroText1"] ?? "")}
          onChange={v => lang === "tr" ? set("heroText1", v) : setTranslation(lang, "about.heroText1", v)}
          type="textarea" />
        <FieldEditor label="Metin 2"
          value={lang === "tr" ? local.heroText2 : (translations[lang]?.["about.heroText2"] ?? "")}
          onChange={v => lang === "tr" ? set("heroText2", v) : setTranslation(lang, "about.heroText2", v)}
          type="textarea" />
        <FieldEditor noUpload={false} label="Görsel URL" value={local.heroImg} onChange={(v) => set("heroImg", v)} type="image" />
      </AdminCard>

      <AdminCard title="Hikaye / Sürdürülebilirlik Bölümü" onSave={save}>
        <FieldEditor label="Etiket"
          value={lang === "tr" ? local.storyLabel : (translations[lang]?.["about.storyLabel"] ?? "")}
          onChange={v => lang === "tr" ? set("storyLabel", v) : setTranslation(lang, "about.storyLabel", v)} />
        <FieldEditor label="Başlık"
          value={lang === "tr" ? local.storyTitle : (translations[lang]?.["about.storyTitle"] ?? "")}
          onChange={v => lang === "tr" ? set("storyTitle", v) : setTranslation(lang, "about.storyTitle", v)}
          type="textarea" />
        <FieldEditor label="Metin 1"
          value={lang === "tr" ? local.storyText1 : (translations[lang]?.["about.storyText1"] ?? "")}
          onChange={v => lang === "tr" ? set("storyText1", v) : setTranslation(lang, "about.storyText1", v)}
          type="textarea" />
        <FieldEditor label="Metin 2"
          value={lang === "tr" ? local.storyText2 : (translations[lang]?.["about.storyText2"] ?? "")}
          onChange={v => lang === "tr" ? set("storyText2", v) : setTranslation(lang, "about.storyText2", v)}
          type="textarea" />
        <FieldEditor noUpload={false} label="Görsel URL" value={local.storyImg} onChange={(v) => set("storyImg", v)} type="image" />
      </AdminCard>

      {local.services.map((service, i) => (
        <AdminCard key={i} title={`Hizmet ${i + 1}: ${service.title}`} onSave={save}>
          <FieldEditor label="Başlık" value={service.title} onChange={(v) => setService(i, "title", v)} />
          <FieldEditor label="Açıklama" value={service.desc} onChange={(v) => setService(i, "desc", v)} type="textarea" />
          <FieldEditor label="Link URL" value={service.link} onChange={(v) => setService(i, "link", v)} />
          <FieldEditor label="Link Metni" value={service.linkText} onChange={(v) => setService(i, "linkText", v)} />
          <FieldEditor noUpload={false} label="Görsel URL" value={service.img} onChange={(v) => setService(i, "img", v)} type="image" />
        </AdminCard>
      ))}

      <AdminCard title="Vizyon" onSave={save}>
        <FieldEditor label="Vizyon Başlığı" value={local.visionTitle} onChange={(v) => set("visionTitle", v)} />
        {local.visionTexts.map((text, i) => (
          <FieldEditor
            key={i}
            label={`Vizyon Paragraf ${i + 1}`}
            value={text}
            onChange={(v) => setVisionText(i, v)}
            type="textarea"
          />
        ))}
      </AdminCard>

      <AdminCard title="Misyon" onSave={save}>
        <FieldEditor label="Misyon Başlığı" value={local.missionTitle} onChange={(v) => set("missionTitle", v)} />
        {local.missionTexts.map((text, i) => (
          <FieldEditor
            key={i}
            label={`Misyon Paragraf ${i + 1}`}
            value={text}
            onChange={(v) => setMissionText(i, v)}
            type="textarea"
          />
        ))}
      </AdminCard>
    </div>
  );
}
