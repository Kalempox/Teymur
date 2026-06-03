import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useContent, useT } from "../context/ContentContext";

const GOLD = "#dbbe8c";
const DARK = "#050f28";
const MID  = "rgba(5,15,40,0.6)";


function CustomSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          borderBottom: "1px solid rgba(5,15,40,0.15)",
          borderRadius: 0,
          padding: "12px 0",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: selected ? DARK : "rgba(5,15,40,0.35)",
          cursor: "pointer",
          outline: "none",
          boxShadow: "none",
          textAlign: "left",
        }}
      >
        <span>{selected ? selected.label : "Seçiniz"}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
          <path d="M1 1l4 4 4-4" stroke="#a09080" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          zIndex: 100,
          boxShadow: "0 8px 24px rgba(5,15,40,0.10)",
        }}>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: "12px 16px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: value === opt.value ? DARK : MID,
                backgroundColor: value === opt.value ? "rgba(219,190,140,0.08)" : "transparent",
                cursor: "pointer",
                borderLeft: value === opt.value ? `2px solid ${GOLD}` : "2px solid transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(219,190,140,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = value === opt.value ? "rgba(219,190,140,0.08)" : "transparent")}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ContactPage() {
  const content = useContent();
  const c = content.contact;
  const t = useT();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajınız alındı! En kısa sürede sizinle iletişime geçeceğiz.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* ── Hero ── */}
      <div style={{ position: "relative", height: "55vh", overflow: "hidden" }}>
        <img
          src={c.heroImg}
          alt="İletişim"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,15,40,0.65)" }} />
        <div style={{ position: "absolute", bottom: "100px", left: 0, right: 0, padding: "0 6vw" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4.2vw, 56px)", fontWeight: 400, color: "#ffffff", margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "0.02em", fontStyle: "normal" }}>
            {t("contact.heroTitle", c.heroTitle)}
          </h1>
        </div>
      </div>

      {/* ── İletişim Bilgileri + Form ── */}
      <section style={{ padding: "100px 2rem", maxWidth: "1300px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px" }} className="contact-main-grid">

          {/* Sol: Bilgiler */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: 300, color: DARK, lineHeight: 1.2, marginBottom: "40px" }}>
              {t("contact.infoTitle", c.infoTitle)}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <MapPin size={18} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: DARK, marginBottom: "6px" }}>Adres</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: MID, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                    {c.address}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <Phone size={18} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: DARK, marginBottom: "6px" }}>Telefon</div>
                  <a href={`tel:${c.phone1.replace(/\s/g, "")}`} style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: MID, textDecoration: "none", marginBottom: "4px" }}>
                    {c.phone1}
                  </a>
                  {c.phone2 && (
                    <a href={`tel:${c.phone2.replace(/\s/g, "")}`} style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: MID, textDecoration: "none" }}>
                      {c.phone2}
                    </a>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <Mail size={18} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: DARK, marginBottom: "6px" }}>E-posta</div>
                  <a href={`mailto:${c.email}`} style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: MID, textDecoration: "none", marginBottom: "4px" }}>
                    {c.email}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <Clock size={18} color={GOLD} style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: DARK, marginBottom: "6px" }}>Resepsiyon</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: MID, margin: 0 }}>{c.receptionHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: Form ("Mesaj Gönderin" etiketi yok) */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: 300, color: DARK, lineHeight: 1.2, marginBottom: "40px" }}>
              {t("contact.formTitle", c.formTitle)}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }} className="contact-form-grid">
                {[
                  { label: "Ad Soyad *", key: "name",  placeholder: "Adınız" },
                  { label: "E-posta *",  key: "email", placeholder: "email@example.com", type: "email" },
                  { label: "Telefon",    key: "phone", placeholder: "+90 5xx xxx xx xx" },
                ].map(({ label, key, placeholder, type = "text" }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "8px" }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={(form as Record<string, string>)[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required={label.includes("*")}
                      style={{ width: "100%", border: "none", borderBottom: "1px solid rgba(5,15,40,0.15)", padding: "12px 0", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: DARK, outline: "none", backgroundColor: "transparent", boxSizing: "border-box" }}
                    />
                  </div>
                ))}

                {/* Konu — custom dropdown */}
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "8px" }}>
                    Konu *
                  </label>
                  <CustomSelect
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                    options={c.subjectOptions.map((o, i) => ({ ...o, label: t(`contact.subj${i}`, o.label) }))}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "40px" }}>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "8px" }}>
                  Mesaj *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Mesajınızı buraya yazın..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: "100%", border: "1px solid rgba(5,15,40,0.1)", padding: "16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: DARK, outline: "none", backgroundColor: "#f9f7f3", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: GOLD, color: DARK, border: "none", padding: "16px 48px", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontWeight: 600, transition: "background 0.3s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#c9a96e")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = GOLD)}
              >
                {t("contact.submitButtonText", c.submitButtonText)}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Geniş Harita — footer üstü ── */}
      <div style={{ width: "100%", height: "480px", overflow: "hidden" }}>
        <iframe
          title="Teymur Continental Hotel Konum"
          src={c.mapUrl}
          width="100%"
          height="480"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <style>{`
@media (max-width: 900px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
