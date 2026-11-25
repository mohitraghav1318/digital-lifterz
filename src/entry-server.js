// Server entry used only by the build to prerender pages (see scripts/prerender.mjs).
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App.jsx";

export function render(url) {
  return renderToString(createElement(StaticRouter, { location: url }, createElement(AppRoutes)));
}

export { canonicalUrl, metaFor, pages, SITE_URL } from "./seo.js";
