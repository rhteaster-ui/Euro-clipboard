#!/usr/bin/env node
/**
 * 【 NeuroClip Server 】
 * Server lokal opsional untuk trigger NeuroClip via HTTP localhost.
 */

import http from "node:http";
import {
  APP_NAME,
  getClipboard,
  setClipboard,
  askRouter,
  showResultNotification,
  toast,
  loadMemory
} from "./core.mjs";

const PORT = Number(process.env.NEUROCLIP_PORT || 8765);
const HOST = process.env.NEUROCLIP_HOST || "127.0.0.1";

function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

async function handleRun(req, res) {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const directText = url.searchParams.get("text");
  const input = directText?.trim() || getClipboard();

  if (!input) {
    toast("Clipboard kosong.");
    return sendJson(res, { status: false, error: "Clipboard kosong" }, 400);
  }

  const mem = loadMemory();
  const result = await askRouter({
    mode: mem.active_mode || "default",
    question: input
  });

  setClipboard(result.answer);
  showResultNotification(result);

  return sendJson(res, result);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${HOST}:${PORT}`);

    if (url.pathname === "/run") return await handleRun(req, res);

    if (url.pathname === "/status" || url.pathname === "/") {
      return sendJson(res, {
        status: true,
        name: `${APP_NAME} Server`,
        usage: `http://${HOST}:${PORT}/run?text=...`
      });
    }

    return sendJson(res, { status: false, error: "Not found" }, 404);
  } catch (err) {
    const msg = err?.message || String(err);
    toast(`${APP_NAME} Server error: ${msg}`);
    return sendJson(res, { status: false, error: msg }, 500);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`${APP_NAME} Server jalan: http://${HOST}:${PORT}`);
});
