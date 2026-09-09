import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/og";
import { formatOgDate, noteOgPaths, type NoteOgProps } from "../_notes";

export const getStaticPaths = () => noteOgPaths(260);

export const GET: APIRoute = async ({ props }) => {
  const { title, date, description } = props as NoteOgProps;

  const png = await generateOgImage({ title, description, date: formatOgDate(date), variant: "story" });

  return new Response(png, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
};
