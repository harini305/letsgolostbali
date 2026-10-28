# Phase 2 Implementation Report: Let's Get Lost Bali

**Date:** 2026-10-28 (revised the same day: compact redesign) · **Status:** built and tested locally. Not committed, pushed or deployed.
**Stack:** Next.js 16.4 (App Router, JavaScript), React 19.3, GSAP 3.15 + ScrollTrigger, CSS Modules. No TypeScript, Tailwind, backend or database.

This report is for the business owners and whoever maintains the site. Section 9 lists the decisions needed before launch.

---

## 1. Pages and routes

| Route | Page | Contents |
|---|---|---|
| `/` | Home | Dark collage hero, marquee of offerings, "Find your path" explorer (tabs), draggable photo gallery, testimonial video switcher, founders, online band |
| `/breathwork` | Breathwork training | Three anchored sections: `#in-person` (100-hour instructor training, Ubud), `#online` (online 100-hour training), `#mentorship` (1:1 and group mentorship) |
| `/yoga` | Somatic Yin Yoga Teacher Training | Details, curriculum, who it's for, sample day, teachers, extras |
| `/reiki-and-circles` | Reiki courses and men's circles | `#reiki` (Level I, II, Master/Teacher in Ubud), `#online-reiki`, `#mens-circles`, private sessions |
| `/about` | About | Story, `#values`, `#purpose`, `#philosophy`, `#the-land` (sustainability), `#teachers` (every teacher biography) |
| `/contact` | Contact | Email, phone/WhatsApp, address and map link, social links, discovery-call links |
| `/privacy-policy` | Privacy Policy | Original text, carried over verbatim (see 8.4) |
| any other | 404 page | Links to Home and Contact |

Also generated: `/sitemap.xml`, `/robots.txt`, a favicon (the black tree mark) and a default social-share image (the home hero photo).

**Navigation:** Breathwork ▾ · Yin Yoga · Reiki & Circles ▾ · About · Contact. The four original hover folders became two small dropdowns, each pointing to sections of one page. The fifth item, "Other workshops", was not created: the only other workshop-type content is the men's circles, so the page is named for what it contains.

### Redirects (in `next.config.mjs`)
Permanent (308), because the content now lives at the destination:
`/home` → `/` · `/breathwork-instructor-training-bali-ubud-` and `/teacher-trainings` → `/breathwork` · `/online-trainings` and `/online` → `/breathwork#online` · `/practitioner/mentorship-training` → `/breathwork#mentorship` · `/yin-yoga-teacher-training-bali` → `/yoga` · `/reiki-courses` and `/offerings` → `/reiki-and-circles` · `/mens-circles` → `/reiki-and-circles#mens-circles` · `/about-us` → `/about` · `/philosophy` → `/about#philosophy` · `/sustainability` → `/about#the-land` · `/our-teachers` → `/about#teachers`.

Temporary (307), pending a decision (section 9): `/spain` → `/about` · `/meditations`, `/blog`, `/blog/*`, `/store`, `/store/*`, `/cart` → `/` · `/faqs`, `/terms-and-conditions` → `/contact`.

---

## 2. How the 51 original URLs were consolidated

| Original | Now |
|---|---|
| Home, `/home` | `/` |
| Breathwork instructor training, Online trainings, Mentorship | `/breathwork`, three sections |
| Yin Yoga teacher training | `/yoga` |
| Reiki courses, Men's circles | `/reiki-and-circles` |
| About Us, Philosophy, Sustainability, Our Teachers | `/about`. The founder and teacher biographies appeared on up to five pages; they now live once in `data/teachers.js`. Course pages show a short teacher row that links to the full biographies |
| Contact | `/contact`, which now shows phone, WhatsApp and email (audit B11) |
| Privacy Policy | `/privacy-policy` |
| Blog (10 posts, 11 tag pages) | Not rebuilt (8.1) |
| Store (6 products, 3 categories), Cart | Not rebuilt (8.2) |
| FAQs, Terms & Conditions | Not published: legacy venue-hire content (8.3) |
| Spain, Meditations | Not rebuilt (8.5) |

