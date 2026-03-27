import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "ARTHAUS | Curated Art for Every Space",
  description:
    "Premium art prints, custom frames, and curated collections. Gallery-quality art delivered to your door.",
  openGraph: {
    title: "ARTHAUS | Curated Art for Every Space",
    description:
      "Premium art prints, custom frames, and curated collections. Gallery-quality art delivered to your door.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTHAUS | Curated Art for Every Space",
    description: "Premium art prints, custom frames, and curated collections.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
