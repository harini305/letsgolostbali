# Source Audit: letsgetlostbali.com (Phase 1)

Research-only audit of https://www.letsgetlostbali.com, carried out on **2026-10-28** to prepare the Phase 2 frontend rebuild (Next.js App Router · JavaScript · GSAP/ScrollTrigger).
**Status: Phase 1 complete. Awaiting review and approval before any Phase 2 work.**

## Documents

| File | What it contains |
|---|---|
| [01-audit-report.md](01-audit-report.md) | Executive findings, coverage, methods, limitations, confirmations |
| [02-page-inventory.md](02-page-inventory.md) | All routes (status, type, source, recommendation), shared header/footer, section-by-section inventory of every page |
| [03-content-inventory.md](03-content-inventory.md) | Facts to preserve (contact, offers, prices, dates, teachers, CTAs, testimonials, FAQs, SEO metadata), duplication and priority |
| [04-assets-manifest.csv](04-assets-manifest.csv) | 134 asset records: source URL, local path, page/section use, dimensions, size, alt, intended use, availability, quality/performance notes |
| [05-brand-reference.md](05-brand-reference.md) | Fonts and type scale, verified and estimated colours, logo files, visual identity; **two-font rule** |
| [06-functionality-and-dependencies.md](06-functionality-and-dependencies.md) | Navigation, forms, booking/payment systems, embeds, tracking scripts, verification level per feature |
| [07-responsive-observations.md](07-responsive-observations.md) | Breakpoints, page lengths per viewport, component behaviour at 1440/768/390 |
| [08-issues-gaps-questions.md](08-issues-gaps-questions.md) | Conflicting facts, broken links, legacy content, typos, SEO/a11y gaps, asset gaps, **client questions** |
| [09-phase-2-recommendations.md](09-phase-2-recommendations.md) | **Mandatory Phase 2 requirements**, proposed IA and redirects, integration and asset-pipeline plan |

## Supporting evidence

| Folder / file | Contents |
|---|---|
| [`content/pages/`](content/pages/) | Verbatim text per route (52 files), section by section, with buttons, images and embeds |
| [`content/pages.json`](content/pages.json) | The same, structured |
| [`content/hidden-accordion-faq-product-content.json`](content/hidden-accordion-faq-product-content.json) | Collapsed accordion/FAQ text and store product data |
| [`content/acuity-appointment-types.json`](content/acuity-appointment-types.json) | External booking catalogue (prices in IDR, durations) |
| [`original-assets/`](original-assets/) | 92 downloaded originals: `images/` (89 MB), `documents/` (2 PDFs), `brand/` (logo, favicon, legacy logo). File names are `<first-page>__<original-filename>`. **Treat as read-only source material.** |
| [`screenshots/`](screenshots/INDEX.md) | 157 full-page and interaction screenshots at 1440/768/390, with an index |
| [`evidence/`](evidence/) | `sitemap.xml`, `robots.txt`, computed brand styles, interaction test results, crawl summaries, crawler scripts (for reproducibility) |

## Key takeaways
1. **Squarespace site, 51 live routes.** 12 are in the nav, 4 in the footer, and FAQs and the Store are orphaned.
2. **Brand:** white pine-tree logo; adelle-ultrathin (weight 100) for all text; Poppins buttons; black/white/grey with a **red #F60606** CTA. Newer pages add a cream/sage/sand palette.
3. **Conversions go to 7 external services** (Acuity, Stripe, Sevaluz, Momence, MailerLite, Squarespace Commerce, mailto). Several conflict on price, currency and dates, and the Momence links are broken.
4. **Content needs client decisions** before build: 23 factual conflicts; legacy venue-hire Terms and FAQs; time-sensitive 2027 dates.
5. **Assets:** good original photography is available locally. A vector/dark logo, video source files and venue photos are missing.

## Phase 2 gate
Do not start implementation until the client/user has:
1. reviewed these findings;
2. answered the questions in [08 §G](08-issues-gaps-questions.md) (or chosen how to handle unknowns);
3. explicitly approved Phase 2.
