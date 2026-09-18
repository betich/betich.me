# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring screeners** checking what Thee (Panithi Makthiengtrong) has built and can do, usually on the way to the résumé or portfolio deck. They skim, often on a phone, and want real work fast.
- **Developer and maker peers** — webring neighbors, people who found a note or a repo — reading how things were built.
- **Thee themself**: the site doubles as a lab notebook, a public record of what they have built and learned since 2019.

## Product Purpose

A personal site for a Robotics and AI student at Chulalongkorn University (Bangkok) who builds for the web. Success is visitors leaving with a clear, personal sense of who they are and how they think and build; opportunities and outreach are a side effect, not the goal.

## Positioning

The site is kept like a lab notebook, not a résumé brochure: every project, note, and portfolio slide is their own work in their own voice, going back to building websites at 15. It's small, personal, and honest about scale.

## Operating Context

- Sections: about (`/`), projects (`/projects`, a scroll-driven card deck with a year timeline), portfolio (`/portfolio`, a slide deck with PDF download), notes (`/notes`, MDX writeups in `src/content/notes`), plus an external résumé at resume.betich.me.
- Projects often link to their code, a live subdomain (e.g. track.betich.me, tools.betich.me), and a writeup note.
- Generated OG images per page (`src/pages/og`), RSS feed (`/feed.xml`).

## Capabilities and Constraints

- Astro 4 + MDX, React islands, Tailwind 3; deployed on Vercel.
- Project roster lives in `src/data/projects.ts`; portfolio slides in `src/data/portfolio.ts`.

## Brand Commitments

- Lowercase, casual, first-person voice ("projects", "notes", ":)"). Keep it.
- Content mixes Thai and English; both scripts must read well.
- Keep webring membership and the public source link.

## Evidence on Hand

- Real projects 2021–2026 in `src/data/projects.ts`, notes in `src/content/notes`, portfolio deck in `src/data/portfolio.ts`.
- Never invent metrics, testimonials, achievements, or claims they haven't written themself.

## Product Principles

1. Show, don't pitch: the work and the writing carry the site; nothing is added as sales copy.
2. Personal over polished-generic: the voice and quirks are the point.
3. Honest record: only real work, real dates, real descriptions.
4. Quick for skimmers, deep for readers: a recruiter gets the gist in seconds, a peer can go down to the code and the writeup.
