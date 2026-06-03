import { useState } from "react";
import { useContent, useUpdateContent, useTranslations, Room } from "../../context/ContentContext";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { FieldEditor } from "../components/FieldEditor";
import { AdminLangTabs, AdminLang } from "../components/AdminLangTabs";
import { AddImageButton } from "../components/AddImageButton";
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";

const GOLD = "#dbbe8c";
const NAVY = "#050f28";

function generateId() {
  return Date.now();
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const EMPTY_ROOM: Omit<Room, "id"> = {
  slug: "",
  title: "",
  guests: "",
  size: "",
  bed: "",
  desc: "",
  imgs: [""],
};

export function AdminOdalar() {
  const content = useContent();
  const updateContent = useUpdateContent();
  const { translations, setTranslation } = useTranslations();
  const [lang, setLang] = useState<AdminLang>("tr");
  const [editing, setEditing] = useState<number | null>(null);
  const [editData, setEditData] = useState<Room | null>(null);
  const [adding, setAdding] = useState(false);
  const [newRoom, setNewRoom] = useState<Omit<Room, "id">>({ ...EMPTY_ROOM });
  const [saved, setSaved] = useState(false);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const startEdit = (room: Room) => {
    setEditing(room.id);
    setEditData({ ...room, imgs: [...room.imgs] });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditData(null);
  };

  const saveEdit = () => {
    if (!editData) return;
    updateContent((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === editData.id ? editData : r)),
    }));
    setEditing(null);
    setEditData(null);
    showSaved();
  };

  const deleteRoom = (id: number) => {
    if (!confirm("Bu odayı silmek istediğinizden emin misiniz?")) return;
    updateContent((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r.id !== id),
    }));
    showSaved();
  };

  const addRoom = () => {
    const id = generateId();
    const slug = newRoom.slug || slugify(newRoom.title);
    updateContent((prev) => ({
      ...prev,
      rooms: [...prev.rooms, { ...newRoom, id, slug }],
    }));
    setNewRoom({ ...EMPTY_ROOM });
    setAdding(false);
    showSaved();
  };

  return (
    <div>
      <PageHeader title="Odalar Yönetimi" subtitle="Oda tiplerini ekle, düzenle veya sil" />
      <AdminLangTabs lang={lang} onChange={setLang} />
      {lang !== "tr" && (
        <div style={{ backgroundColor: "#fff8e8", border: "1px solid #f0d98a", borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#7a5c00" }}>İngilizce/Arapça çeviri düzenliyorsunuz. Değişiklikler kaydedildiğinde bu dil için içerik güncellenir. Boş bırakılan alanlar Türkçeyi gösterir.</div>
      )}

      {saved && (
        <div style={{ padding: "10px 16px", backgroundColor: "rgba(34,160,107,0.1)", border: "1px solid rgba(34,160,107,0.3)", borderRadius: "6px", color: "#22a06b", fontSize: "13px", marginBottom: "16px" }}>
          Değişiklikler kaydedildi!
        </div>
      )}

      {/* Add new */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => setAdding((a) => !a)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            backgroundColor: GOLD,
            color: NAVY,
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.06em",
          }}
        >
          {adding ? <X size={16} /> : <Plus size={16} />}
          {adding ? "İptal" : "Yeni Oda Ekle"}
        </button>
      </div>

      {adding && (
        <AdminCard title="Yeni Oda" onSave={addRoom} saveLabel="Oda Ekle">
          <FieldEditor label="Oda Adı" value={newRoom.title} onChange={(v) => setNewRoom((p) => ({ ...p, title: v, slug: slugify(v) }))} />
          <FieldEditor label="Slug (URL)" value={newRoom.slug} onChange={(v) => setNewRoom((p) => ({ ...p, slug: v }))} hint="Otomatik oluşturulur, değiştirebilirsiniz" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <FieldEditor label="Misafir Sayısı" value={newRoom.guests} onChange={(v) => setNewRoom((p) => ({ ...p, guests: v }))} />
            <FieldEditor label="Oda Büyüklüğü" value={newRoom.size} onChange={(v) => setNewRoom((p) => ({ ...p, size: v }))} />
            <FieldEditor label="Yatak Tipi" value={newRoom.bed} onChange={(v) => setNewRoom((p) => ({ ...p, bed: v }))} />
          </div>
          <FieldEditor label="Açıklama" value={newRoom.desc} onChange={(v) => setNewRoom((p) => ({ ...p, desc: v }))} type="textarea" />
          {newRoom.imgs.map((img, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <FieldEditor noUpload label={`Görsel ${i + 1} URL`} value={img} onChange={(v) => {
                  const imgs = [...newRoom.imgs];
                  imgs[i] = v;
                  setNewRoom((p) => ({ ...p, imgs }));
                }} type="image" />
              </div>
              <button onClick={() => {
                const imgs = newRoom.imgs.filter((_, j) => j !== i);
                setNewRoom((p) => ({ ...p, imgs: imgs.length ? imgs : [""] }));
              }} style={{ marginTop: "24px", background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "8px" }}>
                <X size={16} />
              </button>
            </div>
          ))}
          <AddImageButton onAdd={(url) => setNewRoom((p) => ({ ...p, imgs: [...p.imgs, url] }))} />
        </AdminCard>
      )}

      {/* Room list */}
      {content.rooms.map((room) => (
        <div
          key={room.id}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            marginBottom: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              cursor: "pointer",
            }}
            onClick={() => (editing === room.id ? cancelEdit() : startEdit(room))}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {room.imgs[0] && (
                <img src={room.imgs[0]} alt={room.title} style={{ width: "48px", height: "36px", objectFit: "cover", borderRadius: "4px" }} onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
              )}
              <div>
                <div style={{ fontSize: "15px", fontWeight: 500, color: NAVY }}>{room.title}</div>
                <div style={{ fontSize: "12px", color: "rgba(5,15,40,0.4)" }}>{room.guests} Misafir · {room.size} · {room.bed}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={(e) => { e.stopPropagation(); deleteRoom(room.id); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", color: "#ef4444" }}
              >
                <Trash2 size={16} />
              </button>
              {editing === room.id ? <ChevronUp size={16} color="rgba(5,15,40,0.4)" /> : <ChevronDown size={16} color="rgba(5,15,40,0.4)" />}
            </div>
          </div>

          {editing === room.id && editData && (
            <div style={{ padding: "0 20px 20px", borderTop: "1px solid rgba(5,15,40,0.06)" }}>
              <div style={{ paddingTop: "20px" }}>
                <FieldEditor label="Oda Adı" value={editData.title} onChange={(v) => setEditData((p) => p ? ({ ...p, title: v }) : p)} />
                <FieldEditor label="Slug (URL)" value={editData.slug} onChange={(v) => setEditData((p) => p ? ({ ...p, slug: v }) : p)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <FieldEditor label="Misafir" value={editData.guests} onChange={(v) => setEditData((p) => p ? ({ ...p, guests: v }) : p)} />
                  <FieldEditor label="Büyüklük" value={editData.size} onChange={(v) => setEditData((p) => p ? ({ ...p, size: v }) : p)} />
                  <FieldEditor label="Yatak" value={editData.bed} onChange={(v) => setEditData((p) => p ? ({ ...p, bed: v }) : p)} />
                </div>
                <FieldEditor label="Açıklama" value={editData.desc} onChange={(v) => setEditData((p) => p ? ({ ...p, desc: v }) : p)} type="textarea" />
                {editData.imgs.map((img, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <FieldEditor
                        label={`Görsel ${i + 1} URL`}
                        value={img}
                        onChange={(v) => {
                          const imgs = [...editData.imgs];
                          imgs[i] = v;
                          setEditData((p) => p ? ({ ...p, imgs }) : p);
                        }}
                        type="image"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const imgs = editData.imgs.filter((_, j) => j !== i);
                        setEditData((p) => p ? ({ ...p, imgs: imgs.length ? imgs : [""] }) : p);
                      }}
                      style={{ marginTop: "24px", background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "8px" }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <AddImageButton onAdd={(url) => setEditData((p) => p ? ({ ...p, imgs: [...p.imgs, url] }) : p)} />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={saveEdit} style={{ padding: "10px 24px", backgroundColor: GOLD, color: NAVY, border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.1em" }}>
                    Kaydet
                  </button>
                  <button onClick={cancelEdit} style={{ padding: "10px 24px", backgroundColor: "transparent", color: "rgba(5,15,40,0.5)", border: "1px solid rgba(5,15,40,0.15)", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
