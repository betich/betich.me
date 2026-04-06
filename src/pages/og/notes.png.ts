import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/og";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "notes",
    description: "Thoughts and writings by Panithi Makthiengtrong.",
  });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
