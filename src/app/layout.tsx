import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
