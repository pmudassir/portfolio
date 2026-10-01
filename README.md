# mudassir.in

Personal site of Mudassir Mohammed: experience, engineering case studies and contact details.

Static Next.js (App Router) pages. Content lives in typed TypeScript files; there's no CMS, database or API. Client-side JavaScript is limited to the copy-email button and the active navigation link.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # every route is prerendered
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the production origin. It's used for canonical URLs, the sitemap, OpenGraph images and structured data. It defaults to `https://mudassir.in`.

## Where things are

| Path | What |
|---|---|
| `src/content/site.ts` | Name, role, email, links, location, availability |
| `src/content/experience.ts` | Roles and education |
| `src/content/skills.ts` | Skill groups and where each is evidenced |
| `src/content/projects/*.tsx` | Case studies, one file each; `index.ts` sets the order |
| `src/components/case-study.tsx` | Case-study blocks: flow diagram, decision records, challenges, tables |
| `src/app/` | Routes: `/`, `/work`, `/projects`, `/projects/[slug]`, `/about`, `/contact` |
| `src/app/**/opengraph-image.tsx` | Generated social cards (site and per project) |
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

Warm paper and ink, one accent colour. Dark mode follows the OS. Type is Newsreader for headings, IBM Plex Sans for text and IBM Plex Mono for labels, all self-hosted through `next/font`. Text colour tokens in `globals.css` meet WCAG AA in both themes.
