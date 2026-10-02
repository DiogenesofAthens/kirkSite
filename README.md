# kirkwessman.com

Personal site of Kirk Wessman. Next.js (App Router), TypeScript and Tailwind CSS, deployed on Vercel.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build and type check
```

The contact form sends mail through Resend; set `RESEND_API_KEY` in `.env.local`.

## Where things live

| Path | What |
|---|---|
| `app/page.tsx` | Home |
| `app/about`, `app/portfolio`, `app/resume` | The other pages |
| `lib/projects.ts` | Project list: name, status, stack, links |
| `content/projects.tsx` | Project page text |
| `content/writing/*.md` | Posts |
| `lib/og.tsx` | Generated share images |
| `public/llms.txt` | Summary for AI agents; update it when projects change |

## Writing

Add `content/writing/<slug>.md`:

```markdown
---
title: Post title
date: 2026-10-04
description: One sentence for the index and link previews.
draft: true
---

Body in Markdown. Tables are supported.
```

Drafts render only under `npm run dev`. Remove `draft: true` to publish. The Writing page, its nav link and the Home list appear once the first post is published.
