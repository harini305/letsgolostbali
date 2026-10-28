# 05 — Brand Reference: Typography, Colour, Logo, Visual Identity

**Method.** Values marked **Verified** come from computed styles in the rendered DOM (headless Chromium, 1440/768/390 px) or from the Squarespace site stylesheet (`site.css`, the site's design tokens). Values marked **Estimate** were sampled from image pixels or read visually from screenshots. Raw data: [`evidence/computed-brand-styles.json`](evidence/computed-brand-styles.json).

---

## 1. Typography (original site)

### 1.1 Font families in use

| Family | Source | Weight/style loaded | Used for | Status |
|---|---|---|---|---|
| **adelle-ultrathin** (Adobe Fonts / Typekit; Adelle family by TypeTogether, Ultra Thin cut) | `use.typekit.net` kit (embedded via Squarespace) | **100** normal + 100 italic | **All** headings, body copy, navigation, footer, meta text, site title | **Verified** (CSS vars `--heading-font-font-family`, `--body-font-font-family`, `--meta-font-font-family` = `"adelle-ultrathin"`, weight 100) |
| **Poppins** | Squarespace-served font | **500** | All buttons (primary/secondary/tertiary) | **Verified** (`--primary-button-font-font-family:"Poppins"`, 500, 0.9rem, letter-spacing .02em) |
| Palatino Linotype / Book Antiqua (system serif) | MailerLite iframe | 400 | Popup heading "Receive A Free Meditation" | **Verified**; third-party widget, not brand |
| Montserrat | MailerLite iframe | 400 | Popup body and inputs | **Verified**; third-party widget |
| Clarkson | Squarespace UI | 400 | Hidden Squarespace UI input | **Verified** but incidental (not visible) |
| Condensed sans in logo wordmark "LET'S GET LOST" | Baked into the logo PNG | — | Logo only | **Estimate** (image text; family not identifiable from files) |
| Helvetica/Arial-style sans | Inside the syllabus PDF and Canva graphics | — | PDFs, infographics | Visual observation only |

> **Readability note:** the brand body face is an *ultra-thin (100) slab serif* used at ~17.7 px for body text and in **white on photos** for navigation. Thin strokes at small sizes are a legibility and contrast risk. Phase 2 should not copy this weight for body text.

### 1.2 Type scale (site tokens, Verified)
Base font size: **16 px** (`--base-font-size`). Squarespace scales the token values fluidly with the viewport. The rendered px values below were measured at 1440 → 768 → 390.

| Token | Value | Rendered @1440 | @768 | @390 | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| Heading 1 | 4rem | 66.4 px (page heroes) / 43.9 px (Home override) | ~23–33 px | ~23–34 px | 1.4em | 0 |
| Heading 2 | 2.8rem | 46.2 px | 32.6 px | 34.2 px | 1.4em (≈ 60 px) | 0 |
| Heading 3 | 2.2rem | 36.2 px | 27.1 px | 28.2 px | ≈ 48 px | 0 |
| Heading 4 | 1.6rem | 26.1 px (57.3 px where overridden on Home) | 21.5 px | 22.1 px | ≈ 35.6 px | 0 |
| Large text | 1.5rem | 24.4 px (footer and some leads) | 20.6 px | 21.1 px | 1.5em | 0 |
| Normal text (body, nav) | 1.1rem | **17.68 px** | 16.9 px | 17.0 px | 1.5em (26.5 px) | 0 |
| Small text | 0.9rem | 14.3 px | — | — | 1.5em | 0 |
| Meta text | — | — | — | — | 1em | .01em |
| Buttons (Poppins 500) | 0.9rem | **14.27 px** | 14.4 px | 15.0 px | 1.2em | .02em (0.285 px) |
| Header button (unused) | 0.9rem | — | — | — | 1.2em | .02em |
| Site title (text fallback) | 2rem | — (logo image used) | — | — | 1.4em | 0 |

**Observations:**
- Text transform is `none` everywhere, although some button labels are typed in ALL CAPS in content (e.g. "JOIN APRIL UBUD 2027", "BOOK A DISCOVERY CALL").
- **Inconsistent hierarchy:** headings are styled per block. H4 renders larger than H2 on Home, the Home H1 is smaller than other heroes, and some pages have no H1 while others have 2–11.
- The mobile scale barely changes between 768 and 390 (Squarespace fluid type). The headings stay light (weight 100) at every size.

### 1.3 Mandatory Phase 2 typography rule (recorded requirement)
> **The redesigned website must use exactly TWO font families across the entire site:**
> 1. One family for **headings**.
> 2. One family for **body text, navigation, buttons, forms, cards, footer and all other UI**.
>
> Both must be readable, professional and not decorative. No third family is allowed for any section, component, footer or decorative heading. Build hierarchy with weight, size, line-height and letter-spacing only. Use the same sizes for equivalent components on every route.
>
> **Final fonts are NOT chosen in this audit** (deferred to Phase 2 approval). Options to consider are below.

### 1.4 Options for Phase 2 (for discussion, not decisions)
- **Keep a link to the original heading voice:** the brand's identity is a *light slab serif*. A heading family with a slab or soft-serif character at **regular to medium** weight (not 100) would keep that recognisability while fixing legibility. Adelle itself (Adobe Fonts, licence/kit required) is an option if the client holds an Adobe Fonts licence; otherwise use an open-licence slab or serif.
- **Body/UI:** a neutral, highly legible sans (open-licence, variable, self-hostable via `next/font/local` or `next/font/google`). Poppins already appears on buttons, so it could be considered as the single UI/body family to preserve continuity; its readability at long-form body sizes should be evaluated against alternatives.
- **Constraints:** self-host to avoid layout shift; latin + latin-ext subsets (Indonesian and Spanish place names); limit weights (e.g. heading 400/600, body 400/500/600).
- **Licensing check needed:** Adobe Fonts kits are tied to the client's Adobe account. They cannot be self-hosted without permission.

---

## 2. Colour

### 2.1 Site palette tokens (Verified from `site.css` and computed styles)

| Role | Token | HSL (source) | HEX (computed) | Where used |
|---|---|---|---|---|
| White | `--white-hsl` | 0,0%,100% | **#FFFFFF** | Default section background; nav text on photos; button text |
| Black | `--black-hsl` | 0,0%,0% | **#000000** | All heading and body text; black sections; list-card buttons; quote bands |
| Accent (off-white) | `--accent-hsl` / `--safeLightAccent-hsl` | 220,15.79%,96.27% | **#F4F5F7** | Text colour inside `bright-inverse` (black) sections (Contact location, Mentorship bio) |
| Light accent (cool grey) | `--lightAccent-hsl` | 210,3.23%,87.84% | **#DFE0E1** | **Footer background**; `light` / `light-bold` sections (Home "Feed your body", Reiki, breathwork "Meet Your Experts") |
| Dark accent (pale periwinkle) | `--darkAccent-hsl` | 224.21,29.23%,87.25% | **#D5DAE8** | `dark`-theme section base, almost always hidden under hero photos with an overlay |
| Safe dark accent | `--safeDarkAccent-hsl` | 0,0%,0% | #000000 | — |

### 2.2 Interactive colours (Verified)

| Element | Default | Hover / active | Notes |
|---|---|---|---|
| **Primary CTA button** (site-wide) | bg **#F60606** (rgb 246,6,6), text #FFFFFF, Poppins 500 14.3 px, radius **6.4 px** (token 7.2 px), padding ~1.2rem | **opacity → 0.8** (`transition: opacity .1s linear`); colour unchanged | Bright pure red. The strongest brand accent on the live site |
| List-section card button (Home cards) | bg **#000000**, text #FFFFFF, radius 6.4 px | — | Home "Upcoming Events" only |
| Nav link | #FFFFFF on photo, adelle-ultrathin 100, 17.7 px | Folder opens on hover | No underline or colour change observed |
| Nav dropdown panel | **rgba(0,0,0,0.38)**, square, no shadow; links #FFFFFF 17.7 px | — | Low contrast over light photos |
| Mobile menu overlay | **#FFFFFF** background, black links | Sub-folder slide | Logo (white) is invisible on it |
| Body links | #000000, underlined | — | — |
| Form fields (Squarespace tokens) | fill **#FAFAFA** (0,0%,98%), border #000000, text #000000 | — | Contact form |
| Section overlays on hero images | black @ 0.15–0.41, white @ 0.15–0.81, periwinkle @ 0.36 | — | Varies per section (no system) |

### 2.3 Secondary palette on newer training graphics (Estimate: pixel-sampled)
These come from the Canva-made section backgrounds used on the Breathwork, Online and Mentorship pages (2025–26). They form a **softer, warmer visual direction** than the original black/white/red.

| Colour | HEX (estimate) | Source image |
|---|---|---|
| Linen cream | **#EDE8E0** / #ECE7DF | `The_Architecture_of_Breath.pdf.png` |
| Pale cream | **#F3F3E8** | `Breathwork_Mastery_Bali.pdf (1).png` |
| Sage-teal | **#8AA69B** | wave graphic |
| Mist sage | **#D1D3C8** | wave graphic |
| Sand | **#E1CBA5** | `Breathwork_Mastery_Prospectus.pdf (1).png` |
| Moss/sage | **#8E9A87** | prospectus graphic |
| Slate blue-grey | **#667A7F** | `Colour Palette CBA (1).jpg` (solid colour image) |
| Deep olive | **#475547** | `Colour Palette CBA (4).jpg` (solid colour image) |
| Syllabus PDF dark | **#2F2C26** (est.) with copper accent **#C8955E** (est.) | Syllabus PDF (visual) |

The files named "Colour Palette CBA" are flat swatch images used as section backgrounds. This suggests someone defined a palette deliberately, but no brand guideline document was found.

### 2.4 Incidental colours (not brand)
- **#0724A7** blue: IBF Network badge (third-party logo).
- MailerLite popup: cream background, olive-gold text **#76642E**, olive input borders, black button (third-party form styling).
- Google Maps tiles, reCAPTCHA badge, YouTube/Spotify embeds.
- Logo-style red in the Yoga Alliance badge (third-party).

### 2.5 Colour summary for Phase 2
- **Core (verified, current site):** black #000000 · white #FFFFFF · cool grey #DFE0E1 · off-white #F4F5F7 · CTA red #F60606.
- **Warm natural extension (estimate, newer graphics):** linen cream, sage-teal, sand, moss, deep olive, slate. These match the photography (jungle green, bamboo, timber, water).
- **Decision for the client:** is the **pure red CTA (#F60606)** a deliberate brand colour or a template leftover? It clashes with the earthy photography and the newer graphics. Recommend confirming before Phase 2 (see 08).

---

## 3. Logo & marks

| Asset | File (local) | Spec | Notes |
|---|---|---|---|
| **Primary logo**: line-art pine/fir tree mark above the condensed wordmark "LET'S GET LOST" | `original-assets/brand/ALL__in-the-nature-(14).png` | PNG RGBA **1556×2000**, **white only** on transparent | Rendered ~128×164 px top-left on all pages; links to `/`. No dark/positive version, horizontal lock-up or SVG found |
| **Icon mark** (tree only, black) | `original-assets/brand/ALL__favicon.ico` | Actually a **PNG 1244×1600** served with an `.ico` name | The only dark version of the mark. Usable as a reference for an SVG redraw |
| Legacy logo "Men's Embodiment Centre – Disconnect To Reconnect" (triangle mark, serif wordmark) | `original-assets/brand/mens-circles__Mens-Embodiment-Centre-logo-black-(1).png` | PNG 1000×527 | **Legacy brand**: still the OG/share image on 5 pages (Men's Circles, Philosophy, Sustainability, Terms, Privacy). Do not reuse as the brand |
| Third-party badges | `…__1.png` (Yoga Alliance YACEP), `…__blue-bg-white4x-100.jpg` (IBF Network) | PNG/JPEG | Keep only if accreditation is current (confirm) |

**Logo placement:** top-left over the hero, on a transparent header, with generous top padding. On the white mobile menu the white logo disappears; a dark variant is needed.

**Recommendation:** request vector (SVG/AI/PDF) logo files from the client. If unavailable, a faithful SVG redraw from the 1556×2000 PNG and the black favicon is feasible, but it **requires client approval**.

---

## 4. Other visual identity elements (Observed)

| Element | Original treatment |
|---|---|
| **Photography** | Real, warm, natural-light documentary photos of the Ubud centre: bamboo structures, jungle plants, koi pond, rice-field light, people on mats, gong/sound, men's circles. Mostly Sony "DSC" originals (3936×2624, CDN-capped at 2500 px). This is the strongest brand asset. A few Unsplash stock images (FAQ hero, Zoom laptop, stress post) and Canva composites are mixed in |
| Image cropping | Full-bleed heroes cropped to roughly 41–62% of viewport height at 1440. Cards use 3:2 and square crops. Teacher portraits are Canva "Instagram post" graphics (4:5) with baked-in styling |
| **Overlays** | Semi-transparent black/white/periwinkle overlays on hero photos (opacity 0.15–0.81, inconsistent) |
| **Shape language** | Mostly square edges; buttons 6.4–7.2 px radius; MailerLite popup 8 px radius; no card radius/shadows |
| **Section dividers** | Home hero has a **wavy bottom edge** (Squarespace section divider) |
| **Decorative motifs** | Flowing teal/sage "breath wave" graphics on cream linen texture (training pages); concentric-ring spiral (IBF badge) |
| **Shadows / depth** | None in the site UI |
| **Icons** | Squarespace default social icons (Instagram, X, YouTube, Facebook) in the footer; dropdown triangles in the nav; emoji used as icons in copy (🔹 ✅ ✔️ 🌿 🔥) |
| **Tone of voice** | Warm, spiritual and somatic ("come home to your body", "holding space", "embodiment"). Men's-work pages are more direct ("cut through the noise", "brotherhood"). Training pages are sales-oriented ("Mastery", "Investment") |
| **Overall personality** | Earthy, calm, sanctuary-like jungle retreat; founder-led and personal; spiritual but evidence-referencing ("science meets spirit") |

### Elements NOT to carry forward automatically
Ultra-thin body weight; pure-red CTA (pending client confirmation); emoji headings; inconsistent overlays and heading sizes; Canva graphics with baked-in text used as section backgrounds; the legacy Embodiment Centre logo; the auto-opening popup on first view.
