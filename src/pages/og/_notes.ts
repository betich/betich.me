import { getCollection } from "astro:content";
import { mdxToText } from "@/utils/sanitize";

export type NoteOgProps = { title: string; date: Date; description: string };

/**
 * Shared getStaticPaths body for the note OG endpoints. `descriptionLength`
 * differs per variant because the story canvas fits a lot more text.
 */
export async function noteOgPaths(descriptionLength: number) {
  const notes = await getCollection("notes", ({ data }) => !data.draft);
  return notes.map((note) => ({
    params: { slug: note.slug },
    props: {
      title: note.data.title,
      date: note.data.date,
      description: mdxToText(note.body, descriptionLength),
    } satisfies NoteOgProps,
  }));
}

export function formatOgDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
