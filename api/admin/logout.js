import { clearSessionCookie } from "../lib/auth.js";
import { json } from "../lib/http.js";

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, {
      allow: "POST",
    });
  }

  return json(
    { ok: true },
    200,
    {
      "set-cookie": clearSessionCookie(),
    },
  );
}
