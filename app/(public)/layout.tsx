import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header
        style={{
          padding: 16,
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: 16,
        }}
      >
        <strong>QCFI – Public</strong>

        <nav style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/events">Events</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer style={{ padding: 16, borderTop: "1px solid #ddd" }}>
        <small>© QCFI</small>
      </footer>
    </div>
  );
}
