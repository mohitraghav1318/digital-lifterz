import { serviceCategories as fallbackCategories } from "../data/serviceCategories";
import { services as fallbackHomeServices } from "../data/services";

export async function fetchServices() {
  const response = await fetch("/api/services");

  if (!response.ok) {
    throw new Error("Unable to load services.");
  }

  return response.json();
}

export function getFallbackServices() {
  return {
    categories: fallbackCategories,
    homeServices: fallbackHomeServices,
  };
}
