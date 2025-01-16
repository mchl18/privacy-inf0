import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apple Privacy Configuration Manager",
  description:
    "Configure and manage Apple Privacy API access declarations for your iOS applications",
  keywords: [
    "Apple Privacy",
    "iOS Privacy",
    "Privacy Manifest",
    "NSPrivacyAccessedAPITypes",
    "App Privacy",
  ],
  authors: [
    {
      name: "Michael Gerullis",
      url: "https://apple-privacy-config.mgerullis.com",
    },
  ],
  openGraph: {
    title: "Apple Privacy Configuration Manager",
    description:
      "Configure and manage Apple Privacy API access declarations for your iOS applications",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
