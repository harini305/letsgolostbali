# 06 — Functionality, Integrations & Technical Dependencies

**Verification levels used:**
- **Observed**: visible on the site.
- **Interaction tested**: the visible UI interaction was performed (click, hover or tap) in headless Chromium.
- **Functionality verified**: the intended end result was confirmed.
- **Partially verified**: some behaviour was confirmed, but key details remain unknown.
- **Unverified**: the behaviour or backend could not be confirmed.

**Ethics/scope:** no form was submitted, no booking was made, nothing was purchased, and no payment page was progressed beyond its first screen.

---

## 1. Platform
| Item | Finding | Level |
|---|---|---|
| CMS / host | **Squarespace 7.1** (site ID `5fb63e84f95ce03b8d429fee`). Assets on `images.squarespace-cdn.com`, `static1.squarespace.com`, `video.squarespace-cdn.com` | Verified |
| Template features in use | Section themes, list sections, native video blocks, accordion block, code blocks, Instagram block, map block, form block, blog, Commerce (store/cart), section divider | Observed |
| Fonts | Adobe Fonts (Typekit) kit for adelle-ultrathin; Squarespace-served Poppins | Verified |
| robots.txt | Squarespace default; disallows `/config`, `/search`, `/account`, `/api`, `/static`, `?format=json` and similar | Verified |
| Sitemap | `/sitemap.xml`, 49 URLs, with image entries | Verified |
| Analytics / tracking (site-wide header injection) | **Google Analytics 4** `G-0ZQZK89MSL` (gtag.js) · **Google Ads** conversion/remarketing (doubleclick `viewthroughconversion/836783180`, i.e. likely `AW-836783180`) · **Meta Pixel** `2049267912209049` (`fbq('init')` + PageView) · Squarespace built-in analytics | Verified (script tags and inline config in the homepage HTML). Phase 2 must re-add these with client confirmation and consent handling |
| Other injected scripts | **jQuery 3.4.1** (ajax.googleapis.com), **Weglot** (`cdn.weglot.com/weglot_squarespace-10.min.js`) loaded but **no target languages configured and no switcher visible** (inactive), MailerLite universal.js | Verified |

---

## 2. Navigation & routing
| Feature | Behaviour | Level |
|---|---|---|
| Desktop dropdown nav (4 folders) | Opens on hover; panel rgba(0,0,0,.38). Folder titles are `<button>`s with `data-href` to folder URLs | Interaction tested |
| Folder URLs `/about`, `/offerings`, `/teacher-trainings`, `/online` | Redirect to the first child page (`/contact`, `/mens-circles`, `/breathwork-…`, `/online-trainings`) | Functionality verified |
| Mobile/tablet burger menu | Full-screen white overlay; 4 folders with chevrons; tapping a folder shows a sub-panel with "Back" | Interaction tested (390 and 768) |
| Header scroll behaviour | `position:absolute`; scrolls away with the page (not sticky; no shrink-on-scroll) | Verified |
| Skip link | "Skip to Content" → `#page` | Observed |
| `/home` duplicate | 200 OK, canonical → `/`; linked by "HOME PAGE" buttons | Verified |
| 404 page | Squarespace default "We couldn't find the page…" | Verified |
| Broken links | Footer `www.embodimentcentre.com ` relative href (site-wide 404); blog link `/breathwork-events-bali-ubud` (404); 3 Momence REGISTER links (error page) | Verified |

---

## 3. Booking, payment & lead-capture dependencies

The site has **no booking backend of its own**. Every conversion leaves the site for one of **seven** external systems. Phase 2 must keep these links working, ideally from a single config file.

