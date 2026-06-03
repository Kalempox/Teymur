import { useState } from "react";
import { Briefcase, MapPin, Clock, Upload, X } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useContent, useT } from "../context/ContentContext";

const GOLD = "#dbbe8c";
const DARK = "#050f28";
const CREAM = "#f5f2ed";


export function CareerPage() {
  const { t: tLang, lang } = useLang();
  const { career } = useContent();
  const t = useT();
  const [selectedPosition, setSelectedPosition] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "" });

  const positions = career.positions.map((p, i) => ({
    ...p,
    title: t(`career.pos${i}.title`, p.title),
    department: t(`career.pos${i}.department`, p.department),
    type: t(`career.pos${i}.type`, p.type),
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === "tr" ? "Başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz." : lang === "en" ? "Your application has been received! We will contact you shortly." : "تم استلام طلبك! سنتواصل معك قريباً.");
    setForm({ name: "", email: "", phone: "", coverLetter: "" });
    setSelectedPosition("");
    setCvFile(null);
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <img
          src={career.heroImg}
          alt="Career"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,15,40,0.78) 0%, rgba(5,15,40,0.58) 100%)" }} />
        <div style={{ position: "absolute", bottom: "100px", left: 0, right: 0, padding: "0 6vw" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4.2vw, 56px)", fontWeight: 400, color: "#ffffff", margin: 0, lineHeight: 1.1, letterSpacing: "0.02em" }}>
            {t("career.heroTitle", career.heroTitle)}
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: "80px 2rem 60px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: DARK, lineHeight: 1.2, marginBottom: "24px", letterSpacing: "0.01em" }}>
          {t("career.introTitle", career.introTitle)}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.95, color: "rgba(5,15,40,0.55)", maxWidth: "680px", margin: "0 auto" }}>
          {t("career.introDesc", career.introDesc)}
        </p>
      </section>

      {/* Main Content */}
      <section style={{ padding: "60px 2rem 100px", maxWidth: "1300px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px" }} className="career-grid">
          {/* Left: Open Positions */}
          <div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {positions.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedPosition(job.id)}
                  style={{
                    padding: "24px",
                    border: selectedPosition === job.id ? `2px solid ${GOLD}` : "1px solid rgba(5,15,40,0.08)",
                    backgroundColor: selectedPosition === job.id ? "rgba(219,190,140,0.04)" : "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPosition !== job.id) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(219,190,140,0.3)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(219,190,140,0.02)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPosition !== job.id) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(5,15,40,0.08)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff";
                    }
                  }}
                >
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 500, color: DARK, marginBottom: "12px", letterSpacing: "0.05em" }}>
                    {job.title}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Briefcase size={12} color={GOLD} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(5,15,40,0.5)", letterSpacing: "0.05em" }}>
                        {job.department}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Clock size={12} color={GOLD} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(5,15,40,0.5)", letterSpacing: "0.05em" }}>
                        {job.type}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <MapPin size={12} color={GOLD} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(5,15,40,0.5)", letterSpacing: "0.05em" }}>
                        {job.location}
                      </span>
                    </div>
                  </div>
                  {selectedPosition === job.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: GOLD,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: DARK }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Application Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "36px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "10px" }}>
                    {lang === "tr" ? "Ad Soyad *" : lang === "en" ? "Full Name *" : "الاسم الكامل *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={lang === "tr" ? "Adınız" : lang === "en" ? "Your name" : "اسمك"}
                    style={{ width: "100%", border: "none", borderBottom: "1px solid rgba(5,15,40,0.15)", padding: "14px 0", fontFamily: "'Inter', sans-serif", fontSize: "15px", color: DARK, outline: "none", backgroundColor: "transparent", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "10px" }}>
                    {lang === "tr" ? "E-posta *" : lang === "en" ? "Email *" : "البريد الإلكتروني *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                    style={{ width: "100%", border: "none", borderBottom: "1px solid rgba(5,15,40,0.15)", padding: "14px 0", fontFamily: "'Inter', sans-serif", fontSize: "15px", color: DARK, outline: "none", backgroundColor: "transparent", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "10px" }}>
                    {lang === "tr" ? "Telefon *" : lang === "en" ? "Phone *" : "الهاتف *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+90 5xx xxx xx xx"
                    style={{ width: "100%", border: "none", borderBottom: "1px solid rgba(5,15,40,0.15)", padding: "14px 0", fontFamily: "'Inter', sans-serif", fontSize: "15px", color: DARK, outline: "none", backgroundColor: "transparent", boxSizing: "border-box" }}
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "12px" }}>
                    <Upload size={14} color={GOLD} />
                    {lang === "tr" ? "CV / Özgeçmiş *" : lang === "en" ? "CV / Resume *" : "السيرة الذاتية *"}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        padding: "20px",
                        border: "2px dashed rgba(219,190,140,0.3)",
                        backgroundColor: CREAM,
                        cursor: "pointer",
                        transition: "all 0.3s",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "rgba(5,15,40,0.5)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = GOLD;
                        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(219,190,140,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(219,190,140,0.3)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = CREAM;
                      }}
                    >
                      {cvFile ? (
                        <>
                          <span>{cvFile.name}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setCvFile(null); }}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                          >
                            <X size={16} color={GOLD} />
                          </button>
                        </>
                      ) : (
                        <>
                          <Upload size={18} color={GOLD} />
                          <span>
                            {lang === "tr" ? "Dosya Seçin (PDF, DOC, DOCX)" : lang === "en" ? "Choose File (PDF, DOC, DOCX)" : "اختر ملف (PDF, DOC, DOCX)"}
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "10px" }}>
                    {lang === "tr" ? "Ön Yazı / Motivasyon" : lang === "en" ? "Cover Letter" : "رسالة تقديم"}
                  </label>
                  <textarea
                    rows={5}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    placeholder={lang === "tr" ? "Neden bu pozisyon için uygun olduğunuzu kısaca açıklayın..." : lang === "en" ? "Briefly explain why you are suitable for this position..." : "اشرح باختصار لماذا أنت مناسب لهذا المنصب..."}
                    style={{ width: "100%", border: "1px solid rgba(5,15,40,0.1)", padding: "16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: DARK, outline: "none", backgroundColor: CREAM, resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedPosition}
                style={{
                  width: "100%",
                  backgroundColor: selectedPosition ? GOLD : "rgba(5,15,40,0.15)",
                  color: selectedPosition ? DARK : "rgba(5,15,40,0.3)",
                  border: "none",
                  padding: "20px 48px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  cursor: selectedPosition ? "pointer" : "not-allowed",
                  fontWeight: 600,
                  transition: "all 0.3s",
                  opacity: selectedPosition ? 1 : 0.5,
                }}
                onMouseEnter={(e) => { if (selectedPosition) (e.target as HTMLElement).style.backgroundColor = "#c9a96e"; }}
                onMouseLeave={(e) => { if (selectedPosition) (e.target as HTMLElement).style.backgroundColor = GOLD; }}
              >
                {t("career.submitButtonText", career.submitButtonText)}
              </button>

              {!selectedPosition && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(5,15,40,0.4)", textAlign: "center", marginTop: "16px", fontStyle: "normal" }}>
                  {lang === "tr" ? "Lütfen bir pozisyon seçin" : lang === "en" ? "Please select a position" : "يرجى اختيار وظيفة"}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) {
          .career-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
