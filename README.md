
## Inventory Service (Transaction-Safe)

Service backend ini merupakan inventory service sederhana yang dibuat menggunakan **NestJS**, **TypeORM**, dan **PostgreSQL**.  
Fokus utama implementasi adalah **keamanan transaksi**, **handle concurrency**, dan **konsistensi data stok**.

## 1. Cara menjalankan service

### Syarat
- Node.js >= 18
- PostgreSQL
- npm atau yarn

### Langkah Menjalankan

```bash
# install dependency
npm install

# jalankan aplikasi
npm run start:dev
```

## 2. Database Setup

Service ini menggunakan PostgreSQL dan TypeORM

```bash
# Install TypeORM jika saat npm i tidak terinstall
$ npm install --save typeorm pg
```

```bash
# Untuk PostgreSQL saya menggunakan docker untuk build container Database nya
$ docker run -d --name postgres-local -e POSTGRES_USER=my_user -e POSTGRES_PASSWORD=my_secret_password -e POSTGRES_DB=my_db -p 5432:5432 postgres
```

```bash
# Defaultnya aplikasi berjalan di port 3000
$ http://localhost:3000

# Dokumentasi API swagger
$ http://localhost:3000/api/docs
```

## 3. Strategi Transaksi & Concurrency

### Masalah yang Diselesaikan
* Multiple request melakukan reservasi stok secara bersamaan
* Risiko *race condition* dan *overselling*

### Strategi yang Digunakan
Service ini menggunakan kombinasi:
* **Database Transaction**
* **Pessimistic Locking (FOR UPDATE)**

### Contoh Konsep Implementasi
* **Saat membuat reservation:**
    * Item di lock menggunakan `pessimistic_write`
    * Stok dicek dan dikurangi di dalam satu transaksi
* **Saat cancel reservation:**
    * Reservation dan Item di lock secara terpisah
    * Stok dikembalikan secara aman

### Hasil dengan Pendekatan Ini:
* Hanya satu request yang bisa mengubah stok pada satu waktu.
* Data stok tidak pernah menjadi negatif.
* Invariant domain tetap dijaga meskipun ada request paralel.

## 4. Known Limitations

Beberapa keterbatasan pada implementasi saat ini:

* Belum ada unit test, masih berfokus pada implementasi logic transaksi.
* Pagination belum diterapkan di semua endpoint `GET`.
* Belum ada soft delete dan mekanisme auth.
* Menggunakan pessimistic locking bisa jadi bottleneck di trafik yang tinggi.

## 5. Hal yang Akan Ditingkatkan Jika Ada Waktu Lebih

Jika memiliki waktu lebih, beberapa hal yang ingin ditingkatkan:

* Menambahkan unit dan integration test, terutama untuk skenario reservasi paralel.
* Menambahkan update realtime ke client (contoh misalnya WebSocket) setelah stok berubah.
* Merapihkan pagination dan filtering pada endpoint list.
* Membuat format global untuk penanganan error agar lebih konsisten.
