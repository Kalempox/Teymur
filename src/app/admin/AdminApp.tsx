import { useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";

export function AdminApp() {
  const [session, setSession] = useState(() => {
    try {
      const s = localStorage.getItem("teymur_admin_session");
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  if (!session) {
    return <AdminLogin onLogin={(user) => {
      localStorage.setItem("teymur_admin_session", JSON.stringify(user));
      setSession(user);
    }} />;
  }

  return <AdminLayout session={session} onLogout={() => {
    localStorage.removeItem("teymur_admin_session");
    localStorage.removeItem("adminAuth");
    setSession(null);
  }} />;
}
