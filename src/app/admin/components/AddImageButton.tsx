import { useRef, useState } from "react";

const GOLD = "#dbbe8c";
const DARK = "#050f28";

interface Props {
  onAdd: (url: string) => void;
  label?: string;
}

export function AddImageButton({ onAdd, label = "Görsel Ekle" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      onAdd(ev.target?.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div style={{ marginTop: 12, marginBottom: 4 }}>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        style={{
          padding: "9px 20px",
          backgroundColor: uploading ? "rgba(219,190,140,0.5)" : GOLD,
          color: DARK,
          border: "none",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
          cursor: uploading ? "not-allowed" : "pointer",
          fontFamily: "'Inter', sans-serif",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => { if (!uploading) (e.currentTarget.style.backgroundColor = "#c9a96e"); }}
        onMouseLeave={(e) => { if (!uploading) (e.currentTarget.style.backgroundColor = GOLD); }}
      >
        {uploading ? "Yükleniyor…" : `+ ${label}`}
      </button>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
    </div>
  );
}
