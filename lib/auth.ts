import { supabase } from "./supabase";

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function getUserRole() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.error("Error fetching role:", error.message);
    return null;
  }

  return data.role as "admin" | "member";
}
