export type ProjectLink = {
  label: string
  href: string
  note?: string
}

export type Project = {
  slug: string
  name: string
  /** What a visitor sees when they click through today */
  status: string
  since: string
  stack: string
  /** One line, used on Home and Portfolio */
  line: string
  group: "projects" | "also"
  /** Listed on Home */
  featured: boolean
  links: ProjectLink[]
  /** Shown after the links, e.g. a private repo */
  linksNote?: string
}

export const PROJECTS: Project[] = [
  {
    slug: "portkey",
    name: "PortKey",
    status: "Live",
    since: "May 2026",
    stack: "Next.js, TypeScript, zod, vitest · OpenAI, Anthropic, Groq",
    line: "Carry your low-rate mortgage to your next home. Three model providers, evaluated in public.",
    group: "projects",
    featured: true,
    links: [
      { label: "Site", href: "https://portkey-one.vercel.app/" },
      { label: "Evals", href: "https://portkey-one.vercel.app/evals" },
      {
        label: "AI intake demo",
        href: "https://portkey-one.vercel.app/demo?provider=openai",
        note: "access code on request",
      },
    ],
    linksNote: "Code private",
  },
  {
    slug: "faretrader",
    name: "fareTrader",
    status: "Demo, sample data",
    since: "May 2026",
    stack: "Python, FastAPI, Playwright, SQLite",
    line: "An agent that watches Delta first-class fares and books the drop.",
    group: "projects",
    featured: true,
    links: [
      { label: "Demo", href: "https://fare-trader.vercel.app/" },
      { label: "Code", href: "https://github.com/DiogenesofAthens/fareTrader" },
    ],
  },
  {
    slug: "resourxe",
    name: "ResourXe",
    status: "Live",
    since: "May 2026",
    stack: "Python, Flask · Vast.ai and WattTime APIs",
    line: "Routes GPU workloads to the cheapest compute, the greenest, or a blend.",
    group: "projects",
    featured: true,
    links: [
      { label: "Site", href: "https://resourxe.vercel.app/" },
      { label: "Code", href: "https://github.com/DiogenesofAthens/resourxe" },
    ],
  },
  {
    slug: "savethestate",
    name: "Save the State",
    status: "Demo",
    since: "May 2026",
    stack: "Solidity, Hardhat, Express, SQLite, React",
    line: "Land covenants on-chain, verifiable without a central authority.",
    group: "projects",
    featured: true,
    links: [
      { label: "Demo", href: "https://save-the-state.vercel.app/" },
      { label: "Code", href: "https://github.com/DiogenesofAthens/saveTheState" },
    ],
  },
  {
    slug: "stattrack",
    name: "StatTrack",
    status: "Intermittent",
    since: "April 2026",
    stack: "Next.js, FastAPI, nba_api",
    line: "NBA analytics, from raw API to interactive dashboard.",
    group: "projects",
    featured: false,
    links: [
      { label: "Demo", href: "https://stattrack-sandy.vercel.app/" },
      { label: "Code", href: "https://github.com/DiogenesofAthens/stattrack" },
    ],
  },
  {
    slug: "reopen",
    name: "re-open.us",
    status: "Live",
    since: "May 2026",
    stack: "Next.js static export, Canvas API",
    line: "Civic engagement landing page challenging political apathy and calling for renewed democratic participation.",
    group: "also",
    featured: false,
    links: [
      { label: "Site", href: "https://reopen.us" },
      { label: "Code", href: "https://github.com/DiogenesofAthens/reopen" },
    ],
  },
  {
    slug: "pmp",
    name: "Prince of Mulberry",
    status: "Live",
    since: "May 2026",
    stack: "Single HTML file, Canvas API, Cormorant Garamond",
    line: "Coming soon page for a Nolita-based film production company.",
    group: "also",
    featured: false,
    links: [
      { label: "Site", href: "https://www.princeofmulberry.com/" },
      { label: "Code", href: "https://github.com/DiogenesofAthens/PMP" },
    ],
  },
]

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getNeighbors(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return {
    prev: i > 0 ? PROJECTS[i - 1] : undefined,
    next: i >= 0 && i < PROJECTS.length - 1 ? PROJECTS[i + 1] : undefined,
  }
}

export const LINKS = {
  github: "https://github.com/DiogenesofAthens",
  linkedin: "https://www.linkedin.com/in/kwessman",
  evals: "https://portkey-one.vercel.app/evals",
}
