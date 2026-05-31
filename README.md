<p align="center">
  <img src="https://raw.githubusercontent.com/vynaa9-create/Agen-clipboard/refs/heads/main/src/output%20(1).png" alt="NeuroClip Preview" width="100%" />
</p>

<h1 align="center">NeuroClip Agent</h1>

<p align="center">
  <b>Android Clipboard AI Agent for Termux</b><br/>
  Copy a question. Save it to clipboard. Get an AI answer from notification.
</p>

<p align="center">
  <a href="https://github.com/vynaa9-create/Agen-clipboard">
    <img src="https://img.shields.io/badge/GitHub-Agen--clipboard-39d353?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Android-Termux:API-39d353?style=for-the-badge&logo=android&logoColor=white" />
  <img src="https://img.shields.io/badge/Automation-MacroDroid-39d353?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Open%20Source-Yes-39d353?style=for-the-badge" />
</p>

---

## ✦ Tentang NeuroClip

**NeuroClip** adalah clipboard AI copilot untuk Android + Termux.

Tools ini dibuat untuk workflow cepat di HP. Cukup salin teks atau pertanyaan dari aplikasi apa pun, lalu NeuroClip akan membaca clipboard, menampilkan notifikasi, memproses teks dengan AI, dan mengembalikan hasil jawaban ke clipboard.

GitHub:

```txt
https://github.com/vynaa9-create/Agen-clipboard
```

Flow utamanya:

```txt
Salin teks / pertanyaan
↓
Clipboard terbaca
↓
Notif NeuroClip muncul
↓
Tap notif = buka menu modular
atau buka panel notif = Jawab / Balas / Tutup
↓
AI memproses teks
↓
Jawaban masuk clipboard + notifikasi
↓
Paste di aplikasi mana pun
```

Project ini dibuat untuk workflow pribadi, belajar, testing automation, dan eksperimen Android + Termux.

---

## ✦ Konsep Kerja

NeuroClip mengubah clipboard Android menjadi AI assistant ringan.

```txt
Copy text
↓
Clipboard detected
↓
AI Agent processing
↓
Answer copied to clipboard
↓
Android notification appears
↓
Paste anywhere
```

Contoh real workflow:

```txt
Teks disalin:
Pengakuan dan perlindungan HAM memiliki arti bahwa ....

Notifikasi muncul:
AI Jawaban • default/chatgpt

Jawaban:
mengakui dan menghormati HAM

Tombol:
ALASAN | BALAS | TUTUP
```

Setelah jawaban muncul, hasil otomatis masuk clipboard dan bisa langsung dipaste.

---

## ✦ Fitur

- Clipboard watcher otomatis.
- Deteksi teks baru yang disalin.
- Confirm mode agar tidak langsung spam endpoint.
- Kirim teks ke AI public endpoint.
- Jawaban otomatis masuk clipboard.
- Jawaban muncul sebagai notifikasi Android.
- Notifikasi modular.
- Tap body notif untuk membuka menu.
- Tombol notifikasi:
  - `Jawab`
  - `Balas`
  - `Tutup`
  - `Lihat`
  - `Alasan`
- Memory lokal untuk menyimpan:
  - mode aktif
  - pending text
  - jawaban terakhir
  - alasan terakhir
  - state watcher
- Provider router + fallback.
- Support beberapa provider AI:
  - ChatGPT endpoint
  - DeepSeek endpoint
  - Claude endpoint
  - Copilot endpoint
  - provider custom dari `config/providers.json`
- Mode jawaban fleksibel.
- Support Termux:API.
- Support Termux:Widget.
- Support MacroDroid.
- Bisa dipakai tanpa root.
- Cocok untuk Android workflow.
- Cocok untuk soal, pertanyaan, rewrite, ringkasan, coding, dan prompt cepat.
- Cocok untuk workflow copy → jawab → paste.

---

## ✦ Mode Jawaban

Mode yang tersedia:

