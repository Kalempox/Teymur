import { useState } from "react";
import { AdminCard, PageHeader } from "../components/AdminCard";
import { Users, Pencil, Trash2, Plus, Eye, EyeOff, ShieldCheck, UserCheck } from "lucide-react";

const GOLD = "#dbbe8c";
const DARK = "#050f28";
const NAVY = "#050f28";

export interface AdminUser {
  id: number;
  username: string;
  password: string;
  name: string;
  role: "admin" | "editor";
}

const STORAGE_KEY = "teymur_admin_users";

const DEFAULT_USERS: AdminUser[] = [
  { id: 1, username: "admin",  password: "12345",      name: "Yönetici",     role: "admin" },
  { id: 2, username: "editor", password: "editor123",  name: "İçerik Editörü", role: "editor" },
];

export function loadUsers(): AdminUser[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return DEFAULT_USERS;
}

function saveUsers(users: AdminUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

const PERM: Record<"admin" | "editor", string[]> = {
  admin: ["Tüm içerik sayfaları", "Genel Ayarlar", "Menü yönetimi", "Kullanıcı yönetimi", "Sistem ayarları"],
  editor: ["Tüm içerik sayfaları (Ana Sayfa, Odalar, Restoran vb.)", "Galeri, Footer, Navbar"],
};

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>(loadUsers);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [adding, setAdding] = useState(false);
  const [showPass, setShowPass] = useState<Record<number, boolean>>({});
  const [form, setForm] = useState<Omit<AdminUser, "id">>({ username: "", password: "", name: "", role: "editor" });
  const [error, setError] = useState("");

  const persist = (u: AdminUser[]) => { setUsers(u); saveUsers(u); };

  const startEdit = (u: AdminUser) => {
    setEditing(u);
    setForm({ username: u.username, password: u.password, name: u.name, role: u.role });
    setAdding(false);
    setError("");
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({ username: "", password: "", name: "", role: "editor" });
    setError("");
  };

  const save = () => {
    if (!form.username.trim() || !form.password.trim() || !form.name.trim()) {
      setError("Tüm alanları doldurun."); return;
    }
    const dup = users.find(u => u.username === form.username && (!editing || u.id !== editing.id));
    if (dup) { setError("Bu kullanıcı adı zaten kullanılıyor."); return; }

    if (editing) {
      persist(users.map(u => u.id === editing.id ? { ...u, ...form } : u));
      setEditing(null);
    } else {
      const newId = Math.max(0, ...users.map(u => u.id)) + 1;
      persist([...users, { id: newId, ...form }]);
      setAdding(false);
    }
    setError("");
  };

  const remove = (id: number) => {
    const session = localStorage.getItem("teymur_admin_session");
    const current = session ? JSON.parse(session) : null;
    const target = users.find(u => u.id === id);
    if (target && current && target.username === current.username) {
      alert("Kendi hesabınızı silemezsiniz."); return;
    }
    if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      persist(users.filter(u => u.id !== id));
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px",
    border: "1px solid rgba(5,15,40,0.12)", borderRadius: 6,
    fontSize: 14, color: NAVY, outline: "none",
    backgroundColor: "#fafafa", boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
  };

  const FormPanel = () => (
    <div style={{ backgroundColor: "#f8f7f4", border: "1px solid rgba(219,190,140,0.3)", borderRadius: 8, padding: 20, marginBottom: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 16 }}>
        {editing ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, color: "rgba(5,15,40,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ad Soyad</label>
          <input style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ad Soyad" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, color: "rgba(5,15,40,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Kullanıcı Adı</label>
          <input style={inputStyle} value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))} placeholder="kullanici_adi" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, color: "rgba(5,15,40,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Şifre</label>
          <input style={inputStyle} type="text" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Şifre" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, color: "rgba(5,15,40,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Rol</label>
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value as "admin" | "editor" }))}>
            <option value="admin">Yönetici (Admin)</option>
            <option value="editor">Editör</option>
          </select>
        </div>
      </div>

      {/* Permissions preview */}
      <div style={{ backgroundColor: "#fff", border: "1px solid rgba(219,190,140,0.2)", borderRadius: 6, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: form.role === "admin" ? "#d4810a" : "#0a7a4a", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
          {form.role === "admin" ? <ShieldCheck size={13} /> : <UserCheck size={13} />}
          {form.role === "admin" ? "Yönetici Yetkileri" : "Editör Yetkileri"}
        </div>
        <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
          {PERM[form.role].map((p, i) => <li key={i} style={{ fontSize: 12, color: "rgba(5,15,40,0.6)", marginBottom: 2 }}>{p}</li>)}
        </ul>
      </div>

      {error && <div style={{ color: "#dc3545", fontSize: 12, marginBottom: 10 }}>{error}</div>}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={save} style={{ padding: "9px 24px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          {editing ? "Güncelle" : "Ekle"}
        </button>
        <button onClick={() => { setEditing(null); setAdding(false); setError(""); }}
          style={{ padding: "9px 20px", backgroundColor: "transparent", color: "rgba(5,15,40,0.5)", border: "1px solid rgba(5,15,40,0.15)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>
          İptal
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader title="Kullanıcı Yönetimi" subtitle="Admin paneline erişim yetkisi olan kullanıcıları buradan yönetin" />

      <AdminCard title="Kullanıcılar" onSave={undefined}>
        <div style={{ marginBottom: 16 }}>
          <button onClick={startAdd} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", backgroundColor: GOLD, color: DARK, border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            <Plus size={14} /> Yeni Kullanıcı Ekle
          </button>
        </div>

        {(adding || editing) && <FormPanel />}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {users.map(u => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", backgroundColor: "#fafafa", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: u.role === "admin" ? "rgba(212,129,10,0.12)" : "rgba(10,122,74,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {u.role === "admin" ? <ShieldCheck size={18} color="#d4810a" /> : <UserCheck size={18} color="#0a7a4a" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: DARK }}>{u.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(5,15,40,0.45)", marginTop: 2 }}>@{u.username}</div>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 12, backgroundColor: u.role === "admin" ? "rgba(212,129,10,0.1)" : "rgba(10,122,74,0.08)", color: u.role === "admin" ? "#d4810a" : "#0a7a4a" }}>
                {u.role === "admin" ? "Yönetici" : "Editör"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 13, color: "rgba(5,15,40,0.4)" }}>
                {showPass[u.id] ? u.password : "••••••"}
                <button onClick={() => setShowPass(p => ({ ...p, [u.id]: !p[u.id] }))}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "rgba(5,15,40,0.3)" }}>
                  {showPass[u.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => startEdit(u)} style={{ padding: "6px 10px", background: "none", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 6, cursor: "pointer", color: "rgba(5,15,40,0.5)", display: "flex", alignItems: "center" }}>
                  <Pencil size={13} />
                </button>
                <button onClick={() => remove(u.id)} style={{ padding: "6px 10px", background: "none", border: "1px solid rgba(220,53,69,0.3)", borderRadius: 6, cursor: "pointer", color: "#dc3545", display: "flex", alignItems: "center" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Permissions table */}
        <div style={{ marginTop: 28, borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Rol Yetkileri</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(["admin", "editor"] as const).map(role => (
              <div key={role} style={{ backgroundColor: role === "admin" ? "rgba(212,129,10,0.05)" : "rgba(10,122,74,0.04)", border: `1px solid ${role === "admin" ? "rgba(212,129,10,0.2)" : "rgba(10,122,74,0.15)"}`, borderRadius: 8, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: role === "admin" ? "#d4810a" : "#0a7a4a", fontWeight: 600, fontSize: 13 }}>
                  {role === "admin" ? <ShieldCheck size={15} /> : <UserCheck size={15} />}
                  {role === "admin" ? "Yönetici (Admin)" : "Editör"}
                </div>
                <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                  {PERM[role].map((p, i) => <li key={i} style={{ fontSize: 12, color: "rgba(5,15,40,0.6)", marginBottom: 4 }}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
