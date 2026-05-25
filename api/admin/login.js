import {
  assertLoginAllowed,
  createSessionCookie,
  resetLoginAttempts,
  verifyPassword,
} from "../lib/auth.js";
import { json, readJson } from "../lib/http.js";

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, {
      allow: "POST",
    });
  }

  try {
    await assertLoginAllowed(request);

    const body = await readJson(request);
    const password = body?.password;

    if (typeof password !== "string" || password.length < 8) {
      return json({ error: "Password must be at least 8 characters." }, 400);
    }

    if (!verifyPassword(password)) {
      const localHint =
        process.env.VERCEL !== "1" && process.env.ADMIN_PASSWORD
          ? " Use the exact ADMIN_PASSWORD value from .env."
          : "";

      return json({ error: `Invalid password.${localHint}` }, 401);
    }

    await resetLoginAttempts(request);

    return json(
      { ok: true },
      200,
      {
        "set-cookie": createSessionCookie(),
      },
    );
  } catch (error) {
    return json(
      { error: error.message || "Unable to log in." },
      error.status || 500,
    );
  }
}
