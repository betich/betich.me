import { SITE_DESCRIPTION, SITE_TITLE } from "@/config";
import rss from "@astrojs/rss";

import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  return rss({
    // `<title>` field in output xml
    title: SITE_TITLE,
    // `<description>` field in output xml
    description: SITE_DESCRIPTION,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context?.site as URL,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: [],
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
};
