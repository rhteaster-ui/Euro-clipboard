import { spawnSync } from "node:child_process";
import {
  HOME,
  run,
  loadMemory,
  saveMemory,
  resetContext,
  toast,
  setClipboard,
  askRouter,
  showResultNotification,
  removeNotif,
  NOTIF_PENDING_ID,
  NOTIF_RESULT_ID
} from "./core.mjs";

function runNode(file, args = []) {
  spawnSync("node", [`${HOME}/.neuroclip/src/${file}`, ...args], {
    encoding: "utf8",
    stdio: "inherit"
  });
}

function getDialogInput() {
  const raw = run("termux-dialog", [
    "text",
    "-t", "NeuroClip Menu",
    "-i", "jawab / balas / alasan / lihat / reset / mode form"
  ]);

  try {
    return JSON.parse(raw)?.text || "";
  } catch {
    return raw || "";
  }
}

async function followUp(instruction) {
  const mem = loadMemory();

  const question = mem.pending_text || mem.last_question;
  const answer = mem.last_answer || mem.last_display || "-";
  const reason = mem.last_reason || "-";

  if (!question) {
    toast("Tidak ada teks pending.");
    return;
  }

  const lower = instruction.toLowerCase();
  let mode = mem.active_mode || "default";

  if (lower.includes("alasan") || lower.includes("kenapa") || lower.includes("mengapa")) {
    mode = "alasan";
  } else if (lower.includes("bahas") || lower.includes("pembahasan") || lower.includes("jelaskan")) {
    mode = "bahas";
  } else if (lower.includes("singkat") || lower.includes("pendek")) {
    mode = "singkat";
  } else if (lower.includes("lengkap") || lower.includes("detail") || lower.includes("panjang")) {
    mode = "lengkap";
  } else if (lower.includes("anak sd") || lower.includes("bahasa sd")) {
    mode = "sd";
  }

  const result = await askRouter({
    mode,
    question: `Teks/pertanyaan awal:
${question}

Jawaban sebelumnya:
${answer}

Alasan sebelumnya:
${reason}

Instruksi user:
${instruction}

Tugas:
Jawab instruksi user berdasarkan teks awal. Jangan mengambil konteks lama yang tidak relevan.`
  });

  setClipboard(result.answer);
  showResultNotification(result);
}

async function main() {
  try {
    const arg = process.argv.slice(2).join(" ").trim();
    const input = (arg || getDialogInput()).trim();
    if (!input) return;

    const lower = input.toLowerCase();

    if (["jawab", "answer", "j"].includes(lower)) {
      runNode("answer.mjs");
      return;
    }

    if (["balas", "reply", "b"].includes(lower)) {
      runNode("reply.mjs");
      return;
    }

    if (lower.startsWith("balas ")) {
      await followUp(input.slice(6).trim());
      return;
    }

    if (["alasan", "reason", "a"].includes(lower)) {
      runNode("reason.mjs");
      return;
    }

    if (["lihat", "view", "v"].includes(lower)) {
      runNode("view.mjs");
      return;
    }

    if (["tutup", "close", "x"].includes(lower)) {
      removeNotif(NOTIF_PENDING_ID);
      removeNotif(NOTIF_RESULT_ID);
      toast("NeuroClip ditutup.");
      return;
    }

    if (["reset", "/reset", "clear"].includes(lower)) {
      resetContext({ full: false });
      toast("Memory konteks dibersihkan.");
      return;
    }

    if (["reset full", "/reset full", "full reset"].includes(lower)) {
      resetContext({ full: true });
      toast("Memory full reset.");
      return;
    }

    if (lower.startsWith("mode ")) {
      const mode = lower.slice(5).trim()
        .replace("pilihan ganda", "pilihanganda")
        .replace("pg", "pilihanganda")
        .replace("coding", "code")
        .replace("matematika", "math")
        .replace("detail", "lengkap");

      const mem = loadMemory();
      mem.active_mode = mode || "default";
      saveMemory(mem);

      toast(`Mode aktif: ${mem.active_mode}`);
      return;
    }

    await followUp(input);
  } catch (e) {
    toast(`Menu error: ${e.message}`);
    console.log(e);
  }
}

main();
