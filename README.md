# Let's Get Lost Bali: website

Frontend rebuild of letsgetlostbali.com. Next.js (App Router, JavaScript), React, GSAP + ScrollTrigger, CSS Modules.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run images   # regenerate public/images from docs/source-audit/original-assets
```

- `app/`: one folder per page (`breathwork`, `yoga`, `reiki-and-circles`, `about`, `contact`, `privacy-policy`), plus `globals.css` (design tokens).
- `components/`: header, footer, responsive `<Picture>`, video facade, training index, scroll effects.
- `data/site.js`: contact details, navigation and every outbound link. `data/teachers.js`: teacher biographies.
- `docs/source-audit/`: Phase 1 audit (source of truth for content). `docs/IMPLEMENTATION-REPORT.md`: Phase 2 report and open decisions.

Images are pre-generated WebP variants, and `images.unoptimized` is set in `next.config.mjs` so Vercel image optimisation is not used.
