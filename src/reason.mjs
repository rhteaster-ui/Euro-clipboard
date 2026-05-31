import {
  loadMemory,
  saveMemory,
  setClipboard,
  toast,
  askRouter,
  showResultNotification
} from "./core.mjs";

async function main() {
  try {
    const mem = loadMemory();

    if (mem.last_reason) {
      setClipboard(mem.last_reason);

      showResultNotification({
        mode: mem.last_mode || "alasan",
        provider: mem.last_provider || "memory",
        answer: mem.last_reason,
        display: mem.last_reason
      });

      toast("Alasan masuk clipboard.");
      return;
    }

    const question = mem.pending_text || mem.last_question;
    const answer = mem.last_answer || mem.last_display;

    if (!question || !answer) {
      toast("Alasan belum tersedia.");
      return;
    }

    const result = await askRouter({
      mode: "alasan",
      question: `Pertanyaan awal:
${question}

Jawaban sebelumnya:
${answer}

Tugas:
Jelaskan alasan kenapa jawaban tersebut benar. Jika ini pilihan ganda, jelaskan singkat kenapa opsi lain tidak tepat.`
    });

    const latest = loadMemory();
    latest.last_reason = result.answer;
    latest.last_mode = "alasan";
    latest.last_provider = result.provider;
    saveMemory(latest);

    setClipboard(result.answer);
    showResultNotification({
      ...result,
      display: result.answer
    });
  } catch (e) {
    toast(`Reason error: ${e.message}`);
    console.log(e);
  }
}

main();
