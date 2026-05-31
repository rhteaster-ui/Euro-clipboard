# Flow NeuroClip

## Flow utama

```txt
Salin teks
↓
Watcher membaca clipboard
↓
Simpan pending_text ke memory
↓
Tampilkan notif:
[Jawab] [Balas] [Tutup]
```

## Saat tekan Jawab

```txt
Ambil pending_text
↓
Ambil active_mode
↓
Router pilih provider
↓
Fallback kalau gagal
↓
Jawaban masuk clipboard
↓
Notif hasil muncul
```

## Saat tekan Balas

```txt
Buka termux-dialog
↓
User isi instruksi:
- mode form
- kenapa bukan A?
- reset
- apa arti dalam kbbi
↓
Jika mode: update memory
Jika instruksi: kirim ulang pakai konteks
```

## Saat tekan Lihat

Jawaban full dibuka dari file:

```txt
/sdcard/termux/neuroclip-last-answer.txt
```

## Saat reset

```txt
neuro reset
```

Membersihkan konteks lama agar tidak nyangkut ke pertanyaan sebelumnya.
