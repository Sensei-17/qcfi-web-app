"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Membership = {
  id: string;
  member_name: string;
  membership_type: string;
  membership_plan: string;
  email: string;
  mobile: string;
  created_by: string;
  created_at: string;
};

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      const { data, error } = await supabase
        .from("memberships")
        .select(`
          id,
          member_name,
          membership_type,
          membership_plan,
          email,
          mobile,
          created_by,
          created_at
        `)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setMemberships(data || []);
      }

      setLoading(false);
    };

    fetchMemberships();
  }, []);

  if (loading) return <p>Loading memberships…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>All Memberships</h1>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6", textAlign: "left" }}>
              <th style={th}>Name</th>
              <th style={th}>Type</th>
              <th style={th}>Plan</th>
              <th style={th}>Email</th>
              <th style={th}>Mobile</th>
              <th style={th}>Created By</th>
              <th style={th}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={td}>{m.member_name}</td>
                <td style={td}>{m.membership_type}</td>
                <td style={td}>{m.membership_plan}</td>
                <td style={td}>{m.email}</td>
                <td style={td}>{m.mobile}</td>
                <td style={td}>{m.created_by}</td>
                <td style={td}>
                  {new Date(m.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = {
  padding: "12px",
  fontWeight: 600,
  fontSize: "14px",
};

const td = {
  padding: "12px",
  fontSize: "14px",
};
