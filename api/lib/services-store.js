import { serviceCategories as defaultCategories } from "../../src/data/serviceCategories.js";
import { getValue, setValue } from "./kv.js";
import { normalizeServiceCategories } from "./validation.js";

const SERVICES_KEY = "digital-lifterz:service-categories";

export async function getServiceCategories() {
  const saved = await getValue(SERVICES_KEY);
  const source = saved || defaultCategories;

  return normalizeServiceCategories(source);
}

export async function saveServiceCategories(categories) {
  const normalized = normalizeServiceCategories(categories);
  await setValue(SERVICES_KEY, normalized);

  return normalized;
}
