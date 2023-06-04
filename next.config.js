const withVideos = require("next-videos");

module.exports = withVideos({
  reactStrictMode: true,
  test: /\.svg$/,
  use: ["@svgr/webpack"],
  images: {
    domains: ["localhost"],
  },
});
