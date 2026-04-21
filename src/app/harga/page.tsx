import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

export default function HargaPage() {
  const plans = [
    {
      name: "Free",
      price: "Rp 0",
      description: "Untuk pemula yang ingin mencoba",
      features: ["5 Niche Analysis / bulan", "Basic Viral Score", "Akses Dashboard", "Komunitas Discord"],
      buttonText: "Mulai Gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "Rp 149.000",
      description: "Paling populer untuk konten kreator",
      features: [
        "Unlimited Niche Analysis",
        "Advanced Viral Prediction",
        "AI Content Suggestion",
        "Priority Support",
        "Export Data CSV/PDF",
      ],
      buttonText: "Pilih Pro",
      popular: true,
    },
    {
      name: "Business",
      price: "Rp 499.000",
      description: "Untuk agency dan tim produksi",
      features: [
        "Semua fitur Pro",
        "Multi-user Access (3 users)",
        "Custom AI Model Training",
        "API Access",
        "Dedicated Account Manager",
      ],
      buttonText: "Hubungi Penjualan",
      popular: false,
    },
  ];

  return (
    <div className="py-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Pilih Paket yang Sesuai dengan <span className="text-primary italic">Ambisi</span> Anda
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dari pemula hingga profesional, kami memiliki solusi yang tepat untuk membantu Anda mendominasi media sosial dengan kekuatan AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden border-2 transition-all hover:shadow-2xl hover:-translate-y-1 ${
                plan.popular ? "border-primary shadow-primary/10" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-[10px] uppercase font-bold px-3 py-1 rotate-45 translate-x-[20px] translate-y-[10px] w-[100px] text-center shadow-md">
                    Terpopuler
                  </div>
                </div>
              )}
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/bulan</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 border-t bg-muted/30">
                <Link href={plan.name === "Free" ? "/signup" : "/kontak"} className="w-full">
                  <Button 
                    className="w-full h-11 text-base font-semibold" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Pro" && <Zap className="mr-2 h-4 w-4 fill-current" />}
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Butuh solusi enterprise?</h3>
            <p className="text-muted-foreground">
              Kami menawarkan paket kustom untuk perusahaan besar dengan integrasi API penuh dan layanan manajemen video tingkat tinggi.
            </p>
          </div>
          <Button size="lg" variant="secondary" className="font-bold px-8">
            Hubungi Tim Enterprise
          </Button>
        </div>
      </div>
    </div>
  );
}
