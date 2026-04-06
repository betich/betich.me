import { SITE_DESCRIPTION, SITE_TITLE } from "@/config";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const notes = (await getCollection("notes", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context?.site as URL,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      link: `/notes/${note.slug}`,
    })),
    customData: `<language>en-us</language>`,
  });
};