**Revision (compact redesign):** after review, every page was shortened. Spacing tokens were tightened, long lists were reduced to the essentials, teacher bios were cut to one short paragraph, and text-heavy blocks were replaced with photographs. Page heights at 1440 px went from 4,940 → 4,434 (Home), 6,936 → 4,448 (Breathwork), 5,097 → 3,622 (Yin), 5,137 → 3,899 (Reiki & Circles) and 7,208 → 4,117 (About). Removed in the revision: the separate online "What you'll learn" grid (now one sentence), the mentorship framework list, the stand-alone "Who it's for" band on Yin, the Reiki "who is it for" disclosure, the wave divider graphic, and the long two-column teacher biographies.

Copy was condensed and edited for clarity without adding facts. Where the original repeated itself (for example the breathwork "what you'll learn" list appeared twice, and Reiki curricula three times), it now appears once. Long lists sit in native `<details>` disclosures so mobile pages stay manageable.

---

## 3. Design decisions

- **Theme (approved by the user, "option 1"):** a warm near-black base (`#13110E`) with cream type (`#EFE6D8`) and warm paper sections (`#FBF7F0`, `#F2EBE0`), plus a subtle paper grain. Dark and light sections meet along **torn-paper edges** (seeded SVG masks generated by `scripts/make-textures.mjs`). Key photographs sit on **torn paper frames** (`components/TornFrame.js`, seeded clip-paths, so server and browser render the same shape). Supporting tints are linen, mist sage and stone from the training graphics. The previous cool black/white/grey palette was replaced.
- **Buttons:** pill-shaped, in a muted **brick red `#A8322D`** (white text 6.6:1). The brand's original `#F60606` stays as a token. **The business must approve this colour change** (section 9, item 12).
- **Typography (exactly two families):** **Fraunces** for headings (a warm, soft editorial serif; its italic is used for one emphasised phrase, e.g. "*and silence your mind.*", which comes from the original home page) and **Albert Sans** for body text, navigation, buttons and UI. Both are self-hosted through `next/font`.
- **Logo:** only a white PNG exists, so the header is always near-black. The logo sits in a dark tab that hangs below the header bar at the top of the page and folds into the bar on scroll. It is visible on every page, in the mobile menu and at every width. No logo was redrawn.
- **Layouts:** each page has its own structure. Home has a split hero, a photo strip and a training index whose image follows the hovered row; Breathwork has a programme index, a facts column, a film-and-teachers row and a mentorship band with four options side by side; Yin Yoga has a full-bleed photo hero, a tinted details panel with a three-photo collage and a four-column curriculum; Reiki has three level columns and a dark men's-circle band; About opens with a photo mosaic and ends with compact teacher profiles. Every two-column section uses the same 5/7 (or 6/6) grid, so headings and text line up from section to section. Hairline rules and definition lists replace badges, numbered sections and eyebrow labels.
- **Home page (redesigned for interactivity):**
  - A dark hero with oversized type over a layered four-photo collage. Each photo drifts toward the pointer at its own depth, and the layers separate on scroll.
  - A red marquee ribbon of the offerings, which pauses on hover.
  - A **"Find your path" explorer**: accessible tabs (arrow keys, Home and End) for Breathwork, Yin Yoga, Reiki and Men's circles. Switching wipes in a new photograph and updates the details and links.
  - A **draggable gallery** of 10 photos at staggered heights. It works by mouse drag, touch, trackpad or keyboard, with previous/next buttons and a progress bar.
  - A **testimonial switcher**: one featured film plus a playlist of all four YouTube videos.
  - Overlapping founder portraits that move at different speeds on scroll.
  - A full-bleed "Not in Bali?" band.

  All motion is skipped under reduced motion, and the content is fully visible without JavaScript.
- **Pinned text on inner pages:** on desktop (1024 px and wider), the long sections of Breathwork (in person, mentorship), Yin Yoga (training details, what you'll learn), Reiki & Circles (online Reiki, men's circles) and About (values, philosophy, teachers) use a two-column layout. The heading and intro stay fixed in view (CSS `position: sticky`) while the content beside them scrolls. There is no scroll-jacking, and the layout is a single column on phones.
- **Section links:** in-page and menu links land with the section heading 20–32 px below the header (sections offset their own top padding through `scroll-margin-top`).
- **Photo strips:** a shared component shows 3–4 photographs at one height. On wide screens each photo keeps its natural proportions (nothing is cropped); on phones they form a two-column grid. This adds a lot of imagery for little page height.
- **Typography (exactly two families):**
  - **Aleo** (open-licence slab serif, weights 300/400) for headings. It keeps the light slab-serif character of the original Adelle Ultra Thin, at weights that stay legible.
  - **Albert Sans** (open-licence sans, weights 400/500/600) for body text, navigation, buttons, lists, the footer and all other UI. It is calmer and more readable at text sizes than Poppins.
  - Both are self-hosted at build time through `next/font` (no layout shift, latin and latin-ext subsets). The type scale is a set of `clamp()` tokens in `app/globals.css`, and equivalent elements use the same token on every page.
