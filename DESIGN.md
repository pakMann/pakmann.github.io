# Design — Pakmann CV

Design language for the Pakmann personal homepage, inspired by the Atoms (jamesclear.com) aesthetic: warm editorial minimalism with a serif display voice and a single saturated accent.

## Color

| Token | Value | Role |
|---|---|---|
| `--cream` | `#f1ecdf` | Page background |
| `--surface` | `#ffffff` | Cards, panels, logo plate |
| `--ink` | `#262626` | Primary text, borders, solid buttons |
| `--ink-soft` | `#57534a` | Secondary text (≥4.5:1 on cream) |
| `--muted` | `#797168` | Tertiary labels (large only) |
| `--yellow` | `#ffdc61` | Accent: sequence numbers, hovers, selection |
| `--line` | `rgba(38, 38, 38, 0.14)` | Hairlines, dividers |

Yellow is the only saturated accent. It marks the ordered sequence (works), the selection color, and button hover fills. Everything else stays in the cream/charcoal family.

## Typography

- Display serif: **Fraunces** (300/400, italic) — headings. Old-style soft serif standing in for Cooper BT Light. Google Fonts.
- Body sans: **Instrument Sans** (400/500/600) — text, labels, buttons, eyebrows. A neutral modern grotesque standing in for Messina Sans.
- Scale: display clamp to ≤ 6rem; section heads ~2.4–3rem light serif with an italic emphatic word; eyebrow 11px/600/0.14em uppercase (used sparingly — hero + one or two sections only, never everywhere).
- `text-wrap: balance` on headings; `text-wrap: pretty` on prose. Display letter-spacing ≥ -0.03em.

## Layout & Rhythm

- Container ~1120px, generous section space `clamp(80px, 12vh, 160px)`.
- Hero: centered — eyebrow, big light serif headline with italic accent, byline, then the logo plate as the visual focal point, framed by organic blob shapes.
- Works = ordered sequence: large light serif numerals (1., 2., …) + period pill + role + details; stacks as small outlined pills.
- Projects: two-column grid of white surface panels, hairline border, ≤14px radius, no drop shadows.
- Skills: three-column responsive grid, group heading in serif, rows as name + score.
- Contact: bordered white panel, centered, solid black pill CTAs.
- Footer: single quiet row.

## Components

- **Pill button**: full-radius, `--ink` solid, white text; hover fills `--yellow` with `--ink` text. Transition `cubic-bezier(.215,.61,.355,1)` ~.4s.
- **Period pill**: small, yellow background, `--ink` text, for date ranges.
- **Panel/card**: `--surface`, hairline border, radius 12–14px. No shadows.
- **Eyebrow**: uppercase 11px 600 0.14em `--muted`, with a short rule or dot.
- **Blob shapes**: geometric organic circles (SVG path with several cubic segments) in `--ink`/`--yellow` at low opacity behind hero and section edges.

## Motion

- Scroll reveals via GSAP: `opacity 0→1`, `translateY(24px)→0`, `power2.out`, ~0.8s, triggered at `top 90%`.
- List reveals stagger sibling items by ~0.06s.
- Links/buttons: 0.2s color/background transitions.
- `prefers-reduced-motion: reduce` → everything visible immediately, no transforms, no animation.

## Notes

- The logo `public/pakmann.png` is the identity anchor and is always kept.
- The `/cv` page remains a print-focused document and is intentionally separate in feel.
