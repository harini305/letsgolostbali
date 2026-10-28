# 09 — Phase 2 Recommendations & Mandatory Requirements

This is guidance for the implementation phase. **No design or code was produced in Phase 1.** Items marked **MANDATORY** come from the project brief and are binding. Everything else is a recommendation for review.

---

## 1. Mandatory requirements (recorded from the brief)

### 1.1 Stack
- **Next.js (App Router) with JavaScript, React, GSAP + ScrollTrigger**, responsive frontend.
- The result is a **substantial redesign**, not a copy of the Squarespace layout. Preserve the factual content, original assets, recognisable brand colours and identity. Improve layout, typography, spacing, hierarchy, responsiveness and usability.

### 1.2 Typography — MANDATORY
- **Exactly two font families across the entire website:** one for headings, and one for body, navigation, buttons, forms, cards, footer and all UI.
- Both must be readable, professional and **not fancy/decorative**.
- **No third family** for decorative headings, special sections, the footer or individual components.
- Equivalent components get the same sizes on every route. Use a controlled, responsive type scale (e.g. `clamp()`-based tokens).
- Build hierarchy only with weight, size, line-height and letter-spacing.
- Final font choice happens in Phase 2 with approval. Options and constraints are in [05-brand-reference.md §1.4](05-brand-reference.md). Note: the original uses adelle-ultrathin (Adobe Fonts, weight 100) and Poppins 500 for buttons, plus third-party Palatino/Montserrat in the popup. **None of these automatically carries over.**

