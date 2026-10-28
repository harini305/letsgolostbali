# 01 — Audit Report: letsgetlostbali.com (Phase 1)

| | |
|---|---|
| Site | https://www.letsgetlostbali.com |
| Audit date | 2026-10-28 |
| Platform found | Squarespace 7.1 (+ Adobe Fonts, MailerLite, Acuity, Stripe, Sevaluz, Momence, Google Maps, YouTube, GA4, Google Ads, Meta Pixel, Weglot) |
| Workspace at start | `D:\letsgetlostbali53`: **empty** (no project files, assets or prior audit evidence) |
| Scope | Research only. No code, no redesign, no config changes, no push, no deploy |

---

## 1. Website overview
Let's Get Lost (LGL) is a Bali-based wellness education business founded by **Anthony Ball** and **Alicia Casillas Ramos**. It sells:

- **Teacher trainings:** a 100 h Breathwork Instructor Training (in person, Ubud, April 2027), a 65 h Somatic Yin Yoga TT (March 2027), and Reiki Levels 1, 2 and Master/Teacher (in person and online).
- **Online products:** a 100 h online breathwork course (€499 via Sevaluz), mentorship programmes, and a free meditation.
- **Men's circles** with Solis Brotherhood (in person in Petulu and online).
- A podcast, a dormant blog (10 posts) and a "Spain 2027" expansion waitlist.

The centre is in **Petulu, Ubud, Bali**. 2027 trainings take place at **The In Movement Studio, Ubud**.

The site has evolved in layers:
- An original 2020–21 "eco retreat centre / venue hire" site, branded **Men's Embodiment Centre**. Its remnants are the FAQs, Terms, the old logo in OG images, and the sustainability pages.
- A 2024–26 shift to **training sales pages**. These are very long and use newer Canva-styled graphics, with conversions spread across many external checkouts.

## 2. Coverage

### 2.1 Methods
- Automated rendering crawl with headless Chromium (Playwright) at **1440 / 768 / 390 px**: full DOM extraction (sections, headings, text, images, links, forms, embeds, computed styles) plus full-page screenshots (157 files). Blog posts and tags were done at 1440/390.
- Route discovery from navigation, footer, `sitemap.xml` (49 URLs), `robots.txt` and all in-page links (2 PDFs and 1 broken route found).
- Stylesheet analysis (`site.css`, `custom.css`) for design tokens.
- Interaction tests: desktop dropdown hover, mobile/tablet burger + sub-folder, FAQ toggle, button hover, MailerLite popup, contact form fields, store product controls, empty cart.
- Hidden-content extraction for collapsed accordions, FAQ answers and store product data.
- External dependency checks: HTTP status of every outbound link; read-only rendering of Stripe, Momence, Sevaluz and Solis pages; Acuity catalogue parsed from its public page.
- Asset download: 92 unique originals (true JPEG/PNG/PDF), with dimensions and file sizes measured.
- Breakpoint probe at 10 widths (320–1920).

### 2.2 Coverage record

| Category | Count | Detail |
|---|---|---|
| Pages **fully inspected** | 51 | 22 main/legal/store-list routes + 6 products + `/cart` at 3 viewports; `/blog` + 10 posts + 11 tags at 2 viewports |
| Redirect routes verified | 4 | `/about`, `/offerings`, `/teacher-trainings`, `/online` |
| **Partially inspected** | 3 groups | Store/cart (checkout not entered); contact form (validation and submission not verified, as the popup intercepted the click); external booking pages (first screen only) |
| **Discovered but broken / inaccessible** | 5 | `/breathwork-events-bali-ubud` (404); footer `www.embodimentcentre.com` relative link (404 site-wide); 3 Momence event links (error) |
| Not inspectable by design | — | `/config`, `/account`, `/api`, `/search` (robots-disallowed/admin); any unpublished drafts |

### 2.3 Interactive states not verified
Form submissions (contact, MailerLite); booking/payment completion (Acuity, Stripe, Sevaluz, Squarespace checkout); keyboard-only navigation; popup re-display rules; real-device Safari/iOS rendering. Full list: [06 §6](06-functionality-and-dependencies.md).

