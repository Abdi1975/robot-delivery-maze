# 🤖 Robot Delivery Maze

**Robot Delivery Maze** adalah simulasi interaktif di mana robot mengantarkan paket melalui sebuah labirin menggunakan algoritma **Breadth-First Search (BFS)**. Aplikasi ini bertujuan untuk menunjukkan bagaimana BFS bekerja dalam pencarian jalur terpendek di dalam maze.

## 🧠 Algoritma yang Digunakan

### Breadth-First Search (BFS)

BFS bekerja dengan menjelajahi maze secara bertingkat (level-by-level), menjamin bahwa jalur terpendek akan ditemukan terlebih dahulu.

**Langkah-langkah BFS:**

1. Mulai dari posisi robot (📍 start)
2. Masukkan node awal ke dalam antrean (queue)
3. Selama antrean tidak kosong:
   - Ambil node dari antrean
   - Tandai node sebagai dikunjungi (🟪)
   - Tambahkan tetangga yang dapat dikunjungi ke dalam antrean
4. Jika node tujuan (📦 paket) ditemukan:
   - Lacak kembali jalur dari goal ke start (🟩)
5. Selesai!

## 🎮 Fitur

- ✅ **Menemukan jalur terpendek** ke tujuan
- 📦 **Simulasi pengantaran paket**
- 🗺️ **Maze baru**: acak ulang labirin
- 🔄 **Reset**: kembalikan ke kondisi awal
- 🐌 **Mode lambat**: lihat langkah-langkah BFS secara visual
- 👣 Menampilkan statistik:
  - Langkah diambil
  - Jumlah sel yang dikunjungi
  - Panjang jalur solusi

## 📦 Representasi Visual

| Simbol | Arti |
|--------|------|
| 🤖     | Robot (Start) |
| 📦     | Paket (Goal) |
| ⬛     | Tembok (tidak bisa dilewati) |
| 🟪     | Sel yang telah dikunjungi |
| 🟩     | Jalur solusi dari start ke goal |

## 💡 Keunggulan BFS

- **Menjamin jalur terpendek**
- **Sederhana dan mudah dipahami**
- Cocok untuk grid atau labirin sederhana

## 🚀 Cara Menjalankan

Jika proyek ini berbasis web, cukup buka file `index.html` di browser modern.

## 📁 Struktur Proyek

Robot-Delivery-Maze/
├── index.html
├── style.css
├── script.js
└── README.md


## 🛠️ Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## 📚 Lisensi

Proyek ini dilisensikan di bawah MIT License. Silakan gunakan dan modifikasi sesuai kebutuhan.

---

**Selamat belajar algoritma pencarian jalur! 🚀**
