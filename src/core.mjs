import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const HOME = process.env.HOME || "/data/data/com.termux/files/home";
export const APP_DIR = path.join(HOME, ".neuroclip");
export const CONFIG_FILE = path.join(APP_DIR, "providers.json");
export const MEMORY_FILE = path.join(APP_DIR, "memory.json");
export const LAST_ANSWER_FILE = "/sdcard/termux/neuroclip-last-answer.txt";
export const NOTIF_PENDING_ID = "7781";
export const NOTIF_RESULT_ID = "7782";
export const APP_NAME = "NeuroClip";

export const DEFAULT_PROVIDERS = {
  chatgpt: {
    url: "https://api.pixxxry.eu.cc/ai/chatgpt",
    params: { model: "default" },
    messageParam: "message",
    extract: "result.result"
  },
  copilot: {
    url: "https://api.pixxxry.eu.cc/ai/copilot",
    params: { model: "default" },
    messageParam: "message",
    extract: "result.text"
  },
  deepseek: {
    url: "https://api.pixxxry.eu.cc/ai/deepseek",
    params: { model: "deepseek-chat", provider: "deepseek" },
    messageParam: "message",
    systemParam: "system",
    extract: "result.result"
  },
  claude: {
    url: "https://api.pixxxry.eu.cc/ai/claude",
    params: { session: "default" },
    messageParam: "message",
    extract: "result.answer"
  }
};

export const DEFAULT_ROUTES = {
  default: ["chatgpt", "deepseek", "claude"],
  form: ["chatgpt", "deepseek", "claude"],
  pilihanganda: ["chatgpt", "deepseek", "claude"],
  opsi: ["chatgpt", "deepseek", "claude"],
  singkat: ["chatgpt", "claude"],
  sedang: ["chatgpt", "claude"],
  lengkap: ["chatgpt", "deepseek", "claude"],
  bahas: ["deepseek", "chatgpt", "claude"],
  alasan: ["chatgpt", "deepseek", "claude"],
  sd: ["claude", "chatgpt"],
  smp: ["claude", "chatgpt"],
  sma: ["claude", "chatgpt"],
  formal: ["claude", "chatgpt"],
  code: ["deepseek", "chatgpt", "copilot"],
  math: ["deepseek", "chatgpt", "claude"],
  wa: ["copilot", "claude", "chatgpt"],
  ringkas: ["copilot", "claude", "chatgpt"],
  rewrite: ["copilot", "claude", "chatgpt"]
};

export const MODE_PROMPTS = {
  default: "Jawab singkat, jelas, dan langsung.",
  form: "Mode Google Form. Jawab sesingkat mungkin dan siap ditempel. Jika pilihan ganda, jawab opsi terbaik saja. Jika isian singkat, jawab langsung tanpa penjelasan.",
  pilihanganda: `Mode pilihan ganda. Analisis opsi yang tersedia. Balas dalam JSON valid saja:
{"answer":"huruf opsi","display":"huruf + isi opsi","reason":"alasan singkat"}
Jangan tambah teks lain di luar JSON.`,
  opsi: "Jawab hanya huruf opsi yang benar. Contoh output: B. Jangan beri alasan.",
  singkat: "Jawab sangat singkat. Maksimal 1-2 kalimat. Langsung ke inti.",
  sedang: "Jawab sedang, 2-4 kalimat. Tidak terlalu pendek dan tidak terlalu panjang.",
  lengkap: "Jawab lengkap, runtut, dan mudah dipahami. Berikan contoh jika perlu.",
  bahas: "Berikan jawaban dan pembahasan singkat yang mudah dipahami.",
  alasan: "Berikan alasan dari jawaban sebelumnya. Fokus pada kenapa jawaban itu benar. Jika ini pilihan ganda, boleh jelaskan kenapa opsi lain tidak tepat.",
  sd: "Jawab seperti anak SD. Gunakan bahasa sangat sederhana, kalimat pendek, dan mudah dipahami.",
  smp: "Jawab seperti siswa SMP. Jelas, sederhana, dan mudah dihafal.",
  sma: "Jawab seperti siswa SMA. Lebih lengkap, tapi tetap padat dan rapi.",
  formal: "Jawab dengan bahasa formal, rapi, dan sopan.",
  code: "Mode coding. Fokus pada solusi teknis. Jika relevan, beri kode siap pakai. Jangan terlalu banyak teori.",
  math: "Mode matematika. Tunjukkan langkah hitung dengan jelas dan pastikan hasil akhir benar.",
  wa: "Format jawaban agar enak dibaca di WhatsApp. Gunakan paragraf pendek atau bullet sederhana.",
  ringkas: "Ringkas teks menjadi versi pendek. Ambil inti utama saja.",
  rewrite: "Tulis ulang teks agar lebih rapi, natural, dan enak dibaca."
};

