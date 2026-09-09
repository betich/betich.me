import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

const fontRegular = fs.readFileSync(
  path.resolve("node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff"),
);
const fontBold = fs.readFileSync(
  path.resolve("node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff"),
);

/** Frame 1 of the spinny sequence, cropped to the head. Opaque white ground, which
 *  disappears into the white canvas once it is knocked back to a few percent. */
const watermark = `data:image/png;base64,${fs.readFileSync(path.resolve("src/assets/spinny-head.png")).toString("base64")}`;
const WATERMARK_RATIO = 158 / 128;

export type OgVariant = "landscape" | "story";

type VariantSpec = {
  width: number;
  height: number;
  accent: number;
  padTop: number;
  padBottom: number;
  padX: number;
  label: number;
  titleLarge: number;
  titleSmall: number;
  description: number;
  descriptionLines: number;
  date: number;
  titleMarginTop: number;
  titleMarginBottom: number;
  descriptionMarginBottom: number;
  /** grow factor of the spacer under the text block; 0 pins the block to the bottom */
  bottomSpace: number;
  /** ghosted spinny head, oversized and cropped by the bottom edge; omitted where there is no room */
  watermark?: { width: number; top: number; left: number; opacity: number };
};

const VARIANTS: Record<OgVariant, VariantSpec> = {
  landscape: {
    width: 1200,
    height: 630,
    accent: 10,
    padTop: 56,
    padBottom: 56,
    padX: 72,
    label: 18,
    titleLarge: 64,
    titleSmall: 48,
    description: 22,
    descriptionLines: 2,
    date: 18,
    titleMarginTop: 24,
    titleMarginBottom: 20,
    descriptionMarginBottom: 24,
    bottomSpace: 0,
  },
  // 1080x1920 with Instagram Stories' reserved zones kept clear: the top 250px
  // sits under the profile row, the bottom 310px under the reply bar.
  story: {
    width: 1080,
    height: 1920,
    accent: 14,
    padTop: 250,
    padBottom: 310,
    padX: 80,
    label: 30,
    titleLarge: 92,
    titleSmall: 68,
    description: 36,
    descriptionLines: 6,
    date: 30,
    titleMarginTop: 40,
    titleMarginBottom: 32,
    descriptionMarginBottom: 40,
    bottomSpace: 0.9,
    watermark: { width: 1250, top: 1040, left: -85, opacity: 0.05 },
  },
};

export async function generateOgImage({
  title,
  description,
  date,
  variant = "landscape",
}: {
  title: string;
  description?: string;
  date?: string;
  variant?: OgVariant;
}) {
  const v = VARIANTS[variant];

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          fontFamily: "Roboto Mono",
        },
        children: [
          // ghosted portrait, painted first so everything else sits over it
          v.watermark
            ? {
                type: "img",
                props: {
                  src: watermark,
                  style: {
                    position: "absolute",
                    top: `${v.watermark.top}px`,
                    left: `${v.watermark.left}px`,
                    width: `${v.watermark.width}px`,
                    height: `${Math.round(v.watermark.width * WATERMARK_RATIO)}px`,
                    opacity: v.watermark.opacity,
                  },
                },
              }
            : null,
          // left accent bar
          {
            type: "div",
            props: {
              style: { width: `${v.accent}px`, height: "100%", backgroundColor: "#4845DA", flexShrink: 0 },
            },
          },
          // content
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                paddingTop: `${v.padTop}px`,
                paddingBottom: `${v.padBottom}px`,
                paddingLeft: `${v.padX}px`,
                paddingRight: `${v.padX}px`,
                flex: 1,
                gap: "0px",
              },
              children: [
                // betich.me top label
                {
                  type: "div",
                  props: {
                    style: { fontSize: v.label, color: "#666" },
                    children: "betich.me",
                  },
                },
                // spacer pushing the text block down from the label
                {
                  type: "div",
                  props: { style: { display: "flex", flexGrow: 1 } },
                },
                // title
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 36 ? v.titleSmall : v.titleLarge,
                      fontWeight: 700,
                      color: "#4845DA",
                      lineHeight: 1.15,
                      marginTop: `${v.titleMarginTop}px`,
                      marginBottom: description ? `${v.titleMarginBottom}px` : "0px",
                    },
                    children: title,
                  },
                },
                // description
                description
                  ? {
                      type: "div",
                      props: {
                        style: {
                          fontSize: v.description,
                          color: "#6b7280",
                          lineHeight: 1.5,
                          marginBottom: `${v.descriptionMarginBottom}px`,
                          display: "-webkit-box",
                          WebkitLineClamp: v.descriptionLines,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        },
                        children: description,
                      },
                    }
                  : null,
                // date footer
                date
                  ? {
                      type: "div",
                      props: {
                        style: { fontSize: v.date, color: "#9ca3af" },
                        children: date,
                      },
                    }
                  : null,
                // spacer lifting the text block off the bottom edge
                v.bottomSpace
                  ? {
                      type: "div",
                      props: { style: { display: "flex", flexGrow: v.bottomSpace } },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: v.width,
      height: v.height,
      fonts: [
        { name: "Roboto Mono", data: fontRegular, weight: 400, style: "normal" },
        { name: "Roboto Mono", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: v.width } });
  return resvg.render().asPng();
}
