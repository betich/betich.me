/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        betich: {
          light: "#DEDEFF",
          dark: "#4845DA",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            a: { color: "#4845DA", textDecorationColor: "#DEDEFF", "&:hover": { color: "#4845DA", textDecorationColor: "#4845DA" } },
            strong: { color: "#4845DA" },
            "h1,h2,h3,h4": { fontFamily: "'Roboto Mono', monospace", fontWeight: "700", color: "#4845DA" },
            code: { fontFamily: "'Roboto Mono', monospace", color: "#4845DA", background: "#DEDEFF", padding: "0.1em 0.3em", borderRadius: "0.25em" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            hr: { borderColor: "#DEDEFF" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
