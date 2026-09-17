---
name: betich.me
description: A personal site kept like a lab notebook — monospace, paper-white, one electric indigo.
colors:
  electric-indigo: "#4845DA"
  indigo-wash: "#DEDEFF"
  paper: "#FFFFFF"
  ink: "#111827"
  ink-soft: "#1F2937"
  prose-body: "#374151"
  prose-muted: "#4B5563"
  label: "#6B7280"
  metadata: "#9CA3AF"
  hairline-neutral: "#D1D5DB"
  hairline-faint: "#E5E7EB"
  hover-wash: "#F2F2FF"
  scrim: "rgb(17 17 27 / 0.86)"
typography:
  display:
    fontFamily: "Roboto Mono, Sarabun, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  headline:
    fontFamily: "Roboto Mono, Sarabun, monospace"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  title:
    fontFamily: "Roboto Mono, Sarabun, monospace"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "Inter, IBM Plex Thai, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7143
  label:
    fontFamily: "Roboto Mono, Sarabun, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.625
  meta:
    fontFamily: "Roboto Mono, Sarabun, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  hairline: "2px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  card: "24px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "64px"
components:
  nav-link:
    textColor: "{colors.metadata}"
    typography: "{typography.label}"
    padding: "0 8px"
    rounded: "{rounded.none}"
  nav-link-hover:
    textColor: "{colors.label}"
  nav-link-active:
    textColor: "{colors.electric-indigo}"
  text-button:
    textColor: "{colors.metadata}"
    typography: "{typography.label}"
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
  text-button-hover:
    textColor: "{colors.electric-indigo}"
  text-button-active:
    textColor: "{colors.electric-indigo}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.electric-indigo}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip-hover:
    backgroundColor: "{colors.electric-indigo}"
    textColor: "{colors.paper}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.metadata}"
    rounded: "{rounded.pill}"
    height: "32px"
    width: "32px"
  icon-button-hover:
    textColor: "{colors.electric-indigo}"
  card-outlined:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.prose-body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  card-outlined-hover:
    textColor: "{colors.electric-indigo}"
  card-stacked:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.label}"
    rounded: "{rounded.card}"
    padding: "24px"
  menu-item:
    backgroundColor: "transparent"
    textColor: "{colors.prose-body}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "7px 8px"
  menu-item-hover:
    backgroundColor: "{colors.hover-wash}"
    textColor: "{colors.electric-indigo}"
  tooltip:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xs}"
    padding: "3px 8px"
  toast:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
---

# Design System: betich.me

## Overview

**Creative North Star: "The Lab Notebook"**

This is a working notebook kept in public. Everything on the page behaves like an entry in one: monospace is the native handwriting, dates are stamped to the minute in `YYYY.MM.DD HH:MM`, links to related material are filed in brackets — `[live]`, `[writeup]` — and dotted leader lines run from a note's title to its timestamp the way they would across a ruled index page. Nothing is styled to look finished. Things are labeled, dated, and set down.

The page ground is paper white, and there is exactly one color on it. Electric Indigo (`#4845DA`) is the pen you only pick up for what matters: the current page in the nav, the title of the thing you're reading, a link you can follow, the state you just changed. Everything else is written in graphite — a four-step gray ramp that carries body prose, labels, and metadata without ever competing. Indigo Wash (`#DEDEFF`) is the same ink at margin strength, and it draws every rule and border on the site. The result is a page where a single hue does all the pointing, and the rest is legible quiet.

It is deliberately not a SaaS landing page. There is no gradient hero, no glassmorphism, no floating feature grid, no call-to-action button waiting to convert anybody. This is a person's site — a portrait you can spin, a timeline of things they built, notes they wrote down, a deck of selected work — and it asks for reading, not signup. Restraint is the personality, but the surfaces are not inert: cards throw with real momentum and settle on a spring, the portrait breathes until you touch it, menus rise 4px into place. Understated, and tactile everywhere you put your hands.