| # | Service | Used for | Destinations found (exact URLs) | Currency | Level |
|---|---|---|---|---|---|
| 1 | **Acuity Scheduling** (`letsgetlostbali.as.me`, owner 14738576, calendar "Let's Get Lost Bali", TZ Asia/Singapore) | Discovery calls; online classes; Reiki registration and packages; mentorship packages; 100 h training (class) | `/online-class` · `/discovery-call` · `/discovery-call-yin-yoga` · `/reiki-course-discovery-call` · `/reiki-courses-bali` · `/reiki-package-deal` · `/100hr-breathwork-teacher-trianing` (sic) · `/Mentorship-Training-application` · `/?appointmentType=83716691` | IDR | Partially verified: all links resolve (200) to the scheduler with the correct type pre-selected; booking/payment not executed. The full catalogue is in [`content/acuity-appointment-types.json`](content/acuity-appointment-types.json). Intake forms include "Over 18 Years Old", "Refunds & Cancellation Policy" agreement, and application questions |
| 2 | **Stripe Payment Links** | Breathwork April 2027 (full and 3× plan); Yin Yoga 2027 | `buy.stripe.com/6oU6oGaud6gTdLFaerafS0i` (IDR 33 m, merchant "Let's Get Lost LTD") · `buy.stripe.com/cNiaEWbyh9t58rlcmzafS0k` (IDR 11 m/month subscription + mentorship upsell) · `buy.stripe.com/28E4gz1Bzf2bgWS0jM4ZG01` (**€950, merchant shown as aliciacasillasramos@gmail.com**, currency selector incl. INR) | IDR / EUR | Partially verified: checkout pages load with the product, price and description; payment not attempted |
| 3 | **Momence** (`momence.com/222090/…`) | Reiki Level I / II / Master "REGISTER NOW" | `/upcoming-events/137363477`, `/137363107`, `/134984930` | — | **Broken**: all 3 render "Sorry, something went wrong" (likely expired or unpublished events). Unverified whether Momence is still in use |
| 4 | **Sevaluz** (`sevaluz.co`) | Online 100 h breathwork course (€499); in-person option (€1,499) on their page | `sevaluz.co/breathwork` (also used, incorrectly, for "BOOK A DISCOVERY CALL") | EUR | Partially verified: page loads and shows prices |
| 5 | **Squarespace Commerce** | `/store` (6 products), `/cart` | Internal | **USD** | Partially verified: products, prices, "Add To Cart" and subscription options render; cart empty state verified; **checkout not tested**. Store is orphaned from navigation |
| 6 | **MailerLite** (account 988780) | Auto popup "Receive A Free Meditation" (email + name); `/meditations` download form; `/spain` waitlist | Popup form `snt8N8`; hosted forms `preview.mailerlite.io/forms/988780/162860565290551020/share` and `/169465264962799387/share` | — | Popup: Interaction tested (appears on load at all viewports, blocks clicks, has a close ×). Submissions not tested. Scripts: `assets.mailerlite.com/js/universal.js` (loaded 3× on Home) |
| 7 | **Email (`mailto:`)** | Private Breathwork course; Private Reiki course (CC manager@, **BCC aliciacasillasramos@gmail.com**); Men's circle (in-person and online); men's group from blog | `info@letsgetlostbali.com` with prefilled subject/body | — | Observed (links well-formed; email client not opened) |
| — | **Squarespace Form** | `/contact` (First, Last, Email, Message, all marked required; hidden honeypot; **reCAPTCHA Enterprise** invisible; "Send") | Squarespace form storage/email (destination not visible) | — | Partially verified: fields and reCAPTCHA confirmed; empty-submit validation **not verified** (the MailerLite popup intercepted the click); submission not tested |
| — | **Yoga Alliance / IBF** | Badges only (no links) | — | — | Observed |

