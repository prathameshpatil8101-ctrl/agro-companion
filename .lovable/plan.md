
# AgroVision AI — Continuation Plan (Clean Pro UI, No Photos)

Picking up from where the rebuild paused. Backend, migrations, datasets and logo are already in place. This plan covers the **frontend redesign + remaining features**, with a strict rule: **no farmer / field photography anywhere**. Visuals are built from typography, color, geometry, icons, gradients and subtle illustration only.

---

## 1. Design language (photo-free, professional)

- **Aesthetic**: editorial-clean SaaS. Think Linear / Vercel / Stripe, tinted toward agri-green.
- **Palette** (tokens in `src/styles.css`, oklch):
  - `--background` near-white #FAFBF7, `--foreground` deep ink #0F1B14
  - `--primary` agri-green #1F7A4D, `--primary-glow` mint #6FE3A8
  - `--accent` warm ochre #C58A2E for highlights only
  - `--gradient-hero`: subtle green→mint diagonal, ~12% saturation
  - `--shadow-elegant`: soft, green-tinted
- **Typography**: `Inter Tight` (UI) + `Instrument Serif` (display) — distinctive but legible. No Playfair, no Poppins.
- **Surfaces**: large radius (1rem / 1.5rem), 1px borders, generous whitespace, soft inner glows. No glassmorphism overuse.
- **Decor** instead of photos:
  - Animated dot/grid backgrounds
  - Geometric leaf/circuit SVG marks (already have logo)
  - Gradient blobs behind hero
  - Lucide icons + custom-colored icon tiles per feature
- **Motion**: framer-motion. One signature hero animation (text reveal + floating gradient orb), subtle hover lifts on cards. Nothing flashy.

**Delete `src/assets/hero.jpg`** and any photo usage. Replace hero with pure typographic + gradient composition.

---

## 2. Frontend rebuild — pages

All pages share a new `Layout` (sticky translucent navbar, footer with trust strip). Every page gets `PageHeader` with icon tile + gradient band (no images).

1. **Home (`/`)** — typographic hero, animated headline, feature bento grid (asymmetric, 6 cards), "How it works" 3-step strip, stats band, language + login CTAs.
2. **Crop Recommendation** — tabbed: *Simple* (state→district→soil→season) vs *Advanced* (NPK CSV). Results shown as ranked crop cards with suitability bars + reasoning.
3. **Disease Diagnosis** — drag-drop upload, crop dropdown, confidence meter, alternatives list, retry-with-better-photo guidance, organic+chemical treatment tabs.
4. **Market Prices** — Maharashtra mandi selector, commodity filter, table + sparkline, "live / weekly avg" badge.
5. **Weather** — GPS button + India-scoped search, current card, 7-day forecast strip, farming advisory chips.
6. **AI Chat** — clean chat UI, suggested prompts, Marathi/Hindi/English aware.
7. **Organic Farming** — tabbed: Overview / Crop Packages (20 MH crops) / 3-yr Conversion / Certification / Suppliers / Premium Markets / AI Advisor.
8. **Fertilizer Calculator** *(new)* — crop + area + optional NPK → kg breakdown, schedule, cost.
9. **Crop Calendar** *(new)* — sowing date picker → weekly task timeline; save to account.
10. **Schemes Finder** *(new)* — filter form → matching central + Maha-DBT schemes with apply links.
11. **Dashboard** *(new, `_authenticated`)* — saved plots, scan history, upcoming calendar tasks.
12. **Auth** — `/login`, `/signup`, `/reset` — split-screen with gradient panel (no photo), Google + email.
13. **Feedback** — already exists, restyle to match.

---

## 3. Fixes baked in

- **i18n**: import `./lib/i18n` in `src/router.tsx`; wrap routes in `I18nextProvider`; expand `translations.ts` with every visible string × EN/HI/MR; persist to `localStorage`.
- **Weather**: Open-Meteo geocoding restricted to `country=IN`; GPS button; farming advisory.
- **Disease**: confidence 0-100 + alternatives + retry guidance; user picks crop from dropdown.
- **Market prices**: curated MH baseline + optional `DATA_GOV_IN_API_KEY` overlay (will request via secrets tool only when you have it).

---

## 4. Build order

1. New design tokens in `src/styles.css` + Google Fonts (Inter Tight + Instrument Serif) + framer-motion install.
2. Delete `hero.jpg`; refactor `Navbar`, `Footer`, `Layout`, `PageHeader` to photo-free design.
3. Fix `src/router.tsx` i18n wiring; flesh out `translations.ts` for EN/HI/MR.
4. Redesign Home (`src/routes/index.tsx`) — typographic hero + bento.
5. Auth pages + `_authenticated` layout + auth state in navbar.
6. Rebuild each feature page top-to-bottom against the new system.
7. Add Fertilizer Calculator, Crop Calendar, Schemes Finder (routes + server fns + UI).
8. Authenticated Dashboard pulling from `farm_plots`, `saved_diagnoses`, `crop_reminders`.
9. Polish: motion, empty states, loading skeletons, error/not-found boundaries on every route.
10. Final pass: SEO `head()` per route, responsive QA at 360 / 768 / 1280.

---

## 5. What I still need from you

- Nothing to start. Reply **"go"** and I'll execute steps 1–10 in batches.
- Optional: paste your `DATA_GOV_IN_API_KEY` whenever you have it and I'll wire live mandi prices.
