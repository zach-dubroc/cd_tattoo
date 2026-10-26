const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "cd_tattoo";
const basePath = isGithubActions ? `/${repoName}` : "";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // No server, no API routes: the site is exported as plain static files.
  // Upload the contents of `out/` to any static host (Vercel, Netlify,
  // Cloudflare Pages, GitHub Pages, S3, nginx, ...).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,

  // Expose the base path to the app so raw `public/` assets (plain <img>,
  // CSS backgrounds, favicons) can be prefixed too.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  // Required for GitHub Project Pages at username.github.io/cd_tattoo/
  basePath,
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
};

export default config;
