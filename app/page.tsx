`use client`

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Award, ChevronDown } from "lucide-react"
import { TimezoneClock } from "@/components/timezone-clock"
import Lottie from "lottie-react"
import laptopAnimation from "@/public/images/man-laptop-ani.json"

export default function Resume() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const experiences = [
    {
      company: "Conga",
      logo: "CG",
      positions: [
        {
          title: "Principal Sales Engineer",
          duration: "Mar 2024 - Present · 1 yr 4 mos",
          location: "San Francisco Bay Area",
          type: "Full-time",
          description:
            "Being a technical resource for our Sales team here at Conga (formerly Apttus), I help with the discovery process as well as demonstrating the value of our Quote-to-Cash and Procure-to-Pay solutions to help transform the revenue lifecycle at each of my clients.",
          responsibilities: [
            "Building and delivering custom product demonstrations to strategic & enterprise customers",
            "Executing intensive qualification and discovery calls",
            "Configuring and utilizing Salesforce.com and AWS platforms",
            "Conducting Technical Security Calls",
            "Assisting Professional Services with scoping/implementation",
            "Completing technical RFP/RFI responses",
          ],
          achievements: [
            "Personally helped close over $41 million in business across 90+ customers",
            "Top performing SE by revenue FY 2022",
            "Awarded SE of the Year in both FY 2022 and 2023",
            "Overachieved quota in FY 2020, 2021, 2022, 2023",
            "SKO Mainstage Presenter 2023, 2024",
            "Conga Connect Mainstage Presenter 2024 (Over 600 people in audience)",
            "SE Summit 2024 - Awarded for Best Innovation Demo of the year",
            "Promoted to support the Strategic Sales team Feb 2025",
          ],
          certifications: [
            "Conga / Apttus CPQ, CLM, Approvals, Order Management & Billing Certified",
            "CongaSign, Composer, & Conga Grid Certified",
          ],
        },
        {
          title: "Lead Sales Engineer",
          duration: "Sep 2019 - Mar 2024 · 4 yrs 7 mos",
          location: "San Francisco Bay Area",
          type: "Full-time",
          description:
            "I consistently overachieved my quota 4 years straight, and helped our west enterprise sales team set new records. I personally helped impact transformational deals at some of the biggest companies in the world.",
          achievements: [
            "Multi-million dollar deals at companies like Salesforce & Docusign",
            "Major deals at Workday, Twilio, HealthEquity, Splunk, TriNet, ServiceNow",
            "Helped enable and train new staff",
            "Presented solutions on main-stage at sales kick off events 2023 and 2024",
            "Became SME for Generative AI impact on products",
            "Promoted to Principal Sales Engineer",
          ],
        },
        {
          title: "Sales Engineer",
          duration: "Jan 2019 - Sep 2019 · 9 mos",
          location: "San Francisco Bay Area",
          type: "Full-time",
          description:
            "I reinforced the enterprise sales team by helping with discovery, delivering demos, POC's, answering technical questions, and completing RFP's.",
          achievements: [
            "Developed and built the CLM demo script to enable other Sales Engineers",
            "Promoted to Lead Sales Engineer",
          ],
        },
        {
          title: "Account Executive",
          duration: "Jun 2018 - Jan 2019 · 8 mos",
          location: "San Francisco Bay Area",
          type: "Full-time",
          description:
            "I supported the enterprise sales team focusing on solely on high-velocity contract management sales.",
          achievements: ["Technical acumen recognized by management", "Promoted to Sales Engineer"],
        },
        {
          title: "Sr. BDR Enterprise Business Unit",
          duration: "Sep 2017 - Jun 2018 · 10 mos",
          location: "San Mateo",
          type: "Full-time",
          description:
            "I helped Apttus (now named Conga) build new business relationships with the top Fortune 500 companies and helped enable our customers to sell faster using Apttus' suite of solutions.",
          achievements: [
            "Consistently over-achieved quota by 150%",
            "Generated and qualified over eight million dollars in pipeline",
            "Opened new business opportunities with Apple, Tesla, Western Union, and Hitachi Vantara",
          ],
        },
      ],
    },
    {
      company: "DNN Corp.",
      logo: "DN",
      positions: [
        {
          title: "Enterprise Account Executive",
          duration: "Oct 2016 - Jun 2017 · 9 mos",
          location: "San Francisco Bay Area",
          type: "Full-time",
          achievements: [
            "Top Sales Rep Q1 2017",
            "Generated 5 new business opportunities as an AE per week",
            "Simultaneously managed 30-40 relationships from SMB through Enterprise",
            "Sold over $200k in licensing and services through consultative approach",
            "Worked closely with CEO, VP of Product, and Director of Professional Services",
          ],
        },
        {
          title: "Inside Sales Development Team Manager",
          duration: "Mar 2016 - Oct 2016 · 8 mos",
          location: "San Francisco Bay Area",
          type: "Full-time",
          achievements: [
            "Promoted to SDR Team Manager after 6 months of exceeding quota",
            "Implemented training process, increasing opportunities passed to AEs by 25%",
            "Provided detailed performance reports daily, weekly, monthly and quarterly",
            "Still produced 20 new opportunities each month while coaching team",
          ],
        },
        {
          title: "Inside Sales Development Representative",
          duration: "Sep 2015 - Feb 2016 · 6 mos",
          location: "San Francisco Bay Area",
          type: "Full-time",
          achievements: [
            "Managed lead queue of 1000 prospects",
            "Exceeded 60 calls and emails per day target",
            "Qualified 25-30 new opportunities each month",
            "Achieved 125% of Quota in first two quarters",
            "Designed original documentation and standardized process for new SDR hires",
          ],
        },
      ],
    },
    {
      company: "Canto",
      logo: "CA",
      positions: [
        {
          title: "Account Executive / Product Support Specialist",
          duration: "Mar 2015 - Sep 2015 · 7 mos",
          location: "San Francisco",
          type: "Full-time",
          achievements: [
            "Led 5-8 new business demos per week of Digital Asset Management Platform",
            "Closed over $60k in SaaS deals with average deal size of $4k",
            "Researched and called 40-50 clients each day",
            "Used ToutApp to manage outbound lists with 5000+ contacts",
            "Solved issues for 2-3 current clients each week as first level support",
          ],
        },
      ],
    },
  ];

