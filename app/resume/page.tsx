"use client";

import { useRef, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Award, ChevronDown } from "lucide-react";
import { TimezoneClock } from "@/components/timezone-clock";
import Lottie from "lottie-react";
import laptopAnimation from "@/public/images/man-laptop-ani.json";

export default function Resume() {
  const [openCompanyIndex, setOpenCompanyIndex] = useState<number | null>(0);

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
  }
]; // keep full experience data here as-is

  const scrollRefs = useRef<any>({});

  const scrollToPosition = (companyIndex: number, positionIndex: number) => {
    const key = `${companyIndex}-${positionIndex}`;
    scrollRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenCompanyIndex(companyIndex);
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
<div className="grid md:grid-cols-4 gap-6 mb-16">
  <Card className="glass border-0 shadow-xl text-center">
    <CardContent className="pt-6">
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">$50M+</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">Revenue Generated</div>
    </CardContent>
  </Card>
  <Card className="glass border-0 shadow-xl text-center">
    <CardContent className="pt-6">
      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100+</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">Enterprise Customers</div>
    </CardContent>
  </Card>
  <Card className="glass border-0 shadow-xl text-center">
    <CardContent className="pt-6">
      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">10+ Years</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">Experience</div>
    </CardContent>
  </Card>
  <Card className="glass border-0 shadow-xl text-center">
    <CardContent className="pt-6">
      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">2x</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">SE of the Year</div>
    </CardContent>
  </Card>
</div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">Resume</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Over 10 years of experience in sales engineering, business development, and technology consulting
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium italic mt-4">
              "Sales engineer with a builder's mindset — helping teams improve processes through smart tech and strategy."
            </p>
          </div>

          {/* Timeline */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 mb-16 overflow-x-auto py-6 border-y border-slate-200 dark:border-slate-700">
            {experiences.map((company, companyIndex) =>
              company.positions.map((position, positionIndex) => (
                <button
                  key={`${companyIndex}-${positionIndex}`}
                  onClick={() => scrollToPosition(companyIndex, positionIndex)}
                  className="flex flex-col items-center min-w-[120px] hover:text-blue-600 text-sm text-slate-600 dark:text-slate-300"
                >
                  <div className="w-12 h-12 mb-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    {company.logo}
                  </div>
                  <span className="font-semibold text-xs text-center">
                    {position.title}
                  </span>
                  <span className="text-xs text-center">
                    {position.duration.split("·")[0].trim()}
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="space-y-6">
            {experiences.map((company, companyIndex) => {
              const isCompanyOpen = openCompanyIndex === companyIndex;
              return (
                <Card key={companyIndex} className="glass border-0 shadow-xl">
                  <CardHeader
                    onClick={() => setOpenCompanyIndex(isCompanyOpen ? null : companyIndex)}
                    className="cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{company.logo}</span>
                      </div>
                      <div className="text-left flex flex-col justify-start">
                        <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">{company.company}</CardTitle>
                        <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                          {company.company === "Conga"
                            ? (() => {
                                const start = new Date(2017, 8);
                                const now = new Date();
                                const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
                                const years = Math.floor(totalMonths / 12);
                                const months = totalMonths % 12;
                                return `Sep 2017 - Present · ${years} yrs${months > 0 ? ` ${months} mos` : ""}`;
                              })()
                            : company.positions[0].duration}
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform duration-300 ${isCompanyOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </CardHeader>

                  {isCompanyOpen && (
                    <CardContent className="pt-0">
                      <div className="space-y-8">
                        {company.positions.map((position, positionIndex) => (
                          <div
                            key={positionIndex}
                            ref={el => (scrollRefs.current[`${companyIndex}-${positionIndex}`] = el)}
                            className={`${positionIndex > 0 ? "border-t border-slate-200 dark:border-slate-700 pt-8" : ""}`}
                          >
                            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                                  {position.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {position.duration}
                                  </div>
                                  {position.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {position.location}
                                    </div>
                                  )}
                                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {position.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {position.description && (
                              <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                                {position.description}
                              </p>
                            )}

                            {position.responsibilities && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Key Responsibilities:</h4>
                                <ul className="space-y-1">
                                  {position.responsibilities.map((resp, respIndex) => (
                                    <li key={respIndex} className="text-slate-700 dark:text-slate-300 text-sm">
                                      • {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {position.achievements && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
                                  <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                  Key Achievements:
                                </h4>
                                <ul className="space-y-1">
                                  {position.achievements.map((achievement, achIndex) => (
                                    <li key={achIndex} className="text-slate-700 dark:text-slate-300 text-sm">
                                      • {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {position.certifications && (
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Certifications:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {position.certifications.map((cert, certIndex) => (
                                    <Badge
                                      key={certIndex}
                                      variant="outline"
                                      className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                                    >
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

