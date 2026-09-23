
export const EXPERIENCES = [
    {
      company: "Conga",
      logo: "CG",
      positions: [
        {
          title: "Principal Solutions Engineer",
          duration: "Sep 2022 - Aug 2026 · 4 yrs",
          location: "Los Angeles, CA",
          type: "Full-time",
          responsibilities: [
            "Enterprise solutions engineering for accounts in financial services, software, and health and life sciences, architected on the Salesforce platform.",
            "Ran technical discovery and solution design; built the custom demos, prototypes, and proofs of concept (APIs, data model, workflow automation); carried the security and compliance workstream (InfoSec questionnaires, SOC 2, data residency) with our internal security team through to production.",
            "AI co-lead for the SE organization: sold and demoed the product's AI capabilities and built customer demonstrations using MCP and Claude Code to orchestrate multi-system enterprise workflows.",
            "Worked with product and engineering to turn one-off customer solutions into reusable integration patterns, guides, and documentation.",
          ],
          certifications: [
            "Apttus CPQ Levels 1 & 2",
            "Apttus Billing Management",
            "Conga Grid Certified",
          ],
        },
        {
          title: "Senior Solutions Engineer",
          duration: "Mar 2019 - Aug 2022 · 3 yrs 6 mos",
          location: "Los Angeles, CA",
          type: "Full-time",
          description:
            "Solutions engineering for enterprise accounts across the same verticals: discovery, solution design, demo and proof-of-concept build, security review.",
        },
      ],
    },
    {
      company: "S&P Global",
      logo: "SP",
      positions: [
        {
          title: "Senior Relationship Manager — Investment Banking & Private Equity",
          duration: "2017 · 1 yr",
          location: "Los Angeles, CA",
          type: "Full-time",
          description:
            "Managed an eight-figure portfolio of banking and private equity clients. Focused on mutually beneficial outcomes, embedding with clients to achieve their objectives while growing the book of business.",
          achievements: [
            "Owned and grew a $10M+ portfolio across investment banks and private equity firms",
            "Helped clients optimize analytics workflows and data access patterns",
            "Earned internal distinction for portfolio growth and client relationship depth",
          ],
        },
        {
          title: "Associate Director, Product Management — Enterprise Feeds / APIs",
          duration: "2012 - 2015 · 3 yrs",
          location: "New York, NY",
          type: "Full-time",
          description:
            "Led product strategy for S&P's award-winning API and data-feed platforms, delivering equity and debt capital markets data to some of the world's largest financial institutions.",
          achievements: [
            "Managed award-winning enterprise delivery vehicle (FTP/API) for equity and debt capital markets data",
            "Led product strategy for platforms with eight-figure recurring revenue",
            "Owned roadmap, pricing, and go-to-market execution in partnership with engineering",
            "Worked directly with the world's largest financial institutions as a hands-on PM",
          ],
        },
        {
          title: "Product Manager — Enterprise Feeds / APIs",
          duration: "2010 - 2012 · 2 yrs",
          location: "New York, NY",
          type: "Full-time",
          description:
            "Managed enterprise data feed and API products, partnering with engineering and clients to drive platform adoption.",
        },
        {
          title: "Analyst",
          duration: "2009 - 2010 · 1 yr",
          location: "New York, NY",
          type: "Full-time",
          description:
            "Supported the Capital IQ platform team with data analysis, client research, and product development.",
        },
      ],
    },
    {
      company: "Independent Consultant",
      logo: "IC",
      positions: [
        {
          title: "Strategy Consultant",
          duration: "2016 - 2019 · 3 yrs",
          location: "New Orleans, LA & Los Angeles, CA",
          type: "Self-employed",
          description:
            "Advised startups, public-sector organizations, and political campaigns in ill-defined problem spaces. Delivered strategy and analytical frameworks across finance, operations, and communications.",
          achievements: [
            "Advised a CPG startup, a US Senatorial campaign, and an economic development agency",
            "Delivered strategy and analytical frameworks across finance, operations, and communications",
            "Operated in ambiguous environments where the path to solution wasn't predefined",
          ],
        },
      ],
    },
];

import { aiTools, utilityTools, blogPosts, games } from "@/lib/tools-config"

