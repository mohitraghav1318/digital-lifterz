import { requireAdmin } from "../lib/auth.js";
import { json, readJson } from "../lib/http.js";
import {
  getServiceCategories,
  saveServiceCategories,
} from "../lib/services-store.js";

export default async function handler(request) {
  if (!requireAdmin(request)) {
    return json({ error: "Unauthorized." }, 401);
  }

  try {
    if (request.method === "GET") {
      return json({ categories: await getServiceCategories() });
    }

    if (request.method === "PUT") {
      const body = await readJson(request);
      const categories = await saveServiceCategories(body?.categories);

      return json({ categories });
    }

    return json({ error: "Method not allowed." }, 405, {
      allow: "GET, PUT",
    });
  } catch (error) {
    return json({ error: error.message || "Unable to save services." }, 400);
  }
}