```txt
default
form
pilihanganda
opsi
sd
smp
sma
singkat
sedang
lengkap
detail
formal
santai
code
math
wa
ringkas
rewrite
huruf
```

Contoh fungsi mode:

| Mode | Fungsi |
|---|---|
| `default` | mode umum |
| `form` | cocok untuk pertanyaan form |
| `pilihanganda` | menjawab soal pilihan ganda |
| `opsi` | fokus memilih opsi jawaban |
| `sd` | jawaban bahasa anak SD |
| `smp` | jawaban tingkat SMP |
| `sma` | jawaban tingkat SMA |
| `singkat` | jawaban pendek |
| `sedang` | jawaban sedang |
| `lengkap` | jawaban lebih lengkap |
| `detail` | penjelasan detail |
| `formal` | gaya bahasa formal |
| `santai` | gaya bahasa santai |
| `code` | bantuan coding |
| `math` | matematika / hitungan |
| `wa` | format chat WhatsApp |
| `ringkas` | meringkas teks |
| `rewrite` | menulis ulang teks |
| `huruf` | fokus jawab huruf opsi |

---

## ✦ Install Cepat Copy-Paste

```bash
pkg update -y
pkg install nodejs termux-api git -y
termux-setup-storage

git clone https://github.com/vynaa9-create/Agen-clipboard.git
cd Agen-clipboard

bash scripts/setup-termux.sh
neuro on
```

Setelah itu tinggal salin teks, tap notifikasi NeuroClip, lalu pilih menu.

---

## ✦ Syarat

Install aplikasi berikut di Android:

- Termux
- Termux:API
- Termux:Widget, opsional
- MacroDroid, opsional

Package Termux:

```bash
pkg update -y
pkg install nodejs termux-api git -y
termux-setup-storage
```

Pastikan clipboard jalan:

```bash
termux-clipboard-set "halo"
termux-clipboard-get
```

Pastikan notifikasi jalan:

```bash
termux-notification --title "TEST" --content "Notif hidup"
```

Kalau notifikasi tidak muncul, aktifkan permission notifikasi untuk:

- Termux
- Termux:API

---

## ✦ Install dari GitHub

```bash
git clone https://github.com/vynaa9-create/Agen-clipboard.git
cd Agen-clipboard
bash scripts/setup-termux.sh
```

Cek status:

```bash
neuro status
```

Aktifkan watcher:

```bash
neuro on
```

---

## ✦ Cara Pakai Cepat

Aktifkan watcher:

```bash
neuro on
```

Lalu salin teks apa pun, misalnya:

```txt
We use my eyes for ...
A. see
B. eat
C. kick
D. listen
```

Akan muncul notifikasi NeuroClip.

Aksi yang tersedia:

```txt
Tap notif        → buka menu
Jawab            → proses AI
Balas            → kasih instruksi tambahan
Tutup            → abaikan
```

Setelah AI menjawab:

```txt
Jawaban masuk clipboard
↓
Paste di tempat yang dibutuhkan
```

Matikan watcher:

```bash
neuro off
```

---

## ✦ Command Utama

```bash
neuro on
neuro off
neuro status
neuro log
neuro reset
neuro reset full
neuro mode
neuro mode form
neuro mode default
neuro run "siapa presiden ke 2 indonesia"
neuro clip
```

Keterangan:

| Command | Fungsi |
|---|---|
| `neuro on` | aktifkan clipboard watcher |
| `neuro off` | matikan watcher dan bersihkan notifikasi |
| `neuro status` | cek status tools |
| `neuro log` | lihat log watcher |
| `neuro reset` | hapus konteks lama |
| `neuro reset full` | hapus semua memory termasuk mode |
| `neuro mode` | cek mode aktif |
| `neuro mode form` | set mode aktif ke form |
| `neuro mode default` | balik ke mode default |
| `neuro run "teks"` | jawab teks langsung |
| `neuro clip` | jawab isi clipboard sekali |

