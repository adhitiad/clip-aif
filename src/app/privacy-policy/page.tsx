"use client";

import { Zap, ShieldCheck, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4" />
            Keamanan & Privasi
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Kebijakan Privasi
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Kepercayaan Anda adalah prioritas kami. Pelajari bagaimana kami menjaga dan menghormati data Anda di ekosistem ClipAIF.
          </p>
        </div>

        {/* Content Card */}
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] -z-10" />
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 md:p-16 space-y-12">
            
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                  <span className="text-blue-400 font-bold">01</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Pendahuluan</h2>
              </div>
              <div className="pl-14 text-gray-400 leading-relaxed space-y-4">
                <p>
                  Di <span className="text-white font-semibold">ClipAIF</span>, kami sangat menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan platform dan layanan kami.
                </p>
                <p>
                  Dengan menggunakan layanan ClipAIF, Anda menyetujui praktik data yang dijelaskan dalam kebijakan ini. Kami berkomitmen untuk transparansi penuh mengenai penggunaan data Anda.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center border border-purple-500/20">
                  <span className="text-purple-400 font-bold">02</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Informasi yang Kami Kumpulkan</h2>
              </div>
              <div className="pl-14 space-y-6">
                <p className="text-gray-400">Kami mengumpulkan informasi minimal yang diperlukan untuk memberikan layanan terbaik:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Identitas Akun", desc: "Nama, email, dan foto profil untuk personalisasi pengalaman Anda." },
                    { title: "Data Konten", desc: "URL video dan preferensi niche untuk mengoptimalkan analisis AI." },
                    { title: "Data Transaksi", desc: "Informasi pembayaran diproses secara aman oleh pihak ketiga terlisensi." },
                    { title: "Data Analitik", desc: "Cara Anda berinteraksi dengan fitur kami untuk perbaikan layanan." }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-500" />
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center border border-green-500/20">
                  <span className="text-green-400 font-bold">03</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Bagaimana Kami Menggunakan Data</h2>
              </div>
              <div className="pl-14 text-gray-400 leading-relaxed">
                <p>
                  Data Anda digunakan semata-mata untuk fungsionalitas produk: melatih model AI untuk kebutuhan spesifik video Anda, mengirimkan notifikasi penting tentang akun, dan memastikan keamanan transaksi. Kami <span className="text-white font-semibold italic">tidak pernah</span> menjual data pribadi Anda kepada pihak mana pun.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center border border-orange-500/20">
                  <span className="text-orange-400 font-bold">04</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Keamanan Data & Retention</h2>
              </div>
              <div className="pl-14 text-gray-400 leading-relaxed">
                <p>
                  Data Anda dilindungi oleh standar enkripsi militer (AES-256) saat diam dan enkripsi TLS selama pengiriman. Kami menyimpan data hanya selama diperlukan untuk menyediakan layanan atau sesuai dengan persyaratan hukum yang berlaku.
                </p>
              </div>
            </section>

            {/* Footer inside card */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Terakhir diperbarui: 21 April 2024</p>
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:privacy@clipaif.com" className="hover:underline">privacy@clipaif.com</a>
                </div>
              </div>
              <Link href="/">
                <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  <Zap className="w-4 h-4" />
                  Kembali ke Beranda
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
