import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import rss from "@astrojs/rss";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://betich.me",
  integrations: [
    tailwind(),
    react(),
    rss(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
