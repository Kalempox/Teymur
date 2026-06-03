const GOLD = "#dbbe8c";
const DARK = "#050f28";

export type AdminLang = "tr" | "en" | "ar";

interface Props {
  lang: AdminLang;
  onChange: (l: AdminLang) => void;
}

const LANGS: { code: AdminLang; label: string; flag: string }[] = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export function AdminLangTabs({ lang, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 0, marginBottom: 24, backgroundColor: "#fff", borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", alignSelf: "flex-start" }}>
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          style={{
            padding: "9px 20px",
            border: "none",
            borderRight: "1px solid rgba(0,0,0,0.06)",
            backgroundColor: lang === l.code ? GOLD : "transparent",
            color: lang === l.code ? DARK : "rgba(5,15,40,0.5)",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: lang === l.code ? 600 : 400,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.15s",
          }}
        >
          <span>{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Helper: returns value from TR content or EN/AR translations */
export function getLangVal(trVal: string, lang: AdminLang, translations: Record<string, string>, key: string): string {
  if (lang === "tr") return trVal;
  return translations[key] ?? "";
}
