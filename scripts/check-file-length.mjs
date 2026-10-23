/**
 * @file scripts/check-file-length.mjs
 * @purpose Enforce max 150 lines on all source, script, and style files.
 * @tags script, linter, file-length, verification
 */
import fs from "node:fs";
import path from "node:path";

const MAX_LINES = 150;
const EXEMPT_PATHS = [
  "package-lock.json",
  "firestore.rules",
  "storage.rules",
  "firestore.indexes.json",
  ".next",
  "node_modules",
  "docs",
  ".git"
];

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css"];

function isExempt(relPath) {
  const norm = relPath.replace(/\\/g, "/");
  return EXEMPT_PATHS.some((ex) => norm === ex || norm.startsWith(`${ex}/`));
}

function scanDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, "/");
    if (isExempt(relPath)) continue;

    if (entry.isDirectory()) {
      scanDir(fullPath, results);
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

let failed = false;
const files = scanDir(process.cwd());

for (const { fullPath, relPath } of files) {
  const content = fs.readFileSync(fullPath, "utf-8");
  const lines = content.split(/\r?\n/).length;
  if (lines > MAX_LINES) {
    console.error(`FAILED: ${relPath} exceeds ${MAX_LINES} lines (actual: ${lines})`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log(`PASS: All ${files.length} scanned files are <= ${MAX_LINES} lines.`);
}
