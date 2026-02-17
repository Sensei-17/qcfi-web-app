"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // fetch user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setMessage("Login failed.");
      setLoading(false);
      return;
    }

    // fetch role
    const { data: profile, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .single();

    if (roleError) {
      setMessage("Failed to determine role.");
      setLoading(false);
      return;
    }

    // smart redirect
    if (profile.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/member/dashboard";
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 400 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: 16 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </main>
  );
}
