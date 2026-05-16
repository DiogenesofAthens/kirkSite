# kirkwessman.com

Personal portfolio and website for Kirk Wessman — Solutions Engineer and Technical Leader.

**Live site:** https://kirkwessman.com &nbsp;·&nbsp; **GitHub:** https://github.com/DiogenesofAthens/kirkSite

---

## Tech Stack

- **Next.js** — App Router, TypeScript
- **Tailwind CSS** — utility-first styling with a custom minimalist design system
- **shadcn/ui** — accessible component primitives
- **Lucide React** — icons
- **Groq** — LLM backend for the live AI tools (Code Translator, HA Architect, Entity Extractor)
- **Resend** — transactional email for the contact form

---

## Running Locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check + lint
```

Create a `.env.local` with:

```
RESEND_API_KEY=...
GROQ_API_KEY=...
```

---

## Site Structure

| Route | Description |
|---|---|
| `/` | Homepage — hero, focus areas, latest writing, contact |
| `/about` | About page |
| `/my-expertise` | Expertise areas |
| `/resume` | Work history |
| `/blog` | Portfolio — projects, media, writings, AI tools |
| `/projects/stattrack` | StatTrack project detail |
| `/projects/faretrader` | fareTrader project detail |
| `/projects/portkey` | PortKey project detail |
| `/projects/savethestate` | Save the State project detail |
| `/projects/resourxe` | ResourXe project detail |
| `/projects/reopen` | re-open.us project detail |
| `/projects/pmp` | Prince of Mulberry project detail |
| `/tools/translator` | Code Translator (Groq-powered) |
| `/resources/tools/extractor` | Entity Extractor (Groq-powered) |
| `/resources/tools/ha-architect` | Home Assistant YAML Architect (Groq-powered) |
| `/arcade` | Browser games (Simon, Tower of Hanoi, Memory) |
| `/clock` | World timezone clock |
| `/blog/[slug]` | Individual blog post pages |