### 3.1 Implementation consequences
- A Next.js frontend **cannot reproduce** Squarespace Commerce or the Squarespace form backend. Phase 2 needs decisions on:
  1. **Contact form:** replace with a form service, a Next.js Route Handler + email provider, or a `mailto:`/WhatsApp CTA. Needs client choice and credentials.
  2. **Store:** drop it, link to Stripe Payment Links instead, or keep Squarespace Commerce on a subdomain. The store is currently orphaned and its USD prices conflict with live pricing.
  3. **Booking:** keep Acuity, Stripe, Sevaluz and MailerLite as **outbound links**; optionally embed Acuity via its official iframe embed (verify the client's plan permits it).
- Centralise every outbound URL and price in one data file so date/price changes don't need code edits.
- MailerLite: decide whether the popup stays (recommend a non-blocking, delayed or exit-intent variant, or an inline signup). Its universal script must be added in the new site if it stays.

---

## 4. Media & embeds
| Feature | Details | Level |
|---|---|---|
| Native Squarespace videos (6) | Home (166 s), Breathwork (59 s, 97 s), Reiki (56 s), Yin (148 s), Men's Circles (39 s). HLS from `video.squarespace-cdn.com` (variants 1920×1080 and 640×360) using the Plyr player; autoplay muted on some | Observed. **Source MP4s are not publicly downloadable**, so request them from the client |
| YouTube embeds (5 unique) | `37rFihLhnZU` (Breathwork + Online), `6HchRfzzFhs`, `GkMuJnrQP18`, `FeUjE1hZGXY` (Online testimonials) | Observed |
| Instagram feed block | Home: 4 posts, linked to instagram.com/p/… (Aug–Sep 2024 content) | Observed. Squarespace's Instagram connection; it will not port |
| Spotify | Link-out only (no embed) | Observed |
| Google Map | `/contact`: Google Maps JS block, pin −8.4863, 115.2683 | Observed |
| PDFs | Brochure 7.9 MB (Canva; PDF metadata `containsAiGeneratedContent: Yes`); Syllabus 129 KB | Verified (downloaded) |

---

## 5. Interactive components
| Component | Where | Behaviour | Level |
|---|---|---|---|
| Accordion (native) | `/reiki-courses` "More Details" (5 items); `/sustainability` (3 items) | Click to expand | Observed (content extracted from DOM) |
| Custom FAQ toggles (code block + custom CSS `.dropdown h3:after{content:"+"}`) | `/faqs` (9) | Click a black heading bar to reveal the answer (`display:none` → block) | Interaction tested (1 of 9 opened) |
| List-section cards | Home, Reiki, Breathwork experts, Yin teachers, Mentorship mentor | Static (no carousel) | Observed |
| Video player (Plyr) | see §4 | Play/mute/fullscreen/speed controls | Observed |
| Product quantity / subscription selector | Store products | Rendered, not changed | Observed |
| Gift voucher value select | `/store/p/gift-voucher` | US$25–200 | Observed |
| Hover states | Buttons: opacity 0.8; nav: dropdown reveal | Interaction tested |
| Animations | Squarespace section/element fade-in ("data-animation-role") on load | Observed (not measured) |
| Search, filters, login, account | **None visible** (`/search` is robots-disallowed; store has a "Filters" UI only on the empty category) | Observed |
| Translation tool | Weglot script is loaded, but `Weglot.options.languages` is empty and no switcher renders. The site is effectively **English only** (`lang="en-US"`, no `hreflang`). Ask the client whether a Weglot subscription is active or intended (e.g. Spanish for the 2027 Spain launch) | Verified (runtime check) |
| Review widgets | **None** | Observed |

---

## 6. Interactive states that could NOT be verified
- Contact-form validation messages and successful submission.
- MailerLite popup submission, the success state, and the frequency/cookie rules for re-showing.
- Acuity booking completion, payment and confirmation emails.
- Stripe payment completion, payment-plan schedule and mentorship upsell totals.
- Squarespace checkout, shipping/tax settings, and whether products are still purchasable.
- Momence events (pages broken).
- Sevaluz enrolment flow beyond the landing page.
- Any keyboard-only navigation of the dropdowns (not tested).
- Logged-in or member areas (none discovered).
