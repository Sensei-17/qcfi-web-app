"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { getUserRole } from "@/lib/auth";
import TopNav from "@/components/TopNav";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      const role = await getUserRole();

      if (!mounted) return;

      if (role !== "admin") {
        window.location.href = "/login";
      } else {
        setLoading(false);
      }
    };

    checkAccess();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p style={{ padding: 24 }}>Checking admin access…</p>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          padding: 16,
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <strong>Admin Panel</strong>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </aside>

      <div style={{ flex: 1 }}>
        <TopNav />
        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
