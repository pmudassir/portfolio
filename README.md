# mudassir.in

Personal site of Mudassir Mohammed: experience, engineering case studies and contact details.

The site is a thermal receipt printed for each visitor: the home page feeds out of a printer as you scroll, projects are tear-off stubs, and every other page is another printed document on the same paper. Static Next.js (App Router) pages; content lives in typed TypeScript files, with no CMS, database or API.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # every route is prerendered
npm run test:e2e   # Playwright, desktop + phone, against a production build
```

The first `test:e2e` run needs a browser: `npx playwright install chromium`.

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the production origin. It's used for canonical URLs, the sitemap, OpenGraph images and structured data. It defaults to `https://mudassir.in`.

## Where things are

| Path | What |
|---|---|
| `src/content/site.ts` | Name, role, email, links, location, availability |
| `src/content/experience.ts` | Roles and education |
| `src/content/skills.ts` | Skill groups and where each is evidenced |
| `src/content/projects/*.tsx` | Case studies, one file each; `index.ts` sets the order |
| `src/components/case-study.tsx` | Case-study blocks: flow diagram, decision records, challenges, tables |
| `src/components/receipt/` | The paper: sheet, rules, tear-off stubs, printer, barcode (Code 128), thermal-grain SVG filters |
| `src/components/site-menu.tsx` | The round menu button and full-screen menu |
| `src/app/` | Routes: `/`, `/work`, `/projects`, `/projects/[slug]`, `/about`, `/contact` |
| `src/app/**/opengraph-image.tsx` | Generated social cards (site and per project), drawn in `src/lib/og.tsx` |
| `e2e/` | End-to-end tests: every page, the receipt, the menu, overflow on phones, the barcode encoder |
| `src/app/llms.txt/route.ts` | Plain-text summary generated from the same content |
| `public/resume.pdf` | The résumé linked from the site |

### Adding a case study

1. Copy `src/content/projects/koin.tsx` to a new file and fill in the fields. `sections` become the page's table of contents.
2. Add it to the `projects` array in `src/content/projects/index.ts`. Set `featured: true` to show it on the home page.
3. `npm run build` checks types and prerenders the new page, its OG image and its sitemap entry.

### Writing rules

- Every claim should be checkable: link the repo, name the file or decision, or leave it out.
- No metrics without a source.
- Prefer "what I built and why" over adjectives.

## Design

A thermal receipt on a dark walnut counter, after Refero's "ORYZO AI" style: warm darkness, cream paper, one ember accent and a red rubber stamp. The name and titles are Big Shoulders, everything else is Schibsted Grotesk, self-hosted through `next/font`; social cards use static copies of Schibsted Grotesk in `src/lib/fonts` (SIL Open Font License).

- `.paper` in `globals.css` re-scopes the colour tokens, so anything set on a sheet (case-study diagrams, tables, prose, buttons) prints in ink on paper with no styles of its own.
- Grain is an SVG displacement filter (`thermal-filters.tsx`), applied to the home receipt and to titles elsewhere; the barcode is kept sharp so it scans.
- Motion is CSS: the paper feed on load and the stamp, driven by scroll. With reduced motion the receipt is simply there.