- **Animation (GSAP + ScrollTrigger), deliberately limited:**
  1. A short rise-in for blocks that start below the fold. Blocks already on screen are never hidden, and hidden blocks stay keyboard-focusable.
  2. A cross-fade of the image beside the Home training index (fine pointer, ≥1024 px only).
  The hero entrance is CSS-only, so content never depends on JavaScript to appear. There is no scroll-jacking or pinning. Everything is skipped when `prefers-reduced-motion` is set (tested).
- **Video:** testimonials load as a still thumbnail. The YouTube player (privacy-enhanced `youtube-nocookie.com`) loads only when clicked.

---

## 4. Original assets used

All imagery is original photography or original training graphics from `docs/source-audit/original-assets/` (untouched). `scripts/optimize-images.mjs` (`npm run images`) generates WebP versions at 480/800/1200/1800/2400 px (capped at the source width). Pages use `srcset`/`sizes`, below-the-fold images are lazy-loaded, and the first image on each page loads eagerly with high priority. `next.config.mjs` contains `images: { unoptimized: true }`, so Vercel's image optimisation is not used. Output: 42 images → 190 files, 19 MB on disk; each page downloads only the sizes it needs.

| Used | Source files |
|---|---|
| Photography (39) | DSC05854 (home hero), DSC06137, DSC06096, DSC06807, DSC03390, DSC06182, DSC03476, DSC03497, DSC03610, IMG-20241220-WA0029, IMG_20241214_174058_285, IMG_20241214_174119_250, DSC06865, DSC03104, 1.jpeg (Yin class), DSC01753, DSC03069, DSC09321, DSC06635, DSC06557, DSC06607, DSC06780, SAK00241, SAK00074, SAK00111, Samurai-Brotherhood, DSC00275-HDR, DSC00312, DSC00383, DSC00205-HDR, Natural-Pool, Lets-Get-Lost-Ubud, Andrea.jpg, IMG-20240904-WA0008 (Dr Brendan), and five photographs the original saved as PNG ("Personalized Yoga Wellness Program" 2, 3, 10, 11, 12: Reiki and bodywork photos, checked for baked-in text) |
| Portraits (3) | Our Teachers images (7) Rena, (8) Anthony, (9) Alicia: clean photographs, no baked-in text |
| Brand | White logo (trimmed, not altered); black tree favicon mark → `app/icon.png` |
| Document | Online course syllabus PDF (129 KB) → `/docs/100-hour-breathwork-instructor-training-syllabus.pdf` |
| Video | 4 YouTube videos from the brand's own channel, confirmed public on 2026-10-28 |

