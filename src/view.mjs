import { spawnSync } from "node:child_process";
import { LAST_ANSWER_FILE, toast, writeLastAnswerFile } from "./core.mjs";

writeLastAnswerFile();

spawnSync("termux-open", [LAST_ANSWER_FILE], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
});

toast("Jawaban full dibuka.");
