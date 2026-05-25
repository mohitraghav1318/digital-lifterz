import crypto from "node:crypto";

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error("Usage: node scripts/hash-admin-password.mjs <8+ character password>");
  process.exit(1);
}

const iterations = 210000;
const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto
  .pbkdf2Sync(password, salt, iterations, 64, "sha512")
  .toString("hex");

console.log(`ADMIN_PASSWORD_HASH=pbkdf2:${iterations}:${salt}:${hash}`);
console.log(`ADMIN_SESSION_SECRET=${crypto.randomBytes(32).toString("hex")}`);
