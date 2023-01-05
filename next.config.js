const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "_variable.scss";
    @import "_mixin.scss";`,
  },
};

module.exports = nextConfig;