---

## ✦ Contoh Command

Jawab teks langsung:

```bash
neuro run "siapa presiden ke 2 indonesia"
```

Jawab isi clipboard:

```bash
neuro clip
```

Aktifkan watcher:

```bash
neuro on
```

Matikan watcher:

```bash
neuro off
```

Cek status:

```bash
neuro status
```

Lihat log:

```bash
neuro log
```

Reset konteks:

```bash
neuro reset
```

Reset total:

```bash
neuro reset full
```

Set mode:

```bash
neuro mode sd
neuro mode form
neuro mode pilihanganda
neuro mode singkat
neuro mode lengkap
neuro mode code
```

---

## ✦ Mode Memory

Mode aktif disimpan di memory lokal:

```txt
~/.neuroclip/memory.json
```

Jadi cukup set sekali:

```bash
neuro mode form
```

Setelah itu semua teks yang disalin akan diproses sebagai mode form sampai mode diganti lagi.

Contoh:

```bash
neuro mode form
```

Lalu salin teks:

```txt
Pengakuan dan perlindungan HAM memiliki arti bahwa ....
A. setiap manusia punya persamaan kedudukan dalam hukum
B. hukum hanya berlaku untuk pejabat
C. HAM tidak perlu dilindungi
D. warga negara tidak punya hak
```

NeuroClip akan memproses teks tersebut dengan mode form.

Balik ke default:

```bash
neuro mode default
```

---

## ✦ Menu Balas

Saat notif muncul, tap body notif lalu isi salah satu:

```txt
jawab
balas
alasan
lihat
tutup
reset
reset full
mode form
mode sd
mode pilihan ganda
```

Atau pakai instruksi natural:

```txt
apa arti dalam kbbi
kenapa bukan A?
jelaskan lebih singkat
buat bahasa anak SD
ada pembahasan lain
ubah ke bahasa Inggris
buat versi WhatsApp
jawab ringkas saja
jelaskan alasannya
ubah ke bahasa formal
```

---

## ✦ Provider AI

Endpoint dikonfigurasi di:

```txt
config/providers.json
```

Default provider bisa diarahkan sesuai kebutuhan.

Contoh struktur provider:

```json
{
  "providers": [
    {
      "name": "chatgpt",
      "type": "get-query",
      "url": "https://example.com/api/chatgpt",
      "param": "text",
      "enabled": true
    }
  ]
}
```

Tambah provider lain:

```json
{
  "name": "provider-2",
  "type": "post-json",
  "url": "https://example.com/api/ai",
  "enabled": true
}
```

Tipe provider yang didukung:

| Type | Fungsi |
|---|---|
| `get-query` | prompt dikirim lewat query param |
| `post-json` | prompt dikirim lewat JSON body |

---

## ✦ Provider Router + Fallback

Default router:

| Provider | Cocok Untuk |
|---|---|
| `chatgpt` | default, form, pilihan ganda, fakta umum |
| `deepseek` | coding, matematika, logika |
| `claude` | bahasa natural, SD/SMP/SMA, formal |
| `copilot` | rewrite, ringkas, WhatsApp |

Contoh fallback:

```txt
form     → chatgpt → deepseek → claude
code     → deepseek → chatgpt → copilot
sd       → claude → chatgpt
ringkas  → copilot → claude → chatgpt
```

Kalau provider pertama gagal, NeuroClip otomatis mencoba provider berikutnya.

---

## ✦ Termux:Widget

Buat shortcut widget:

```bash
bash scripts/setup-widget.sh
```

Di home screen Android:

```txt
Tahan layar kosong
↓
Widget
↓
Termux:Widget
↓
Pilih shortcut NeuroClip
```

Shortcut yang biasa dipakai:

```txt
neuro-on
neuro-off
neuro-status
neuro-clip
neuro-mode-default
neuro-mode-form
neuro-mode-sd
neuro-mode-code
```

