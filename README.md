# ClipAIF - AI Content Intelligence Platform

ClipAIF adalah platform SaaS modern yang dirancang untuk membantu kreator konten menemukan niche viral, srtategi konten, dan mengoptimalkan pertumbuhan media sosial menggunakan kecerdasan buatan.

## 🚀 Fitur Utama

- **Niche Discovery**: Analisis data real-time untuk menemukan topik yang sedang tren.
- **AI Clip Generator**: Mengubah video panjang menjadi klip pendek viral secara otomatis.
- **History Tracking**: Pantau semua proses rendering dan unduh hasil video Anda.
- **Admin Dashboard**: Monitoring sistem kesehatan (DB, Redis, Celery) dan manajemen kredit user.

## 🛠️ Persiapan Lingkungan (Environment)

Buat file `.env.local` di root direktori dan tambahkan variabel berikut:

```env
NEXT_PUBLIC_API_URL=http://your-backend-api.com
```

## 📦 Panduan Deployment

Ikuti langkah-langkah berikut untuk menjalankan ClipAIF di lingkungan produksi:

### 1. Instalasi Dependensi
Pastikan Anda telah menginstal semua library yang diperlukan:
```bash
npm install
```

### 2. Membangun Aplikasi (Build)
Next.js akan melakukan optimasi aset dan membuat bundle produksi:
```bash
npm run build
```

### 3. Menjalankan Server Produksi
Setelah proses build selesai, jalankan server dengan perintah:
```bash
npm run start
```

## 🌐 SEO & Media
Aplikasi ini sudah dikonfigurasi dengan:
- **Global Metadata**: OpenGraph & Twitter Cards untuk preview link yang menarik.
- **Remote Patterns**: Dukungan render gambar dari YouTube dan Pexels.
- **Responsive Design**: Optimal untuk Desktop, Tablet, dan Mobile.

## 📄 Lisensi
Proprietary - ClipAIF Team
