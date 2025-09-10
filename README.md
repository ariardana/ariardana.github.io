# 🚀 GitHub Portfolio dengan Next.js + Tailwind CSS

Portfolio modern yang terintegrasi langsung dengan GitHub API untuk menampilkan profil, repositori, dan informasi kontak secara otomatis.

## ✨ Fitur Utama

- **🔄 Sinkronisasi Otomatis**: Data profil (nama, bio, avatar, repositori) langsung dari GitHub API
- **📱 Responsive Design**: Tampilan optimal di semua perangkat dengan Tailwind CSS
- **🎨 Modern UI**: Desain contemporary dengan animasi halus menggunakan Framer Motion
- **⚡ Performance**: Dioptimalkan dengan Next.js App Router
- **🌓 Dark Mode**: Dukungan tema gelap otomatis berdasarkan preferensi sistem
- **🌐 GitHub Pages Ready**: Siap deploy ke GitHub Pages atau platform hosting lainnya

## 🏗️ Struktur Halaman

- **`/`** → Halaman profil utama dengan ringkasan profil, proyek unggulan, dan kontak
- **`/projects`** → Daftar lengkap repositori dengan filter (semua/original/fork) dan sorting (terbaru/populer/nama)
- **`/contact`** → Informasi kontak dan media sosial dengan tombol salin dan tautan langsung
- **`/about`** → Halaman tentang dengan statistik GitHub dan informasi detail

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) dengan App Router
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- [Framer Motion](https://www.framer.com/motion/) untuk animasi
- [GitHub REST API](https://docs.github.com/en/rest) untuk data
- [Lucide React](https://lucide.dev/) untuk ikon
- TypeScript untuk type safety

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/username/github-portfolio.git
cd github-portfolio
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment

```bash
# Salin file example
cp .env.local.example .env.local

# Edit .env.local dan ganti dengan username GitHub Anda
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
```

> **Catatan**: Jika tidak ada file `.env.local.example`, buat file `.env.local` di root project dan tambahkan:
> ```env
> NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
> ```

### 4. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 5. Build untuk Production

```bash
npm run build
# Untuk ekspor static
npm run export
```

## 📦 Build & Deploy

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Ekspor sebagai static site
npm run export
```

File siap deploy akan berada di folder `out/`.

### Deploy ke GitHub Pages

1. **Setup Repository**:
   - Buat repository baru di GitHub
   - Push kode ke repository tersebut

2. **Konfigurasi GitHub Pages**:
   - Pergi ke Settings > Pages
   - Pilih source: "GitHub Actions"

3. **Buat Workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build && npm run export
        env:
          NEXT_PUBLIC_GITHUB_USERNAME: ${{ vars.NEXT_PUBLIC_GITHUB_USERNAME }}
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

4. **Set Environment Variables**:
   - Pergi ke Settings > Secrets and variables > Actions
   - Tambah variable `NEXT_PUBLIC_GITHUB_USERNAME` dengan username GitHub Anda

### Deploy ke Platform Lain

- **Vercel**: Langsung connect repository GitHub
- **Netlify**: Upload folder `out/` atau connect repository
- **Cloudflare Pages**: Connect repository dengan build command `npm run build && npm run export`

## 🎨 Kustomisasi

### Mengubah Tema Warna

Edit file `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6', // Warna utama
        600: '#2563eb',
        // ... tambahkan warna lainnya
      }
    }
  }
}
```

### Menambah Halaman Baru

1. Buat file di folder `app/nama-halaman/page.tsx`
2. Tambahkan navigasi di `app/components/Navigation.tsx`

### Kustomisasi Komponen

Semua komponen berada di folder `app/components/`. Anda bisa:
- Menambah animasi baru di `globals.css`
- Mengubah layout di `layout.tsx`
- Menambah fitur baru pada masing-masing halaman

### Kustomisasi Animasi

Animasi menggunakan Framer Motion. Anda dapat mengubah durasi, delay, dan efek animasi di setiap komponen:
- `AnimatedSection.tsx` untuk animasi section
- `StaggeredAnimation.tsx` untuk animasi bertahap

## 🔧 Konfigurasi Lanjutan

### Menambah Rate Limiting

Untuk menghindari rate limit GitHub API, tambahkan GitHub token:

```bash
# .env.local
GITHUB_TOKEN=your-personal-access-token
```

> **Catatan**: Saat ini aplikasi menggunakan API publik GitHub yang memiliki limit 60 request per jam per IP. Untuk produksi, disarankan menggunakan token personal access.

### Analytics

Tambahkan Google Analytics atau analytics platform lainnya di `app/layout.tsx`:

```jsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Tambahkan script analytics di sini */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🐛 Troubleshooting

### API Rate Limit

Jika mendapat error rate limit:
- Tambahkan GitHub personal access token di `.env.local`
- Gunakan cache dengan localStorage (opsional)
- Kurangi frekuensi request API

### Environment Variables Tidak Terbaca

Jika data tidak muncul:
- Pastikan `NEXT_PUBLIC_GITHUB_USERNAME` sudah diset dengan benar
- Restart development server setelah mengubah `.env.local`
- Periksa apakah username GitHub valid

### Deployment Issues

- Pastikan repository Anda adalah **Public** (GitHub Pages memerlukan repository public untuk akun gratis)
- Pastikan environment variables sudah diset dengan benar di platform deployment
- Check build logs untuk error specific
- Pastikan semua dependencies terinstall dengan `npm install`

### Akun Terkunci karena Masalah Billing

Jika Anda mendapatkan error "account is locked due to a billing issue" saat deployment:
1. Pastikan repository Anda adalah **Public**, bukan Private
2. Verifikasi bahwa Anda tidak menggunakan fitur GitHub Pages yang memerlukan akun berbayar
3. Pastikan Anda tidak melebihi batas penggunaan gratis GitHub Actions
4. Cek pengaturan billing di akun GitHub Anda dan pastikan tidak ada masalah pembayaran

Untuk solusi lengkap, lihat panduan khusus di [BILLING_ISSUE_SOLUTION.md](BILLING_ISSUE_SOLUTION.md)

### Styling Issues

- Clear browser cache
- Regenerate Tailwind dengan `npm run build`
- Check console untuk CSS errors

### Animasi Tidak Muncul

- Pastikan browser mendukung CSS animations
- Periksa apakah Framer Motion terinstall dengan benar
- Cek console untuk JavaScript errors

## 🤝 Contributing

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

Jika menemukan bug atau ingin menambahkan fitur, silakan buat issue terlebih dahulu.

## 📄 License

MIT License. Lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) untuk framework yang luar biasa
- [Tailwind CSS](https://tailwindcss.com/) untuk utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) untuk animasi yang halus
- [GitHub API](https://docs.github.com/en/rest) untuk data integration
- [Lucide Icons](https://lucide.dev/) untuk beautiful icons

---

**⭐ Jika project ini membantu, jangan lupa kasih star!**
