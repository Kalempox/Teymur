import { useState } from "react";
import { useContent, useUpdateContent } from "../../context/ContentContext";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";
import { AdminLangTabs, AdminLang, getLangVal } from "../components/AdminLangTabs";
import { useTranslations } from "../../context/ContentContext";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

export function AdminNavbar() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [items, setItems] = useState(() => content.nav.items.map(i => ({ ...i, dropdown: i.dropdown ? { ...i.dropdown, photos: [...i.dropdown.photos] } : undefined })));

  const save = () => {
    updateContent(p => ({ ...p, nav: { items } }));
    alert("✓ Navbar kaydedildi.");
  };

  const getT = (key: string, trVal: string) => getLangVal(trVal, lang, translations[lang === "tr" ? "en" : lang] ?? {}, key);

  const setField = (i: number, field: string, value: string) => {
    if (lang === "tr") {
      setItems(prev => {
        const arr = [...prev];
        arr[i] = { ...arr[i], [field]: value } as typeof arr[0];
        return arr;
      });
    } else {
      setTranslation(lang, `nav.${items[i].id}.${field}`, value);
    }
  };

  const setDropField = (i: number, field: string, value: string) => {
    if (lang === "tr") {
      setItems(prev => {
        const arr = [...prev];
        if (arr[i].dropdown) arr[i] = { ...arr[i], dropdown: { ...arr[i].dropdown!, [field]: value } };
        return arr;
      });
    } else {
      setTranslation(lang, `nav.${items[i].id}.drop.${field}`, value);
    }
  };

  const setPhotoField = (i: number, pi: number, field: string, value: string) => {
    if (lang === "tr") {
      setItems(prev => {
        const arr = [...prev];
        if (arr[i].dropdown) {
          const photos = [...arr[i].dropdown!.photos];
          photos[pi] = { ...photos[pi], [field]: value };
          arr[i] = { ...arr[i], dropdown: { ...arr[i].dropdown!, photos } };
        }
        return arr;
      });
    } else {
      setTranslation(lang, `nav.${items[i].id}.photo.${pi}.${field}`, value);
    }
  };

  const getDropVal = (i: number, field: string, trVal: string) => {
    if (lang === "tr") return trVal;
    return translations[lang]?.[`nav.${items[i].id}.drop.${field}`] ?? "";
  };

  const getPhotoVal = (i: number, pi: number, field: string, trVal: string) => {
    if (lang === "tr") return trVal;
    return translations[lang]?.[`nav.${items[i].id}.photo.${pi}.${field}`] ?? "";
  };

  return (
    <div>
      <PageHeader title="Navigasyon (Menü)" subtitle="Site üst menüsündeki tüm linkleri ve dropdown içeriklerini yönetin" />

      <AdminLangTabs lang={lang} onChange={setLang} />

      {lang !== "tr" && (
        <div style={{ backgroundColor: "#fff8e8", border: "1px solid #f0d98a", borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#7a5c00" }}>
          {lang === "en" ? "İngilizce" : "Arapça"} çeviri düzenliyorsunuz. Boş bırakılan alanlar Türkçeyi gösterir.
        </div>
      )}

      {items.map((item, i) => (
        <AdminCard key={item.id} title={`${item.side === "left" ? "Sol" : "Sağ"} Menü — ${item.labelTr}`} onSave={save}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <FieldEditor label="Etiket (TR)" value={lang === "tr" ? item.labelTr : (translations[lang]?.[`nav.${item.id}.labelTr`] ?? "")}
              onChange={v => setField(i, "labelTr", v)} />
            <FieldEditor label="Etiket (EN)" value={lang === "tr" ? item.labelEn : (translations[lang]?.[`nav.${item.id}.labelEn`] ?? "")}
              onChange={v => setField(i, "labelEn", v)} />
            <FieldEditor label="Etiket (AR)" value={lang === "tr" ? item.labelAr : (translations[lang]?.[`nav.${item.id}.labelAr`] ?? "")}
              onChange={v => setField(i, "labelAr", v)} />
          </div>
          <FieldEditor label="Link (href)" value={item.href}
            onChange={v => setItems(prev => { const arr = [...prev]; arr[i] = { ...arr[i], href: v }; return arr; })} />

          {item.dropdown && (
            <div style={{ marginTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Dropdown İçeriği</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <FieldEditor label="Başlık (TR)" value={getDropVal(i, "headingTr", item.dropdown.headingTr)} onChange={v => setDropField(i, "headingTr", v)} />
                <FieldEditor label="Başlık (EN)" value={getDropVal(i, "headingEn", item.dropdown.headingEn)} onChange={v => setDropField(i, "headingEn", v)} />
                <FieldEditor label="Başlık (AR)" value={getDropVal(i, "headingAr", item.dropdown.headingAr)} onChange={v => setDropField(i, "headingAr", v)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <FieldEditor label="Açıklama (TR)" value={getDropVal(i, "descTr", item.dropdown.descTr)} onChange={v => setDropField(i, "descTr", v)} type="textarea" />
                <FieldEditor label="Açıklama (EN)" value={getDropVal(i, "descEn", item.dropdown.descEn)} onChange={v => setDropField(i, "descEn", v)} type="textarea" />
                <FieldEditor label="Açıklama (AR)" value={getDropVal(i, "descAr", item.dropdown.descAr)} onChange={v => setDropField(i, "descAr", v)} type="textarea" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                <FieldEditor label="Tümünü Gör (TR)" value={getDropVal(i, "viewAllTr", item.dropdown.viewAllTr)} onChange={v => setDropField(i, "viewAllTr", v)} />
                <FieldEditor label="Tümünü Gör (EN)" value={getDropVal(i, "viewAllEn", item.dropdown.viewAllEn)} onChange={v => setDropField(i, "viewAllEn", v)} />
                <FieldEditor label="Tümünü Gör (AR)" value={getDropVal(i, "viewAllAr", item.dropdown.viewAllAr)} onChange={v => setDropField(i, "viewAllAr", v)} />
                <FieldEditor label="Tümünü Gör Linki" value={item.dropdown.viewAllHref}
                  onChange={v => setItems(prev => { const arr = [...prev]; if(arr[i].dropdown) arr[i] = {...arr[i], dropdown: {...arr[i].dropdown!, viewAllHref: v}}; return arr; })} />
              </div>

              <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Fotoğraf Kartları</div>
              {item.dropdown.photos.map((photo, pi) => (
                <div key={pi} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: 14, marginBottom: 10, backgroundColor: "#fafafa" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: DARK }}>Kart #{pi + 1}</span>
                    <button onClick={() => setItems(prev => { const arr = [...prev]; if(arr[i].dropdown) { const photos = arr[i].dropdown!.photos.filter((_,pj) => pj !== pi); arr[i] = {...arr[i], dropdown: {...arr[i].dropdown!, photos}}; } return arr; })}
                      style={{ fontSize: 11, color: "#dc3545", background: "none", border: "none", cursor: "pointer" }}>Sil</button>
                  </div>
                  <FieldEditor noUpload={false} label="Görsel" value={photo.src} type="image"
                    onChange={v => setItems(prev => { const arr=[...prev]; if(arr[i].dropdown){const p=[...arr[i].dropdown!.photos]; p[pi]={...p[pi],src:v}; arr[i]={...arr[i],dropdown:{...arr[i].dropdown!,photos:p}};} return arr; })} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                    <FieldEditor label="Etiket TR" value={getPhotoVal(i, pi, "labelTr", photo.labelTr)} onChange={v => setPhotoField(i, pi, "labelTr", v)} />
                    <FieldEditor label="Etiket EN" value={getPhotoVal(i, pi, "labelEn", photo.labelEn)} onChange={v => setPhotoField(i, pi, "labelEn", v)} />
                    <FieldEditor label="Etiket AR" value={getPhotoVal(i, pi, "labelAr", photo.labelAr)} onChange={v => setPhotoField(i, pi, "labelAr", v)} />
                    <FieldEditor label="Link" value={photo.href}
                      onChange={v => setItems(prev => { const arr=[...prev]; if(arr[i].dropdown){const p=[...arr[i].dropdown!.photos]; p[pi]={...p[pi],href:v}; arr[i]={...arr[i],dropdown:{...arr[i].dropdown!,photos:p}};} return arr; })} />
                  </div>
                </div>
              ))}
              <button onClick={() => setItems(prev => { const arr=[...prev]; if(arr[i].dropdown){const photos=[...arr[i].dropdown!.photos,{src:"",labelTr:"",labelEn:"",labelAr:"",href:""}]; arr[i]={...arr[i],dropdown:{...arr[i].dropdown!,photos}};} return arr; })}
                style={{ padding: "6px 16px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                + Kart Ekle
              </button>
            </div>
          )}
        </AdminCard>
      ))}
    </div>
  );
}
