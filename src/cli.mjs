import fs from "node:fs";
import { spawnSync } from "node:child_process";
import {
  HOME,
  APP_NAME,
  getClipboard,
  setClipboard,
  wakeLock,
  wakeUnlock,
  toast,
  askRouter,
  loadMemory,
  saveMemory,
  resetContext,
  normalizeMode,
  removeNotif,
  NOTIF_PENDING_ID,
  NOTIF_RESULT_ID,
  notify,
  shortcutAction
} from "./core.mjs";

function spawnBg(args, logFile) {
  spawnSync("sh", ["-lc", `nohup node "$HOME/.neuroclip/src/watch-confirm.mjs" > "$HOME/${logFile}" 2>&1 &`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function killWatcher() {
  spawnSync("pkill", ["-f", "watch-confirm.mjs"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function pgrep() {
  const res = spawnSync("pgrep", ["-af", "watch-confirm.mjs"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
  return String(res.stdout || "").trim();
}

function commandExists(name) {
  if (name === "node" && process.execPath) return true;

  const res = spawnSync("sh", ["-lc", `command -v ${name}`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
  return res.status === 0;
}

function isExecutable(file) {
  try {
    fs.accessSync(file, fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function doctor() {
  const checks = [];
  const add = (ok, label, detail = "") => checks.push({ ok, label, detail });

  add(commandExists("node"), "node tersedia");
  add(commandExists("termux-clipboard-get"), "termux-clipboard-get tersedia");
  add(commandExists("termux-notification"), "termux-notification tersedia");

  const shortcuts = [
    "neuro-answer",
    "neuro-reply",
    "neuro-reason",
    "neuro-menu",
    "neuro-view",
    "neuro-close",
    "neuro-reset",
    "neuro-on",
    "neuro-off"
  ];

  for (const name of shortcuts) {
    const file = `${HOME}/.shortcuts/${name}`;
    add(fs.existsSync(file) && isExecutable(file), `shortcut executable: ${name}`, file);
  }

  add(fs.existsSync(`${HOME}/.neuroclip/src/core.mjs`), "core.mjs terinstall", `${HOME}/.neuroclip/src/core.mjs`);
  add(
    fs.existsSync(`${HOME}/.neuroclip/config/providers.json`) || fs.existsSync(`${HOME}/.neuroclip/providers.json`),
    "config provider ada"
  );

  const watcher = pgrep();
  add(true, "watcher status", watcher || "watcher mati");

  for (const check of checks) {
    console.log(`${check.ok ? "✅" : "❌"} ${check.label}${check.detail ? ` — ${check.detail}` : ""}`);
  }

  const failed = checks.filter(check => !check.ok).length;
  console.log(failed ? `\n${failed} check gagal.` : "\nSemua check penting OK.");
}

function testNotif() {
  notify({
    id: NOTIF_PENDING_ID,
    title: `${APP_NAME} • Mode test`,
    content: "Teks disalin:\nIni notifikasi modular test. Tap body untuk membuka menu.",
    action: shortcutAction("neuro-menu"),
    buttons: [
      { label: "Jawab", action: shortcutAction("neuro-answer") },
      { label: "Balas", action: shortcutAction("neuro-reply") },
      { label: "Tutup", action: shortcutAction("neuro-close") }
    ]
  });
  toast("Notifikasi test dikirim.");
  console.log("Notifikasi test dikirim. Tap body untuk menu; expand panel untuk tombol.");
}

function usage() {
  console.log(`${APP_NAME} CLI

Pakai:
  neuro on                 aktifkan clipboard watcher
  neuro off                matikan clipboard watcher
  neuro status             cek status
  neuro doctor             cek instalasi Termux/shortcut
  neuro test-notif         kirim notifikasi modular test
  neuro log                lihat log watcher
  neuro reset              hapus konteks memory
  neuro reset full         hapus semua memory termasuk mode
  neuro mode               lihat mode aktif
  neuro mode form          set mode aktif
  neuro run "teks"         jawab sekali
  neuro clip               jawab isi clipboard sekali

Mode:
  default, form, pilihanganda, opsi, sd, smp, sma, singkat, sedang,
  lengkap, formal, code, math, wa, ringkas, rewrite`);
}

async function runOnce(text) {
  const input = text || getClipboard();
  if (!input) {
    console.log("Input kosong.");
    toast("Input kosong.");
    return;
  }

  const mem = loadMemory();
  const result = await askRouter({
    mode: mem.active_mode || "default",
    question: input
  });

  setClipboard(result.answer);
  console.log(result.answer);
  toast("Jawaban masuk clipboard.");
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);

  switch ((cmd || "").toLowerCase()) {
    case "on":
    case "start":
      killWatcher();
      wakeLock();
      spawnBg([], "neuroclip-watch.log");
      toast("NeuroClip ON");
      console.log("NeuroClip ON");
      break;

    case "off":
    case "stop":
      killWatcher();
      removeNotif(NOTIF_PENDING_ID);
      removeNotif(NOTIF_RESULT_ID);
      wakeUnlock();
      toast("NeuroClip OFF");
      console.log("NeuroClip OFF");
      break;

    case "status": {
      const out = pgrep();
      console.log(out ? `NeuroClip ON\n${out}` : "NeuroClip OFF");
      break;
    }

    case "doctor":
      doctor();
      break;

    case "test-notif":
      testNotif();
      break;

    case "log":
      spawnSync("tail", ["-f", `${HOME}/neuroclip-watch.log`], {
        encoding: "utf8",
        stdio: "inherit"
      });
      break;

    case "reset":
      resetContext({ full: rest.join(" ").trim() === "full" });
      removeNotif(NOTIF_PENDING_ID);
      removeNotif(NOTIF_RESULT_ID);
      toast(rest.join(" ").trim() === "full" ? "Memory full reset." : "Memory konteks dibersihkan.");
      console.log(rest.join(" ").trim() === "full" ? "Memory full reset." : "Memory konteks dibersihkan.");
      break;

    case "mode": {
      const input = rest.join(" ").trim();
      const mem = loadMemory();

      if (!input) {
        console.log(mem.active_mode || "default");
        return;
      }

      mem.active_mode = normalizeMode(input) || "default";
      saveMemory(mem);
      toast(`Mode aktif: ${mem.active_mode}`);
      console.log(`Mode aktif: ${mem.active_mode}`);
      break;
    }

    case "run":
      await runOnce(rest.join(" ").trim());
      break;

    case "clip":
      await runOnce("");
      break;

    case "help":
    case "--help":
    case "-h":
    default:
      usage();
      break;
  }
}

main().catch(e => {
  console.error(e);
  toast(`NeuroClip error: ${e.message}`);
});
