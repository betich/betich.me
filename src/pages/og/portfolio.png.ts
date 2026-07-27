import type { APIRoute } from "astro";
import { generateOgImage } from "@/utils/og";
import { slides } from "@/data/portfolio";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "portfolio",
    description: "Robotics, embedded hardware, software engineering, and design — a selected body of work.",
    date: `${slides.length} slides`,
  });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
