
export const EXPERIENCES = [
    {
      company: "Conga",
      logo: "CG",
      positions: [
        {
          title: "Principal Solutions Engineer",
          duration: "2019 - Present · 7 yrs",
          location: "Santa Monica, CA",
          type: "Full-time",
          description:
            "Lead solution architect on complex enterprise engagements, owning discovery, system design, and deployment strategy for Conga's Quote-to-Cash and CLM platform. Build custom demos and proof-of-concepts integrating APIs, data models, and workflow automation.",
          responsibilities: [
            "Leading solution architecture on complex enterprise engagements",
            "Owning discovery, system design, and deployment strategy",
            "Building custom demos and proof-of-concepts integrating APIs, data models, and workflow automation",
            "Partnering with product and engineering to translate customer needs into deployable architectures",
            "Completing technical RFP/RFI responses for strategic accounts",
          ],
          achievements: [
            "Consistently among the top-performing Solutions Engineers across an 80-person global SE org",
            "Lead solution architect on the most complex enterprise engagements",
            "Built production-ready demos and POCs integrating APIs, data models, and workflow automation",
            "Partnered directly with product and engineering to shape product direction",
          ],
          certifications: [
            "Apttus CPQ Levels 1 & 2",
            "Apttus Billing Management",
            "Conga Grid Certified",
          ],
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
          location: "Santa Monica, CA",
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
          duration: "2013 - 2015 · 3 yrs",
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
          title: "Strategy Adviser",
          duration: "2016 - 2019 · 3 yrs",
          location: "New Orleans, LA & Santa Monica, CA",
          type: "Contract",
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
Summary:
Customer-facing technical leader with 15+ years of experience spanning solutions engineering, product management, and enterprise data platforms.
"Translating ambiguous requirements into production-grade solutions — in environments where the problem space is evolving."

Key Stats:
- Top-Performing SE across 80-person global org
- Sophisticated Client Management — global investment banks, PE firms, Fortune 500 pharma/biomedical companies
- 15+ Years Experience
- Phi Beta Kappa, USC
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
    Kirk Wessman is a Principal Solutions Engineer at Conga based in Santa Monica, CA.
    He holds a B.S. Cum Laude in Business Administration from USC Marshall School of Business, where he was Phi Beta Kappa and a Presidential Scholar.
    Before Conga, Kirk spent 6 years at S&P Global in product management and relationship management roles, and also worked as an independent strategy consultant.
    He built this site using AI coding tools from the frontier labs — adapting a friend's Next.js template into his own professional presence.
    Kirk is passionate about AI, LLMs, and building things at the intersection of technology and business.
  </additional_info>
</site_data>
`;