**Key Characteristics:**
- Monospace-first: Roboto Mono carries all structure; Inter appears only inside running prose.
- One accent on a white ground — indigo signals, gray informs.
- Hairline `#DEDEFF` borders instead of shadows; flat until something lifts off the page.
- Lowercase UI labels; sentence case reserved for prose.
- Left sidebar spine, 82px on a phone and 130px on a desktop, present on every page.
- Small type by default: 14px body, 12px labels, 11px metadata.
- Motion is short (120–350ms) and physical where it's draggable.

## Colors

A single saturated indigo against paper white, with a four-step graphite ramp doing all the non-accent work.

### Primary
- **Electric Indigo** (`#4845DA`): The only accent on the site. It marks the active nav item (set in italic as well), note and project titles, the `h1`/`h2`/`h3`/`h4` inside prose, `strong` text, inline `code`, the timestamp above a note, the accent bar down the left edge of every OG image, the two webring marks, and every hover destination for an interactive element. It is also the `mask-icon` and tile color for the installed site.
- **Indigo Wash** (`#DEDEFF`): The same ink at margin strength. This is the site's default border color — sidebar divider, prev/next cards, portfolio section rail and slide frames, share-row rule, download-menu edge, chip and nav-button outlines, prose `hr`, and the underline under prose links. It is also the background of inline `code`.
- **Hover Wash** (`#F2F2FF`): Reserved for one job — the hovered or focused row inside the download menu, the only place on the site where a surface fills on hover.

### Neutral
- **Paper** (`#FFFFFF`): The universal page ground. There is no tinted surface color; depth comes from borders, not from a second background.
- **Ink** (`#111827`): Body text on the compact mono layout and the social icon row.
- **Ink Soft** (`#1F2937`): Only the two floating dark surfaces — the tooltip and the copy-link toast. Nothing else on the site is dark.
- **Prose Body** (`#374151`): Default running-text color in `prose-gray` and the download-menu option labels.
- **Prose Muted** (`#4B5563`): Supporting paragraphs, like the portfolio intro.
- **Label** (`#6B7280`): Secondary labels, lightbox captions, project-card descriptions, the `enlarge` affordance.
- **Metadata** (`#9CA3AF`): Timestamps, counters, nav at rest, `[live]` / `[writeup]` tags, hint text, figure captions. The most-used gray on the site.
- **Hairline Neutral** (`#D1D5DB`): The dotted leader line between a note title and its date, and the "drag, or use the arrows" hint at its faintest.
- **Hairline Faint** (`#E5E7EB`): Disabled borders only — the empty prev/next slot at the ends of the notes sequence.
- **Scrim** (`rgb(17 17 27 / 0.86)`): The note lightbox backdrop. The portfolio lightbox inverts this deliberately and uses `rgb(255 255 255 / 0.98)` with a backdrop blur, because slides are white artwork that a dark scrim would fight.

### Named Rules

**The One Pen Rule.** Electric Indigo is the only chromatic color on the site. If a new surface needs to distinguish two things, it distinguishes them with weight, size, or position in the gray ramp — not with a second hue. Adding a green "success" or a red "error" breaks the system before it helps it.

**The Indigo-Is-The-Destination Rule.** Interactive elements sit in gray at rest and arrive at `#4845DA` on hover, focus, or active. Indigo is never the resting state of something you can't act on, and gray is never the hover state of something you can.

**The White Ground Rule.** Every surface is `#FFFFFF`. There is no gray card background, no tinted panel, no striped table. The two exceptions are both temporary overlays (tooltip, toast) and both use Ink Soft.

## Typography

**Display Font:** Roboto Mono (with Sarabun, then `monospace`)
**Body Font:** Inter (with IBM Plex Thai, then `sans-serif`)
**Thai coverage:** Sarabun backs the mono stack and IBM Plex Thai backs the sans stack; both are loaded alongside the Latin faces, so Thai text never falls back to a system default mid-sentence.

**Character:** A drafting-table pairing. Roboto Mono is the site's structural voice — mechanical, evenly spaced, and slightly technical, which is exactly right for a page that stamps everything with a time. Inter is the reading voice, and it does nothing but stay out of the way for the length of a paragraph. Because the mono is doing all the labeling, the sans can be completely neutral.

