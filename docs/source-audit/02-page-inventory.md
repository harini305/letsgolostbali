# 02 — Page & Route Inventory

Source site: https://www.letsgetlostbali.com (Squarespace 7.1). Audit date: 2026-10-28.
Every route below was loaded in headless Chromium at 1440, 768 and 390 px (blog posts and tags at 1440 and 390 only). Status codes are the live HTTP responses. Verbatim text for each page is in [`content/pages/`](content/pages/). Screenshots are in [`screenshots/`](screenshots/INDEX.md).

**Legend.** Recommendation: **Implement** = build in Phase 2 · **Consolidate** = merge into another page · **Legacy** = keep a redirect only · **Review** = business decision needed first.

---

## 1. Route summary

### 1.1 Discovery sources
- **Main navigation:** 4 folder menus with 12 child links. There is no top-level page link and no header CTA.
- **Footer:** Blog, Privacy Policy, Terms & Conditions, Our Teachers, a website link (broken), phone, and 4 social icons.
- **`/sitemap.xml`:** 49 URLs. **`/robots.txt`:** standard Squarespace rules (disallows `/config`, `/search`, `/api`, `?format=json` and similar).
- **In-page links:** these found 1 extra internal route (`/breathwork-events-bali-ubud`, which returns 404) and 2 PDFs.
- **Folder URLs** (`/about`, `/offerings`, `/teacher-trainings`, `/online`): each redirects to its folder's first child.

### 1.2 Full route table

