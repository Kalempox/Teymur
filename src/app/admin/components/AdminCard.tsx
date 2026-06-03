import React, { useState } from "react";

const GOLD = "#dbbe8c";
const NAVY = "#050f28";

interface AdminCardProps {
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
}

export function AdminCard({ title, children, onSave, saveLabel = "Kaydet" }: AdminCardProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (onSave) onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "20px",
          fontWeight: 500,
          color: NAVY,
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(5,15,40,0.06)",
        }}
      >
        {title}
      </h3>

      {children}

      {onSave && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(5,15,40,0.06)",
          }}
        >
          <button
            onClick={handleSave}
            style={{
              backgroundColor: GOLD,
              color: NAVY,
              border: "none",
              borderRadius: "6px",
              padding: "10px 24px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#c9a96e")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = GOLD)
            }
          >
            {saveLabel}
          </button>
          {saved && (
            <span
              style={{
                fontSize: "13px",
                color: "#22a06b",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Kaydedildi!
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "32px",
          fontWeight: 400,
          color: NAVY,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: "14px",
            color: "rgba(5,15,40,0.45)",
            marginTop: "6px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
