const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        ahover: { raw: "(hover: hover)" }, //https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-56282
      },
    },
  },
};
