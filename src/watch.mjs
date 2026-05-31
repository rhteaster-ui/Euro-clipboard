#!/usr/bin/env node
/**
 * 【 Anu Agen Clipboard Watcher 】
 * Creator  : rhmt
 * Base     : https://api.lexcode(.)biz.id/
 * Category : AI / Clipboard / Termux
 * Desc     : Watcher: pantau clipboard, otomatis kirim ke AI, hasil balik clipboard + notif
 * Channel  : https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p
 */

import {
  getClipboard,
  loadState,
  notify,
  processInput,
  saveState,
  shouldIgnoreClipboard,
  sleep
} from "./core.mjs";

const INTERVAL_MS = Number(process.env.ANU_WATCH_INTERVAL || 1600);

async function main() {
  console.log("Anu Watcher aktif. Salin teks untuk diproses AI.");
  notify("Anu Watcher", "Aktif. Salin teks untuk diproses AI.");

  while (true) {
    const state = loadState();

    try {
      const text = getClipboard();

      if (state.busy || shouldIgnoreClipboard(text, state)) {
        await sleep(INTERVAL_MS);
        continue;
      }

      state.busy = true;
      state.lastInput = text;
      saveState(state);

      console.log("\n[Input]");
      console.log(text);
      notify("Anu Agen", "Memproses clipboard...");

      const result = await processInput(text, "watcher");

      console.log("\n[Jawaban]");
      console.log(result.answer);

      const nextState = loadState();
      nextState.busy = false;
      saveState(nextState);

      await sleep(2500);
    } catch (err) {
      const msg = err?.message || String(err);
      console.log("[ERROR]", msg);
      notify("Anu Watcher Error", msg);

      const nextState = loadState();
      nextState.busy = false;
      saveState(nextState);

      await sleep(3000);
    }
  }
}

main();
