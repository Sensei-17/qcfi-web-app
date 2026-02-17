import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QCFI",
  description: "Quality Circle Forum of India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