### 1.3 Visual design — MANDATORY
- Professional, human-designed appearance; intentional image/text alignment.
- Consistent content widths, margins and spacing (one container system).
- **No** unnecessary decorative numbering, eyebrow text, random symbols, floating badges or ornamental elements. (The original's emoji headings 🔹✅🌿 and the "01/02" numbering in the PDF syllabus should not be imported as decoration.)
- Avoid repetitive AI-looking layouts and generic template patterns.
- Use visual effects (GSAP/ScrollTrigger) only when they serve a clear purpose. Respect `prefers-reduced-motion`.

### 1.4 Content — MANDATORY
- Keep pages concise and focused; avoid repeated paragraphs, unnecessary sections and excessive length.
- Preserve meaningful facts and essential information ([03-content-inventory.md](03-content-inventory.md)).
- **Do not invent** claims, testimonials, FAQs, prices or blog posts. Where facts conflict ([08-issues-gaps-questions.md](08-issues-gaps-questions.md) §A), use the client's confirmed value. Until confirmed, implement with a clearly marked placeholder or the value the client chooses; never a guess.

### 1.5 Footer — MANDATORY
- Compact and content-driven; only necessary, verified information.
- No excessive padding, unnecessary columns, duplicated content or oversized layouts.
- The final content section must be fully visible above the footer, with a natural transition into it.
- No overlap, clipping, excess blank space or fixed-footer interference.
- **Verified footer content available:** nav links (Blog, Privacy Policy, Terms & Conditions, Our Teachers), phone/WhatsApp +62 821 4561 2219, info@ / manager@ emails, Petulu address, Instagram, Facebook, YouTube, X. **Fix:** the broken website link (B1); confirm whether X/Twitter is still active.

### 1.6 Images & performance — MANDATORY
- Prefer the original assets already available ([04-assets-manifest.csv](04-assets-manifest.csv), local copies in `original-assets/`).
- Plan local resizing and compression; avoid large downloads and duplicate copies.
- **Do not use Vercel's default Image Optimization quota.** Merge `images: { unoptimized: true }` (or an equivalent) into the existing `next.config` without replacing unrelated settings.
- Still deliver sensible dimensions, compression, modern formats (WebP/AVIF where practical), lazy loading below the fold, and correct `sizes`/`srcset`. Since `unoptimized` disables runtime resizing, pre-generate responsive variants at build time or with a one-off script (e.g. 640/1024/1600/2400 widths) and serve them via `<picture>`/`srcSet` or `next/image` with `unoptimized` and explicit sizes.
- **Do not change project configuration during the audit** (complied with; the workspace contained no project).

### 1.7 Blog — MANDATORY
- Low priority. If implemented, the initial blog presentation uses **no more than 10 images** unless the client asks otherwise. Do not overbuild (no tag archives, search or pagination needed for 10 posts).
- Use only the 10 real posts ([02-page-inventory §3.16](02-page-inventory.md)). Never fabricate posts.

### 1.8 Process — MANDATORY
- Phase 2 begins only after explicit approval of this audit. No pushing to GitHub or deploying to Vercel unless instructed.

---

## 2. Recommended information architecture (for review)

| Proposed page | Source routes | Rationale |
|---|---|---|
| Home `/` | `/` (+ `/home` → 301) | Routing hub: 3 trainings, men's circles, online, about snippet, contact |
| Breathwork Instructor Training | `/breathwork-instructor-training-bali-ubud-` | Flagship. Keep the slug or 301 to a cleaner slug (preserve SEO equity) |
| Yin Yoga Teacher Training | `/yin-yoga-teacher-training-bali` | Keep |
| Reiki Courses | `/reiki-courses` | Keep; online Reiki stays as outbound cards |
| Online Breathwork Training | `/online-trainings` | Keep |
| Mentorship | `/practitioner/mentorship-training` | Keep (consider a shorter slug + 301) |
| Men's Circles | `/mens-circles` | Keep |
| About | `/about-us` + `/philosophy` + `/sustainability` | **Consolidate** into one About page with anchored sections (founders/story, values/purpose, the land & sustainability). 301 the others or keep them as short sub-pages; client choice |
| Teachers | `/our-teachers` | Keep; single source for all bios (include Dr Brendan, Andrea Abian, Rena if confirmed) |
| Contact | `/contact` | Add phone/WhatsApp/email to the page itself |
| Spain | `/spain` | Keep as a short waitlist page (update timeline) |
| Free Meditation | `/meditations` | Keep as a short lead page (confirm testimonial) |
| Blog + posts | `/blog`, `/blog/[slug]` | Simple; ≤ 10 images on the index |
| Legal | `/terms-and-conditions`, `/privacy-policy` | Verbatim until the client supplies updated text |
| FAQs | `/faqs` | **Review**: only build if the client provides current FAQs (current ones are venue-hire legacy) |
| Store | `/store/**`, `/cart` | **Review**: recommend not rebuilding; link to Stripe/Acuity, and keep a gift-voucher CTA only if confirmed |

**Navigation suggestion:** Trainings (Breathwork, Yin, Reiki, Online, Mentorship) · Men's Circles · About · Contact, plus one persistent primary CTA (e.g. "Book a discovery call", destination per page). Spain can live under Trainings or as a banner.

**Redirect map to preserve:** `/home` → `/`; folder URLs `/about` `/offerings` `/teacher-trainings` `/online` → their current targets; `/blog/tag/*` → `/blog`; consolidated About pages → anchors; store URLs → the relevant training page if the store is dropped. Configure these in `next.config` `redirects()` (merging, not replacing).

---

## 3. Implementation considerations

### 3.1 Data & content
- Put all **offers, dates, prices, currencies and outbound URLs** in one data module (e.g. `data/offers.js`) and one `data/links.js` (Acuity, Stripe, Sevaluz, MailerLite, social links). Several are time-sensitive (2027 dates).
- Keep a single teacher data source (bios, roles, photo) and reuse it across pages.
- Long curricula and schedules → structured arrays rendered as accordions/tabs (accessible `<details>`/ARIA disclosure) to cut mobile length.
- Copy can be **condensed** (see 03 §9) without changing facts. Typo fixes need client sign-off; list them in the PR rather than changing them silently.

### 3.2 Integrations to retain
| Integration | How |
|---|---|
| Acuity Scheduling | Outbound links (current URLs) or the official Acuity embed on dedicated pages |
| Stripe Payment Links | Outbound links (confirm which remain valid) |
| Sevaluz | Outbound link for the online course |
| MailerLite | Inline signup (meditation, Spain waitlist) using MailerLite's embed or hosted form links. Make the popup optional and non-blocking |
| Contact form | Needs a backend choice (Route Handler + email API, or a form service). Needs credentials and **client approval**. Include spam protection |
| Analytics/ads | GA4 `G-0ZQZK89MSL`, Google Ads `836783180`, Meta Pixel `2049267912209049`: re-add only with client confirmation, and add consent handling if required |
| Maps | Static map image + "Open in Google Maps" link (lighter), or an embed |
| Video | Client-supplied MP4s (self-hosted, compressed, `preload="none"`, poster) or YouTube/Vimeo embeds with a facade |

### 3.3 Assets pipeline
- Source: `docs/source-audit/original-assets/` (92 files, ~96 MB). **Leave these files untouched**; generate optimised copies into the app's `public/` (or a build step).
- Priorities: the 13 hero photos (2500 px JPEG, 285–922 KB) → WebP/AVIF at 640/1024/1600/2400. The 20 PNG "photo" and Canva graphics (up to 4 MB) → convert or drop. The 7.9 MB brochure PDF → compress if the client allows.
- Logo: obtain an SVG. Otherwise propose an SVG redraw for approval, and use the black favicon mark for light backgrounds.
- Don't reuse Canva graphics with baked-in text as backgrounds. Do reuse real photography.
- Write meaningful alt text for every content image (originals are missing 34).

### 3.4 Brand application (to decide in Phase 2)
- Recognisable continuity: black/white base, cool grey #DFE0E1, the tree logo, real jungle photography, the light slab-serif character in headings (at a readable weight).
- Optional warm extension already used by the client on newer pages: linen cream, sage-teal, sand, moss, deep olive (05 §2.3).
- CTA colour: confirm #F60606 red or an approved alternative from the palette, with WCAG AA contrast for text on buttons.

### 3.5 Quality checklist for Phase 2
- One H1 per page, logical heading order, meta descriptions and OG images on every page, canonical URLs, sitemap and robots, `Course`/`Event` JSON-LD for trainings (with confirmed data only).
- Keyboard-accessible nav and menus, visible focus, logo visible on every header state, contrast AA.
- Test at 1440 / 768 / 390 (plus 320 and 1920) with no horizontal overflow, and check the footer transition on every route.
- Lighthouse performance check after image pipeline work. Lazy-load below-the-fold media.
