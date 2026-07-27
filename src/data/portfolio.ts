import linkData from "./portfolio-links.json";

export interface Hotspot {
  href: string;
  label: string;
  /** all values are percentages of the slide box */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Slide {
  page: number;
  src: string;
  title: string;
  /** section dividers get a wider gap and anchor the section index */
  divider?: boolean;
  links: Hotspot[];
}

export const PORTFOLIO_PDF = "/portfolio/panithi-makthiengtrong-portfolio.pdf";
export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

const titles: { title: string; divider?: true }[] = [
  { title: "Panithi Makthiengtrong" },
  { title: "About Me" },
  { title: "Links" },
  { title: "My Skills" },
  { title: "Project Showcase", divider: true },
  { title: "Contents" },
  { title: "01 — Robotics and Embedded Hardware", divider: true },
  { title: "IDC RoboCon 2025" },
  { title: "Dog Robot Simulation Control" },
  { title: "Advanced Mobile Robots Class Project" },
  { title: "Perceptive Cognitive Robot Class Project" },
  { title: "LED Strip ArtNet Controller" },
  { title: "Tastebox" },
  { title: "Hardcopy" },
  { title: "Raspberry Pi Pico Stepper Controller PCB" },
  { title: "Raspberry Pi Music Player" },
  { title: "Color Guesser Toy" },
  { title: "02 — Software Engineering", divider: true },
  { title: "Bangkok Open Data Platform" },
  { title: "Junior Webmaster Camp 13" },
  { title: "ISD SGCU" },
  { title: "CU-TU Unity Ball 2024" },
  { title: "Rub Puen Kao Mai" },
  { title: "PED4YOU (Election Simulator)" },
  { title: "Triam Udom Club Registration System" },
  { title: "Triam Udom Online Loy Kratong Website" },
  { title: "03 — Graphic Design and Marketing", divider: true },
  { title: "Engineering Student Committee (ESC Chula)" },
  { title: "ESC Brand Identity" },
  { title: "ESC Figma Design Tokens" },
  { title: "ESC Posters" },
  { title: "Intania Shop" },
  { title: "Thinc. Club" },
  { title: "Miscellaneous Projects", divider: true },
  { title: "7th and 8th Stupid Hackathon in Thailand" },
];

const links = linkData as Record<string, Hotspot[]>;

export const slides: Slide[] = titles.map(({ title, divider }, i) => {
  const page = i + 1;
  return {
    page,
    src: `/portfolio/slides/${String(page).padStart(2, "0")}.webp`,
    title,
    divider,
    links: links[String(page)] ?? [],
  };
});

/** Section index for the jump nav — each divider opens a section. */
export const sections = slides
  .filter((s) => s.divider)
  .map((s) => ({ page: s.page, label: s.title.replace(/^\d+ — /, "") }));
