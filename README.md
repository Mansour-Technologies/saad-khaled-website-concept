# Saad Khaled — website concept (unofficial)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> This is an unsolicited proposal. It is not affiliated with, commissioned or endorsed by Saad Khaled, Decathlon Maroc or any brand named on the page. Private repository; not deployed anywhere.

A single-page editorial showcase for **Saad Khaled** (@saad.khaledd), Moroccan running & trail creator and Decathlon Maroc running ambassador. Art direction "Argile & Brume": red-clay trails, morning mist, eucalyptus and Atlantic grey taken from his own footage; contour lines (abstract — not a real route); the page reads as a half-marathon (KM 0 → KM 21,1).

## Stack
- Astro 7 (static output) + TypeScript, vanilla client script (~3 KB), no framework.
- Self-hosted fonts via Fontsource: Big Shoulders Display, Onest, Source Serif 4 (italic), Martian Mono.
- Playwright tests; Lighthouse run locally.

## Run locally
```bash
npm ci
npm run build && npm run preview
# → http://localhost:4417/saad-khaled-website-concept/
npm test            # Playwright (set PW_CHROMIUM=/path/to/chromium if the bundled browser is missing)
npm run og          # re-render public/og.png
npm run shots -- <outDir>   # screenshot set
```
`astro.config.mjs` already targets the intended Pages URL (`site` = https://mansour-technologies.github.io, `base` = /saad-khaled-website-concept), and the preview server serves the build under that base, so links behave exactly as they would once published.

## Sections
1. **Départ** — hero built on the official YouTube Short of 8 Nov 2026 (click-to-play poster), name, his tagline « Discipline en personne. », partnership CTA.
2. **Ses mots** — ticker of his own captions, verbatim and dated.
3. **Parcours** — verified milestones (YouTube channel, races, Master, Decathlon announcement), each with its source link.
4. **Chrono** — five official results from RaceTimer Morocco (net & gun time, rank, bib), each linking to the official result page.
5. **Terrain** — photo rhythm of six official Shorts posters (clay, mist, track, corniche, race day).
6. **Partenaires** — Decathlon Maroc (current, from 23 Jun 2026) with formats published together; other names shown only as unverified Instagram highlight titles; audience observed on 27 Nov 2026.
7. **Communauté & contenus** — his series, four advice Shorts, all official channels.
8. **Arrivée** — partnership enquiry via Instagram DM.

## Content & rights rules
- No photo of Saad is committed to this repository. Images are YouTube-hosted posters (`i.ytimg.com/vi/<id>/oardefault.jpg`) used only as the play button of that same official Short; the video loads from `youtube-nocookie.com` on click. Each has a visible credit and a typographic fallback.
- Instagram content appears only as an official embed, loaded on click.
- No brand logos. No invented quotes, times, sponsors, prices or testimonials. Proposed copy is labelled « Texte proposé ».
- `whatsapp` is `null` in `src/data/site.ts`: a number is listed on his Linktree but is only inserted on his approval.
- `noindex, nofollow` on every page and `robots.txt` `Disallow: /`.

### Assets to replace on approval
| Placement | Current (official embed poster) | Recommended replacement |
|---|---|---|
| Hero | Short `HV8YQGQB4Wc` (8 Nov 2026) | HD original of the arms-raised road shot, vertical + horizontal |
| Parcours | Short `MPU6D9Fhsuk` (31 Oct 2026) | HD misty red-trail sequence |
| Terrain ×6 | Shorts `Sty16pwTovU`, `krPT2DTU0IQ`, `3bmQsvEA8P4`, `aGi6dSg95SU`, `F2o41OI-jOU`, `dqrRnZcPgYU` | Curated HD stills from the same sessions; race PhotoCall images |
| Communauté ×4 | Shorts `o7rSgIGCYwE`, `wyszIuAg7nA`, `7bD7y14gWX8`, `zGaOyBfEMrw` | Keep as Shorts or replace with a short reel |
| Portrait (not used) | — | Campaign portrait supplied by Saad |

## Publishing after approval
1. Get Saad's written approval (content, photos, contact channel).
2. Make the repository public **or** upgrade the org plan, then enable Pages: `gh api -X POST repos/Mansour-Technologies/saad-khaled-website-concept/pages -f build_type=workflow`.
3. Run **Actions → Deploy to GitHub Pages (manual)** (`workflow_dispatch` only).
4. If he wants the site indexed, remove `noindex` and the robots `Disallow` and drop the demo notice.

## Known limitations
- Lighthouse performance is bounded by the hero image, which is served by YouTube (1080×1920 JPEG, no smaller size available).
- Strava activities are not public, so no training data or route is shown.
- Audience numbers are a snapshot (27 Nov 2026).

All rights reserved — Mansour Technologies. Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
