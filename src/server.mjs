#!/usr/bin/env node
/**
 * 【 Anu Agen Server 】
 * Creator  : rhmt
 * Base     : https://api.lexcode(.)biz.id/
 * Category : AI / Clipboard / Termux / MacroDroid
 * Desc     : Server lokal untuk trigger via HTTP localhost
 * Channel  : https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p
 */

import http from "node:http";
import { DEFAULT_PORT, getClipboard, notify, processInput } from "./core.mjs";

const PORT = Number(process.env.ANU_PORT || DEFAULT_PORT);
const HOST = process.env.ANU_HOST || "127.0.0.1";

function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

async function handleRun(req, res) {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const directText = url.searchParams.get("text");
  const input = directText?.trim() || getClipboard();

  if (!input) {
    notify("Anu Agen", "Clipboard kosong.");
    return sendJson(res, { status: false, error: "Clipboard kosong" }, 400);
  }

  console.log("\n[Input]");
  console.log(input);

  const result = await processInput(input, directText ? "http-text" : "http-clipboard");

  console.log("\n[Jawaban]");
  console.log(result.answer);

  return sendJson(res, result);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${HOST}:${PORT}`);

    if (url.pathname === "/run") return await handleRun(req, res);

    if (url.pathname === "/status" || url.pathname === "/") {
      return sendJson(res, {
        status: true,
        name: "Anu Agen Server",
        usage: `http://${HOST}:${PORT}/run`
      });
    }

    return sendJson(res, { status: false, error: "Not found" }, 404);
  } catch (err) {
    const msg = err?.message || String(err);
    notify("Anu Agen Error", msg);
    return sendJson(res, { status: false, error: msg }, 500);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Anu Agen Server jalan: http://${HOST}:${PORT}`);
});
