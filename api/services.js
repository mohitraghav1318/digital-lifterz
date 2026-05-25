import { json } from "./lib/http.js";
import { getServiceCategories } from "./lib/services-store.js";
import { buildHomeServices } from "./lib/validation.js";

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405, {
      allow: "GET",
    });
  }

  try {
    const categories = await getServiceCategories();

    return json({
      categories,
      homeServices: buildHomeServices(categories),
    });
  } catch (error) {
    return json({ error: error.message || "Unable to load services." }, 500);
  }
}
