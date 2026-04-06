import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/og";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({ title: "betich", subtitle: "Panithi Makthiengtrong" });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
