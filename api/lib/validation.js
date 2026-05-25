const MAX_CATEGORIES = 24;
const MAX_PACKAGES = 24;
const MAX_FEATURES = 48;

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function makeId(value, fallback) {
  const source = cleanText(value, 80) || fallback;
  return source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function normalizeServiceCategories(value) {
  if (!Array.isArray(value)) {
    throw new Error("Services must be an array of categories.");
  }

  return value.slice(0, MAX_CATEGORIES).map((category, categoryIndex) => {
    const title = cleanText(category?.title, 120);
    const description = cleanText(category?.description, 1200);

    if (!title) {
      throw new Error(`Category ${categoryIndex + 1} needs a title.`);
    }

    const packages = Array.isArray(category?.packages)
      ? category.packages.slice(0, MAX_PACKAGES).map((pkg, packageIndex) => {
          const name = cleanText(pkg?.name, 120);

          if (!name) {
            throw new Error(
              `Package ${packageIndex + 1} in ${title} needs a name.`,
            );
          }

          const features = Array.isArray(pkg?.features)
            ? pkg.features
                .map((feature) => cleanText(feature, 240))
                .filter(Boolean)
                .slice(0, MAX_FEATURES)
            : [];

          return { name, features };
        })
      : [];

    return {
      id: makeId(category?.id || title, `category-${categoryIndex + 1}`),
      title,
      description,
      packages,
    };
  });
}

export function buildHomeServices(categories) {
  const firstCategory = categories[0];
  if (!firstCategory?.packages?.length) return [];

  return firstCategory.packages.slice(0, 3).map((pkg) => ({
    title: pkg.name,
    features: pkg.features.slice(0, 5),
  }));
}
