const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{html,jsx,tsx,ts,js,mdx}"],
    theme: {
        extend: {
            zIndex: {
                "nav-bar": "100",
                "overlay": "101",
                "slide-over": "102",
                "modal": "103",
                "dropdown": "104",
                "tooltip": "105"
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
                logo: ["Gugi", ...defaultTheme.fontFamily.sans]
            },
            screens: {
                ahover: { raw: "(hover: hover)" } //https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-56282
            }
        }
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/container-queries"),
        require("@tailwindcss/aspect-ratio"),
        require("@headlessui/tailwindcss")
    ]
};