### Hierarchy
- **Display** (700, `1.25rem` / 20px, mono): The title at the top of a note. Set in Electric Indigo, `not-prose` so the prose scale can't touch it.
- **Headline** (700, `1.125rem`–`1.25rem`, mono): Project name on a stacked card.
- **Title** (700, `1rem` / 16px, mono): Page heading — `# betich`, `# projects`, `portfolio`, `# 404`. Page titles are small on purpose; the site does not announce itself.
- **Prose headings** (700, prose-sm scale, mono, Electric Indigo): `h1`–`h4` inside MDX content are overridden to Roboto Mono via the typography plugin, so written notes carry the same structural voice as the chrome.
- **Body** (400, `0.875rem` / 14px, line-height `1.7143`, Inter): All running prose, via `prose prose-sm prose-gray`. Measure is controlled by the content column, not by a `ch` cap.
- **Label** (400, `0.75rem` / 12px, mono): Nav items, timestamps, counters, `share`, view-toggle, chips, figure captions, section links. The workhorse size.
- **Meta** (400, `0.6875rem` / 11px, mono, `0.14em` tracking): The most reduced register — the spinny "drag to turn" hint, the card-stack instruction, the `enlarge` button, the lightbox footnote, the download-menu meta line. Tracking opens up as size drops so 11px mono stays readable.
- **Tabular numerals:** `tabular-nums` on the portfolio page counter and slide numbers, which are zero-padded to two digits (`01`, `02`).

### Named Rules

**The Mono Frame Rule.** Everything structural is Roboto Mono: headings, nav, dates, counters, buttons, chips, captions, labels, tooltips, toasts, OG images. Inter appears in exactly one context — running prose inside a `.prose` container. If you are unsure which font a new element takes, it is mono.

**The Lowercase Rule.** UI labels and page titles are lowercase: `about`, `projects`, `portfolio`, `notes`, `share`, `enlarge`, `previous`, `next`, `nothing here`, `404`. Sentence case begins at the first paragraph of prose and nowhere earlier. Never use `text-transform: uppercase` — tracking, not caps, is how this site adds formality.

**The Italic-Is-Here Rule.** Italic means "you are currently on this" — the active sidebar link and the active view toggle, both in Electric Indigo. Italic is never decorative emphasis in the chrome.

## Layout

**The spine.** Every page is a fixed-width left sidebar plus a fluid content column, at full viewport height. The sidebar is right-aligned text against a `1px #DEDEFF` right border and steps up with the viewport: `82px` wide / `4px` padding / `32px` top on a phone, `112px` / `8px` / `48px` at `sm`, `130px` / `12px` / `64px` at `md`. It never collapses into a hamburger — four links and a résumé link fit at every size, and the site's navigation is therefore always visible.

**The content column.** `min-w-0 flex-1`, padded `20px` → `32px` (`sm`) → `48px` (`md`) horizontally, `32px` → `48px` → `64px` on top, and `64px` at the bottom. Two widths: the default `max-w-4xl` (56rem) for reading, and `wide` (`max-w-[1600px]`) opted into per page for the portfolio deck and the landing page.

**The landing exception.** `/` opts into `wide` so the spinny portrait can span the full column at `68dvh`, then re-centers its prose in a `max-w-4xl` block underneath. This is the only page that splits its own width.

**Breakpoints:** Tailwind defaults — `sm` 640px, `md` 768px, `lg` 1024px. The site uses `sm` and `md` heavily and effectively stops adapting above `md`; the max-width caps do the rest.

**Rhythm.** Tailwind's 4px scale, used sparsely. The recurring intervals are `4px` (tight label stacks), `8px`/`16px` (component internals), `24px` (between related blocks), `40px` (between a note's body and its share row, and between portfolio slides), and `64px` (page bottom). Vertical lists are dense on purpose: notes rows sit at `py-1.5`, project rows at `py-4`.

**Named Rules**

**The Always-Visible Spine Rule.** The sidebar is present on every route at every breakpoint, including 320px. Shrink it, never hide it.

## Elevation & Depth

