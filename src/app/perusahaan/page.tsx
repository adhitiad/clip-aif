import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Globe, Landmark, MapPin, Building2 } from "lucide-react";

export default function PerusahaanPage() {
  return (
    <div className="py-20 min-h-screen font-geist-sans">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-20 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Profil Perusahaan</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            PT ClipAIF Teknologi Indonesia adalah pemimpin dalam inovasi AI untuk industri kreatif digital, menghadirkan solusi tercanggih untuk data-driven content creation.
          </p>
        </div>

        {/* Company Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="border-primary/10 shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Building2 className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-2">Identitas</h3>
              <p className="text-sm text-muted-foreground">
                Didirikan pada tahun 2023 di Jakarta, Indonesia sebagai start-up teknologi yang berfokus pada Computer Vision dan Machine Learning.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <MapPin className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-2">Kantor Pusat</h3>
              <p className="text-sm text-muted-foreground">
                Sudirman Central Business District (SCBD), Treasury Tower Lt. 42, Jakarta Selatan, DKI Jakarta 12190.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Globe className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-2">Jangkauan</h3>
              <p className="text-sm text-muted-foreground">
                Melayani kreator di lebih dari 45 negara di seluruh dunia, dengan fokus pasar utama di Asia Tenggara dan Amerika Serikat.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Business Stats Section */}
        <div className="bg-primary/5 rounded-3xl p-8 md:p-16 border border-primary/10 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Video Teranalisis</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50k+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Kreator Aktif</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$5M</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Pendanaan Seri A</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Karyawan</div>
            </div>
          </div>
        </div>

        {/* Legal & Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Landmark size={20} />
              </div>
              <h2 className="text-2xl font-bold">Kepatuhan Hukum</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Kami beroperasi di bawah izin resmi pemerintah Indonesia dan mematuhi standar keamanan data global GDPR dan PSE Kominfo. Keamanan data pengguna adalah prioritas tertinggi dalam arsitektur sistem kami.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase size={20} />
              </div>
              <h2 className="text-2xl font-bold">Kesempatan Karir</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Kami selalu mencari talenta terbaik di bidang AI, Engineering, dan Design. Jika Anda ingin berkontribusi dalam revolusi konten digital, cek portal karir kami untuk posisi terbuka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
