import { useState, useRef } from "react";

const GOLD = "#dbbe8c";
const NAVY = "#050f28";

interface FieldEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "image" | "url";
  placeholder?: string;
  hint?: string;
  noUpload?: boolean;
}

export function FieldEditor({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  noUpload = true,
}: FieldEditorProps) {
  const [focused, setFocused] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${focused ? GOLD : "rgba(5,15,40,0.12)"}`,
    borderRadius: "6px",
    fontSize: "14px",
    color: NAVY,
    outline: "none",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "'Inter', sans-serif",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target?.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(5,15,40,0.5)",
          marginBottom: "6px",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...inputStyle, resize: "vertical", minHeight: "90px", lineHeight: 1.6 }}
        />
      ) : type === "image" ? (
        <div>
          {/* Mevcut görsel önizleme */}
          {value && (
            <div style={{ marginBottom: 10, position: "relative", display: "inline-block" }}>
              <img
                src={value}
                alt="Önizleme"
                style={{ maxWidth: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(5,15,40,0.08)", display: "block" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <button type="button" onClick={() => onChange("")} title="Görseli kaldır"
                style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", backgroundColor: "rgba(220,53,69,0.85)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                ×
              </button>
            </div>
          )}

          {/* URL input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? "https://... adres yapıştırın"}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={inputStyle}
          />

          {/* Görsel Ekle butonu — sadece noUpload=false ise göster */}
          {!noUpload && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                marginTop: 8,
                padding: "8px 18px",
                backgroundColor: uploading ? "rgba(219,190,140,0.4)" : GOLD,
                color: NAVY,
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: uploading ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "background 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => { if (!uploading) (e.currentTarget.style.backgroundColor = "#c9a96e"); }}
              onMouseLeave={(e) => { if (!uploading) (e.currentTarget.style.backgroundColor = GOLD); }}
            >
              {uploading ? "Yükleniyor…" : "Görsel Ekle"}
            </button>
          )}

          {/* Hidden file input */}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
        </div>
      ) : (
        <input
          type={type === "url" ? "url" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      )}

      {hint && (
        <p style={{ fontSize: "11px", color: "rgba(5,15,40,0.35)", marginTop: "5px", fontFamily: "'Inter', sans-serif" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