The site is flat. Depth is drawn, not lit: a `1px` Indigo Wash hairline is the default way one surface is separated from another, and the page ground never changes color. Shadow is reserved for things that have genuinely left the page — a menu floating above the content, a card you can physically drag, an image lifted into a lightbox. Three shadows exist in the entire system, and each belongs to one of those three cases.

### Shadow Vocabulary
- **Menu lift** (`box-shadow: 0 14px 34px -14px rgb(72 69 218 / 0.4)`): The download popover. Note the shadow is tinted with the accent rather than black — a floating surface still belongs to the palette.
- **Card lift** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` — Tailwind `shadow-lg`): The draggable project cards, which need to read as a physical stack.
- **Lightbox lift** (`box-shadow: 0 20px 60px -20px rgb(0 0 0 / 0.6)`): The zoomed image inside the note lightbox, over a dark scrim.

### Named Rules

**The Flat-Until-It-Lifts Rule.** A surface that stays in the document flow gets a `1px #DEDEFF` border and no shadow. A surface that is floating, dragged, or modal may take one of the three shadows above. There is no fourth shadow and no hover-elevation; hover changes color, not height.

## Shapes

The form language is squared-off at the page level and rounded only where something is a discrete object you can grab.

- **Square (0px)** — the structural furniture: sidebar divider, portfolio section rail, share-row rule, prose `hr`, portfolio slide frames, the accent bar on OG images. Rules and frames are lines, not pills.
- **2px** — the portfolio link hotspots and the download-menu thumbnails. Just enough to not read as a raw rectangle.
- **4px** — tooltips, the `enlarge` button, inline `code`.
- **6px** — the toast and the download-menu rows.
- **8px** (`rounded-lg`) — prev/next note cards, the download menu itself, the lightbox image, the compact spinny ornament (`1rem`).
- **24px** (`rounded-3xl`) — the stacked project cards only. The largest radius on the site, and it is the one component that behaves like a physical card.
- **999px** (`rounded-full`) — chips, circular icon buttons, the year badge, the lightbox close button. Pills are for small, repeated, tappable things.

**Borders** are always `1px solid #DEDEFF`, with two documented exceptions: the stacked project card uses `2px` of the same color because it's read at a distance, and disabled prev/next slots drop to `#E5E7EB` to fall out of the accent family entirely.

### Named Rules

**The Rules-Are-Straight Rule.** Anything that divides the page — a border between regions, a horizontal rule, a frame around content — has zero radius. Radius signals "object," and a divider is not an object.

## Components

### Navigation (sidebar)
- **Character:** A right-aligned index tab down the left edge. Present everywhere, never collapsing.
- **Typography:** mono, `12px` at base / `14px` at `sm`, `leading-relaxed`, lowercase, `8px` horizontal padding, `4px`–`6px` gap between items.
- **Default:** `#9CA3AF`. **Hover:** `#6B7280`. **Active:** `#4845DA` *and italic*.
- **External items** (Résumé) sit below a `24px` gap and carry a `12px` `FiExternalLink` glyph. This is the only capitalized nav label, because it is a proper noun with an accent.
- **Border:** `1px solid #DEDEFF` on the right, full height.

### Text buttons
- **Character:** Bare text, no chrome. The site's default control.
- **Style:** mono `12px`, `#9CA3AF`, no background, no border, no radius.
- **Hover / active:** `#4845DA`, `transition: color 0.2s ease`. The active view-toggle also goes italic.
- Used for the timeline/cards toggle, the lightbox `← / → / esc` row, and portfolio section jumps.

### Icon buttons
- **Character:** Quiet glyph targets in the share row and around the card stack.
- **Style:** `16px` (`h-4 w-4`) react-icons glyph in `#9CA3AF`; hover `#4845DA`. The card-stack variants get a `32px` circle with a `1px #DEDEFF` border that also turns indigo on hover.
- Every icon button carries either an `aria-label` or a `data-tip` tooltip.

### Chips
- **Character:** Pill-shaped outline tags for a project card's links.
- **Style:** `1px solid #DEDEFF`, `999px` radius, `4px 10px` padding, mono `11px`, text `#4845DA`, transparent fill, with a leading `12px` icon.
- **Hover:** fills solid `#4845DA` with white text and matching border — the one component that inverts.