| # | Route | HTTP | Type | Reached from | In nav? | Recommendation |
|---|---|---|---|---|---|---|
| 1 | `/` | 200 | Home | Logo | — | **Implement** |
| 2 | `/home` | 200 | Duplicate of `/` (canonical → `/`) | "HOME PAGE" buttons on About Us, Our Teachers, Sustainability | No | **Legacy** → 301 to `/` |
| 3 | `/breathwork-instructor-training-bali-ubud-` | 200 | Training detail (flagship) | Nav › Teacher Trainings | Yes | **Implement** (slug has a trailing hyphen; keep it or redirect it) |
| 4 | `/yin-yoga-teacher-training-bali` | 200 | Training detail | Nav › Teacher Trainings | Yes | **Implement** |
| 5 | `/reiki-courses` | 200 | Training detail + course listing | Nav › Teacher Trainings | Yes | **Implement** |
| 6 | `/spain` | 200 | Coming-soon / waitlist landing | Nav › Teacher Trainings ("Spain (Coming 2027)") | Yes | **Implement** (short page) |
| 7 | `/mens-circles` | 200 | Offering detail | Nav › Offerings (the only child) | Yes | **Implement** |
| 8 | `/online-trainings` | 200 | Online course landing (sells via Sevaluz) | Nav › Online | Yes | **Implement** |
| 9 | `/practitioner/mentorship-training` | 200 | Programme detail | Nav › Online | Yes | **Implement** |
| 10 | `/meditations` | 200 | Lead-magnet landing (MailerLite) | Nav › Online | Yes | **Implement** (short page) |
| 11 | `/contact` | 200 | Contact + map | Nav › About | Yes | **Implement** |
| 12 | `/about-us` | 200 | About | Nav › About | Yes | **Implement**, possibly with 13 and 18 |
| 13 | `/philosophy` | 200 | About / values | Nav › About; Home CTA | Yes | **Consolidate** candidate (overlaps About Us and Sustainability) |
| 14 | `/sustainability` | 200 | About / eco | Nav › About | Yes | **Consolidate** candidate (overlaps Philosophy and Home) |
| 15 | `/our-teachers` | 200 | Team | Footer only | No | **Implement**; consider promoting to nav |
| 16 | `/faqs` | 200 | FAQ | **Nowhere (orphan)**, sitemap only | No | **Review**: content is legacy venue-hire copy |
| 17 | `/blog` | 200 | Blog index (10 posts) | Footer | No | **Implement** (simple, low priority) |
| 18–27 | `/blog/<10 slugs>` | 200 | Blog posts | Blog index | No | **Implement** as simple post template |
| 28–38 | `/blog/tag/<11 tags>` | 200 | Tag archives (1–2 posts each) | Post footers | No | **Legacy** / do not build; redirect to `/blog` |
| 39 | `/store` | 200 | Squarespace Commerce shop (6 products, USD) | **Orphan**, sitemap only | No | **Review**: prices conflict with the live checkout links |
| 40 | `/store/courses` | 200 | Shop category (3 Reiki products) | `/store` | No | **Review** |
| 41 | `/store/gift-vouchers` | 200 | Shop category (1 product) | `/store` | No | **Review** (a gift voucher may be worth keeping) |
| 42 | `/store/class-packages` | 200 | Shop category: **empty** ("No results found") | `/store` | No | **Legacy** (empty) |
| 43–48 | `/store/p/<6 slugs>` | 200 | Product detail | `/store` | No | **Review** |
| 49 | `/cart` | 200 | Squarespace cart (empty state) | Commerce system | No | Depends on the store decision |
| 50 | `/terms-and-conditions` | 200 | Legal | Footer | No | **Implement** (verbatim; flag for client legal review) |
| 51 | `/privacy-policy` | 200 | Legal | Footer | No | **Implement** (verbatim; flag for client review) |
| — | `/about` · `/offerings` · `/teacher-trainings` · `/online` | 200 via redirect | Folder placeholders → `/contact`, `/mens-circles`, `/breathwork-…`, `/online-trainings` | Mobile menu `data-folder` hrefs | — | **Legacy** redirects |
| — | `/breathwork-events-bali-ubud` | **404** | Broken internal link | Blog post "Breathwork and Cacao Ceremony…" | — | Fix link in content (page doesn't exist) |
| — | `/www.embodimentcentre.com` (and the same relative path under `/blog/…`, `/store/…`, `/practitioner/…`) | **404** | Malformed footer link (`href="www.embodimentcentre.com "`, missing `https://`) | Footer, every page | — | Fix: see 08-issues |
| — | `/s/100hr-Breathwork-Teacher-Training.pdf` | 200 | Download (7.9 MB) | Breathwork page | — | Keep (compress) |
| — | `/s/100-Hour-Breathwork-Instructor-Training-Syllabus.pdf` | 200 | Download (129 KB) | Online Trainings page | — | Keep |

### 1.3 Coverage status

| Status | Routes |
|---|---|
| **Fully inspected** (rendered, text and asset extraction, 3 viewports) | All 22 non-blog routes in the table, plus `/cart` and the 4 folder redirects |
| **Fully inspected** (2 viewports, 1440/390) | `/blog`, 10 posts, 11 tag pages |
| **Partially inspected** | `/store/p/*`: add-to-cart **not** clicked and checkout not entered (outside scope). `/contact`: form validation not verified because the MailerLite popup intercepted the click. External booking pages: content read only, no booking made |
| **Discovered but inaccessible / broken** | `/breathwork-events-bali-ubud` (404); `/www.embodimentcentre.com` relative links (404); 3 Momence "REGISTER NOW" event links (render "Sorry, something went wrong") |
| **Not inspectable** | `/config`, `/account`, `/api`, `/search` (robots-disallowed / admin); any unpublished Squarespace drafts (not public) |

---

## 2. Shared layout (all pages)

### Header (shared)
- **Desktop (≥ ~1024 px):** logo top-left (white PNG pine-tree mark with the "LET'S GET LOST" wordmark, rendered about 128×164 px). Nav sits top-right: **Teacher Trainings ▾ · Offerings ▾ · Online ▾ · About ▾**. The header is `position:absolute`, transparent, and overlays the first section's hero image. It is **not sticky** (it scrolls away). Header height is about 184 px.
- **Dropdowns:** open on hover. Panel is `rgba(0,0,0,0.38)` with white adelle-ultrathin text; no radius or shadow.
- **Mobile/tablet (768 and 390):** burger icon top-right. It opens a full-screen **white** overlay with centred folder labels plus chevrons. Tapping a folder slides to a sub-panel with "Back". The white logo is effectively invisible on this white overlay.
- No CTA button, cart icon, search or language switcher is visible in the header.

### Navigation tree (verified)
```
Teacher Trainings ▾  → 100hr Breathwork Instructor Training (/breathwork-instructor-training-bali-ubud-)
                       Yin Yoga Teacher Training (/yin-yoga-teacher-training-bali)
                       Reiki Courses (/reiki-courses)
                       Spain (Coming 2027) (/spain)
Offerings ▾          → Men's Circles (/mens-circles)
Online ▾             → Online Trainings (/online-trainings)
                       Mentorship Training (/practitioner/mentorship-training)
                       Meditations (/meditations)
About ▾              → Contact (/contact)
                       About Us (/about-us)
                       Philosophy (/philosophy)
                       Sustainability (/sustainability)
```

### Footer (shared)
Light grey section (`#DFE0E1`, theme `light`). Contents, verbatim:
- Links: **Blog · Privacy Policy · Terms & Conditions · Our Teachers**
- "Let's Get Lost"
- "www.letsgetlostbali.com". The visible text is the LGL domain, but the `href` is `www.embodimentcentre.com ` (relative, with a trailing space), so it lands on a **404**.
- "Tel: +6282145612219 (WhatsApp)" (a `tel:` link)
- "Email(s): info@letsgetlostbali.com or manager@letsgetlostbali.com" (plain text, not `mailto:`)
- Social icons: Instagram (`/letsgetlostbali`), Twitter/X (`/letsgetlostubud`, which redirects to x.com), YouTube (channel `UCF9f5qfSDQzgS75zE7zsSdw`), Facebook (`/letsgetlostubud`)

### Global overlays and third-party UI
- **MailerLite popup** "Receive A Free Meditation" (email + name, "Join now") opens on load on every page tested, at all viewports, and covers the hero.
- **Google reCAPTCHA** badge, bottom-right.

### Repeated section patterns
1. **Full-bleed photo hero**, 450–900 px tall, with an H1 or H2 overlaid (often white on a dark overlay; some heroes have no text). Home hero has a semi-transparent grey text panel and a **wavy bottom edge**.
2. **List section** "cards": image + title + text + button, 3-up on desktop (Home "Upcoming Events", Reiki online courses, teacher bios).
3. **Text + image two-column** blocks.
4. **Full-bleed quote band**: image or black background with a short quote (Attenborough on Home; "Ram Das" on Philosophy and Sustainability).
5. **Decorative "wave" background graphics** (cream linen with teal/sage waves), used only on the newer training pages.
6. **Teacher bio** blocks, repeated with identical copy on 4–5 pages.

---

## 3. Page-by-page inventory

Each entry lists sections in their original order. Asset filenames refer to [`04-assets-manifest.csv`](04-assets-manifest.csv). Local copies are under [`original-assets/`](original-assets/).

### 3.1 Home — `/`
- **Purpose:** brand entry point and routing to the three trainings. **Title:** "Lets Get Lost : Ubud, Bali" (missing apostrophe). **Meta:** "Let's Get Lost Bali | Breathwork, Men's Groups, Yoga Teacher Training, & Reiki Trainings in Ubud". **Canonical:** `/`. **OG image:** `_DSC8289.jpg` (1500×1000).
- **Sections:**
  1. *Hero* (theme dark): `DSC05854.jpg` jungle/pond studio. H1 "Quality Teaching & Trainings" + "Breathwork, Yoga, Men's Groups & Reiki" in a translucent panel; wavy bottom edge.
  2. *Upcoming Events, Classes & Trainings* (list section, 3 cards with black buttons): 100hr Breathwork ("Intructor" typo) → "Find Out More"; 65 Hr Yin Yoga → "Find **Our** More" (typo); Reiki Courses & Teacher Training → "Find Out More". Images: `DSC06182.jpg`, `DSC06096.jpg`, `Personalized Yoga Wellness Program (3).png`.
  3. *Exclusivity…* intro paragraph, then a **native video** (166 s, autoplay muted, caption "Let's Get Lost Ubud"); *Online Classes* + red "Book Online Session" (→ Acuity `online-class`); *Podcast* "Working On It" text + banner image + red "LISTEN NOW ON SPOTIFY".
  4. *Feed your body* (theme light-bold, grey): Become Embodied / A Space for Connection / Commitment to Sustainability + red "Our Philosophy".
  5. *Follow our journey.* **Instagram feed block** (4 posts, 2024 content) + "Honour your mind" paragraph.
  6. *Quote band* (theme black): leaf photo + David Attenborough quote.
- **Retain:** training routing, online sessions, podcast link, the embodiment/community/sustainability pillars (condensed), the Instagram link.
- **Risks:** the Instagram block shows stale posts (Sept/Dec 2024 events). Section 4 duplicates the Philosophy/Sustainability pages. Heading levels are out of order (H4 used as display text).

### 3.2 100hr Breathwork Instructor Training — `/breathwork-instructor-training-bali-ubud-`
- **Purpose:** flagship sales page. **Title:** "100hr Breathwork Instructor Training Bali | Let's Get Lost Ubud, Yoga Alliance certification | Let's Get Lost Bali" (very long). **No H1.** No OG image.
- **Sections:**
  1. Hero image `DSC06137.jpg`, no text.
  2. H2 "100hr Breathwork Instructor Certification" / "Breathwork Instructor Training" / "Let's Get Lost Bali | Ubud, Bali | 100hr Yoga Alliance Accredited". CTAs: **BOOK A DISCOVERY CALL** (Acuity), **DOWNLOAD INFORMATION DOCUMENT** (PDF 7.9 MB), **JOIN APRIL UBUD 2027** (Stripe, IDR 33,000,000), **JOIN APRIL UBUD 2027 (3 x PAYMENT PLAN)** (Stripe subscription, IDR 11,000,000/month). H4 tagline. Native video (59 s). Badges: Yoga Alliance YACEP (`1.png`) and IBF Network member (`blue bg white@4x-100.jpg`). Wave background graphic.
  3. "A lifelong teacher for regulation, healing, and profound stillness." + "Upcoming Training Dates: APRIL 2027 (New enrollment) – Ubud (Accommodation not included)".
  4. "A complete ecosystem…": The Immersion (8 days, 2 meals/day) · The Education (100 h, manuals, Yoga Alliance CPD) · The Community (6 months support) · The Mentorship (six 1:1 sessions with Anthony). Native video "Student Testimonials" (97 s). CTA "JOIN APRIL 2027".
  5. Long details block (H4s): Who is this course for? · What is included? · What will I learn? · Our Aim · Continual Support · Yoga Alliance Accredited · **Cost: "Starting from 33 million IDR (UBUD), with payment plans"** · Upcoming dates: April 2027 · **Private course from 41 Mill IDR** + "BOOK A PRIVATE COURSE" (mailto).
  6. Accommodation & Venue: not included; 2 meals (light breakfast + lunch); Location "UBUD, INMOVEMENT"; onsite sauna, cold plunge, mineral warm pool, restaurant.
  7. "Meet Your Experts" (list): Anthony Ball (Lead Teacher), Alicia Casillas (Pranayama Teacher), Dr Brendan (Mental Health Expert), Andrea Abian (Anatomy Teacher). CTA "JOIN THE TRAINING" → Acuity (100 hr training appointment type).
  8. Commitment rules (attend all days, no phones, punctuality, respect) + YouTube embed `37rFihLhnZU`.
  9. Infographic `WhatsApp Image 2026-03-05…jpeg` ("9-day journey").
  10. "Example Course Schedule*" Day 1–8 timetable (verbatim in content file).
  11. Optional extras (massages, Reiki, Craniosacral) + "JOIN APRIL 2027 TRAINING".
- **Height:** 15,878 px desktop / 19,126 px mobile, the longest page on the site.
- **Risks:** 4 different checkout/booking destinations; 8 vs 9 days; IDR 33 m (page/Stripe) vs IDR 41 m (Acuity) vs US$2,445 (store) vs €1,499 in-person (Sevaluz). See 08.

### 3.3 Yin Yoga Teacher Training — `/yin-yoga-teacher-training-bali`
- **Title:** "Yin Yoga teacher training Ubud, Bali | Let's Get Lost Bali". **No H1** (H3 used). OG `DSC03104.jpg`.
- **Sections:** (1) hero `DSC06865.jpg` + "65-Hour Somatic Yin Yoga Certification in Ubud"; (2) "Yin Yoga Teacher Training Bali 2027 · **March 10–14** · With Alicia Casillas", Melanie Koulouris quote, intro, "Book Now" (Stripe €950), "Book A Discovery Call Now" (Acuity), native video 148 s; (3) About the Training + What You Will Learn (4 groups of bullets) + Who This Training Is For + BOOK NOW; images `1.jpeg`, `DSC01753.jpg`; (4) WHAT DOES TUITION INCLUDE: 65-h YACEP certification; **€950 EUR (approx. IDR 16,500,000)**; meals; dates; location The In Movement Studio; (5) About Your Teachers: Alicia Casillas (Yin Yoga Lead Teacher, long bio) and Andrea Abian (Anatomy); (6) Daily Schedule (8:00–17:30) + `DSC09321.jpg`; (7) Accommodation: not included, 2 nearby options (Compass Rose Ubud, The Kanjeng Elitya Villa) with images; (8) Optional extras: treatments, food, sauna & cold plunge + BOOK NOW.
- **Risks:** Stripe product says **March 11–15, 2027**, but the page says March 10–14. "Somatics &amp; Nervous System Support" shows a raw HTML entity. Typo "day to today".

### 3.4 Reiki Courses — `/reiki-courses`
- **Title:** "Reiki Trainings: Ubud and Amed, Bali" (Amed is never mentioned in the body). **H1:** "Reiki Courses in Ubud, Bali".
- **Sections:** (1) hero `DSC06557.jpg`; (2) "Become a Certified Reiki Practitioner & Reiki Master/Teacher" + Register Now (Acuity Courses category) + Schedule A Discovery Call + intro + location + Alicia quote ("max group size of 5"), native video 56 s; (3) Level 1 / Level 2 / Master/Teacher curricula (bullet lists); (4) **Next Courses**: L1 **IDR 4.7 m**, **March 7th 2027**; L2 **IDR 7.7 m**, **March 8th 2027**; Master **IDR 12 m**, TBC. Each has "REGISTER NOW" → **Momence (broken)**. Packages: L1+L2 IDR 12 m; L2+Master IDR 19 m; all three IDR 23.7 m → "BOOK A PACKAGE DEAL" (Acuity). Private 1:1 → mailto (BCC to a personal Gmail). "Need more information?" → Discovery call; (5) Online Reiki courses (3 cards → yogaliciacasillas.com); (6) More Details **accordion** (Who / L1 / L2 / Master / How); (7) Meet the Teacher: Alicia; (8) Sign Up Here / Training Details: "1-day courses running from **8 pm – 5 pm**" (sic).
- **Risks:** duration conflict (two 4-hour days vs 1-day 8 pm–5 pm); class size 5 vs Acuity 20; the three primary REGISTER buttons are broken.

### 3.5 Spain (Coming 2027) — `/spain`
- One section: "🌿 Trainings and Retreats in Spain – Coming 2027", copy about a retreat space near Cartagena, 3 principles, "Retreats and trainings will open for booking in **late 2026**", quote, **JOIN THE SPAIN WAIT LIST** (MailerLite hosted form). Image of a wooden house at sunset. No hero, no H1. Short page (1,599 px).
- **Risk:** the "late 2026" booking promise is now due (audit date Oct 2026).

### 3.6 Men's Circles — `/mens-circles`
- **H1** "Men's circles" over hero `SAK00241.jpg`. Section 2: "Men's Circles In Bali & Online" (partnership with Solis Brotherhood); **Committed Tuesday Circle**: in person, Petulu address, 2 h, minimum 2 months, "Get in Touch" (mailto); **Weekly Online Men's Group**: Monday 6–8 pm Bali time, Zoom, 2 h, minimum 2 months, "Find Out More" (mailto); 11-point code → solisbrotherhood.com; images `Samurai Brotherhood`, `Online Men's Circle`; native video 39 s. Section 3: closing image `SAK00074.jpg`.
- **OG image** is the legacy "Men's Embodiment Centre" logo. **Tuesday circle time not stated.**

### 3.7 Online Trainings — `/online-trainings`
- **H1s** "Online Breathwork" / "Instructor Training (100HR)" (4 H1s on the page). "Filmed Live in Bali | Transformational | Trauma-Informed | Certified". **ENROL ONLINE · €499** → sevaluz.co/breathwork. Syllabus PDF. "€499 includes 1 private 1:1 sessions with Anthony". IBF badge. What You'll Learn (7 topics). Anthony bio (long, third-person, different from other pages). **Testimonials**: 4 YouTube embeds. "What You're Getting Into". Second ENROL. "Still have Questions? BOOK A DISCOVERY CALL" → **sevaluz.co** (not a discovery call).
- **Meta description** says "Includes **6** private mentorship sessions", but the body says **1**.

### 3.8 Mentorship Training — `/practitioner/mentorship-training`
- No meta description, no H1. Hero `DSC03390.jpg`. "Master Your Breath. Deepen Your Practice. Lead With Confidence." What makes it different (5 points); options: **1:1 Private** (3/6/12 months) and **Biweekly Group** (max 8, 90 min, 3-month minimum); Who it's for; 5-step framework; **Investment**: 3 mo IDR 18 m · 6 mo IDR 30 m · 12 mo IDR 55 m · Group IDR 1.6 m/month. CTAs: "Book Your Discovery Call" (Acuity application) and "Book Your Mentorship Package" (Acuity type 83716691). Anthony bio. Diagram "Anatomy of a Confident Practitioner". Core Principles + 3 image cards. Accountability section. Closing band "Dive Inward – Connect – Grow – **Thrieve**" (typo).
- Uses 🔹 emoji headings and ✅ lists.

### 3.9 Meditations — `/meditations`
- Hero `DSC03510.jpg` + "Download Your Free Meditations". Copy targets busy students ("child care, classes, assignments"). Offers a 20-minute download; testimonial "— Jamie, 3rd-year Psychology Student" (**verify authenticity**); CTA → MailerLite hosted form. No H1, no meta description.

### 3.10 Contact — `/contact`
- Hero `SAK00111.jpg` + H1 "Contact Us.". "Get in touch." + Squarespace form (First Name*, Last Name*, Email*, Message*; honeypot field; reCAPTCHA Enterprise invisible; button "Send"). Location: "Petulu, Kecamatan Ubud, Kabupaten Gianyar, Bali 80561" + Google Map (pin ≈ −8.4863, 115.2683).
- **Not on the page:** phone, WhatsApp, email and opening hours (they are in the footer only).

### 3.11 About Us — `/about-us`
- Hero `DSC03390.jpg` + H1 "About Us". Creation (founders Alicia Casillas Ramos & Anthony Ball, husband-and-wife; Ubud, soon Spain). Our Values (6). Our Purpose (3 core truths). "Read more about our philosophy →" (**plain text, not a link**). "HOME PAGE" → `/home`.

### 3.12 Philosophy — `/philosophy`
- Hero `DSC00275-HDR.jpg` + H1 "Our Philosophy". A Centre for Connection · Eco-Friendly by Design · Rooted in Community · Founded with Purpose ("In 2020… Ant began building Let's Get Lost in Ubud"). "Contact Us". Quote band "The quieter you become, the more you can hear — Ram Das" (spelling: usually "Ram Dass").

### 3.13 Sustainability — `/sustainability`
- Hero + H1 "Sustainability Done Right". "Make An Impact" (H1, the second H1). Accordion-style 3 cards: Solar Power ("Harnessing…"), Rain Power ("Rain…"), Waste Water ("Reusability…"). Live Sustainably: Spring Water (70 m deep) and Building Materials (steel + reclaimed timber, "luxury villa"). HOME PAGE. Ram Das quote band.

### 3.14 Our Teachers — `/our-teachers`
- Hero + H1. Three bios with Canva portrait graphics: **Anthony Ball**, **Alicia Casillas**, **Rena** (West Java; breathwork with gamelan/angklung). HOME PAGE. Dr Brendan and Andrea Abian are **not** on this page (they appear only on training pages).

### 3.15 FAQs — `/faqs` (orphan)
- Hero `unsplash-image…jpg` (stock) + "Frequently Asked Question's". 9 Q&As built with a **custom code-block toggle** (`.dropdown h3` + `.answer`), not the native accordion. Groups: Visiting / Logistic / Hosting at The Centre. Answers reference **"EC"** (Embodiment Centre), venue size (10 are covered, 5 are garden, 30 people), venue hire for retreat hosts, a 15% booking fee, "one luxury villa". Last section: email manager@ + Contact Us.
- **Content is largely legacy** (venue hire); see 08.

### 3.16 Blog — `/blog` + 10 posts + 11 tags
- Index: hero `DSC00312.jpg` + "Blog"; 10 posts listed with date (DD/MM/YYYY), title, excerpt, thumbnail.

| Date | Title | Slug | Author (JSON-LD) | Words |
|---|---|---|---|---|
| 21/01/2025 | The Benefits of Practicing Breath-Holding: A Path to Better Health and Resilience | `the-benefits-of-practicing-breath-holding-…` | Anthony Ball | ~800 |
| 16/01/2025 | Building Strong Connections: The Arka Brotherhood and the Power of a Weekly Men's Group | `building-strong-connections-…` | Anthony Ball | ~575 |
| 15/01/2025 | A Step-by-Step Reiki Healing Meditation to Restore Balance and Harmony | `a-step-by-step-reiki-healing-meditation-…` | Anthony Ball | ~860 |
| 14/01/2025 | How to Improve Your Sleep with Nose Breathing | `how-to-improve-your-sleep-with-nose-breathing` | Anthony Ball | ~915 |
| 21/12/2024 | Unlocking the Power of Reiki: Healing Through Energy | `reiki-therapy-in-bali-ubud` | Anthony Ball | ~710 |
| 31/10/2024 | How Stress Can Cause Disease | `how-stress-can-cause-disease` | Anthony Ball | ~785 |
| 25/10/2024 | Relaxation Through Breathwork | `relaxation-through-breathwork` | Anthony Ball | ~705 |
| 23/01/2024 | Breathwork and Cacao Ceremony in Ubud, Bali | `breathwork-and-cacao-ceremony-in-ubud-bali` | "Guest User" | ~480 |
| 20/12/2023 | Exploring the Spiritual Dimensions of Breathwork | `exploring-the-spiritual-dimensions-of-breathwork` | "Guest User" | ~500 |
| 17/12/2023 | What is Breathwork? | `what-is-breathwork` | "Guest User" | ~450 |

- Post template: title, short date ("21 Jan"), feature image, body, end-of-post CTA (→ training page or mailto), tags (older posts only), Previous/Next.
- Tags: breath, healing, breathing, spiritualaspectofbreathwork, wellness, spiritualpractice, breathwork, spirituality, breathingtechniques, whatisbreathwork, benefitsofbreathwork. Each archive shows only the 2023 posts.
- Most posts have **no meta description**. Sitemap image captions carry Squarespace placeholder text ("Make it stand out / Whatever it is, the way you tell your story online can make all the difference.").

### 3.17 Store — `/store`, categories, 6 products (orphans)

| Product | Route | Price shown (USD) | Notes |
|---|---|---|---|
| 100 Hour Breathwork **Teaining** (typo) | `/store/p/100-hour-breathwork-teaining` | US$2,445 (or 4 monthly payments) | "9-days in-person training, Location **Amed**, Bali" |
| 6 Month Online Breathwork Teacher Training | `/store/p/6-month-online-breathwork-teacher-training` | Sale US$2,000 (was 2,500), or 6 payments | Programme not described anywhere else on the site |
| Gift Voucher | `/store/p/gift-voucher` | US$25–200 in US$25 steps | Image appears AI-generated |
| Reiki Level 1 | `/store/p/reiki-level-1` | Sale US$265 (was 315) | — |
| Reiki Level 2 | `/store/p/reiki-level-1-g6rr3` | Sale US$455 (was 504) | Slug mismatch |
| Reiki Master/Teacher Training | `/store/p/reiki-level-1-g6rr3-flxph` | Sale US$705 (was 755) | Slug mismatch |

- Category pages: Courses (3), Gift Vouchers (1), **Class Packages (empty)**. `/cart` shows an empty state. **Checkout was not exercised.**

### 3.18 Legal — `/terms-and-conditions`, `/privacy-policy`
- **Terms:** "Terms & Conditions for hosts and guests". Covers venue booking for retreat leaders (3–6 part payment plan, US$40 transfer fee, temporary work permit, postponement fees 10%/20%, Covid-19/force majeure), guest booking ("Detox or TM Retreat", 50% deposit), check-in 2 pm / check-out 12 pm, "Complimentary Pick up & Drop off from Airport", utilities, cancellation/insurance. **Nothing covers the current training products.**
- **Privacy:** generic generator text ("created with the help of the Free Privacy Policy Generator"), covering CCPA, GDPR and children's information.
- Both OG images use the legacy Men's Embodiment Centre logo.
