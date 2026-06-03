import { useState } from "react";
import { loadUsers } from "./pages/AdminUsers";

const NAVY = "#050f28";
const GOLD = "#dbbe8c";

interface Props {
  onLogin: (user: { username: string; role: string; name: string }) => void;
}

export function AdminLogin({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const users = loadUsers();
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin({ username: user.username, role: user.role, name: user.name });
      } else {
        setError("Kullanıcı adı veya şifre hatalı.");
        setLoading(false);
      }
    }, 400);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px",
    border: "1px solid rgba(5,15,40,0.15)", borderRadius: "6px",
    fontSize: "14px", color: NAVY, outline: "none",
    backgroundColor: "#f9f9fb", boxSizing: "border-box",
    transition: "border-color 0.2s", fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: "20px" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "48px 40px", width: "100%", maxWidth: "420px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img src="/otellogo.png" alt="Teymur Continental Hotel" style={{ height: "56px", objectFit: "contain", display: "inline-block" }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: NAVY, marginTop: "12px", letterSpacing: "0.05em" }}>
            Teymur Continental
          </div>
          <div style={{ fontSize: "13px", color: "rgba(5,15,40,0.5)", marginTop: "4px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Yönetim Paneli
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "8px", fontWeight: 500 }}>
              Kullanıcı Adı
            </label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="kullanici_adi" required style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(5,15,40,0.15)")} />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(5,15,40,0.5)", marginBottom: "8px", fontWeight: 500 }}>
              Şifre
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" required style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(5,15,40,0.15)")} />
          </div>

          {error && (
            <div style={{ backgroundColor: "rgba(220,53,69,0.08)", border: "1px solid rgba(220,53,69,0.2)", borderRadius: "6px", padding: "10px 14px", fontSize: "13px", color: "#dc3545", marginBottom: "20px", textAlign: "center" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", backgroundColor: loading ? "rgba(219,190,140,0.6)" : GOLD, color: NAVY, border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