Flow widget:

```txt
Salin pertanyaan
↓
Tap widget neuro-clip
↓
Jawaban masuk clipboard + notif
↓
Paste
```

Flow watcher:

```txt
Tap widget neuro-on
↓
Salin teks
↓
Notif NeuroClip muncul
↓
Pilih Jawab / Balas / Tutup
```

---

## ✦ MacroDroid

NeuroClip bisa digabungkan dengan MacroDroid untuk automation tambahan.

Contoh flow:

```txt
Trigger MacroDroid
↓
Kirim command ke Termux
↓
NeuroClip membaca clipboard
↓
AI menjawab
↓
Hasil masuk clipboard + notifikasi
```

MacroDroid bersifat opsional, tapi cocok untuk:

- shortcut custom
- tombol floating
- gesture
- trigger otomatis
- integrasi workflow Android

---

## ✦ Server Lokal untuk MacroDroid

Jika project menyediakan server lokal, jalankan:

```bash
neuro server
```

Atau jika memakai command service dari setup:

```bash
neuro on
```

Contoh request dari MacroDroid:

```txt
Method: GET
URL: http://127.0.0.1:3030/run
```

Run dari clipboard:

```bash
curl http://127.0.0.1:3030/run
```

Run dengan teks langsung:

```bash
curl "http://127.0.0.1:3030/run?text=apa%20dampak%20deforestasi%3F"
```

Contoh response:

```json
{
  "status": true,
  "mode": "default",
  "provider": "chatgpt",
  "answer": "Dampak deforestasi adalah lingkungan menjadi lebih panas, habitat hewan rusak, dan tanah lebih mudah longsor."
}
```

---

## ✦ File Memory

Memory lokal disimpan di:

```txt
~/.neuroclip/memory.json
```

Memory dipakai untuk menyimpan:

```txt
mode aktif
pending text
jawaban terakhir
alasan terakhir
state watcher
status busy
proteksi loop
```

Kalau context terasa nyangkut, gunakan:

```bash
neuro reset
```

Untuk reset total:

```bash
neuro reset full
```

---

## ✦ Tips Stabil di Oppo / ColorOS / Xiaomi / Vivo

Agar watcher tidak mati sendiri, matikan battery optimization untuk:

- Termux
- Termux:API
- Termux:Widget
- MacroDroid

Aktifkan jika tersedia:

```txt
Allow background activity
Autostart
Izinkan notifikasi
Izinkan tampil di latar belakang
Jangan batasi penggunaan baterai
```

Aktifkan watcher:

```bash
neuro on
```

Cek status:

```bash
neuro status
```

Lihat log:

```bash
neuro log
```

Matikan watcher:

```bash
neuro off
```

---

## ✦ Troubleshooting

### Clipboard tidak terbaca

Test manual:

```bash
termux-clipboard-set "tes"
termux-clipboard-get
```

Kalau error:

- pastikan Termux:API sudah terinstall
- buka Termux:API minimal sekali
- beri izin akses yang diminta
- restart Termux

---

### Notifikasi tidak muncul

Test:

```bash
termux-notification --title "TEST" --content "Notif hidup"
```

Kalau tidak muncul:

- cek izin notifikasi Termux
- cek izin notifikasi Termux:API
- cek battery optimization
- restart Termux
- buka pengaturan aplikasi dan aktifkan semua permission yang dibutuhkan

---

### Tombol notif tidak kelihatan

Di beberapa HP, tombol hanya muncul kalau panel notifikasi ditarik atau di-expand.

Solusi:

```txt
Tarik panel notifikasi
↓
Expand notifikasi NeuroClip
↓
Pilih Jawab / Balas / Tutup
```

Atau:

```txt
Tap body notif
↓
Menu modular terbuka
```

---

### Watcher mati sendiri

Cek status:

```bash
neuro status
```

Lihat log:

```bash
neuro log
```

