/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["next/core-web-vitals"],
  settings: {
    next: {
      rootDir: __dirname,
    },
  },
  rules: {
    // Artwork is served as plain files from /public and the site is a static
    // export, so the Image optimizer is not in play.
    "@next/next/no-img-element": "off",
  },
};

module.exports = config;