### Cards / containers
Two distinct kinds, and they should stay distinct.

- **Outlined card** (prev/next note): `8px` radius, `1px #DEDEFF`, white fill, `16px`/`12px` padding, no shadow. Hover moves the border to `#4845DA` and the text with it. The disabled variant drops to a `#E5E7EB` border at `60%` opacity with `cursor: not-allowed`.
- **Stacked card** (projects, cards view): `24px` radius, `2px #DEDEFF`, white fill, `24px`–`28px` padding, `shadow-lg`. Renders three deep; each card behind steps `-4.5%` scale, `+14px` Y, and `-18%` opacity. Drag rotates the top card at `drag / 22` degrees and releases past `90px`. Settle easing is `cubic-bezier(0.22, 1, 0.36, 1)` over `350ms`; while dragging, transition is `none`.

### Menus (popover)
- **Style:** absolutely positioned `8px` above its trigger, `8px` radius, `1px #DEDEFF`, white, `6px` padding, menu lift shadow, `min(17rem, 100%)` wide.
- **Entry:** `menu-in 0.14s ease-out both` — 4px rise plus fade.
- **Rows:** `6px` radius, `7px 8px` padding; hover/focus-visible fills `#F2F2FF` and moves the label to `#4845DA`. Each row pairs a proportional miniature (a white rectangle with a `2px` indigo left edge, echoing the real OG image) with a mono label and a mono `10px` meta line.
- **Behavior:** `aria-expanded` on the trigger; closes on outside click, on selection, and on `Escape`. The trigger's tooltip is suppressed while the menu is open.

### Tooltips
- **Style:** CSS-only `::after` on `.tooltip`, driven by `data-tip`. Ink Soft fill, white mono `11px`, `3px 8px`, `4px` radius, `6px` above the element, `max-width: min(220px, 100vw - 2rem)`, `pointer-events: none`.
- **Positioning:** centered by default; `data-tip-pos="top-left"` / `"top-right"` pin it to an edge so it can't overflow the viewport.
- **Transition:** `opacity 0.15s ease`.

### Toast
- **Style:** fixed `24px` from the bottom-right, Ink Soft, white mono `12px`, `8px 16px`, `6px` radius, `pointer-events: none`, `aria-live="polite"`.
- **Motion:** slides up `6px` and fades in over `200ms`, holds `2s`, fades out.

### Lightboxes
The site ships two, and the difference is intentional.
- **Note lightbox:** dark scrim `rgb(17 17 27 / 0.86)`, `6vh 5vw` padding, `cursor: zoom-out`, image at `8px` radius with the lightbox-lift shadow and a `0.18s` scale-in from `0.97`. Content images get `cursor: zoom-in` and drop to `92%` opacity on hover.
- **Portfolio lightbox:** near-opaque *white* scrim (`rgb(255 255 255 / 0.98)` + backdrop blur) with a mono chrome bar on top — caption left, `←` / counter / `→` / `esc` right — because slides are white artwork. Tap toggles fit-to-viewport (`min(100%, calc((100vh - 7rem) * 16 / 9))`) and native `1920px` width with scroll. Arrow keys navigate; `Escape` closes; closing scrolls the source slide back into view.

### List rows
- **Notes index:** title (mono `14px`, `#1F2937`) — dotted `#D1D5DB` leader — timestamp (mono `12px`/`14px`, `#9CA3AF`). The leader is hidden below `sm`, where the row stacks. Whole row dims to `60%` opacity on hover.
- **Projects timeline:** year label in mono `12px` with `0.1em` tracking in Electric Indigo, then rows of a `36px` emoji, the project name (hover → indigo), bracketed `[live]` / `[writeup]` tags in mono `12px` gray, and a `12px` description line.
- **Empty state:** lowercase, gray, single line — `nothing yet.`, `nothing here`.