### 2.4 Limitations
- `robots.txt` was respected: Squarespace JSON endpoints (`?format=json`) were **not** used; content came from rendered HTML.
- The auto-opening MailerLite popup appears in most first-view screenshots.
- Native videos are streamed (HLS) and their source files are not downloadable.
- Image originals are capped at 2500 px by the CDN.
- Estimates (pixel-sampled colours, logo wordmark font) are labelled as such.

## 3. Discovered pages and routes
51 live routes plus 4 folder redirects. Full table with recommendations: [02-page-inventory.md §1](02-page-inventory.md).

- **Main navigation (12):** Breathwork TT, Yin TT, Reiki, Spain, Men's Circles, Online Trainings, Mentorship, Meditations, Contact, About Us, Philosophy, Sustainability.
- **Footer (4):** Blog, Privacy, Terms, Our Teachers.
- **Orphans (sitemap only):** FAQs, Store (+3 categories, 6 products).
- **Duplicates/legacy:** `/home`, 11 blog tag archives, the empty "Class Packages" category.

## 4. Page-by-page section inventory
See [02-page-inventory.md §3](02-page-inventory.md) for the section-by-section order. Verbatim text per page is in [`content/pages/`](content/pages/).

## 5. Content preservation findings
- Essential facts (offers, prices, dates, venues, teachers, contact, accreditations, CTAs) are consolidated in [03-content-inventory.md](03-content-inventory.md), with sources.
- There is **heavy duplication**: founder bios repeated on 4–5 pages; the Reiki curriculum appears 4 times; the embodiment/sustainability story on 3 pages. There is also **very long sales copy** (breathwork page 15.9k px desktop / 19.1k px mobile).
- **Significant factual conflicts** (prices, dates, durations, currencies, venues): 23 items in [08 §A](08-issues-gaps-questions.md). The most important are the breathwork price (IDR 33 m vs 41 m vs US$2,445 vs €1,499), 8 vs 9 days, Yin dates (10–14 vs 11–15 March 2027) and Reiki hours ("12–4 pm two days" vs "1-day 8 pm–5 pm").
- **Legacy content:** venue-hire Terms and FAQs, the old Embodiment Centre logo in OG images, 2024 Instagram posts, and a possibly placeholder testimonial on Meditations.
- Testimonials are mostly **video** (1 Squarespace video and 4 YouTube embeds). There are no written reviews or ratings, and none should be invented.

## 6. Original assets & local availability
- **134 asset records** in [04-assets-manifest.csv](04-assets-manifest.csv): 63 photos, 13 heroes, 6 product images, 5 decorative graphics, 4 Instagram thumbnails, 26 OG-image variants, 6 videos + 6 posters, 2 PDFs, the logo, the favicon and the legacy logo.
- **92 originals downloaded** to [`original-assets/`](original-assets/) (~96 MB: images 89 MB, documents 7.9 MB, brand 0.2 MB). The remaining **42 are remote-only**: OG duplicates, video streams/posters and Instagram thumbnails.
- **Concerns:** 24 files over 1 MB (up to 4 MB PNGs); 20 photographic PNGs; 34 images without alt text; Unsplash stock and one AI-generated image; Canva graphics with baked-in text; **no dark or vector logo** (white PNG only, plus a black icon-only favicon PNG); video source files unavailable.

## 7. Typography (original)
- **adelle-ultrathin** (Adobe Fonts, weight 100) for **all** headings, body, nav and footer.
- **Poppins 500** for all buttons.
- Third-party Palatino and Montserrat inside the MailerLite popup.

These are **Verified** via CSS tokens and computed styles. The scale tokens are H1 4rem, H2 2.8rem, H3 2.2rem, H4 1.6rem and body 1.1rem (17.7 px at 1440), but per-block overrides make the hierarchy inconsistent. Detail: [05 §1](05-brand-reference.md).

## 8. Colours

