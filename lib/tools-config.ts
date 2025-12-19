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
      title: "I Hired an AI Developer (And It’s Free): How I Use Google Jules to Build My Site",
      excerpt: "I built this latest version of my website without writing a single line of code. Here is exactly how I use Gemini and Google Jules to build features.",
      date: "2025-11-08",
      readTime: "6 min read",
      category: "Technology",
      slug: "jules-developer",
    },
    {
      title: "The \"Where's the Remote?\" Solution: Building a Universal Controller in Home Assistant",
      excerpt: "The couch cushions ate it. The dog hid it. Here is how I designed my \"always-there\" universal remote in Home Assistant.",
      date: "2025-09-20",
      readTime: "7 min read",
      category: "Smart Home",
      slug: "universal-remote",
    },
    {
      title: "Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV",
      excerpt: "How I dropped my cable bill and built a better live TV experience with Plex and HDHomeRun.",
      date: "2025-07-15",
      readTime: "5 min read",
      category: "Smart Home",
      slug: "cut-cable",
    },
    {
      title: "From Scripts to Speedtest Tracker: How I Monitor My Internet Like a Pro (2025 Edition)",
      excerpt: "From using a Raspberry Pi, IFTTT and Google sheets in 2017 to using Docker and Unraid today.",
      date: "2025-05-24",
      readTime: "9 min read",
      category: "Home Networking",
      slug: "speedtest-tracker",
    },
    {
      title: "AI in CPQ and CLM: Hype vs Reality in 2025",
      excerpt: "AI in CPQ and CLM? Not everything you hear is real! Here’s what’s working.",
      date: "2025-03-28",
      readTime: "4 min read",
      category: "Technology",
      slug: "ai-hype",
    },
    {
      title: "The Future of SaaS Sales: Trends to Watch in 2024",
      excerpt: "Exploring emerging trends in software sales and how businesses can adapt.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Sales",
      slug: "future-of-saas-sales-2024",
    },
    {
      title: "Optimizing Enterprise Technology Implementations",
      excerpt: "Best practices for successful technology rollouts in large organizations.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Technology",
      slug: "optimizing-enterprise-tech-implementations",
    },
    {
      title: "Selling Enterprise Contract Management Software: Strategy, Discovery, and Results",
      excerpt: "How to uncover pain, match solutions to problems, and deliver ROI with modern CLM platforms.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Enterprise Sales",
      slug: "enterprise-contract-sales-processes",
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