### Spinny viewer (signature component)
The nine-frame draggable portrait that opens the site, and the reason the landing page is `wide`.
- **Stage:** `68dvh` tall, white ground, `cursor: grab` → `grabbing`, `touch-action: none`, `user-select: none`. Focus-visible draws an inset `3px #4845DA` ring rather than an outline.
- **Frames:** all nine stay mounted and stacked, swapped by opacity, so there is no decode hitch mid-spin. Neighbouring frames cross-fade as spin speed approaches `7 frames/sec`.
- **Physics:** drag advances one frame per `42px`. Release coasts with an exponential decay whose time constant scales from `0.22s` to `0.95s` with throw strength, then hands off below `5.5 frames/sec` to a spring (`k=140`, `c=15.4`, `1/240s` substeps) that lands on a whole frame.
- **Idle hint:** until first interaction, the figure breathes (opacity `1 → 0.38`, `2.5%` drift) on a `2.8s` loop while a mono `11px` `0.14em` label counter-pulses between arrows that nudge `±4px`. All of it is disabled under `prefers-reduced-motion: reduce`.
- **Compact variant:** `is-compact` fills its container at `1rem` radius, drops the hint, and scales the frame to `1.62` — a sticker-sized ornament. The frames have no alpha, so it keeps its white ground on any surface.

### OG images (signature component)
Generated at build time with Satori + Resvg, in two variants that share one composition.
- **Composition:** white ground, a full-height Electric Indigo accent bar down the left edge (`10px` landscape, `14px` story), then `betich.me` in mono `#666`, a flexible spacer, the title in mono 700 Electric Indigo, a clamped description in `#6b7280`, and the date in `#9ca3af`.
- **Landscape:** 1200×630, `72px` side padding, title `64px` (`48px` past 36 characters), description clamped to 2 lines.
- **Story:** 1080×1920 with Instagram's reserved zones kept clear — `250px` top, `310px` bottom. Title `92px`/`68px`, description clamped to 6 lines, plus the spinny head ghosted at `5%` opacity and cropped by the bottom edge.

## Do's and Don'ts

### Do:
- **Do** reach for Roboto Mono by default. Inter is only for running prose inside a `.prose` container.
- **Do** write UI labels in lowercase — `about`, `share`, `enlarge`, `previous`, `nothing here`.
- **Do** separate surfaces with a `1px solid #DEDEFF` hairline and keep the ground `#FFFFFF`.
- **Do** make `#4845DA` the hover destination for anything interactive, and leave it at `#9CA3AF` at rest.
- **Do** use italic + Electric Indigo to mean "you are here," on nav and on toggles.
- **Do** stamp dates as `YYYY.MM.DD HH:MM` in mono, and zero-pad sequence numbers (`01`, `02`).
- **Do** open tracking as size drops: `0.14em` at `11px`, normal at `14px`.
- **Do** keep transitions between `120ms` and `350ms`, `ease` or `ease-out`; use `cubic-bezier(0.22, 1, 0.36, 1)` only for the card stack's settle.
- **Do** guard every ambient animation behind `prefers-reduced-motion: reduce`, as the spinny viewer does.
- **Do** give every icon-only control an `aria-label` or a `data-tip` tooltip, and wrap `localStorage` access in `try/catch`.
- **Do** keep the sidebar visible at 320px by shrinking it (`82px`), never by hiding it.

### Don't:
- **Don't** introduce a second hue. No green success, no red error, no category colors — use the gray ramp, weight, or position instead.
- **Don't** add a tinted surface color. There is no `bg-gray-50` card on this site.
- **Don't** add a fourth shadow, or use shadow as a hover state. Hover changes color, not height.
- **Don't** round a divider, rule, or frame. Structural lines have `0px` radius.
- **Don't** use `text-transform: uppercase` anywhere; tracking carries that job.
- **Don't** set body prose above `14px` or labels above `12px` — the small scale is the voice, not an oversight.
- **Don't** build a SaaS-shaped section: no gradient hero, no glassmorphism, no floating feature grid, no filled call-to-action button.
- **Don't** make a solid-filled button. The only component that fills on hover is the chip, and only on hover.
- **Don't** collapse the sidebar into a hamburger menu at any breakpoint.
- **Don't** put a dark scrim behind white artwork — the portfolio lightbox uses a white scrim for exactly this reason.
