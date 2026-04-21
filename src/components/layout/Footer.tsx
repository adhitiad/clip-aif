"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { Globe, Mail, MessageSquare, ExternalLink } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isExcluded = pathname?.startsWith("/dashboard") || pathname === "/signin" || pathname === "/signup";

  if (isExcluded) return null;

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-heading font-bold text-xl">ClipAIF</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Platform AI tercanggih untuk membantu kreator konten menemukan niche viral dan mengoptimalkan pertumbuhan media sosial mereka secara otomatis.
            </p>
            <div className="flex gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sosial</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-foreground/80">Produk</h4>
            <ul className="space-y-4">
              <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fitur Utama</Link></li>
              <li><Link href="/harga" className="text-sm text-muted-foreground hover:text-primary transition-colors">Harga & Paket</Link></li>
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard Analitik</Link></li>
              <li><Link href="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tools AI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-foreground/80">Perusahaan</h4>
            <ul className="space-y-4">
              <li><Link href="/tentang-kami" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/perusahaan" className="text-sm text-muted-foreground hover:text-primary transition-colors">Profil Perusahaan</Link></li>
              <li><Link href="/karir" className="text-sm text-muted-foreground hover:text-primary transition-colors">Karir</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog & Berita</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-foreground/80">Dukungan</h4>
            <ul className="space-y-4">
              <li><Link href="/kontak" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kontak</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ClipAIF. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
