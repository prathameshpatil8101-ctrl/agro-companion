
# AgroVision AI — Full Rebuild Plan

Goal: turn the current half-working prototype into a clean, accurate, startup-level Maharashtra-first agriculture platform.

---

## 1. Fix what's broken

**Language switcher (Hindi / Marathi / English)**
- `src/lib/i18n.ts` is initialized inside a module but never imported by the app entry → React never gets the i18next instance (cause of the `NO_I18NEXT_INSTANCE` console warning you're seeing).
- Fix: import `./lib/i18n` in `src/router.tsx` (runs on both client + SSR) and wrap routes in `I18nextProvider`. Persist choice in `localStorage`. Translate every visible string in nav, home, all 8+ pages, buttons, labels, toasts.

**Weather accuracy**
- Keep Open-Meteo (free, no key, accurate for India). The "inaccuracy" is a geocoding bug — searches like "Pune" sometimes hit wrong country. Fix by restricting geocoding to `country=IN` and adding state/district disambiguation.
- Add "Use my GPS" button (browser geolocation) for one-tap accurate local forecast.
- Show: current temp, humidity, wind, rain probability, 7-day forecast, plus farming advisory ("Good for spraying", "Avoid irrigation — rain expected").

**Disease diagnosis accuracy**
- Switch prompt to ask Gemini for a **confidence score 0-100** and **alternative possibilities**.
- If confidence < 60: show "Low confidence — please upload a clearer close-up of the affected leaf in daylight" with photo tips. Do not guess.
- Validate image is actually a plant leaf (reject selfies, screenshots).
- Remove the unreliable "guess the crop name" — let user select crop from dropdown so AI focuses only on disease.

---

## 2. Bigger, Maharashtra-first datasets

**Crop recommendation (simple method)**
- Cover all **36 Maharashtra districts** with major talukas/cities (Pune, Mumbai, Nagpur, Nashik, Aurangabad, Solapur, Kolhapur, Sangli, Satara, Ahmednagar, Latur, Beed, Jalna, Parbhani, Hingoli, Nanded, Yavatmal, Amravati, Akola, Buldhana, Washim, Wardha, Chandrapur, Gadchiroli, Bhandara, Gondia, Dhule, Jalgaon, Nandurbar, Palghar, Thane, Raigad, Ratnagiri, Sindhudurg, Osmanai/Dharashiv, Mumbai Suburban).
- Each district mapped to soil types actually found there (black/regur, red, lateritic, alluvial, coastal saline, etc.).
- Recommendation matrix: **soil × season × water** → returns different ranked crops with reasoning (not the same 3 crops everywhere).
- Other states: top 8 (Punjab, UP, MP, Karnataka, TN, Gujarat, Rajasthan, AP) with main cities only.

**Advanced (NPK) method**
- Keep the 2,200-row CSV matcher.
- Add suitability score (0-100) and explain which parameters are off.

**Disease database**
- Expand to **60+ diseases** covering top Maharashtra crops: cotton (bollworm, wilt, leaf curl), sugarcane (red rot, smut), soybean (yellow mosaic, rust), tur/arhar (wilt, pod borer), onion (purple blotch, thrips), grapes (downy mildew, anthracnose), pomegranate (bacterial blight), banana (panama wilt, sigatoka), tomato, brinjal, chilli, jowar, bajra, wheat, gram, groundnut.
- Each entry: symptoms, cause, chemical treatment, organic treatment, prevention, severity.

**Market prices (Maharashtra mandis)**
- **Curated table** of weekly prices for top 30 Maharashtra APMC mandis × 25 commodities (updated baseline you can edit).
- **Live overlay**: when you add the free **data.gov.in AGMARKNET API key**, server fn fetches latest daily prices and merges them. Until then, curated values show with a "weekly avg" badge.

---

## 3. New startup-level features

1. **Fertilizer Calculator** — input: crop + area (acres/hectares) + current soil N-P-K (optional) → output: exact kg of Urea / DAP / MOP / Zinc, application schedule (basal, top-dressing), cost estimate.
2. **Crop Calendar + Reminders** — pick crop + sowing date → week-by-week task timeline (land prep → sowing → fertilizer → irrigation → pest watch → harvest). Saved to your account; optional email reminders.
3. **Government Schemes Finder** — checklist form (landholding, category, crop) → matching schemes (PM-Kisan, PMFBY, Soil Health Card, KCC, PM-KUSUM, Maha-DBT schemes) with eligibility + apply links.

---

## 4. Login & profiles (Lovable Cloud Auth)

- **Email/password + Google sign-in** (Google via Lovable broker).
- New `profiles` table linked to `auth.users`: name, mobile, state, district, village, primary crops, total land (acres), preferred language.
- Auto-create profile on signup via trigger.
- New `farm_plots` table: user can save multiple plots (name, area, soil, current crop, sowing date). Powers personalized recommendations and crop calendar reminders.
- New `saved_diagnoses` table: history of past disease scans.
- All public-facing features (recommendations, weather, prices, organic guide) remain usable **without login**. Login unlocks: saved plots, calendar reminders, scan history, personalized dashboard.

---

## 5. Deeper organic farming module

- **Crop-by-crop organic packages** for 20 top Maharashtra crops (cotton, sugarcane, soybean, tur, gram, onion, tomato, grapes, pomegranate, banana, mango, turmeric, ginger, jowar, bajra, wheat, groundnut, sunflower, chilli, brinjal). Each: input prep, jeevamrut + beejamrut recipes, organic pest sprays, harvest practices.
- **3-year conversion calendar** — month-by-month roadmap from chemical to certified organic.
- **PGS-India certification roadmap** — step-by-step, costs, MH application offices.
- **Organic input suppliers directory** — vermicompost / bio-fertilizer / neem product sellers across MH.
- **Premium organic mandi list** — where to sell organic produce for 30-50% extra (FPOs, organic mandis, online buyers).
- **ROI comparison** — organic vs conventional per crop.
- **AI advisor tab** — ask any organic question, get Maharashtra-context answer.

---

## 6. Brand & UI/UX redesign

- **Custom AgroVision AI logo** — generated AI image (modern leaf + AI circuit mark, agri-green palette).
- **Unique icon for each feature** — 10 custom illustrations (crop, disease, market, weather, chat, organic, fertilizer, calendar, schemes, feedback).
- **Design system** — agri-green + warm earth accents, modern font pair, generous spacing, rounded 2xl cards, subtle motion, mobile-first.
- **New home page** — hero with logo + tagline + 2 CTAs, feature grid with icons, trust strip (data sources: Open-Meteo, data.gov.in, ICAR), testimonial slot, footer.
- **Consistent layout** — sticky navbar with language switcher + login state, page headers, breadcrumbs, mobile drawer nav.

---

## 7. Technical details

- **Stack** — TanStack Start (existing), Tailwind v4 design tokens in `src/styles.css`, Lovable Cloud Postgres, Lovable AI Gateway (Gemini), Open-Meteo, optional data.gov.in AGMARKNET.
- **i18n fix** — import `./lib/i18n` in `src/router.tsx`; wrap router in `I18nextProvider`. Translate ~250 keys × 3 languages.
- **Auth** — `supabase--configure_social_auth` with `["google"]`; default beforeLoad gate via `_authenticated` layout for protected pages (dashboard, calendar reminders, saved plots).
- **DB migrations** — `profiles`, `farm_plots`, `saved_diagnoses`, plus trigger `handle_new_user` to populate profile on signup.
- **Server functions** — extend `agro.functions.ts`: `fertilizerCalc`, `getCropCalendar`, `findSchemes`, `getLiveMandiPrices` (uses `DATA_GOV_IN_API_KEY` secret if set, falls back to curated).
- **Secret to request later** — `DATA_GOV_IN_API_KEY` (only when you have it; app works without it).
- **Logo + icons** — generated via `imagegen` into `src/assets/`.

---

## 8. Build order (so each step works before the next)

1. Migrations: profiles + farm_plots + saved_diagnoses + trigger.
2. Auth wiring: Google + email login, `_authenticated` layout, login/signup/reset pages.
3. i18n fix + complete translations for EN/HI/MR.
4. Brand: generate logo + 10 feature icons; new design tokens.
5. New layout, navbar, footer, home page redesign.
6. Expand crop dataset (all MH districts × soil × season).
7. Expand disease dataset; rework diagnosis flow with confidence.
8. Weather: GPS + India-scoped geocoding + farming advisory.
9. Market prices: curated MH dataset + live API hook.
10. Organic farming: full content + AI tab.
11. New features: Fertilizer Calculator, Crop Calendar, Schemes Finder.
12. Authenticated dashboard (saved plots, scan history, reminders).
13. Feedback page polish + footer trust strip.

---

## 9. What I still need from you (only when you say "start building")

- **Nothing required to begin.** I'll build with curated mandi prices first.
- **Optional, for live mandi prices:** sign up free at `data.gov.in` → "API" → register → copy your key. I'll prompt for it via the secrets tool when we reach that step. App works without it.

Reply with **"start building"** to go, or tell me what to add/remove from this plan.
