// Single source of truth for page metadata. Used by the browser (RouteMeta)
// and by scripts/prerender.mjs, which bakes it into each page's static HTML.

export const SITE_URL = "https://digital-lifterz.vercel.app";
export const SITE_NAME = "Digital Lifterz";
export const OG_IMAGE = `${SITE_URL}/logo.png`;

export const pages = {
  "/": {
    title: "Digital Lifterz | Digital Marketing & Social Media Agency",
    description:
      "Digital Lifterz is a digital marketing agency turning reach into revenue — branding, social media content, reels, Google My Business and performance marketing for growing businesses.",
  },
  "/services": {
    title: "Services & Packages | Digital Lifterz",
    description:
      "Social media and branding packages for healthcare, automotive, restaurants, fashion and gyms. Compare Basic Boost, Creative Growth and Creative Pro Max plans from Digital Lifterz.",
  },
  "/about": {
    title: "About Us | Digital Lifterz",
    description:
      "Digital Lifterz helps brands turn online reach into real business growth with brand positioning, social media growth and performance marketing.",
  },
};

export const notFound = {
  title: "Page not found | Digital Lifterz",
  description: "The page you are looking for does not exist.",
  noindex: true,
};

export const adminMeta = {
  title: "Admin | Digital Lifterz",
  description: "",
  noindex: true,
};

export function metaFor(pathname) {
  if (pathname === "/admin") return { ...adminMeta, path: pathname };
  const page = pages[pathname];
  return page ? { ...page, path: pathname } : { ...notFound, path: pathname };
}

export const canonicalUrl = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
