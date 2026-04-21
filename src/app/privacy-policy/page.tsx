export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-heading font-bold mb-8">Kebijakan Privasi</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Pendahuluan</h2>
            <p>
              Di ClipAIF, kami sangat menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan platform dan layanan kami.
            </p>
            <p>
              Dengan menggunakan layanan ClipAIF, Anda menyetujui praktik data yang dijelaskan dalam kebijakan ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. Informasi yang Kami Kumpulkan</h2>
            <div className="space-y-4">
              <p>Kami dapat mengumpulkan jenis informasi berikut:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Informasi Akun:</strong> Nama, alamat email, dan kredensial login saat Anda mendaftar.</li>
                <li><strong>Data Video:</strong> URL video publik yang Anda berikan untuk dianalisis oleh AI kami.</li>
                <li><strong>Informasi Pembayaran:</strong> Melalui penyedia pembayaran pihak ketiga kami yang aman (kami tidak menyimpan nomor kartu kredit penuh Anda).</li>
                <li><strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda berinteraksi dengan layanan kami, termasuk riwayat pencarian niche.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Menyediakan, memelihara, dan meningkatkan fungsionalitas AI kami.</li>
              <li>Memproses transaksi dan mengirimkan konfirmasi pembayaran.</li>
              <li>Mengirimkan pembaruan produk dan informasi layanan penting.</li>
              <li>Menganalisis tren penggunaan untuk pengembangan fitur di masa depan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Keamanan Data</h2>
            <p>
              Kami menerapkan standar keamanan teknis dan organisasi yang tinggi untuk melindungi data Anda dari akses, pengungkapan, atau penghancuran yang tidak sah. Data Anda dienkripsi baik saat transit (TLS/SSL) maupun saat diam di server kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Hak-Hak Anda</h2>
            <p>
              Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda kapan saja melalui pengaturan akun Anda. Anda juga dapat meminta ekspor data atau menarik persetujuan pemasaran kapan saja.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">6. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan materi apa pun melalui email atau pemberitahuan menonjol di platform kami.
            </p>
          </section>

          <section className="pt-8 border-t">
            <p className="text-sm">Terakhir diperbarui: 20 April 2024</p>
            <p className="text-sm">Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, hubungi kami di <a href="mailto:privacy@clipaif.com" className="text-primary hover:underline">privacy@clipaif.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
