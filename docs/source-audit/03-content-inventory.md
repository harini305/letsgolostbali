# 03 — Content Inventory (Preservation Reference)

This file lists the **facts and content blocks Phase 2 must preserve**, with their sources. The full verbatim text of every page is in:

- [`content/pages/<slug>.md`](content/pages/): one file per route, section by section, with headings, buttons/links, images and embeds.
- [`content/pages.json`](content/pages.json): the same data in structured form (route, title, meta, sections[]).
- [`content/hidden-accordion-faq-product-content.json`](content/hidden-accordion-faq-product-content.json): text hidden inside collapsed accordions and FAQ toggles, and store product details. This text is not in the page `.md` files because it is not visible until clicked.
- [`content/acuity-appointment-types.json`](content/acuity-appointment-types.json): every bookable item in the external Acuity scheduler, with price, duration and category.

All facts below are **verbatim or directly quoted values from the live site on 2026-10-28**. Conflicts between sources are listed here and analysed in [08-issues-gaps-questions.md](08-issues-gaps-questions.md). Nothing has been corrected.

---

## 1. Business identity & contact (verified)

| Item | Value | Source |
|---|---|---|
| Trading name | Let's Get Lost / Let's Get Lost Bali / "LGL". Also "Let's Get Lost Ubud". Legacy name: "Men's Embodiment Centre" / "EC" | Footer, titles, FAQs, OG images |
| Legal entity | "Let's Get Lost LTD" | Stripe checkout header (breathwork payment link) |
| Founders | Alicia Casillas Ramos & Anthony Ball, "a husband-and-wife team" | `/about-us` §2 |
| Founded | "In 2020 … Ant began building Let's Get Lost in Ubud" | `/philosophy` §2 |
| Address | Petulu, Kecamatan Ubud, Kabupaten Gianyar, Bali 80561 | `/contact` §3, `/mens-circles` §2 |
| Street / postcode (structured data only) | "Jl. Raya Petulu", postal code **80571** (≠ 80561 shown on the page) | JSON-LD `HealthClub` / `LocalBusiness`, all pages |
| Opening hours (structured data only) | Mo–Sa 09:00–17:00 (not shown anywhere visibly) | JSON-LD `LocalBusiness`, all pages |
| Location description | "Petulu – a ten minute drive north of Ubud" | `/faqs` (hidden answer) |
| Map pin | lat −8.4863, lng 115.2683 (Google Maps block) | `/contact` §3 |
| Phone / WhatsApp | +62 821 4561 2219 ("Tel: +6282145612219 (WhatsApp)") | Footer |
| Email | info@letsgetlostbali.com; manager@letsgetlostbali.com | Footer; `/faqs` §3 |
| Training venue (2027 trainings) | "INMOVEMENT" / "The In Movement Studio", Ubud (sauna, cold plunge, mineral warm pool, restaurant) | `/breathwork-…` §6; `/yin-yoga-…` §2, §4 |
| Instagram | https://www.instagram.com/letsgetlostbali/ | Footer |
| Facebook | https://www.facebook.com/letsgetlostubud | Footer |
| Twitter/X | https://twitter.com/letsgetlostubud (→ x.com) | Footer |
| YouTube (brand) | https://www.youtube.com/channel/UCF9f5qfSDQzgS75zE7zsSdw | Footer |
| YouTube (Anthony) | Breathwork: https://www.youtube.com/@Anthonybreathes · Men's work: https://www.youtube.com/@workingonitpod | Teacher bios |
| Podcast | "Working On It: Real Talk for Modern Men", host Anthony Ball, on Spotify | Home §3 |
| Partner sites | Solis Brotherhood (solisbrotherhood.com); Sevaluz (sevaluz.co, the online course platform); yogaliciacasillas.com (Alicia's online Reiki courses); embodimentcentre.com (linked from the footer, purpose unclear) | various |
| Accreditations claimed | Yoga Alliance 100 h CPD/continuing education (breathwork); 65 h YACEP (yin); "Member of the IBF Network" (International Breathwork Foundation) | Breathwork §2, Yin §4, badges |

---

## 2. Offerings: facts to preserve

### 2.1 100hr Breathwork Instructor Training (in person, Ubud)
| Fact | Value (verbatim where quoted) | Source |
|---|---|---|
| Format | "8 Days In-Person in Ubud, Bali. (Includes 2 nourished meals per day)" | `/breathwork-…` §4 |
| Next date | "APRIL 2027 (New enrollment) – Location Ubud, Bali (Accommodation not included)". No exact days are given on the page | §3, §5 |
| Price | "Starting from 33 million IDR (UBUD), with payment plans available on check-out" | §5 |
| Stripe one-off | IDR 33,000,000 "April 2027 Breathwork Training – April 2027 100 Hour 8 Day Breathwork Training, food (breakfast, lunch) included." | Stripe link |
| Stripe plan | IDR 11,000,000 per month ("3 x PAYMENT PLAN"); upsell "Mentorship 6 Months (3 installments) IDR 10,000,000/month" | Stripe link |
| Private course | "starts from 41 Mill IDR" (in person, online or hybrid) | §5 |
| Includes | 100 h training; food; course manual; additional material; 6 months teacher support; 100 h Yoga Alliance accreditation; certificate; instructor network; shadow work & embodiment; six 1:1 online mentorship sessions with Anthony over 6 months | §4, §5 |
| Curriculum | Art of Teaching; holding space; group and individual sessions; science & anatomy; mental health; shadow work; healing touch; business & marketing; styles: Rebirthing, SOMA, Wim Hof, Buteyko, Holotropic, Conscious Connected Breath, 3-Part Breath, pranayama | §5 |
| Schedule | Day 1–8 example timetable | §10 (verbatim in content file) |
| Commitment rules | attend all days; no phones; on time; respect everyone | §8 |
| Teachers | Anthony Ball (Lead), Alicia Casillas (Pranayama), Dr Brendan (Mental Health Expert, psychiatrist), Andrea Abian (Anatomy; physiotherapist, 15+ years) | §7 |
| Downloads | Info document PDF (Canva, 8 pages) | §2 |

### 2.2 Online Breathwork Instructor Training (100 h)
- "Filmed Live in Bali | Transformational | Trauma-Informed | Certified"; "100 hrs certified through Yoga Alliance"; "Built for yoga teachers, coaches, and healers".
- **Price "ENROL ONLINE · €499"**, sold via Sevaluz ("In partnership with Sevaluz, link below takes you to our new platform").
- "€499 includes 1 private 1:1 sessions with Anthony" (the meta description says **6**).
- "Over 50 hours of his most powerful live teaching is inside this training."
- Syllabus PDF: 4 pillars, 40+ classes, 5 assessments.
- Sevaluz page (external) also lists **IN-PERSON · €1,499** for the same "Breathwork 4.0" certification.

### 2.3 Practitioner / Mentorship Breathwork Training
| Option | Price | Detail |
|---|---|---|
| 1:1 Intensive | 3 months, **18 mill IDR** | weekly 60-min sessions (online or in person in Ubud/Amed) |
| 1:1 Deep Dive | 6 months, **30 mill IDR** | — |
| 1:1 Mastery | 12 months, **55 mill IDR** | — |
| Group Mentoring | **1.6 mill IDR per month**, biweekly 90 min, max 8, 3-month minimum | "(New)" |

Acuity add-ons match these figures (18 m / 30 m / 55 m / 1.6 m). Acuity also lists **older, conflicting** add-ons: "Breathwork Mentorship Programme 6 Months" IDR 24 m and "12 Months" IDR 43 m.

### 2.4 65-Hour Somatic Yin Yoga Teacher Training
- Lead: Alicia Casillas (E-RYT 500, YACEP; teaching TTCs since 2015). Anatomy: Andrea Abian.
- **Dates: "March 10–14, 2027"** (page). The Stripe product says **"March 11–15, 2027"**.
- **Tuition: "Regular: €950 EUR (approx. IDR 16,500,000)"**. Stripe charges €950 to the account "aliciacasillasramos@gmail.com".
- Location: The In Movement Studio, Ubud. Meals: two per training day. Accommodation not included (two nearby suggestions with external links).
- Certification: "65-Hour Yoga Alliance Continuing Education (YACEP)".
- Daily schedule: 8:00–10:00 Morning Sadhana … 16:30–17:30 Afternoon Sadhana (verbatim in content file).
- Extras: treatments (prices vary); sauna & cold plunge at a discounted rate for students.

### 2.5 Reiki Courses (in person, Ubud) and Online Reiki
| Level | Price | Date | Duration (as stated) |
|---|---|---|---|
| Level I | IDR 4.7 mill | March 7th 2027 (UBUD, INMovement) | "8 hours teaching & practicing, two days, 4 hours each day (12 pm – 4 pm)" |
| Level II | IDR 7.7 mill | March 8th 2027 (UBUD INMovement) | same wording |
| Master/Teacher | IDR 12 mill | "TBC (Book On Request)" | same wording |
| Package L1 + L2 | IDR 12 mill | — | — |
| Package L2 + Master | IDR 19 mill | — | — |
| Package L1 + L2 + Master | IDR 23.7 mill | — | — |

- "Monthly Reiki courses"; "max group size of 5 persons" (Alicia quote); 1:1 initiations.
- Training Details block (bottom of page): "Levels 1, 2, and Master/Teacher training are 1-day courses running from 8 pm – 5 pm" (**conflicts** with the table above).
- Curricula for L1, L2 and Master are verbatim in the content file and the hidden accordion JSON.
- Online Reiki L1, L2 and Master link out to yogaliciacasillas.com (no prices shown on LGL).

### 2.6 Men's Circles (with Solis Brotherhood)
- **Committed Tuesday Circle**: in person at Let's Get Lost Ubud, Petulu; 2 hours; "Minimum of 2 month"; join by email to arrange a 1:1 with "the captain". **No start time is published.**
- **Weekly Online Men's Group**: Monday 6 pm – 8 pm (Bali time), Zoom, 2 hours, minimum 2 months; join by email.
- "11 guiding principles designed by our founder Anthony Ball"; code at solisbrotherhood.com.

### 2.7 Private sessions & online classes (Acuity only; prices are not on the website)
These are bookable but **their prices appear only on Acuity**:

| Service | Duration | IDR |
|---|---|---|
| Online Breathwork Class | 30 min / 60 min | 600,000 / 900,000 |
| Online Reiki Class | 60 min | 1,200,000 |
| Online Yoga Class | 60 min | 1,200,000 |
| Private Breathwork Session | 90 / 120 min | 1,650,000 / 2,000,000 (+ per-person add-ons 600k–2 m) |
| Private Reiki Session | 60 / 90 min | 1,300,000 / 1,850,000 |
| Private Yoga Session | 60 / 90 min | 1,300,000 / 1,850,000 |
| Private Craniosacral Therapy | 60 / 90 min | 1,300,000 / 1,850,000 |
| Personal Yoga / Breathwork Program | 3-day / 5-day | 8,600,000 / 13,200,000 |
| 100 hr Breathwork Teacher Training (Acuity class) | — | **41,000,000**. Description lists dates "March 6–14 2026, June 5–13 2026, March 5–13 2027" |
| Discovery calls (Breathwork, Online Breathwork, Reiki, Yin, Mentorship, Rebirthing Retreat, Solis Men's Group, Solis Gathering) | 30 min | free |

### 2.8 Spain (Coming 2027)
- Location: "near Cartagena", southern Spain. Focus: embodiment, men's work, breathwork, Reiki. "Retreats and trainings will open for booking in late 2026." Waitlist via MailerLite.

### 2.9 Free meditation (lead magnet)
- "A 20-minute downloadable meditation", "100% free". Captured via MailerLite (popup on every page, plus the `/meditations` page).

### 2.10 Store products (Squarespace Commerce, USD; orphaned)
See 02-page-inventory §3.17. These prices **conflict** with the current IDR pricing and are probably outdated.

---

## 3. Testimonials, reviews & quotes (exact; do not invent more)

| Content | Attribution | Source | Note |
|---|---|---|---|
| "I offer small intimate groups with a max group size of 5 persons, resulting in a better learning experience" | Alicia Casillas | `/reiki-courses` §2 | teacher quote |
| "Within all of my training, I offer 1-on-1 initiations creating a more powerful experience compared with a group setting initiation" | Alicia Casillas | `/reiki-courses` §3 | teacher quote |
| "This meditation helped me slow down and breathe during finals week. I felt more focused and less anxious." | "Jamie, 3rd-year Psychology Student" | `/meditations` | **Authenticity unverified**; reads like template copy |
| "Alicia is a wonderful, highly skilled, and experienced teacher… go find her for Yin Yoga and Reiki" | (Instagram post alt text) | Home §5 Instagram feed | third-party feed content; not a site testimonial |
| Student Testimonials video (97 s) | — | `/breathwork-…` §4 | Squarespace-hosted video |
| 4 YouTube testimonial videos: `37rFihLhnZU`, `6HchRfzzFhs`, `GkMuJnrQP18`, `FeUjE1hZGXY` | — | `/online-trainings` §5 | `37rFihLhnZU` also on the breathwork page §8 |
| "Harmony is a beautiful balance between mind, body and soul measured in tender peaceful moments" | Melanie Koulouris | `/yin-yoga-…` §2 | decorative quote |
| "It is our responsibility to do everything within our power to create a planet that provides a home not just for us, but for all life on Earth." | David Attenborough | Home §6 | decorative quote |
| "The quieter you become, the more you can hear" | "Ram Das" (sic) | `/philosophy` §3, `/sustainability` §5 | decorative quote |
| "We're not leaving Bali, we're growing roots in two worlds." | (unattributed) | `/spain` | — |

**No star ratings, Google reviews or review widgets exist on the site.**

---

## 4. FAQs (verbatim source: `/faqs`, hidden answers in JSON)
9 Q&As in three groups:
- **Visiting:** "How do I sign up for a workshop, retreat, or event?" → "You can sign up online. No need to sign up for our men's circles! Just show up." (**contradicts** `/mens-circles`, which requires an email, a 1:1 and a 2-month commitment)
- **Logistic:** location (Petulu, 10 min north of Ubud) · "How large is EC?" (10 are / 1000 m² covered incl. meeting space and yoga shala; 5 are / 500 m² garden; 30 people) · materials (mats, blocks, blankets, bolsters)
- **Hosting at The Centre:** retreat support · free promotion · booking page for a 15% fee · "one luxury villa", no guest accommodation · small kitchen, local caterers

The page's own reCAPTCHA-protected contact route is `/contact`; the FAQ also says "More questions? Send us an email (manager@letsgetlostbali.com)".

---

## 5. Calls to action (labels as written)
Primary booking CTAs and destinations (full map in [06-functionality-and-dependencies.md](06-functionality-and-dependencies.md)):

| Label (verbatim) | Destination type | Pages |
|---|---|---|
| Find Out More / **Find Our More** (typo) | internal training pages | Home |
| Book Online Session | Acuity `online-class` | Home |
| LISTEN NOW ON SPOTIFY | Spotify show | Home |
| Our Philosophy / Contact Us / HOME PAGE | internal | Home, Philosophy, About, Sustainability, Teachers |
| BOOK A DISCOVERY CALL / Book A Discovery Call Now / Schedule A Discovery Call / Book Your Discovery Call | Acuity discovery-call types (on `/online-trainings` it points to Sevaluz instead) | Breathwork, Yin, Reiki, Mentorship, Online |
| DOWNLOAD INFORMATION DOCUMENT / DOWNLOAD – 100hr Breathwork Instructor Training Syllabus | PDF | Breathwork, Online |
| JOIN APRIL UBUD 2027 / JOIN APRIL 2027 / JOIN APRIL 2027 TRAINING | Stripe IDR 33 m | Breathwork |
| JOIN APRIL UBUD 2027 (3 x PAYMENT PLAN) | Stripe subscription | Breathwork |
| JOIN THE TRAINING | Acuity 100 h class (IDR 41 m) | Breathwork |
| BOOK A PRIVATE COURSE / Get in Touch / Find Out More | `mailto:` with prefilled subject/body | Breathwork, Reiki, Men's Circles |
| Book Now / BOOK NOW | Stripe €950 | Yin (×4) |
| Register Now / REGISTER NOW | Acuity Courses category; Momence (×3, broken) | Reiki |
| BOOK A PACKAGE DEAL | Acuity Reiki package | Reiki |
| ENROL ONLINE · €499 | sevaluz.co/breathwork | Online |
| Book Your Mentorship Package | Acuity type 83716691 | Mentorship |
| Download Your Free Meditation Here / JOIN THE SPAIN WAIT LIST / Join now | MailerLite forms | Meditations, Spain, popup |
| Send | Squarespace form | Contact |

---

## 6. Teacher bios (single source of truth recommended)
| Teacher | Role(s) | Bio variants found |
|---|---|---|
| **Anthony Ball** | Founder; Lead Teacher (breathwork); men's work; podcast host; mentor | (a) first-person short bio, repeated on Breathwork, Mentorship and Our Teachers; (b) **third-person long bio** on Online Trainings ("one of Southeast Asia's most sought-after breathwork facilitators", "over a decade of holding space") |
| **Alicia Casillas (Ramos)** | Co-founder; Yin Yoga Lead; Reiki Master; Pranayama Teacher; Craniosacral (Upledger) | (a) first-person "I support conscious humans…" (Breathwork, Reiki, Our Teachers); (b) third-person credentials bio (Yin page: E-RYT 500, YACEP, TTCs since 2015, 500+ h Yin with Sarah Powers, Tina Nance, Jamie Clarke) |
| **Dr Brendan** | Mental Health Expert (psychiatrist) | Breathwork page only. Surname not given; bio is written as a talk description ("In this talk, Dr. Brendan will explore…") |
| **Andrea Abian** | Anatomy Teacher (physiotherapist, yoga therapist) | Breathwork and Yin pages (identical) |
| **Rena** | Breathwork with Indonesian instruments (gamelan, angklung) | Our Teachers only. Surname not given; role/offering not linked to any service |

---

## 7. Editorial content
10 blog posts (Dec 2023 – Jan 2025), listed in 02-page-inventory §3.16. Full text is in `content/pages/blog__*.md`. Seven are authored by Anthony Ball and three by "Guest User" (Squarespace default). **No new posts since 21 Jan 2025.** Each post ends with a CTA to a training page or email.

---

## 8. SEO metadata (as found)

| Route | <title> | Meta description | H1 | OG image |
|---|---|---|---|---|
| `/` | Lets Get Lost : Ubud, Bali | Let's Get Lost Bali \| Breathwork, Men's Groups, Yoga Teacher Training, & Reiki Trainings in Ubud | Quality Teaching & Trainings | _DSC8289.jpg |
| `/breathwork-instructor-training-bali-ubud-` | 100hr Breathwork Instructor Training Bali \| Let's Get Lost Ubud, Yoga Alliance certification \| Let's Get Lost Bali | Training in Ubud, Bali. Small groups, expert teachers, embodied learning. Apply now. 100 hours Yoga Alliance accredited certification, … | _none_ | — |
| `/yin-yoga-teacher-training-bali` | Yin Yoga teacher training Ubud, Bali \| Let's Get Lost Bali | 65-hour Yin Yoga teacher training Ubud, Bali, with Lead teacher Alicia Casillas. Find out what Bali has to offer for yogis in 2027. Yoga Alliance Certified. … | _none_ | DSC03104.jpg |
| `/reiki-courses` | Reiki Trainings: Ubud and Amed, Bali \| Let's Get Lost Bali | Become Reiki practitioner and Master/Teacher on our monthly Reiki training courses in Ubud, Bali. … | Reiki Courses in Ubud, Bali | — |
| `/spain` | Spain (Coming 2027) \| Let's Get Lost Bali | Training in Spain. Small groups, expert teachers, embodied learning. Apply now | _none_ | — |
| `/mens-circles` | Men's Groups & Masculine Leadership Retreats \| Ubud, Bali \| Let's Get Lost Bali | Men's Groups are for us, by us. To realize we are brothers, as we navigate a new era. … | Men's circles | Men's Embodiment Centre logo (legacy) |
| `/online-trainings` | Online Breathwork Instructor Training (100HR) \| Let's Get Lost Bali \| Let's Get Lost Bali (duplicated suffix) | Become a certified breathwork instructor online. 100-hour live-recorded training from Ubud, Bali. Includes 6 private mentorship sessions with Anthony Ball. | 4 × H1 | DSC03529.jpg |
| `/practitioner/mentorship-training` | Mentorship Breathwork Training \| Let's Get Lost Bali | _none_ | _none_ | DSC06141.jpg |
| `/meditations` | Meditations \| Let's Get Lost Bali | _none_ | _none_ | — |
| `/contact` | Contact and location \| Let's Get Lost Bali | Get in touch with us. | Contact Us. | — |
| `/about-us` | About Us \| Let's Get Lost Bali | Let's Get Lost was founded and created by Anthony Ball and Alicia Casillas. … | About Us | — |
| `/philosophy` | Our Philosophy \| Coherent from the core \| Let's Get Lost Bali | Our philosophy is our truth. … | Our Philosophy | legacy logo |
| `/sustainability` | Sustainability done right \| Let's Get Lost Bali | Sustainability is incorporated in the building materials … | 2 × H1 | legacy logo |
| `/our-teachers` | Our Teachers \| Let's Get Lost Bali | _none_ | Our Teachers | — |
| `/faqs` | FAQs \| Let's Get Lost Bali | _none_ | _none_ | — |
| `/blog` | Blog \| Let's Get Lost Bali | _none_ | 11 × H1 (index lists each title as H1) | Personalized Yoga Program (31).png |
| `/terms-and-conditions` | Terms & Conditions for hosts and guests \| Let's Get Lost Bali | We have Terms & Conditions for hosts who offer retreats … | _none_ | legacy logo |
| `/privacy-policy` | Privacy Policy \| Let's Get Lost Bali | Read our Privacy Policy. We value your privacy. | Privacy Policy. | legacy logo |

- **Canonicals** are present on every page and self-referencing; `/home` → `/`; store category pages → `/store`.
- **JSON-LD (verified):** every page has `WebSite`, `Organization` (tel 082145612219) and `LocalBusiness` (Jl Raya Petulu; hours Mo–Sa 09:00–17:00). The home page adds `HealthClub` (postcode 80571). The breathwork page has a `Course` node, blog posts have `Article` (author and dates), and store products have `Product`. There is no `Event` schema for the dated trainings.
- **`lang`:** `en-US` (all pages).

---

## 9. Content priority guidance (for Phase 2, not rewritten copy)

| Priority | Content |
|---|---|
| **Essential** | Offer names, dates, prices, durations, inclusions, venue, certification claims, booking/discovery CTAs, teacher names and credentials, contact details and address, legal pages |
| **Important, condense** | Curricula (Breathwork, Reiki, Yin), schedules (could be collapsible), founder story, values, sustainability facts (solar, rain, greywater reed beds, 70 m spring well, reclaimed timber), men's circle details, podcast |
| **Duplicated (consolidate)** | Anthony & Alicia bios (4–5 copies); Andrea bio (2); "Embodiment / Connection / Sustainability" (Home §4 vs Philosophy vs Sustainability); "Ram Das" quote band (2 pages); online-breathwork "what you'll learn" (twice on one page); Reiki L1–L3 curriculum (3 sections + accordion + store) |
| **Low priority / stale** | Instagram feed block (2024 posts); tag archives; empty Class Packages category; FAQ venue-hire answers; Terms "Detox or TM Retreat" clauses; "Honour your mind" visualisation paragraph; Spain "booking late 2026" line |
| **Missing / unclear** | Exact April 2027 breathwork dates; Tuesday circle time; Master/Teacher Reiki date; consistent Reiki duration; refund/cancellation policy for trainings (Acuity has one; the site doesn't); surnames for Dr Brendan and Rena |
