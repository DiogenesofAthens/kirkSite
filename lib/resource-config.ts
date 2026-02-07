export interface ResourceConfig {
  id: string
  title: string
  description: string
  longDescription: string
  funText: string
  donationAmount: number
  pageCount: string
  highlights: string[]
  whatYouGet: string[]
  testimonial?: {
    text: string
    author: string
    role: string
  }
  fileName: string
  filePath: string
}

export const resourceConfigs: Record<string, ResourceConfig> = {
  "sdr-process-guide": {
    id: "sdr-process-guide",
    title: "SDR Process Guide",
    description: "Complete guide to qualifying leads, Salesforce best practices, and SDR workflows",
    longDescription:
      "Master the art of sales development with this comprehensive guide that covers everything from lead qualification to Salesforce management. Based on real-world experience at successful SaaS companies.",
    funText: "Buy me a coffee ☕",
    donationAmount: 10,
    pageCount: "25+ pages",
    highlights: [
      "Complete Salesforce queue management system",
      "Proven call scripts and email templates",
      "Lead qualification frameworks by role",
      "25+ ready-to-use email templates",
    ],
    whatYouGet: [
      "Managing Salesforce Queue & Lead Status",
      "Call Templates & Sales Scripts",
      "Qualifying Questions by Role",
      "Email Templates for Every Scenario",
      "Lead Conversion Best Practices",
      "Outlook Calendar Integration",
      "Duplicate Management Process",
      "Real-world examples and case studies",
    ],
    testimonial: {
      text: "This guide transformed how our SDR team operates. The templates alone saved us weeks of work.",
      author: "Sarah Chen",
      role: "VP of Sales, TechCorp",
    },
    fileName: "sdr-process-guide.pdf",
    filePath: "/downloads/sdr-process-guide.pdf",
  },
  "enterprise-sales-playbook": {
    id: "enterprise-sales-playbook",
    title: "Enterprise Sales Playbook",
    description: "Strategies for selling to government and large enterprise organizations",
    longDescription:
      "Navigate complex enterprise sales cycles with proven strategies for government and Fortune 500 accounts. Learn from $41M+ in closed deals.",
    funText: "Buy me a beer 🍺",
    donationAmount: 15,
    pageCount: "40+ pages",
    highlights: [
      "Government procurement process mastery",
      "Enterprise stakeholder mapping",
      "Complex deal navigation strategies",
      "RFP response frameworks",
    ],
    whatYouGet: [
      "Government Sales Process Guide",
      "Enterprise Stakeholder Mapping",
      "Complex Deal Navigation",
      "RFP Response Templates",
      "Compliance Checklists",
      "Contract Negotiation Tactics",
      "Long Sales Cycle Management",
      "Executive Presentation Templates",
    ],
    testimonial: {
      text: "Kirk's enterprise playbook helped us close our first $2M government deal. The RFP templates were game-changers.",
      author: "Mike Rodriguez",
      role: "Enterprise AE, CloudSoft",
    },
    fileName: "enterprise-sales-playbook.pdf",
    filePath: "/downloads/enterprise-sales-playbook.pdf",
  },
  "media-server-guide": {
    id: "media-server-guide",
    title: "Complete Media Server Setup Guide",
    description: "Step-by-step guide to building your own Unraid media server with Plex",
    longDescription:
      "Build your own professional-grade media server from scratch. Includes hardware recommendations, software setup, and security best practices.",
    funText: "Buy me a pizza 🍕",
    donationAmount: 12,
    pageCount: "30+ pages",
    highlights: [
      "Complete hardware buying guide",
      "Unraid setup and configuration",
      "Plex optimization techniques",
      "Remote access security setup",
    ],
    whatYouGet: [
      "Hardware Selection Guide",
      "Unraid Installation & Setup",
      "Docker Container Configuration",
      "Plex Media Server Optimization",
      "Remote Access with Cloudflared",
      "Automated Content Management",
      "Backup and Recovery Strategies",
      "Troubleshooting Common Issues",
    ],
    testimonial: {
      text: "Followed this guide step-by-step and now have an amazing home media setup. Worth every penny!",
      author: "David Kim",
      role: "Software Engineer",
    },
    fileName: "media-server-guide.pdf",
    filePath: "/downloads/media-server-guide.pdf",
  },
  "roi-calculator": {
    id: "roi-calculator",
    title: "ROI Calculator Template",
    description: "Excel template to calculate return on investment for technology solutions",
    longDescription:
      "Professional Excel template used to justify technology investments. Includes multiple scenarios, charts, and presentation-ready outputs.",
    funText: "Buy me a sandwich 🥪",
    donationAmount: 8,
    pageCount: "Excel Template",
    highlights: [
      "Multi-scenario ROI calculations",
      "Professional charts and graphs",
      "Presentation-ready outputs",
      "Customizable for any industry",
    ],
    whatYouGet: [
      "Excel ROI Calculator Template",
      "Multiple Scenario Planning",
      "Automated Chart Generation",
      "Cost-Benefit Analysis Framework",
      "Risk Assessment Matrix",
      "Executive Summary Generator",
      "Industry Benchmarking Data",
      "Implementation Timeline Planner",
    ],
    fileName: "roi-calculator-template.xlsx",
    filePath: "/downloads/roi-calculator-template.xlsx",
  },
}
