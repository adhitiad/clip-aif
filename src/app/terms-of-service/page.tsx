"use client";

import { Zap, Scale, Mail, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Scale className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Peraturan dan ketentuan penggunaan platform ClipAIF. Dengan menggunakan layanan kami, Anda menyetujui semua poin yang tercantum di bawah ini.
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
                <h2 className="text-2xl font-bold tracking-tight">Penerimaan Ketentuan</h2>
              </div>
              <div className="pl-14 text-gray-400 leading-relaxed">
                <p>
                  Layanan disediakan oleh <span className="text-white font-semibold">ClipAIF Inc</span>. Dengan mengakses situs web ini, kami menganggap Anda menerima syarat dan ketentuan ini. Jangan terus menggunakan ClipAIF jika Anda tidak setuju untuk mengikuti semua syarat dan ketentuan yang dinyatakan di halaman ini.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center border border-purple-500/20">
                  <span className="text-purple-400 font-bold">02</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Lisensi Penggunaan & Batasan</h2>
              </div>
              <div className="pl-14 space-y-4 text-gray-400">
                <p>Izin diberikan untuk menggunakan layanan AI kami untuk kebutuhan pembuatan konten pribadi maupun komersial, dengan batasan berikut:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                   {[
                     "Tidak melakukan reverse-engineering pada model AI kami.",
                     "Tidak menggunakan platform untuk konten ilegal/berbahaya.",
                     "Tidak menjual kembali akses API tanpa izin tertulis.",
                     "Bertanggung jawab atas konten yang diunggah."
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-2">
                       <ChevronRight className="w-4 h-4 text-purple-500" />
                       {item}
                     </li>
                   ))}
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center border border-green-500/20">
                  <span className="text-green-400 font-bold">03</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Pembayaran & Langganan</h2>
              </div>
              <div className="pl-14 text-gray-400 leading-relaxed space-y-4">
                <p>
                  Beberapa bagian dari Layanan ditagih berdasarkan langganan. Anda akan ditagih secara berkala (bulanan atau tahunan). Kegagalan pembayaran dapat mengakibatkan penghentian akses ke fitur premium.
                </p>
                <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 text-sm italic">
                  <span className="text-orange-400 font-bold">Catatan:</span> Refund hanya dapat dilakukan sesuai dengan kebijakan pengembalian dana 14 hari kami yang berlaku untuk paket tertentu.
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center border border-red-500/20">
                  <span className="text-red-400 font-bold">04</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Disklaimer & Batasan Tanggung Jawab</h2>
              </div>
              <div className="pl-14 text-gray-400 leading-relaxed">
                <p>
                   Layanan ClipAIF disediakan "apa adanya". Kami tidak menjamin bahwa hasil analisis AI akan 100% akurat atau video Anda <span className="text-white italic">pasti</span> viral. Kami tidak bertanggung jawab atas kerugian finansial atau reputasi yang timbul dari penggunaan platform kami.
                </p>
              </div>
            </section>

            {/* Footer inside card */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Terakhir diperbarui: 21 April 2024</p>
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <FileText className="w-4 h-4" />
                  <span>v1.2.0 - Official TOS</span>
                </div>
              </div>
              <Link href="/">
                <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors">
                  <Zap className="w-4 h-4" />
                  Saya Mengerti
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
