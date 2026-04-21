"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Phone, Send, MapPin } from "lucide-react";
import { useState } from "react";

export default function KontakPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Pesan Anda telah terkirim! Tim kami akan menghubungi Anda segera.");
    }, 1500);
  };

  return (
    <div className="py-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Punya pertanyaan atau butuh bantuan khusus? Tim kami siap membantu Anda 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Kami</h3>
                <p className="text-muted-foreground text-sm mb-1">Untuk pertanyaan umum:</p>
                <a href="mailto:hello@clipaif.com" className="text-primary font-medium hover:underline">hello@clipaif.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Telepon</h3>
                <p className="text-muted-foreground text-sm mb-1">Senin - Jumat, 09:00 - 18:00 WIB:</p>
                <a href="tel:+622150006000" className="text-primary font-medium hover:underline">+62 21 5000 6000</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Lokasi Kantor</h3>
                <p className="text-muted-foreground text-sm">
                  Treasury Tower Lt. 42, SCBD,<br />
                  Jakarta Selatan, DKI Jakarta 12190
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/10">
              <h4 className="font-bold mb-4">Temukan kami di media sosial</h4>
              <div className="flex gap-4">
                 {/* Social icons could go here */}
                 <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                   <MessageSquare size={18} />
                 </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 border-primary/10 shadow-2xl shadow-primary/5 h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Kirim Pesan</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan kami akan membalas pesan Anda dalam waktu kurang dari 24 jam.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nama Depan</Label>
                    <Input id="first-name" placeholder="John" required className="bg-muted/50 border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Nama Belakang</Label>
                    <Input id="last-name" placeholder="Doe" required className="bg-muted/50 border-border" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-address">Alamat Email</Label>
                  <Input id="email-address" type="email" placeholder="john@example.com" required className="bg-muted/50 border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input id="subject" placeholder="Bagaimana saya bisa membantu?" required className="bg-muted/50 border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan Anda</Label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    contentEditable
                    className="flex min-h-[120px] w-full rounded-md border border-border bg-muted/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tuliskan pesan Anda di sini..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" className="w-full md:w-auto px-10 h-11" disabled={isSubmitting}>
                  {isSubmitting ? "Mengirim..." : (
                    <>
                      Kirim Pesan Sekarang
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
