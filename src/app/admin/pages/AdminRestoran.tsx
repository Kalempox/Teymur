import { useState } from "react";
import { useContent, useUpdateContent, useTranslations, DiningVenue } from "../../context/ContentContext";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AddImageButton } from "../components/AddImageButton";
import { Plus, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";

const GOLD = "#dbbe8c";
const NAVY = "#050f28";

function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const EMPTY: Omit<DiningVenue, "id"> = {
  slug: "", title: "", tagline: "", guests: "", type: "", feature: "", desc: "", imgs: [""],
};

export function AdminRestoran() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [editing, setEditing] = useState<number | null>(null);
  const [editData, setEditData] = useState<DiningVenue | null>(null);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState<Omit<DiningVenue, "id">>({ ...EMPTY });
  const [saved, setSaved] = useState(false);

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const startEdit = (v: DiningVenue) => { setEditing(v.id); setEditData({ ...v, imgs: [...v.imgs] }); };
  const cancelEdit = () => { setEditing(null); setEditData(null); };

  const saveEdit = () => {
    if (!editData) return;
    updateContent((prev) => ({ ...prev, dining: prev.dining.map((d) => d.id === editData.id ? editData : d) }));
    cancelEdit();
    showSaved();
  };

  const deleteItem = (id: number) => {
    if (!confirm("Bu mekanı silmek istediğinizden emin misiniz?")) return;
    updateContent((prev) => ({ ...prev, dining: prev.dining.filter((d) => d.id !== id) }));
    showSaved();
  };

  const addItem = () => {
    const id = Date.now();
    updateContent((prev) => ({ ...prev, dining: [...prev.dining, { ...newItem, id, slug: newItem.slug || slugify(newItem.title) }] }));
    setNewItem({ ...EMPTY });
    setAdding(false);
    showSaved();
  };

  const setEdit = <K extends keyof DiningVenue>(k: K, v: DiningVenue[K]) => setEditData((p) => p ? { ...p, [k]: v } : p);

  return (
    <div>
      <PageHeader title="Restoran Yönetimi" subtitle="Yemek mekanlarını düzenle" />
      <AdminLangTabs lang={lang} onChange={setLang} />
      {lang !== "tr" && (
        <div style={{ backgroundColor: "#fff8e8", border: "1px solid #f0d98a", borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#7a5c00" }}>İngilizce/Arapça çeviri düzenliyorsunuz. Değişiklikler kaydedildiğinde bu dil için içerik güncellenir. Boş bırakılan alanlar Türkçeyi gösterir.</div>
      )}

      {saved && <div style={{ padding: "10px 16px", backgroundColor: "rgba(34,160,107,0.1)", border: "1px solid rgba(34,160,107,0.3)", borderRadius: "6px", color: "#22a06b", fontSize: "13px", marginBottom: "16px" }}>Değişiklikler kaydedildi!</div>}

      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setAdding((a) => !a)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", backgroundColor: GOLD, color: NAVY, border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          {adding ? <X size={16} /> : <Plus size={16} />}
          {adding ? "İptal" : "Yeni Mekan Ekle"}
        </button>
      </div>

      {adding && (
        <AdminCard title="Yeni Yemek Mekanı" onSave={addItem} saveLabel="Ekle">
          <FieldEditor label="Ad" value={newItem.title} onChange={(v) => setNewItem((p) => ({ ...p, title: v, slug: slugify(v) }))} />
          <FieldEditor label="Slug" value={newItem.slug} onChange={(v) => setNewItem((p) => ({ ...p, slug: v }))} />
          <FieldEditor label="Tagline" value={newItem.tagline} onChange={(v) => setNewItem((p) => ({ ...p, tagline: v }))} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <FieldEditor label="Saatler" value={newItem.guests} onChange={(v) => setNewItem((p) => ({ ...p, guests: v }))} />
            <FieldEditor label="Tip" value={newItem.type} onChange={(v) => setNewItem((p) => ({ ...p, type: v }))} />
            <FieldEditor label="Özellik" value={newItem.feature} onChange={(v) => setNewItem((p) => ({ ...p, feature: v }))} />
          </div>
          <FieldEditor label="Açıklama" value={newItem.desc} onChange={(v) => setNewItem((p) => ({ ...p, desc: v }))} type="textarea" />
          {newItem.imgs.map((img, i) => (
            <FieldEditor key={i} label={`Görsel ${i + 1}`} value={img} onChange={(v) => { const imgs = [...newItem.imgs]; imgs[i] = v; setNewItem((p) => ({ ...p, imgs })); }} type="image" />
          ))}
          <AddImageButton onAdd={(url) => setNewItem((p) => ({ ...p, imgs: [...p.imgs, url] }))} />
        </AdminCard>
      )}

      {content.dining.map((venue) => (
        <div key={venue.id} style={{ backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "12px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer" }} onClick={() => editing === venue.id ? cancelEdit() : startEdit(venue)}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {venue.imgs[0] && <img src={venue.imgs[0]} alt={venue.title} style={{ width: "48px", height: "36px", objectFit: "cover", borderRadius: "4px" }} onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />}
              <div>
                <div style={{ fontSize: "15px", fontWeight: 500, color: NAVY }}>{venue.title}</div>
                <div style={{ fontSize: "12px", color: "rgba(5,15,40,0.4)" }}>{venue.type} · {venue.guests}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button onClick={(e) => { e.stopPropagation(); deleteItem(venue.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", color: "#ef4444" }}><Trash2 size={16} /></button>
              {editing === venue.id ? <ChevronUp size={16} color="rgba(5,15,40,0.4)" /> : <ChevronDown size={16} color="rgba(5,15,40,0.4)" />}
            </div>
          </div>

          {editing === venue.id && editData && (
            <div style={{ padding: "0 20px 20px", borderTop: "1px solid rgba(5,15,40,0.06)" }}>
              <div style={{ paddingTop: "20px" }}>
                <FieldEditor label="Ad" value={editData.title} onChange={(v) => setEdit("title", v)} />
                <FieldEditor label="Slug" value={editData.slug} onChange={(v) => setEdit("slug", v)} />
                <FieldEditor label="Tagline" value={editData.tagline} onChange={(v) => setEdit("tagline", v)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <FieldEditor label="Saatler" value={editData.guests} onChange={(v) => setEdit("guests", v)} />
                  <FieldEditor label="Tip" value={editData.type} onChange={(v) => setEdit("type", v)} />
                  <FieldEditor label="Özellik" value={editData.feature} onChange={(v) => setEdit("feature", v)} />
                </div>
                <FieldEditor label="Açıklama" value={editData.desc} onChange={(v) => setEdit("desc", v)} type="textarea" />
                {editData.imgs.map((img, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <FieldEditor noUpload label={`Görsel ${i + 1}`} value={img} onChange={(v) => { const imgs = [...editData.imgs]; imgs[i] = v; setEdit("imgs", imgs); }} type="image" />
                    </div>
                    <button onClick={() => { const imgs = editData.imgs.filter((_, j) => j !== i); setEdit("imgs", imgs.length ? imgs : [""]); }} style={{ marginTop: "24px", background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "8px" }}><X size={16} /></button>
                  </div>
                ))}
                <AddImageButton onAdd={(url) => setEdit("imgs", [...editData.imgs, url])} />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={saveEdit} style={{ padding: "10px 24px", backgroundColor: GOLD, color: NAVY, border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Kaydet</button>
                  <button onClick={cancelEdit} style={{ padding: "10px 24px", backgroundColor: "transparent", color: "rgba(5,15,40,0.5)", border: "1px solid rgba(5,15,40,0.15)", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>İptal</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