export function ensureDir() {
  fs.mkdirSync(APP_DIR, { recursive: true });
  fs.mkdirSync("/sdcard/termux", { recursive: true });
}

export function run(cmd, args = [], opts = {}) {
  const res = spawnSync(cmd, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...opts
  });

  if (res.error) throw res.error;
  return String(res.stdout || "").trim();
}

export function termux(command, args = []) {
  try {
    return run(command, args);
  } catch {
    return "";
  }
}

export function getClipboard() {
  return termux("termux-clipboard-get").trim();
}

export function setClipboard(text) {
  spawnSync("termux-clipboard-set", [String(text ?? "")], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

export function toast(text) {
  spawnSync("termux-toast", [String(text ?? "")], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

export function wakeLock() {
  termux("termux-wake-lock");
}

export function wakeUnlock() {
  termux("termux-wake-unlock");
}

export function notify({ id, title, content, action = "", buttons = [] }) {
  const args = [
    "--id", String(id),
    "--title", String(title),
    "--content", String(content ?? "").slice(0, 900),
    "--priority", "max"
  ];

  if (action) {
    args.push("--action", action);
  }

  buttons.slice(0, 3).forEach((btn, i) => {
    const n = i + 1;
    args.push(`--button${n}`, String(btn.label));
    args.push(`--button${n}-action`, String(btn.action));
  });

  spawnSync("termux-notification", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

export function removeNotif(id) {
  spawnSync("termux-notification-remove", [String(id)], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

export function defaultMemory() {
  return {
    active_mode: "default",
    active_provider: "auto",
    pending_text: "",
    last_question: "",
    last_answer: "",
    last_display: "",
    last_reason: "",
    last_provider: "",
    last_mode: "",
    last_clip_seen: "",
    updated_at: 0
  };
}

export function loadMemory() {
  ensureDir();

  try {
    return { ...defaultMemory(), ...JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8")) };
  } catch {
    return defaultMemory();
  }
}

export function saveMemory(mem) {
  ensureDir();
  fs.writeFileSync(MEMORY_FILE, JSON.stringify({ ...mem, updated_at: Date.now() }, null, 2));
}

export function loadConfig() {
  ensureDir();

  try {
    const data = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
    return {
      providers: normalizeProviders(data.providers || DEFAULT_PROVIDERS),
      routes: data.routes || DEFAULT_ROUTES
    };
  } catch {
    return {
      providers: DEFAULT_PROVIDERS,
      routes: DEFAULT_ROUTES
    };
  }
}

function normalizeProviders(rawProviders) {
  const out = {};

  for (const [name, p] of Object.entries(rawProviders)) {
    out[name] = {
      url: p.url,
      params: p.params || {},
      messageParam: p.message_param || p.messageParam || "message",
      systemParam: p.system_param || p.systemParam || null,
      extract: p.extract || "",
      method: p.method || "GET"
    };
  }

  return out;
}

export function cleanAnswer(input) {
  let text = String(input ?? "");

  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === "string") text = parsed;
  } catch {}

  return text
    .replace(/\u001c[\s\S]*$/g, "")
    .replace(/\\u001c[\s\S]*$/g, "")
    .replace(/\s*\{['"]character_cooldown['"]:\s*true\}\s*$/g, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

export function getPathValue(obj, dotted) {
  if (!dotted) return undefined;

  return dotted.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

export function extractAnswer(provider, data, conf = {}) {
  const configured = getPathValue(data, conf.extract);
  if (configured != null) return configured;

  if (provider === "chatgpt") return data?.result?.result;
  if (provider === "deepseek") return data?.result?.result;
  if (provider === "claude") return data?.result?.answer;
  if (provider === "copilot") return data?.result?.text;

  return (
    data?.result?.result ||
    data?.result?.answer ||
    data?.result?.text ||
    data?.answer ||
    data?.response ||
    data?.message ||
    data?.text ||
    data?.result ||
    JSON.stringify(data, null, 2)
  );
}

export function isBadAnswer(answer) {
  const text = String(answer || "").trim().toLowerCase();

  if (!text) return true;
  if (text.includes("text is required")) return true;
  if (text.includes("rate limit")) return true;
  if (text.includes("too many requests")) return true;
  if (text.includes("internal server error")) return true;
  if (text.includes("cannot read")) return true;
  if (text.includes("undefined")) return true;

  return false;
}

export function parseJsonObject(text) {
  const raw = String(text || "")
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(raw);
  } catch {}

  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }

  return null;
}

export function normalizeMode(input = "") {
  const raw = String(input).trim().toLowerCase();

  const map = {
    "default": "default",
    "form": "form",
    "google form": "form",
    "pilihan ganda": "pilihanganda",
    "pg": "pilihanganda",
    "pilihanganda": "pilihanganda",
    "opsi": "opsi",
    "jawaban saja": "opsi",
    "huruf saja": "opsi",
    "anak sd": "sd",
    "sd": "sd",
    "smp": "smp",
    "sma": "sma",
    "singkat": "singkat",
    "sedang": "sedang",
    "lengkap": "lengkap",
    "detail": "lengkap",
    "panjang": "lengkap",
    "formal": "formal",
    "code": "code",
    "coding": "code",
    "math": "math",
    "matematika": "math",
    "wa": "wa",
    "whatsapp": "wa",
    "ringkas": "ringkas",
    "rewrite": "rewrite",
    "alasan": "alasan",
    "bahas": "bahas"
  };

  return map[raw] || raw.replace(/[^a-z0-9]/g, "");
}

export function parseInstruction(text) {
  const raw = String(text || "").trim();
  const lower = raw.toLowerCase();

  if (!raw) return { type: "empty" };

  const resetWords = ["/reset", "reset", "clear", "hapus memory", "bersihkan memory"];
  if (resetWords.includes(lower)) return { type: "reset", full: false };

  const resetFullWords = ["/reset full", "reset full", "full reset"];
  if (resetFullWords.includes(lower)) return { type: "reset", full: true };

  if (lower.startsWith("/")) {
    const mode = normalizeMode(lower.slice(1).split(/\s+/)[0]);
    const rest = raw.split(/\s+/).slice(1).join(" ").trim();
    return { type: "mode_or_run", mode, rest };
  }

  if (lower.startsWith("mode ")) {
    const mode = normalizeMode(raw.slice(5).trim());
    return { type: "set_mode", mode };
  }

  if (["alasan", "tampilkan alasan", "kenapa", "mengapa"].includes(lower)) {
    return { type: "reason" };
  }

  return { type: "followup", instruction: raw };
}

export function resetContext({ full = false } = {}) {
  const old = loadMemory();

  if (full) {
    saveMemory(defaultMemory());
    return defaultMemory();
  }

  const mem = {
    ...old,
    pending_text: "",
    last_question: "",
    last_answer: "",
    last_display: "",
    last_reason: "",
    last_provider: "",
    last_mode: "",
    last_clip_seen: ""
  };

  saveMemory(mem);
  return mem;
}

export function shouldIgnoreClipboard(text, mem) {
  const raw = String(text || "").trim();
  if (!raw) return true;
  if (raw.length < 2) return true;
  if (raw === mem.last_answer) return true;
  if (raw === mem.last_display) return true;
  if (raw === mem.last_reason) return true;
  if (raw === mem.last_clip_seen) return true;

  const lower = raw.toLowerCase();
  const ignored = [
    "curl ",
    "node ",
    "npm ",
    "pkg ",
    "cp ",
    "ls ",
    "cat ",
    "tail ",
    "grep ",
    "nano ",
    "nohup ",
    "pkill ",
    "termux-clipboard",
    "http://127.0.0.1"
  ];

  return ignored.some(x => lower.startsWith(x));
}

export function buildPrompt({ mode, question, extraInstruction = "", mem = {} }) {
  const modePrompt = MODE_PROMPTS[mode] || MODE_PROMPTS.default;

  return `Tugasmu adalah menjawab teks clipboard Android secara langsung dan ringkas.

Aturan utama:
- Gunakan bahasa Indonesia natural.
- Langsung jawab inti; jangan membuka dengan perkenalan nama/model/provider.
- Jangan ulang pertanyaan kecuali perlu.
- Jika pilihan ganda, pilih jawaban terbaik.
- Jika mode form/opsi, jawab singkat dan siap ditempel.
- Jika pertanyaan tidak jelas, jawab kemungkinan paling masuk akal.
- Jika teks adalah command terminal atau path file, jangan jalankan apa pun.
- Jangan terlalu panjang kecuali mode lengkap/bahas.
- Ikuti mode aktif dengan ketat.

Mode aktif:
${mode}

Instruksi mode:
${modePrompt}

Instruksi tambahan:
${extraInstruction || "-"}

Konteks terakhir:
Pertanyaan terakhir: ${mem.last_question || "-"}
Jawaban terakhir: ${mem.last_answer || "-"}
Alasan terakhir: ${mem.last_reason || "-"}

Pertanyaan/teks:
${question}`;
}

export async function callProvider(provider, prompt, mode = "default") {
  const { providers } = loadConfig();
  const conf = providers[provider];

  if (!conf) throw new Error(`Provider tidak dikenal: ${provider}`);

  const url = new URL(conf.url);
  url.searchParams.set(conf.messageParam || "message", prompt);

  for (const [k, v] of Object.entries(conf.params || {})) {
    url.searchParams.set(k, v);
  }

  if (conf.systemParam) {
    url.searchParams.set(conf.systemParam, MODE_PROMPTS[mode] || MODE_PROMPTS.default);
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);

  try {
    const res = await fetch(url, { signal: ctrl.signal });
    const raw = await res.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }

    const answer = cleanAnswer(extractAnswer(provider, data, conf));
    if (!res.ok || isBadAnswer(answer)) {
      throw new Error(`Bad answer from ${provider}`);
    }

    return { provider, answer, raw: data };
  } finally {
    clearTimeout(timer);
  }
}

export async function askRouter({ mode, question, extraInstruction = "" }) {
  const mem = loadMemory();
  const { routes } = loadConfig();

  const activeMode = normalizeMode(mode || mem.active_mode || "default") || "default";
  const prompt = buildPrompt({ mode: activeMode, question, extraInstruction, mem });

  const route = mem.active_provider !== "auto"
    ? [mem.active_provider]
    : (routes[activeMode] || DEFAULT_ROUTES[activeMode] || DEFAULT_ROUTES.default);

  let lastError = "";

  for (const provider of route) {
    try {
      const result = await callProvider(provider, prompt, activeMode);
      const json = parseJsonObject(result.answer);

      let answer = result.answer;
      let display = result.answer;
      let reason = "";

      if (json && (json.answer || json.display || json.reason)) {
        answer = json.answer || json.display || result.answer;
        display = json.display || json.answer || result.answer;
        reason = json.reason || "";
      }

      if (activeMode === "form" && json?.display) answer = json.display;
      if (activeMode === "opsi" && json?.answer) answer = json.answer;
      if (activeMode === "pilihanganda" && json?.display) answer = json.display;

      const clean = cleanAnswer(answer);
      const cleanDisplay = cleanAnswer(display);
      const cleanReason = cleanAnswer(reason);

      const newMem = loadMemory();
      newMem.last_question = question;
      newMem.last_answer = clean;
      newMem.last_display = cleanDisplay;
      newMem.last_reason = cleanReason || "";
      newMem.last_provider = result.provider;
      newMem.last_mode = activeMode;
      saveMemory(newMem);

      return {
        status: true,
        mode: activeMode,
        provider: result.provider,
        answer: clean,
        display: cleanDisplay,
        reason: cleanReason
      };
    } catch (e) {
      lastError = e?.message || String(e);
    }
  }

  throw new Error(`Semua provider gagal. Last: ${lastError}`);
}

export function showPendingNotification(text) {
  const mem = loadMemory();

  notify({
    id: NOTIF_PENDING_ID,
    title: `${APP_NAME} • Mode ${mem.active_mode}`,
    content: `Teks disalin:\n${String(text).slice(0, 220)}`,
    action: `${HOME}/.shortcuts/neuro-menu`,
    buttons: [
      { label: "Jawab", action: `${HOME}/.shortcuts/neuro-answer` },
      { label: "Balas", action: `${HOME}/.shortcuts/neuro-reply` },
      { label: "Tutup", action: `${HOME}/.shortcuts/neuro-close` }
    ]
  });
}

export function showResultNotification(result) {
  notify({
    id: NOTIF_RESULT_ID,
    title: `AI Jawaban • ${result.mode}/${result.provider}`,
    content: result.display || result.answer,
    action: `${HOME}/.shortcuts/neuro-menu`,
    buttons: [
      { label: "Lihat", action: `${HOME}/.shortcuts/neuro-view` },
      { label: "Balas", action: `${HOME}/.shortcuts/neuro-reply` },
      { label: "Tutup", action: `${HOME}/.shortcuts/neuro-close` }
    ]
  });
}