| Status | Colours |
|---|---|
| **Verified** | Black #000000 · White #FFFFFF · Footer/light sections #DFE0E1 · Off-white #F4F5F7 · Dark-theme base #D5DAE8 · **CTA red #F60606** (hover: 80% opacity) · Nav dropdown rgba(0,0,0,.38) · Form fill #FAFAFA |
| **Estimates** (newer Canva graphics) | Linen cream #EDE8E0 · Pale cream #F3F3E8 · Sage-teal #8AA69B · Sand #E1CBA5 · Moss #8E9A87 · Slate #667A7F · Deep olive #475547 |
| Incidental (not brand) | IBF badge blue #0724A7 · MailerLite olive-gold text #76642E |

## 9. Navigation & interaction
- Desktop: 4 hover dropdown folders. The header is absolute and transparent over the hero and is **not sticky**.
- Mobile/tablet (≤ ~768 px): burger opens a full-screen white overlay with folder sub-panels; the **logo is invisible** there.
- The MailerLite popup opens on load on every page and blocks interaction until closed.
- Accordions on Reiki and Sustainability; custom code-block toggles on FAQs.
- Button hover is an opacity change only.

## 10. Responsive observations
- No horizontal overflow at any tested width.
- Desktop nav ≥ 800 px; burger ≤ 768 px.
- Home cards go 3 → 2 → 1 per row, with an orphaned card at 600–767 px.
- Training pages reach **16.7k–19.1k px** on mobile.
- Thin white type on photos is hard to read.

Detail: [07-responsive-observations.md](07-responsive-observations.md).

## 11. Technical dependencies & integrations
**Conversions depend on 7 external systems:**
- **Acuity** (IDR; discovery calls, Reiki, mentorship, classes)
- **Stripe Payment Links** (IDR breathwork; EUR Yin, paid to a personal account)
- **Sevaluz** (€499 online course)
- **Momence** (Reiki; currently broken)
- **Squarespace Commerce** (USD; orphaned)
- **MailerLite** (popup, meditation, Spain waitlist)
- **mailto:** links

**Other dependencies:**
- **Tracking:** GA4 `G-0ZQZK89MSL`, Google Ads `836783180`, Meta Pixel `2049267912209049`.
- **Inactive:** Weglot (loaded, no languages configured).
- **Media:** Google Maps; YouTube (5 videos); 6 Squarespace-hosted videos.

The contact form and the store rely on Squarespace backends that a Next.js frontend won't have, so Phase 2 needs replacements. Detail: [06](06-functionality-and-dependencies.md).

## 12. Missing assets & inaccessible pages
- **Missing assets:** vector/dark logo, video source files, clean teacher portraits, venue (In Movement Studio) photos, and current Terms/Privacy text.
- **Inaccessible pages:** `/breathwork-events-bali-ubud`, the footer embodimentcentre link, and 3 Momence events.

## 13. Inconsistencies & unresolved questions
23 fact conflicts, 12 functional issues, 9 legacy-content items, about 20 typos and 17 client questions: [08-issues-gaps-questions.md](08-issues-gaps-questions.md).

## 14. Phase 2 considerations
See [09-phase-2-recommendations.md](09-phase-2-recommendations.md). It covers:
- the proposed consolidated IA and redirect map;
- centralised offer/price/link data;
- integration replacements;
- the image pipeline under `images: { unoptimized: true }` (merged, not replacing other config);
- brand application.

## 15. Confirmations
- ✅ The **two-font rule** and all mandatory design, content, footer, image/performance and blog requirements are recorded for Phase 2 in [09 §1](09-phase-2-recommendations.md) and [05 §1.3](05-brand-reference.md). Final fonts were **not** selected.
- ✅ **No redesign or implementation** was performed: no components, pages, packages or config were created in the project.
- ✅ **No GitHub push and no deployment** took place.
- ✅ No original source files were modified. The workspace was empty, and the only files created are under `docs/source-audit/`. Tooling (Playwright, crawl scripts) ran from a temporary scratch directory. Copies of the scripts are kept in `evidence/crawler-scripts/` for reproducibility.
- ✅ No forms were submitted and no bookings or payments were made.
