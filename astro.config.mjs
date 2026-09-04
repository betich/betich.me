import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://betich.me",
  // The tracker is a private tool, not part of the public site.
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes("/track") }), tailwind(), react()],
});
