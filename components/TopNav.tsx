"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TopNav() {
  const [role, setRole] = useState<"admin" | "member" | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      setRole(profile?.role ?? null);
    };

    loadRole();
  }, []);

  if (!role) return null;

  return (
    <nav
      style={{
        display: "flex",
        gap: 16,
        padding: 16,
        borderBottom: "1px solid #ddd",
      }}
    >
      {role === "member" && (
        <>
          <Link href="/member/dashboard">Dashboard</Link>
          <Link href="/member/profile">Profile</Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/memberships">Memberships</Link>
        </>
      )}
    </nav>
  );
}
