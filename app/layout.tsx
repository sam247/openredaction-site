import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenRedaction - AI-Powered PII Detection & Redaction",
  description: "Automatically detect and redact personally identifiable information (PII) from text using advanced AI models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

