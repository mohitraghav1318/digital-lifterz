import { isAuthConfigured, requireAdmin } from "../lib/auth.js";
import { json } from "../lib/http.js";

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405, {
      allow: "GET",
    });
  }

  return json({
    authenticated: requireAdmin(request),
    configured: isAuthConfigured(),
  });
}
