"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCreateMembershipPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Admin not logged in");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("memberships").insert({
      user_id: user.id, // admin is creating it
      membership_type: formData.get("membership_type"),
      membership_plan: formData.get("membership_plan"),
      member_name: formData.get("member_name"),
      contact_person: formData.get("contact_person"),
      designation: formData.get("designation"),
      industry_type: formData.get("industry_type"),
      address_line: formData.get("address_line"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      payment_mode: formData.get("payment_mode"),
      paid_amount: formData.get("paid_amount"),
      payment_reference: formData.get("payment_reference"),
      created_by: "admin",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Membership created successfully by admin!");
      form.reset();
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Create Membership (Admin)</h1>

      <form onSubmit={handleSubmit}>
        <label>Membership Type</label>
        <select name="membership_type" required>
          <option value="individual">Individual</option>
          <option value="organization">Organization</option>
          <option value="institution">Institution</option>
        </select>

        <br /><br />

        <label>Membership Plan</label>
        <select name="membership_plan" required>
          <option value="annual">Annual</option>
          <option value="life">Life</option>
        </select>

        <br /><br />

        <label>Member / Organization Name</label>
        <input name="member_name" required />

        <br /><br />

        <label>Contact Person</label>
        <input name="contact_person" />

        <br /><br />

        <label>Designation</label>
        <input name="designation" />

        <br /><br />

        <label>Industry Type</label>
        <input name="industry_type" />

        <br /><br />

        <label>Address</label>
        <input name="address_line" />

        <br /><br />

        <label>City</label>
        <input name="city" />

        <br /><br />

        <label>State</label>
        <input name="state" />

        <br /><br />

        <label>Pincode</label>
        <input name="pincode" />

        <br /><br />

        <label>Email</label>
        <input name="email" type="email" />

        <br /><br />

        <label>Mobile</label>
        <input name="mobile" />

        <br /><br />

        <h3>Payment (Demo)</h3>

        <label>Payment Mode</label>
        <input name="payment_mode" />

        <br /><br />

        <label>Amount Paid</label>
        <input name="paid_amount" type="number" />

        <br /><br />

        <label>Payment Reference</label>
        <input name="payment_reference" />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Membership"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
