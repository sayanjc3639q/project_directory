/**
 * @file src/lib/id/subtopicId.ts
 * @purpose Subtopic 6-character random ID generator with rejection sampling.
 * @tags id, subtopic, crypto, generator
 */

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const CHARS_LEN = CHARS.length; // 62
const MAX_VALID = 256 - (256 % CHARS_LEN); // 248

export function generateSubtopicId(): string {
  let result = "";
  const buf = new Uint8Array(16);

  while (result.length < 6) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < buf.length && result.length < 6; i++) {
      const val = buf[i];
      if (val < MAX_VALID) {
        result += CHARS[val % CHARS_LEN];
      }
    }
  }

  return result;
}

export function isValidSubtopicId(id: string): boolean {
  return /^[0-9A-Za-z]{6}$/.test(id);
}