Solusi umum:

- matikan optimasi baterai
- izinkan Termux jalan di background
- izinkan Termux:API
- aktifkan kembali watcher

```bash
neuro off
neuro on
```

---

### Jawaban masuk lagi ke AI berulang

Matikan watcher dulu:

```bash
neuro off
```

Reset state:

```bash
neuro reset
```

Nyalakan lagi:

```bash
neuro on
```

Kalau masih nyangkut:

```bash
neuro reset full
neuro on
```

---

### Jawaban nyangkut ke konteks lama

Gunakan:

```bash
neuro reset
```

Atau lewat menu notifikasi:

```txt
reset
```

Reset total:

```bash
neuro reset full
```

---

### Mode salah

Cek mode aktif:

```bash
neuro mode
```

Ubah ke default:

```bash
neuro mode default
```

Atau ubah ke mode tertentu:

```bash
neuro mode sd
neuro mode form
neuro mode code
```

---

### Provider error

Lihat log:

```bash
neuro log
```

Edit provider:

```txt
config/providers.json
```

Lalu ulangi setup:

```bash
bash scripts/setup-termux.sh
```

---

## ✦ Struktur Project

```txt
Agen-clipboard/
├── src/
│   ├── core.mjs
│   ├── cli.mjs
│   ├── watch.mjs
│   ├── server.mjs
│   └── mode.mjs
├── scripts/
│   ├── setup-termux.sh
│   └── setup-widget.sh
├── config/
│   └── providers.json
├── package.json
├── README.md
├── LICENSE
└── .gitignore
```

Jika struktur project berbeda, sesuaikan bagian ini dengan isi repo terbaru.

---

## ✦ NPM Scripts

Contoh script yang umum dipakai:

```json
{
  "scripts": {
    "neuro": "node src/cli.mjs",
    "watch": "node src/watch.mjs",
    "server": "node src/server.mjs",
    "mode": "node src/mode.mjs",
    "check": "node --check src/*.mjs"
  }
}
```

Jalankan manual:

```bash
npm run neuro -- run "apa dampak deforestasi?"
npm run watch
npm run server
npm run mode -- sd
npm run check
```

Command utama tetap:

```bash
neuro on
neuro off
neuro status
neuro log
neuro mode
neuro run "teks"
neuro clip
```

---

## ✦ Push ke GitHub

```bash
git init
git add .
git commit -m "Initial NeuroClip Agent"
git branch -M main
git remote add origin https://github.com/username/neuroclip-agent.git
git push -u origin main
```

Kalau pakai repo yang sudah ada:

```bash
git remote add origin https://github.com/vynaa9-create/Agen-clipboard.git
git branch -M main
git push -u origin main
```

---

## ✦ Roadmap

- Screenshot mode.
- OCR mode.
- Gemini Vision / provider multimodal.
- Provider session rotation.
- MacroDroid preset export.
- Widget shortcut lebih lengkap.
- UI overlay kecil.
- Mode school helper yang lebih stabil.
- Mode jawaban super ringkas untuk notifikasi kecil.
- Dokumentasi setup per brand Android.
- Preview GIF workflow.
- Backup/restore memory lokal.

---

## ✦ Catatan

- Semua memory disimpan lokal.
- Public endpoint bisa mati kapan saja.
- Endpoint AI dapat berubah sewaktu-waktu.
- Jangan gunakan untuk spam endpoint.
- Gunakan untuk workflow pribadi, belajar, testing automation, dan eksperimen Android + Termux.
- Project ini tidak membutuhkan root.
- MacroDroid bersifat opsional.
- Termux:Widget bersifat opsional, tapi direkomendasikan untuk shortcut cepat.

---

## ✦ Lisensi

Project ini menggunakan lisensi open-source.

```txt
MIT
```

---

<p align="center">
  <b>NeuroClip Agent</b><br/>
  Local Android automation with clipboard + notification workflow.
</p> 
