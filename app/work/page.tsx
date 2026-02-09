import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import Link from "next/link"

const highlights = [
  {
    label: "Consistently Top-Performing",
    description:
      "Consistently among the highest-performing Solutions Engineers across an 80-person global SE organization.",
  },
  {
    label: "Sophisticated Client Management",
    description:
      "Managed relationships with sophisticated organizations ranging from global investment banks and private equity firms to Fortune 500 pharmaceutical and biomedical companies.",
  },
  {
    label: "Cross-Functional Experience",
    description:
      "From Wall Street data platforms to enterprise SaaS to independent consulting, with a focus on turning ambiguity into deployable solutions.",
  },
]

export default function Work() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 relative">
        <div className="max-w-3xl mx-auto">
          <div className="mb-20">
            <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-8">
              Work
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Customer-facing technical leader designing, prototyping, and deploying complex API- and data-driven systems.
            </p>
          </div>

          <section className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              Solution Architecture & Enterprise Engagement
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Deep experience leading complex enterprise engagements from discovery through deployment. I design systems that work in the real world, not just on paper, through close collaboration with product, engineering, and executive stakeholders.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Enterprise Solution Design</p>
              <p className="text-sm">API & Data Architecture</p>
              <p className="text-sm">Technical Discovery</p>
              <p className="text-sm">POC Development</p>
            </div>
          </section>

          <section className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              Product Management & Data Platforms
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Led product strategy for enterprise API and data-feed platforms with eight-figure recurring revenue. Hands-on PM who works directly with engineering and with the world&apos;s largest financial institutions.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Product Strategy</p>
              <p className="text-sm">API & Data Feeds</p>
              <p className="text-sm">Go-to-Market Strategy</p>
              <p className="text-sm">Revenue Lifecycle Optimization</p>
            </div>
          </section>

          <section className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-6">
              AI & Emerging Technology
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Applying AI and LLMs to real business problems — from workflow automation to rapid prototyping of production-grade tools.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">Artificial Intelligence</p>
              <p className="text-sm">Large Language Models</p>
              <p className="text-sm">Generative AI</p>
              <p className="text-sm">Workflow Automation</p>
            </div>
          </section>

          <section className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-10">
              Career Highlights
            </h2>
            <div className="space-y-12">
              {highlights.map((highlight) => (
                <div key={highlight.label} className="space-y-3">
                  <h3 className="font-serif font-normal tracking-tight text-2xl text-foreground">
                    {highlight.label}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20 pb-20 border-b border-muted-foreground/20">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground mb-12">
              Live AI Portfolio
            </h2>
            <div className="space-y-8">
              <div>
                <Link href="/resources/tools/extractor" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  Entity Extractor
                </Link>
                <p className="text-muted-foreground text-sm mt-3">
                  AI-powered document analysis converting unstructured text to JSON.
                </p>
              </div>
              <div>
                <Link href="/tools/translator" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  Code Translator
                </Link>
                <p className="text-muted-foreground text-sm mt-3">
                  Legacy code modernization tool using LLMs for architectural translation.
                </p>
              </div>
              <div>
                <Link href="/resources/tools/ha-architect" className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  HA Architect
                </Link>
                <p className="text-muted-foreground text-sm mt-3">
                  Natural language to YAML generator for Home Assistant automations.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-center gap-8">
              <Link
                href="/resume"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                Full Resume
              </Link>
              <a
                href="https://www.linkedin.com/in/kwessman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
