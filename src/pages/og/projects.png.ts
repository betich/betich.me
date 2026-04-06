import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/og";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "projects",
    description: "A collection of projects I've built over the years — web apps, tools, and experiments.",
  });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