const TOOLS_CONTEXT = `
Available AI Tools:
${aiTools.map(t => `- ${t.title}: ${t.description}`).join('\n')}

Available Utilities:
${utilityTools.map(t => `- ${t.title}: ${t.description}`).join('\n')}

Arcade Games:
${games.map(g => `- ${g.title}: ${g.description}`).join('\n')}
`;

const BLOG_CONTEXT = `
Recent Blog Posts:
${blogPosts.map(p => `- ${p.title} (${p.category}): ${p.excerpt}`).join('\n')}
`;

export const SKILLS_AND_EXPERTISE = `
My Expertise:
Customer-facing technical leader designing, prototyping, and deploying complex API- and data-driven systems.
"Translating ambiguous requirements into production-grade solutions."

Solution Architecture & Enterprise Engagement:
Deep experience leading complex enterprise engagements from discovery through deployment. I design systems that work in the real world — not just on paper — through close collaboration with product, engineering, and executive stakeholders.
- Enterprise Solution Design
- API & Data Architecture
- Technical Discovery & Scoping
- Proof-of-Concept Development

Product Management & Data Platforms:
Led product strategy for enterprise API and data-feed platforms with eight-figure recurring revenue. Hands-on PM who works directly with engineering and with the world's largest financial institutions.
- Product Strategy & Roadmap
- API / Data Feed Platforms
- Go-to-Market Execution
- Revenue Lifecycle Management

AI & Emerging Technology:
Applying AI and LLMs to real business problems — from workflow automation to rapid prototyping of production-grade tools. This website itself was built using AI coding tools from the frontier labs.
- Artificial Intelligence (AI)
- Large Language Models (LLMs)
- Generative AI
- Workflow Automation

Strengths at a Glance:
Technical Leadership:
- Solution Architecture
- API & Data System Design
- Cross-Functional Collaboration
- Complex Enterprise Engagements
- Technical RFP/RFI Execution

Business & Strategy:
- Product Management
- Client Relationship Management
- Strategic Account Growth
- Revenue Lifecycle Optimization
- Go-to-Market Strategy
`;

export const ABOUT_ME = `
Summary (Kirk's own words):
I'm a customer-facing solutions engineer. I spent the last seven-plus years at Conga, a top-two Salesforce ISV, in the space between enterprise customers and the product: cross-vertical, with the most depth in financial services, tech, and health and life sciences.

I run the whole customer lifecycle, from commercial and technical discovery through solution design, the demo or proof of concept, and security review. The mandate, as I see it, is that the solution works in production, not just on a whiteboard. Focus does not wander after signature - I own the customer's usage curve as well.

For the last year I've also been building full-stack products solo, directing frontier coding agents through the whole dev cycle: architecture, API and data design, code review, and cloud deployment. What I'm working on now (Sep 2026): I've taken one of them, PortKey, swapped out the underlying model provider three times, and measured the changes under a layered eval harness - deterministic gates, a model judge under a locked rubric that never grades its own family, and a human calibration step. The results are on the app's evals page.

I do my best work in dynamic, sometimes ambiguous environments, building new things rather than simply maintaining what exists. I'm an extrovert and a collaborator at heart, energized by the work between engineering, product, and the customer.

Los Angeles, with a lot of time in San Francisco and New York.
`;

export const SITE_CONTEXT = `
<site_data>
  <about>
    ${ABOUT_ME}
  </about>
  <resume>
    ${JSON.stringify(EXPERIENCES, null, 2)}
  </resume>
  <expertise>
    ${SKILLS_AND_EXPERTISE}
  </expertise>
  <resources>
    ${TOOLS_CONTEXT}
    ${BLOG_CONTEXT}
  </resources>
  <additional_info>
    Kirk Wessman is a solutions engineer based in Los Angeles. He was at Conga from March 2019 to August 2026, most recently as Principal Solutions Engineer.
    He holds a B.S. Cum Laude in Business Administration from USC Marshall School of Business, where he was Phi Beta Kappa and a full merit scholarship recipient.
    Before Conga, Kirk spent six years at S&P Global in product management and relationship management roles, and also worked as an independent strategy consultant.
    He built this site and five live products (PortKey, fareTrader, ResourXe, Save the State, StatTrack) by directing AI coding agents.
    Kirk is passionate about AI, LLMs, and building things at the intersection of technology and business.
  </additional_info>
</site_data>
`;
