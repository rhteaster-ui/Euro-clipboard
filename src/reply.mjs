import {
  run,
  loadMemory,
  saveMemory,
  setClipboard,
  askRouter,
  parseInstruction,
  resetContext,
  showResultNotification,
  toast
} from "./core.mjs";

function pickReplyMode(input, mem) {
  const lower = String(input || "").toLowerCase();

  if (lower.includes("alasan") || lower.includes("kenapa") || lower.includes("mengapa")) {
    return "alasan";
  }

  if (lower.includes("pembahasan") || lower.includes("jelaskan") || lower.includes("bahas")) {
    return "bahas";
  }

  if (lower.includes("singkat") || lower.includes("pendek")) {
    return "singkat";
  }

  if (lower.includes("lengkap") || lower.includes("detail") || lower.includes("panjang")) {
    return "lengkap";
  }

  if (lower.includes("anak sd") || lower.includes("bahasa sd")) {
    return "sd";
  }

  return mem.active_mode || "default";
}

function getDialogText() {
  const raw = run("termux-dialog", [
    "text",
    "-t", "NeuroClip Reply",
    "-i", "mode form / reset / kenapa bukan A?"
  ]);

  try {
    return JSON.parse(raw)?.text || "";
  } catch {
    return raw || "";
  }
}

async function main() {
  try {
    const input = String(process.argv.slice(2).join(" ").trim() || getDialogText()).trim();
    if (!input) return;

    const parsed = parseInstruction(input);
    let mem = loadMemory();

    if (parsed.type === "reset") {
      resetContext({ full: parsed.full });
      toast(parsed.full ? "Memory full reset." : "Memory konteks dibersihkan.");
      return;
    }

    if (parsed.type === "set_mode") {
      mem.active_mode = parsed.mode || "default";
      saveMemory(mem);
      toast(`Mode aktif: ${mem.active_mode}`);
      return;
    }

    if (parsed.type === "mode_or_run") {
      if (parsed.rest) {
        const result = await askRouter({
          mode: parsed.mode,
          question: parsed.rest
        });

        setClipboard(result.answer);
        showResultNotification(result);
        return;
      }

      mem.active_mode = parsed.mode || "default";
      saveMemory(mem);
      toast(`Mode aktif: ${mem.active_mode}`);
      return;
    }

    if (parsed.type === "reason") {
      const question = mem.pending_text || mem.last_question;
      const answer = mem.last_answer || mem.last_display;

      const result = await askRouter({
        mode: "alasan",
        question: `Pertanyaan awal:
${question}

Jawaban sebelumnya:
${answer}

Tugas:
Jelaskan alasan kenapa jawaban tersebut benar.`
      });

      setClipboard(result.answer);
      showResultNotification(result);
      return;
    }

    const question = mem.pending_text || mem.last_question;
    const answer = mem.last_answer || mem.last_display;
    const reason = mem.last_reason || "-";

    if (!question) {
      toast("Tidak ada konteks pertanyaan.");
      return;
    }

    const mode = pickReplyMode(input, mem);

    const result = await askRouter({
      mode,
      question: `Teks/pertanyaan awal:
${question}

Jawaban sebelumnya:
${answer || "-"}

Alasan sebelumnya:
${reason}

Instruksi lanjutan dari user:
${input}

Tugas:
Jawab instruksi lanjutan user berdasarkan teks/pertanyaan awal.
Jika instruksi user berupa "apa arti", "maksudnya apa", "dalam KBBI", atau sejenisnya, jelaskan arti dari teks awal yang disalin.
Jangan mengambil konteks lama yang tidak relevan.
Jangan hanya mengulang jawaban sebelumnya kecuali memang diminta jawaban singkat saja.`
    });

    setClipboard(result.answer);
    showResultNotification(result);
  } catch (e) {
    toast(`Reply error: ${e.message}`);
    console.log(e);
  }
}

main();
