import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { notes };
