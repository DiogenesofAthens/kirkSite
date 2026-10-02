import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LINKS } from "@/lib/projects"

export const metadata: Metadata = {
  title: "About",
  openGraph: { title: "About — Kirk Wessman", url: "/about" },
}

export default function About() {
  return (
    <div className="pb-6 pt-28 sm:pt-32">
      <div className="mb-10 grid items-end gap-6 sm:grid-cols-[156px_1fr] sm:gap-8">
        <div className="relative aspect-[3/4] w-[156px] overflow-hidden">
          <Image
            src="/images/kirk_wessman.jpg"
            alt="Kirk Wessman"
            fill
            sizes="156px"
            className="object-cover object-top"
            priority
          />
        </div>
        <div>
          <h1 className="mb-2 font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-foreground">
            Kirk Wessman
          </h1>
          <p className="text-[15px] text-muted-foreground">
            Los Angeles, with a lot of time in San Francisco and New York
          </p>
        </div>
      </div>

      <div className="prose-body">
        <p>
          I’m a customer-facing solutions engineer. I spent the last seven-plus years at Conga, a top-two Salesforce
          ISV, in the space between enterprise customers and the product: cross-vertical, with the most depth in
          financial services, tech, and health and life sciences.
        </p>
        <p>
          I run the whole customer lifecycle, from commercial and technical discovery through solution design, the
          demo or proof of concept, and security review. The mandate, as I see it, is that the solution works in
          production, not just on a whiteboard. My focus extends well beyond signature. On a practical level, I own
          the customer’s usage curve. On a human level, I care whether they’re glad they bought it.
        </p>
        <p>
          For the last year I’ve also been building full-stack products solo, directing frontier coding agents
          through the whole dev cycle: architecture, API and data design, code review, and cloud deployment. They’re
          on the <Link href="/portfolio">Portfolio</Link> page.
        </p>
      </div>

      <aside className="my-8 max-w-[40rem] border-l-2 border-foreground py-0.5 pl-5">
        <p className="label mb-2">Now · Sep 2026</p>
        <p className="text-[17px] leading-[1.7] text-body sm:text-lg">
          I’ve taken one of them,{" "}
          <Link href="/projects/portkey" className="link">
            PortKey
          </Link>
          , swapped out the underlying model provider three times, and measured the changes under a layered eval
          harness: deterministic gates, a model judge under a locked rubric that never grades its own family, and a
          human calibration step. The results are on the app’s{" "}
          <a href={LINKS.evals} target="_blank" rel="noopener noreferrer" className="link">
            evals page
          </a>
          .
        </p>
      </aside>

      <div className="prose-body">
        <p>
          Before Conga, I spent six years at S&amp;P Global, owning roadmap, pricing, and go-to-market for enterprise
          API and data-feed products, then managing a portfolio of investment banking and private equity clients. I
          hold a B.S. Cum Laude in Business Administration from USC Marshall.
        </p>
      </div>
    </div>
  )
}
