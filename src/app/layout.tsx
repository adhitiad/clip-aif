import { GlobalTaskManager } from "@/components/layout/GlobalTaskManager";
import { AuthInit } from "@/components/providers/auth-init";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ClipAIF - AI Content Intelligence Platform",
    template: "%s | ClipAIF",
  },
  description:
    "Platform AI tercanggih untuk membantu kreator konten menemukan niche viral, srtategi konten, dan mengoptimalkan pertumbuhan media sosial secara otomatis.",
  keywords: [
    "AI Clipper",
    "Video Viral",
    "Content Intelligence",
    "Niche Discovery",
    "YouTube Automation",
    "ClipAIF",
    "AI Content Intelligence Platform",
    "Tiktok",
    "Reels",
    "Shorts",
    "Content Strategy",
    "Content Optimization",
    "Content Discovery",
    "Content Creation",
    "Content Marketing",
    "Content Management",
    "Content Planning",
    "Content Production",
    "Content Promotion",
    "Content Research",
    "Content Scheduling",
    "Content Sharing",
    "Content Strategy",
    "Content Optimization",
    "Content Discovery",
  ],
  authors: [{ name: "ClipAIF Team" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://clipaif.com",
    title: "ClipAIF - Ultimate AI Clipper SaaS",
    description:
      "Ubah video panjang menjadi konten viral pendek dalam hitungan detik dengan kekuatan AI.",
    siteName: "ClipAIF",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClipAIF Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipAIF - Ultimate AI Clipper SaaS",
    description:
      "Ubah video panjang menjadi konten viral pendek dalam hitungan detik dengan kekuatan AI.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="antialiased" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen")}>
        <ThemeProvider defaultTheme="system" storageKey="clipaif-theme">
          <LanguageProvider>
            <AuthInit>
              {children}
              <GlobalTaskManager />
            </AuthInit>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
