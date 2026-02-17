"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { getUserRole } from "@/lib/auth";
import TopNav from "@/components/TopNav";

type Props = {
  children: ReactNode;
};

export default function MemberLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      const role = await getUserRole();

      if (!mounted) return;

      if (role !== "member") {
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
    return <p style={{ padding: 24 }}>Checking member access…</p>;
  }

  return (
    <div>
      <TopNav />

      <header
        style={{
          padding: 16,
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>Member Area</strong>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>

      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}
