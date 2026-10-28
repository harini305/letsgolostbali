# 07 — Responsive Observations

**Tested viewports.**
- 1440×900 desktop, 768×1024 tablet (mobile emulation, touch) and 390×844 mobile (iPhone UA, touch), for all non-blog routes.
- 1440 and 390 for the blog index, 10 posts and 11 tags.
- Breakpoint probe on Home at 1920, 1280, 1100, 1024, 900, 800, 767, 600, 375 and 320 (desktop emulation, 900 px tall).

Full-page screenshots for every route and viewport are in [`screenshots/`](screenshots/INDEX.md).

**Limitations.**
- Headless Chromium only. Safari/iOS and Firefox rendering were not tested.
- The MailerLite popup covers the first view in all captures.
- Some fixed/parallax backgrounds render blank in full-page captures.
- Orientation changes and real-device tests were not performed.

---

## 1. Breakpoints (observed)

| Width | Header | Home "Upcoming" cards | Notes |
|---|---|---|---|
| ≥ 800 px | Desktop nav (4 dropdowns) + logo left | 3 per row | Layout is fluid; no max-width container on full-bleed sections |
| 768 px (tablet emulation) | **Burger** menu | 3 per row (narrow cards, ~200 px text columns) | Cramped: card titles wrap to 2–3 lines |
| 600–767 px | Burger | 2 per row (third card wraps alone) | Orphaned third card |
| ≤ 375–390 px | Burger | 1 per row | Long single column |

No horizontal overflow (`scrollWidth > innerWidth`) was detected on **any** route at any tested width (Verified).

## 2. Page length by viewport (px, Verified)

| Route | 1440 | 768 | 390 |
|---|---|---|---|
| `/` | 7,268 | 6,508 | 8,521 |
| `/breathwork-instructor-training-bali-ubud-` | **15,878** | 14,633 | **19,126** |
| `/reiki-courses` | 13,517 | 11,149 | **16,719** |
| `/practitioner/mentorship-training` | 12,187 | 11,013 | 13,786 |
| `/online-trainings` | 9,370 | 8,326 | 10,363 |
| `/yin-yoga-teacher-training-bali` | 10,249 | 8,926 | 11,986 |
| `/mens-circles` | 4,332 | 3,812 | 4,711 |
| `/about-us` | 3,986 | 3,808 | 4,769 |
| `/philosophy` | 3,338 | 3,201 | 4,038 |
| `/sustainability` | 4,301 | 3,611 | 5,539 |
| `/our-teachers` | 4,026 | 4,008 | 4,996 |
| `/contact` | 2,267 | 2,084 | 2,300 |
| `/faqs` | 2,764 | 2,741 | 2,978 |
| `/meditations` | 2,805 | 2,549 | 3,015 |
| `/spain` | 1,599 | 1,606 | 2,127 |
| `/terms-and-conditions` | 4,848 | 5,991 | 8,478 |
| `/privacy-policy` | 4,701 | 5,536 | 7,639 |
| `/blog` | 5,611 | 5,175 | 7,541 |

The three training pages need **16–19k px of scrolling on mobile** (about 20–23 phone screens). This is the clearest responsive/UX problem on the site.

## 3. Component behaviour

| Component | Desktop (1440) | Tablet (768) | Mobile (390) |
|---|---|---|---|
| **Header** | `absolute`, transparent over hero; height ~184 px (logo 164 px tall); not sticky | Burger right, logo left; header ~207 px | Burger; header ~161 px |
| **Mobile menu** | — | Full-screen white overlay; large centred adelle-ultrathin folder labels with chevrons; sub-panels with "Back" | Same. **White logo is invisible on the white overlay**; close "×" top-right |
| **Dropdowns** | Hover, translucent black panel | n/a (folders in overlay) | n/a |
| **Home hero** | 100vh photo; translucent grey text panel lower-left; wavy bottom divider | Same, smaller text panel | Text panel fills width; heading wraps ("Quality Teaching & Trainings") |
| **Interior heroes** | 41–62% viewport-height photo bands; white H1 on some, none on others | Similar crop, shorter | Crop becomes tall/narrow; subject sometimes cropped (focal points set per image) |
| **List cards** | 3-up, image under text (Home) or image on top (Reiki online, experts) | 3-up narrow | 1-up stacked |
| **Two-column text/image** | Side by side | Mostly side by side | Stacked, image first or second depending on block order (inconsistent) |
| **Long schedules / curricula** | Single long text column | Same | Same; very long |
| **Accordions / FAQ toggles** | Work | Work | Work (tap) |
| **Videos** | Inline, ~657 px wide | Full content width | Full width, 16:9 |
| **Buttons** | Red #F60606 pills (6.4 px radius), inline; often several CTAs stacked one per line | Same | Full-width-ish, stacked; 4 CTAs in a row on the breathwork hero stack vertically |
| **Footer** | Grey #DFE0E1 block; links + contact text + social icons; large text (24 px) | Same, stacked | Stacked; long email line wraps |
| **Popup (MailerLite)** | Centred modal ~460 px wide over the hero | Centred modal | Nearly full-screen modal; must be closed before the menu can be used |
| **reCAPTCHA badge** | Fixed bottom-right | Same | Same; overlaps content corner |
| **Typography** | H2 46 px / body 17.7 px, weight 100 | H2 ~33 px / body 16.9 px | H2 ~34 px / body 17 px. Thin weight on small screens reduces legibility |

## 4. Responsive issues to avoid in Phase 2
1. Ultra-long single-column mobile pages (training pages): needs progressive disclosure (tabs/accordions for curriculum and schedule), sticky or repeated CTAs, and less duplication.
2. Auto popup blocking first view and the navigation on mobile.
3. Logo contrast in the mobile menu.
4. Orphaned third card at 600–767 px.
5. 768 px tablet layout keeps 3 cramped columns.
6. Thin type on photos (white weight-100 nav and headings over busy jungle imagery).
7. Inconsistent stacking order of image/text pairs on mobile.
8. Heavy original images (up to 4 MB PNGs) served to mobile through Squarespace (it does serve resized `?format=` variants, but some graphics remain large).
