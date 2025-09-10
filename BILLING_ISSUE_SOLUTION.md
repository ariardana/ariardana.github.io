# 🔧 Solusi untuk Masalah Akun Terkunci karena Billing

## 📋 Penyebab Umum

Error "account is locked due to a billing issue" biasanya terjadi karena salah satu dari beberapa alasan berikut:

1. **Repository Private**: GitHub Pages memerlukan repository public untuk akun gratis
2. **Batas Penggunaan GitHub Actions**: Melebihi batas 2000 menit per bulan untuk akun gratis
3. **Masalah Pembayaran**: Ada masalah dengan metode pembayaran di akun GitHub
4. **Fitur Berbayar**: Menggunakan fitur GitHub Pages yang memerlukan akun berbayar

## ✅ Solusi yang Direkomendasikan

### 1. Pastikan Repository Public

Langkah pertama dan terpenting:
1. Buka repository Anda di GitHub
2. Pergi ke **Settings**
3. Di bagian **General**, pastikan **Public** dipilih di bawah **Danger Zone**
4. Jika repository Anda private, ubah menjadi public

### 2. Optimalkan Penggunaan GitHub Actions

Untuk menghindari melebihi batas penggunaan:
1. **Gunakan cache dependencies**:
   ```yaml
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
       node-version: "18"
       cache: "npm"
   ```

2. **Hindari build yang tidak perlu**:
   ```yaml
   # Tambahkan path filter untuk hanya menjalankan workflow saat file tertentu berubah
   on:
     push:
       branches: ["main"]
       paths:
         - "app/**"
         - "package.json"
         - "next.config.js"
   ```

3. **Gunakan concurrency untuk membatalkan build sebelumnya**:
   ```yaml
   concurrency:
     group: "pages"
     cancel-in-progress: true
   ```

### 3. Periksa Pengaturan Billing

1. Buka [GitHub Billing Settings](https://github.com/settings/billing)
2. Periksa apakah ada masalah pembayaran yang perlu diselesaikan
3. Jika menggunakan akun gratis, pastikan tidak ada fitur berbayar yang aktif

### 4. Gunakan Workflow yang Disederhanakan

Workflow yang telah diperbaiki di file `.github/workflows/deploy.yml` sudah dioptimalkan untuk:
- Menggunakan cache dependencies
- Membatalkan build sebelumnya untuk menghemat menit
- Menggunakan pendekatan build yang efisien

## 🚀 Alternatif Deployment

Jika masalah billing tetap terjadi, pertimbangkan alternatif berikut:

### Vercel (Rekomendasi)
1. Daftar di [vercel.com](https://vercel.com)
2. Hubungkan dengan akun GitHub Anda
3. Import repository Anda
4. Vercel akan secara otomatis mendeploy setiap push ke branch main

### Netlify
1. Daftar di [netlify.com](https://netlify.com)
2. Pilih "New site from Git"
3. Hubungkan dengan GitHub dan pilih repository Anda
4. Set build command ke `npm run build` dan publish directory ke `out`

### Cloudflare Pages
1. Daftar di [cloudflare.com](https://cloudflare.com)
2. Pergi ke Pages section
3. Hubungkan dengan GitHub dan pilih repository Anda
4. Set build command ke `npm run build` dan build output directory ke `out`

## 💡 Tips Tambahan

1. **Gunakan Environment Variables dengan Benar**:
   - Set `NEXT_PUBLIC_GITHUB_USERNAME` di GitHub Actions variables, bukan secrets
   - Ini memastikan nilai tersedia saat build time

2. **Monitor Penggunaan GitHub Actions**:
   - Periksa usage di [GitHub Actions billing](https://github.com/settings/billing)
   - Pastikan tidak melebihi 2000 menit per bulan untuk akun gratis

3. **Optimalkan Build Time**:
   - Gunakan `npm ci` alih-alih `npm install` untuk instalasi yang lebih cepat
   - Manfaatkan caching untuk dependencies

## 📞 Dukungan Lebih Lanjut

Jika masalah tetap terjadi:
1. Periksa [GitHub Status](https://www.githubstatus.com/) untuk incident yang sedang berlangsung
2. Hubungi [GitHub Support](https://support.github.com/) untuk bantuan teknis
3. Tinjau dokumentasi terbaru di [GitHub Pages Documentation](https://docs.github.com/en/pages)

Dengan mengikuti panduan di atas, Anda seharusnya dapat mengatasi masalah akun terkunci dan berhasil mendeploy portfolio Anda.