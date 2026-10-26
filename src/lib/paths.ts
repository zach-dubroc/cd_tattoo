/**
 * Prefix for public assets when the site is hosted under a subpath
 * (GitHub Project Pages). Set by `next.config.mjs`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a path in `public/` so it resolves under the deploy base path. */
export const assetPath = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
};
