# Troubleshooting

## Notifikasi tidak muncul

```bash
termux-notification --title "TEST" --content "Notif hidup"
```

Jika tidak muncul, cek permission notifikasi Termux dan Termux:API.

## Tombol notifikasi tidak tampil

Pada beberapa HP, tombol hanya muncul di panel notifikasi yang di-expand.

Solusi:
- Tap body notifikasi untuk membuka menu.
- Tarik panel notifikasi ke bawah untuk tombol.
- Pakai Termux:Widget sebagai fallback.

## Clipboard tidak terbaca

```bash
termux-clipboard-set "halo"
termux-clipboard-get
```

Jika tidak keluar, cek Termux:API.

## Jawaban nyangkut ke topik lama

```bash
neuro reset
```

Atau menu:

```txt
reset
```

## Matikan watcher

```bash
neuro off
```

## Aktifkan watcher

```bash
neuro on
```

## Lihat log

```bash
neuro log
```
