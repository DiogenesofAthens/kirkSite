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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            "Completing technical RFP/RFI responses"
          ],
          achievements: [
            "Personally helped close over $41 million in business across 90+ customers",
            "Top performing SE by revenue FY 2022",
            "Awarded SE of the Year in both FY 2022 and 2023",
            "Overachieved quota in FY 2020, 2021, 2022, 2023",
            "SKO Mainstage Presenter 2023, 2024",
            "Conga Connect Mainstage Presenter 2024 (Over 600 people in audience)",
            "SE Summit 2024 - Awarded for Best Innovation Demo of the year",
            "Promoted to support the Strategic Sales team Feb 2025"
          ],
          certifications: [
            "Conga / Apttus CPQ, CLM, Approvals, Order Management & Billing Certified",
            "CongaSign, Composer, & Conga Grid Certified"
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Lottie animationData={laptopAnimation} loop={true} className="w-48 h-48 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">Resume</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Over 10 years of experience in sales engineering, business development, and technology consulting
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium italic mt-4">
              "Sales engineer with a builder's mindset — helping teams improve processes through smart tech and strategy."
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">$41M+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Revenue Generated</div>
              </CardContent>
            </Card>
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">90+</div>
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

          <div className="space-y-8">
            {experiences.map((company, companyIndex) => (
              <Card key={companyIndex} className="glass border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => setOpenIndex(openIndex === companyIndex ? null : companyIndex)}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{company.logo}</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">{company.company}</CardTitle>
                      <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                        {company.positions[0].duration}
                      </CardDescription>
                    </div>
                    <ChevronDown className={`transition-transform ${openIndex === companyIndex ? "rotate-180" : "rotate-0"}`} />
                  </div>
                </CardHeader>
                {openIndex === companyIndex && (
                  <CardContent>
                    {company.positions.map((position, positionIndex) => (
                      <div key={positionIndex} className="mb-6">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">{position.title}</h3>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {position.duration} · {position.location} · {position.type}
                        </div>
                        {position.description && <p className="text-slate-700 dark:text-slate-300 mb-2">{position.description}</p>}
                        {position.responsibilities && (
                          <div className="mb-2">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-50">Responsibilities</h4>
                            <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300">
                              {position.responsibilities.map((item, idx) => <li key={idx}>{item}</li>)}
                            </ul>
                          </div>
                        )}
                        {position.achievements && (
                          <div className="mb-2">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-50">Achievements</h4>
                            <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300">
                              {position.achievements.map((item, idx) => <li key={idx}>{item}</li>)}
                            </ul>
                          </div>
                        )}
                        {position.certifications && (
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-50">Certifications</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {position.certifications.map((cert, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
