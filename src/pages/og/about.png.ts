import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/og";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "betich",
    description: "Panithi Makthiengtrong — Robotics & AI student at Chulalongkorn University. Building things for the web since 2019.",
  });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
