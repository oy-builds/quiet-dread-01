import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 140;

// One-line code review comment: approves the pull request while
// carrying quiet existential dread, in a flat, tired tone.
const COMMENT =
  "Approved. Tests pass. This will still be running, unread, long after everyone who reviewed it has quietly left. Including me.";

function main(): void {
  if (COMMENT.length < 1 || COMMENT.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${COMMENT.length}`,
    );
  }
  if (COMMENT.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, COMMENT, "utf8");

  // Read the file back and verify what landed on disk is exactly the entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== COMMENT) {
    throw new Error("read-back mismatch: /output/entry.txt differs from entry");
  }
  console.log(COMMENT);
}

main();
