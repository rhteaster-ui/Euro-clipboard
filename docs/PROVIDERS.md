# Provider dan Routing

Provider default berada di `config/providers.json`.

## Provider

| Provider | Endpoint | Output |
|---|---|---|
| chatgpt | `/ai/chatgpt` | `result.result` |
| copilot | `/ai/copilot` | `result.text` |
| deepseek | `/ai/deepseek` | `result.result` |
| claude | `/ai/claude` | `result.answer` |

## Peran

- `chatgpt`: default, form, pilihan ganda, fakta umum.
- `deepseek`: coding, matematika, logika.
- `claude`: penjelasan natural, SD/SMP/SMA, formal.
- `copilot`: rewrite, ringkas, WhatsApp, parafrase.

## Fallback

Jika provider pertama gagal, NeuroClip mencoba provider berikutnya sesuai route.

Contoh:

```txt
form → chatgpt → deepseek → claude
code → deepseek → chatgpt → copilot
```

## Ganti endpoint

Edit:

```txt
config/providers.json
```

Lalu install ulang:

```bash
bash scripts/setup-termux.sh
```
