import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "@/utils/og";
import { mdxToText } from "@/utils/sanitize";

export async function getStaticPaths() {
  const notes = await getCollection("notes", ({ data }) => !data.draft);
  return notes.map((note) => ({
    params: { slug: note.slug },
    props: {
      title: note.data.title,
      date: note.data.date,
      description: mdxToText(note.body, 120),
    },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title, date, description } = props as { title: string; date: Date; description: string };

  const formatted = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  const png = await generateOgImage({ title, description, date: formatted });

  return new Response(png, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
};
