import type { Metadata } from "next"
import { LINKS } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Resume",
  openGraph: { title: "Resume — Kirk Wessman", url: "/resume" },
}

type Role = {
  title: string
  when: string
  location?: string
  description?: string
  bullets?: string[]
}

type Employer = {
  name: string
  span?: string
  roles: Role[]
}

const EXPERIENCE: Employer[] = [
  {
    name: "Conga",
    span: "2019 – 2026",
    roles: [
      {
        title: "Principal Solutions Engineer",
        when: "Sep 2022 – Aug 2026",
        location: "Los Angeles, CA",
        bullets: [
          "Enterprise solutions engineering for accounts in financial services, software, and health and life sciences, architected on the Salesforce platform.",
          "Ran technical discovery and solution design; built the custom demos, prototypes, and proofs of concept (APIs, data model, workflow automation); carried the security and compliance workstream (InfoSec questionnaires, SOC 2, data residency) with our internal security team through to production.",
          "AI co-lead for the SE organization: sold and demoed the product’s AI capabilities and built customer demonstrations using MCP and Claude Code to orchestrate multi-system enterprise workflows.",
          "Worked with product and engineering to turn one-off customer solutions into reusable integration patterns, guides, and documentation.",
        ],
      },
      {
        title: "Senior Solutions Engineer",
        when: "Mar 2019 – Aug 2022",
        location: "Los Angeles, CA",
        description:
          "Solutions engineering for enterprise accounts across the same verticals: discovery, solution design, demo and proof-of-concept build, security review.",
      },
    ],
  },
  {
    name: "Independent",
    span: "2016 – 2019",
    roles: [
      {
        title: "Strategy Consultant",
        when: "2016 – 2019",
        location: "New Orleans, LA & Los Angeles, CA",
        description:
          "Advised startups, public-sector organizations, and political campaigns in ill-defined problem spaces. Delivered strategy and analytical frameworks across finance, operations, and communications.",
        bullets: ["Advised a CPG startup, a US Senatorial campaign, and an economic development agency"],
      },
    ],
  },
  {
    name: "S&P Global",
    span: "2009 – 2015, 2017",
    roles: [
      {
        title: "Senior Relationship Manager — Investment Banking & Private Equity",
        when: "2017",
        location: "Los Angeles, CA",
        description: "Managed a portfolio of banking and private equity clients.",
        bullets: ["Helped clients optimize analytics workflows and data access patterns"],
      },
      {
        title: "Associate Director, Product Management — Enterprise Feeds / APIs",
        when: "2012 – 2015",
        location: "New York, NY",
        description:
          "Led product strategy for S&P’s API and data-feed platforms, delivering equity and debt capital markets data to some of the world’s largest financial institutions.",
        bullets: [
          "Managed the enterprise delivery vehicle (FTP/API) for equity and debt capital markets data",
          "Owned roadmap, pricing, and go-to-market execution in partnership with engineering",
        ],
      },
      {
        title: "Product Manager — Enterprise Feeds / APIs",
        when: "2010 – 2012",
        location: "New York, NY",
        description:
          "Managed enterprise data feed and API products, partnering with engineering and clients to drive platform adoption.",
      },
      {
        title: "Analyst",
        when: "2009 – 2010",
        location: "New York, NY",
        description: "Supported the Capital IQ platform team with data analysis, client research, and product development.",
      },
    ],
  },
  {
    name: "Education",
    roles: [
      {
        title: "University of Southern California, Marshall School of Business",
        when: "2004 – 2008",
        description: "B.S., Cum Laude — Business Administration. Phi Beta Kappa; USC Presidential Scholar.",
      },
    ],
  },
]

export default function Resume() {
  return (
    <div className="pb-6 pt-28 sm:pt-32">
      <h1 className="mb-3 font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-foreground sm:text-[44px]">
        Resume
      </h1>
      <p className="mb-8 text-[15px]">
        <a className="link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
      </p>

      {EXPERIENCE.map((employer) => (
        <section key={employer.name} className="border-t border-border pb-2 pt-7">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">{employer.name}</h2>
            {employer.span && <span className="meta whitespace-nowrap tabular-nums">{employer.span}</span>}
          </div>

          {employer.roles.map((role) => (
            <div key={role.title} className="mb-6 grid gap-x-6 gap-y-0.5 sm:grid-cols-[160px_1fr]">
              <div className="meta whitespace-nowrap pt-0.5 tabular-nums">{role.when}</div>
              <div className="min-w-0">
                <h3 className="text-[16.5px] font-medium leading-snug text-foreground">{role.title}</h3>
                {role.location && <p className="mb-2 mt-0.5 text-sm text-muted-foreground">{role.location}</p>}
                {role.description && (
                  <p className="mb-1.5 max-w-[37.5rem] text-[15.5px] leading-relaxed text-body">{role.description}</p>
                )}
                {role.bullets && (
                  <ul className="max-w-[37.5rem] list-disc space-y-1.5 pl-[18px] text-[15.5px] leading-relaxed text-body marker:text-muted-foreground">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
