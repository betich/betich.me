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

export async function generateOgImage({ title, subtitle }: { title: string; subtitle?: string }) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          fontFamily: "Roboto Mono",
        },
        children: [
          // left accent bar
          {
            type: "div",
            props: {
              style: { width: "10px", height: "100%", backgroundColor: "#4845DA", flexShrink: 0 },
            },
          },
          // content
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                padding: "64px 72px",
                flex: 1,
              },
              children: [
                // betich.me top label
                {
                  type: "div",
                  props: {
                    style: { fontSize: 20, color: "#666", marginBottom: "auto" },
                    children: "betich.me",
                  },
                },
                // title
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 40 ? 52 : 68,
                      fontWeight: 700,
                      color: "#4845DA",
                      lineHeight: 1.15,
                      marginBottom: subtitle ? "32px" : "0px",
                    },
                    children: title,
                  },
                },
                // subtitle row
                subtitle
                  ? {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                        children: [
                          {
                            type: "div",
                            props: { style: { fontSize: 22, color: "#9ca3af" }, children: subtitle },
                          },
                        ],
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Roboto Mono", data: fontRegular, weight: 400, style: "normal" },
        { name: "Roboto Mono", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return resvg.render().asPng();
}