**Deliberately not used:** Unsplash stock (FAQ "?" tree, Zoom laptop, online men's circle, CCTV and signing images); the AI-generated gift-voucher image; Canva graphics with baked-in text (Reiki store tiles with 2024 dates, the "Conscious Breath Academy" banner, the podcast banner); the 9-day infographic and the 7.9 MB brochure PDF (both say 9 days, see 8.6); the cream and teal wave graphics (dropped in the compact revision); the legacy Men's Embodiment Centre logo; the third-party hotel photos; and the accreditation badges (accreditations are stated in text).

Alt text was written for every content image. It describes what is visible and names a person only where the original site did.

---

## 5. Issues from the audit that are fixed

| Audit | Fix |
|---|---|
| B1 Footer "website" link → 404 on every page | Removed. It pointed to the site itself (and was malformed). The footer now holds only verified links |
| B2 / A8 Three Momence "Register now" links → error page | Removed. Reiki registration uses the Acuity link that already worked |
| B3 Blog link to `/breathwork-events-bali-ubud` (404) | Not reproduced (the blog was not rebuilt) |
| B4 Newsletter popup blocking clicks site-wide | Removed. No popup or overlay of any kind |
| B6 "Read more about our philosophy" was plain text | Philosophy is now a section of the About page |
| B7 `/home` duplicate and "HOME PAGE" buttons | `/home` redirects to `/`; the buttons are gone |
| B10 Private Reiki email BCC'd a personal Gmail | The mailto now goes to info@ with manager@ in CC only |
| B11 No contact details on the Contact page | Email, phone, WhatsApp, address and map link are on the page |
| B12 Weglot, jQuery, three MailerLite scripts | Not included. The site loads no third-party scripts until a video is played |
| E Missing or multiple H1s, missing meta descriptions, no OG images | Exactly one H1 per page (tested), unique titles and descriptions, canonical URLs, a default share image |
| E 34 images without alt text | Every content image has alt text |
| Mobile menu: white logo on a white overlay | The menu is dark and the logo stays visible (tested) |
| Header scrolled away | The header is sticky and compact; anchor links land below it |
| C4 Legacy Embodiment Centre share image | Not used |
| C5 2024 Instagram block | Not reproduced |
| D Typos (see 8.8) | Corrected in the rewritten copy |

---

## 6. Testing actually performed

Local dev server and headless Chromium (Playwright with Chromium 1208) on Windows.

- **Widths:** 1440, 1024, 768, 390 and 320 px, on all 7 routes and the 404 page (40 combinations). Each page was scrolled top to bottom and captured full-page. Every combination had **no horizontal overflow**, no element outside the viewport, **no broken images**, **no console errors**, exactly one H1, and no content left hidden by animation.
- **Visual review** of full-page captures at all widths for Home, Breathwork, Yoga, Reiki & Circles, About and Contact, top to bottom, done twice (before and after the compact revision). Issues found and fixed:
  - first pass: the contact social links had no spacing, the footer divider overhung the content, the Reiki level panels were misaligned, a weak hero crop on Breathwork, and stacked sustainability photos at 768 px;
  - second pass: the Breathwork video was centred while everything else was left-aligned, the Yin teacher row filled half its width, the Home intro paragraph was detached from its statement, the Reiki booking buttons wrapped onto a second row, the founder portraits left dead space beside their bios, the two Reiki header photos had different heights on mobile, and the band crop cut off Alicia's head.
- **Interaction tests (27 checks, all passing):** dropdown opens on hover and stays open moving into the panel; a dropdown link navigates and lands the heading below the header; keyboard: skip link, Tab to the toggle, Enter opens, Tab enters the panel, Escape closes and returns focus; touch at 1024 px: tap opens, tap outside closes; mobile menu: opens, logo visible over it, page scroll locked, Escape closes, links navigate and close it, same-page section links scroll correctly; direct loads of `#section` URLs; the video facade loads the player; reduced motion disables the animations; redirects return the expected status and destination.
- Bugs found and fixed by these tests: (1) focusing the sticky header moved the page by about 430 px (scroll offset now uses `scroll-margin-top` and `preventScroll`); (2) blocks waiting to animate in were unreachable by keyboard (they now animate opacity only); (3) a same-page link from the mobile menu could scroll while the page was still locked.
- **Home interactions (12 checks, all passing):** hero layers follow the pointer; tabs respond to click, arrow keys and Home; rapid tab switching leaves only the selected image showing (a race found and fixed); gallery next/previous buttons and mouse drag scroll the track; the playlist swaps and plays the chosen film; no page errors.
- **Links:** every internal link returns 200. Every outbound link kept on the site (Acuity, Sevaluz, yogaliciacasillas.com, Solis Brotherhood, Spotify, Instagram, Facebook, YouTube) returned HTTP 200 on 2026-10-28.
- `npm run lint`: **0 problems.** `npm run build`: **succeeded.** All 13 routes are prerendered as static pages.

**Not tested:** real Safari or iOS, real Android devices, Firefox, screen readers, Lighthouse or Core Web Vitals scores, or any actual booking, payment, enrolment, email or WhatsApp flow (none was submitted). A 200 response from Acuity only means the scheduler loads, not that a specific appointment type is still bookable.

---

## 7. External services: what the new site uses

| Service | Status in the new site |
|---|---|
| Acuity (letsgetlostbali.as.me) | **Linked:** discovery calls (breathwork, Yin, Reiki, mentorship), Reiki registration, Reiki package, online sessions |
| Sevaluz | **Linked:** "Enrol online · €499" for the online breathwork course |
| yogaliciacasillas.com | **Linked:** online Reiki courses |
| Email (mailto) | **Linked:** general enquiry, private breathwork course, private Reiki course, both men's circles |
| WhatsApp | **Linked** via `wa.me/6282145612219`, built from the verified number. Confirm that WhatsApp is still monitored |
| Stripe Payment Links (breathwork ×2, Yin ×1) | **Withheld.** Stored in `data/site.js` under `pendingCheckouts` with `confirmed: false`; not rendered |
| Acuity "100hr training" (IDR 41 m) and "mentorship package" | **Withheld** (same reason) |
| Momence | **Removed** (broken) |
| MailerLite (popup, meditation, Spain waitlist) | **Not migrated.** No signup form on the site |
| Squarespace contact form | **Not replaced.** No form on the site; Contact offers email, phone and WhatsApp |
| Squarespace Commerce (store, cart) | **Not rebuilt** |
| GA4, Google Ads, Meta Pixel | **Not added** |

---

## 8. Unresolved content and functionality

### 8.1 Blog
The audit captured post titles, dates and meta descriptions, but **not the post bodies**. Rebuilding the blog would mean inventing or re-fetching content, so it was left out and `/blog/*` temporarily redirects to Home. To restore it, export the 10 posts from Squarespace (Settings › Import/Export) and choose up to 10 images. The broken internal link in the cacao post (B3) must then be fixed.

### 8.2 Store
The six USD products conflict with current IDR pricing (A1, A9), and no verified checkout exists outside Squarespace. Not rebuilt.

### 8.3 FAQs and Terms & Conditions
Both describe the legacy venue-hire business (hosting retreats, a 15 % booking fee, "EC", Covid clauses). They are **not published**, so the site currently has **no terms for trainings** (refunds, cancellations). Acuity shows its own "Refunds & Cancellation Policy" at booking.

### 8.4 Privacy Policy
Published verbatim so the site still has one, but the text is generic generator output. It mentions accounts that don't exist and advertising partners the new site doesn't load, and it doesn't name Acuity, Stripe, Sevaluz or MailerLite. **Legal review needed.**

### 8.5 Spain and Meditations
The Spain page says booking opens "late 2026", which is now due (A21), and the waitlist is a MailerLite form. The Meditations page depends on MailerLite, and its only testimonial may be template copy (C9). Neither was rebuilt. About keeps one line saying the work "will soon extend to southern Spain".

### 8.6 Facts withheld because sources conflict

| Topic | What the site shows | What it omits, and why |
|---|---|---|
| 100 h breathwork price (A1) | No price | 33 m IDR (page, Stripe), 41 m IDR (Acuity), US$2,445 (store), €1,499 (Sevaluz) |
| Breathwork dates (A2) | "April 2027" (page and Stripe agree) | Exact days; Acuity still lists March 5–13 2027 |
| Breathwork duration (A3) | "100-hour"; no day count | 8 days (page, Stripe) or 9 days (PDF, infographic, store). The day-by-day example schedule is omitted because it implies 8 days |
| Breathwork brochure PDF | Not linked | Says "9-day program"; 7.9 MB |
| Yin dates (A5) | "March 2027" | March 10–14 (page) or 11–15 (Stripe) |
| Yin price | €950 (page and Stripe agree) | The "approx. IDR 16,500,000" estimate (A22) |
| Yin checkout (A6) | Discovery call only | Stripe link pays a personal account and states different dates |
| Reiki prices (A9) | No prices | IDR 4.7 m / 7.7 m / 12 m and packages 12 m / 19 m / 23.7 m (page) vs USD store prices |
| Reiki format and hours (A7) | Dates only: Level I 7 March 2027, Level II 8 March 2027, Master on request | "Two days, 4 hours each (12–4 pm)" vs "1-day courses, 8 pm – 5 pm" |
| Reiki class size (A10) | "Small groups" | Max 5 (quote) vs 20 (Acuity). The "max 5" quote was dropped |
| Reiki in Amed (A11), mentorship in Amed | Ubud only / "online or in person" | Whether Amed is still offered |
| Online course mentorship sessions (A12) | Not stated | 1 session (page) vs 6 (meta description) |
| Online discovery call (A13) | No discovery call for the online course | The original button pointed to the Sevaluz sales page |
| Mentorship prices (A14) | No prices | 18 m / 30 m / 55 m / 1.6 m (page, current Acuity) vs older 24 m / 43 m Acuity types |
| 6-month online teacher training (A15) | Not mentioned | Exists only in the store |
| Men's circle sign-up (A16) | Email, 1:1 with the captain, two-month minimum (the circles page) | The FAQ's "just show up" |
| Tuesday circle time (A17) | No time | Never published |
| Postcode (A18) | Omitted | 80561 vs 80571 |
| Opening hours (A19) | Not shown | Only in old structured data |
| Venue (A4) | 2027 trainings: The In Movement Studio, Ubud (as stated on each course page); Tuesday circle: Petulu | Whether Petulu still hosts anything else |
| Founder story (A20) | Co-founded by Alicia and Anthony (About Us), plus Anthony's 2020 start (Philosophy). Both are original copy | Which framing the founders prefer |
| X/Twitter | Not linked | Whether the account is active |

### 8.7 Missing assets
A vector or dark logo (F1), video source files (F2: the six Squarespace videos, including the 97-second student testimonial, are not on the site), photos of The In Movement Studio (F6), and surnames for Dr Brendan and Rena.

### 8.8 Copy corrections made (please check)
"Intructor" → Instructor; "Find Our More" (removed); "effectivley" → effectively; "upto date" → up-to-date; "availble througout" → available throughout; "Somatics &amp;" → Somatics and; "day to today" → day to day; "Thrieve" (heading removed); "must recent testimonals" (removed); "Minimum of 2 month" → a minimum of two months; "Ram Das" quote (not used). British spelling is used throughout (practise, programme, honour).

---

## 9. Decisions needed before launch

1. **Breathwork April 2027:** confirm the price, exact dates and duration (8 or 9 days), and which checkout is authoritative. To show a checkout, set `confirmed: true` on the relevant `pendingCheckouts` entry in `data/site.js` and add the button.
2. **Yin Yoga:** confirm the dates (10–14 or 11–15 March) and whether the Stripe link paying a personal account is intended.
3. **Reiki:** confirm prices and currency, format and hours, class size, whether Acuity handles all registration, and whether Amed is still offered.
4. **Mentorship:** confirm the current packages and prices.
5. **Online course:** confirm how many 1:1 sessions are included and where an online discovery call should go.
6. **Contact form:** choose a provider (for example a form service or a Next.js route handler with an email API), supply credentials, and approve spam protection and a privacy notice. Until then the site offers email, phone and WhatsApp only.
7. **Newsletter (MailerLite):** keep it? If yes, choose an inline, non-blocking signup (no popup) and confirm the form.
8. **Blog:** keep it? If yes, export the posts.
9. **Store and gift vouchers:** retire them, or supply a verified checkout.
10. **Legal:** current Terms for trainings (refunds, cancellations) and an updated Privacy Policy from your adviser.
11. **Tracking:** should GA4, Google Ads or the Meta Pixel return? If so, consent handling may be required.
12. **Brand:** approve the new theme (warm dark and cream torn-paper look), the two fonts (Fraunces and Albert Sans) and the brick-red buttons, and supply a vector logo if one exists.
13. **Contact details:** postcode, the Tuesday circle time, whether X/Twitter is active, whether WhatsApp is monitored.
14. **Spain and the free meditation:** updated timeline and waitlist, or confirm they stay offline.
15. **Videos and venue:** supply MP4s or YouTube IDs for the Squarespace videos and photos of The In Movement Studio if you want them on the site.

---

## 10. Maintenance notes

- `data/site.js`: contact details, navigation, every outbound link, YouTube IDs and the withheld checkouts.
- `data/teachers.js`: the only copy of the teacher biographies.
- Dates and prices are written into the page files: `app/breathwork/page.js`, `app/yoga/page.js`, `app/reiki-and-circles/page.js` and the training index in `app/page.js`.
- New images: add the source file to `scripts/optimize-images.mjs`, run `npm run images`, then use `<Picture name="…" alt="…" sizes="…" />`.
- `next dev` writes an `AGENTS.md` file to the project root on every run. It is harmless and can be ignored.
