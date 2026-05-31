import {
  getClipboard,
  loadMemory,
  saveMemory,
  shouldIgnoreClipboard,
  showPendingNotification,
  notify,
  NOTIF_PENDING_ID,
  APP_NAME
} from "./core.mjs";

const INTERVAL_MS = Number(process.env.NEUROCLIP_INTERVAL || 1300);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  notify({
    id: NOTIF_PENDING_ID,
    title: `${APP_NAME} Watcher`,
    content: "Aktif. Salin teks lalu tap notif untuk menu.",
    buttons: []
  });

  console.log(`${APP_NAME} watcher aktif. Salin teks untuk memunculkan menu.`);

  while (true) {
    try {
      const mem = loadMemory();
      const clip = getClipboard();

      if (!shouldIgnoreClipboard(clip, mem)) {
        mem.pending_text = clip;
        mem.last_clip_seen = clip;

        // Reset konteks lama saat clipboard baru masuk.
        // Ini mencegah Balas nyangkut ke soal sebelumnya.
        mem.last_question = "";
        mem.last_answer = "";
        mem.last_display = "";
        mem.last_reason = "";
        mem.last_provider = "";
        mem.last_mode = "";

        saveMemory(mem);
        showPendingNotification(clip);

        console.log("[PENDING]", clip);
      }
    } catch (e) {
      console.log("[WATCH ERROR]", e?.message || String(e));
    }

    await sleep(INTERVAL_MS);
  }
}

main();
