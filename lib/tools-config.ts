import { FileText, Calculator, Mail, QrCode, Clock, DollarSign } from "lucide-react"

export const aiTools = [
  {
    id: "entity-extractor",
    title: "Entity Extractor",
    description: "Extract structured JSON data from contracts, tickets, and agreements using AI.",
    icon: "SparkleIcon",
    link: "/resources/tools/extractor",
  },
  {
    id: "code-translator",
    title: "Code Translator",
    description: "Enterprise code translator. Convert legacy Apex/SOQL/Java to modern stacks.",
    icon: "CodeIcon",
    link: "/tools/translator",
  },
  {
    id: "ha-architect",
    title: "Home Assistant Architect",
    description: "Generate and debug Home Assistant YAML automations with AI assistance.",
    icon: "HomeIcon",
    link: "/resources/tools/ha-architect",
  },
]

export const utilityTools = [
  {
    id: "timezone-converter",
    title: "World Clock App",
    description: "Visualize timezones, schedule meetings, and find the perfect overlap.",
    icon: "Clock",
    link: "/clock",
  },
  {
    id: "meeting-cost",
    title: "Meeting Cost Calculator",
    description: "Real-time ticker showing exactly how much that meeting costs.",
    icon: "DollarSign",
    link: "/resources/meeting-cost",
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    description: "Create instant QR codes for URLs, Wi-Fi, and more directly in your browser.",
    icon: "QrCode",
    link: "/resources/qr-code",
  },
]

export const blogPosts = [
    {
      title: "NBA Analytics Dashboard in Two Sessions With Claude Code",
      excerpt: "The goal was something concrete — not a tutorial, not a template. An agentic coding tool, two sessions, and a live product. Here's what that looked like.",
      date: "2026-04-18",
      readTime: "7 min read",
      category: "AI & Technology",
      slug: "stattrack-claude-code",
    },
    {
      title: "The Capability Overhang: AI Can Already Do More Than You Think",
      excerpt: "There is a growing gap between what AI systems can do and what most people believe they can do. The bottleneck to adoption isn't capability — it's imagination.",
      date: "2026-02-05",
      readTime: "8 min read",
      category: "AI & Technology",
      slug: "capability-overhang",
    },
    {
      title: "What I Learned Vibe-Coding This Site with AI",
      excerpt: "I didn't write a single line of code by hand. Here's what happened when I paired domain expertise with AI coding tools from the frontier labs to build a personal site from scratch.",
      date: "2026-02-01",
      readTime: "5 min read",
      category: "AI & Technology",
      slug: "vibe-coding-with-claude",
    },
    {
      title: "Discovery Is Architecture: Why the Best SEs Start with Questions, Not Demos",
      excerpt: "The demo is the easy part. The hard part — and the part that separates good SEs from great ones — is the discovery that comes before it.",
      date: "2026-01-15",
      readTime: "6 min read",
      category: "Solutions Engineering",
      slug: "discovery-is-architecture",
    },
    {
      title: "Lessons from Managing API Products at S&P Global",
      excerpt: "What I learned owning the roadmap for enterprise data-feed platforms with eight-figure recurring revenue — and how it made me a better solutions engineer.",
      date: "2026-01-05",
      readTime: "7 min read",
      category: "Product Management",
      slug: "api-product-lessons",
    },
]

export const games = [
    {
      id: "simon",
      title: "Simon Says",
      description: "Repeat the pattern! Classic color memory game with difficulty scaling.",
      href: "/resources/games/simon"
    },
    {
      id: "hanoi",
      title: "Tower of Hanoi",
      description: "Move all rings to the rightmost peg - larger rings cannot go on smaller ones",
      href: "/resources/games/towers"
    },
    {
      id: "memory",
      title: "Memory Game",
      description: "Find matching pairs of fruit cards - flip cards to reveal fruits and match them",
      href: "/resources/games/memory"
    },
]
