module.exports = {
  content: [
    "./src/**/*.{html,jsx,tsx,ts,js,mdx}",
    "../lib/src/**/*.{html,jsx,tsx,ts,js,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
