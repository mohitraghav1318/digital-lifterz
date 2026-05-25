import crypto from "node:crypto";
import { deleteValue, incrementWithExpiry } from "./kv.js";
import { getClientIp } from "./http.js";

const COOKIE_NAME = "dl_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const LOGIN_WINDOW_SECONDS = 60 * 15;
const LOGIN_LIMIT = 5;

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function timingSafeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  }

  return secret;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function getCookie(request, name) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const cookie = cookies.find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) return null;

  return decodeURIComponent(cookie.slice(name.length + 1));
}

export function createSessionCookie() {
  const payload = base64Url(
    JSON.stringify({
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    }),
  );
  const signature = sign(payload);

  const secure = process.env.VERCEL === "1" ? "; Secure" : "";

  return `${COOKIE_NAME}=${encodeURIComponent(`${payload}.${signature}`)}; HttpOnly${secure}; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie() {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";

  return `${COOKIE_NAME}=; HttpOnly${secure}; SameSite=Lax; Path=/; Max-Age=0`;
}

export function requireAdmin(request) {
  const token = getCookie(request, COOKIE_NAME);
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature || !timingSafeEqual(sign(payload), signature)) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.role === "admin" && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function assertLoginAllowed(request) {
  const ip = getClientIp(request);
  const key = `digital-lifterz:login:${ip}`;
  const attempts = await incrementWithExpiry(key, LOGIN_WINDOW_SECONDS);

  if (attempts > LOGIN_LIMIT) {
    const error = new Error("Too many attempts. Try again in 15 minutes.");
    error.status = 429;
    throw error;
  }
}

export async function resetLoginAttempts(request) {
  const ip = getClientIp(request);
  await deleteValue(`digital-lifterz:login:${ip}`);
}

export function verifyPassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    return false;
  }

  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  const localPassword = process.env.ADMIN_PASSWORD;

  if (!storedHash && localPassword) {
    return timingSafeEqual(password, localPassword);
  }

  if (!storedHash) {
    throw new Error("ADMIN_PASSWORD_HASH or ADMIN_PASSWORD is not configured.");
  }

  const [scheme, iterations, salt, expectedHash] = storedHash.split(":");
  if (scheme !== "pbkdf2" || !iterations || !salt || !expectedHash) {
    throw new Error("ADMIN_PASSWORD_HASH must use pbkdf2 format.");
  }

  const hash = crypto
    .pbkdf2Sync(password, salt, Number(iterations), 64, "sha512")
    .toString("hex");

  return timingSafeEqual(hash, expectedHash);
}
