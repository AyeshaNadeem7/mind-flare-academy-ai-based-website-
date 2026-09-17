import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://mindflareacademy.vercel.app"),
  title: "Mind Flare Academy | Premier Coaching Institute in Rawalpindi",
  description:
    "Mind Flare Academy in Jhanda Chichi, Rawalpindi offers concept-based coaching from Nursery to Class 12, MDCAT/ECAT entry test preparation, and digital skills courses in flexible Morning & Evening shifts.",
  keywords: [
    "Mind Flare Academy",
    "Rawalpindi Academy",
    "Jhanda Chichi Coaching",
    "Matric Coaching Rawalpindi",
    "FSc ICS Coaching",
    "MDCAT ECAT Prep",
    "Graphic Design Rawalpindi",
    "Web Development Course",
    "IELTS Coaching Rawalpindi",
  ],
  authors: [{ name: "Mind Flare Academy" }],
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Mind Flare Academy | Ignite Curiosity, Strengthen Concepts",
    description: "Quality and affordable education in Rawalpindi from Nursery to Class 12, MDCAT/ECAT, and digital skills short courses.",
    url: "https://mindflareacademy.vercel.app",
    siteName: "Mind Flare Academy",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "Mind Flare Academy Rawalpindi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1E2A44" />
      </head>
      <body className="min-h-screen bg-cream-200 text-navy-900 antialiased selection:bg-flame-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
