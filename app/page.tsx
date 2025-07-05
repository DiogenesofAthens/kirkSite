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
      positions: [...]
    },
    ... // full experience array here
  ];

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
            <Lottie animationData={laptopAnimation} loop={true} className="mx-auto w-36 md:w-48 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Resume</h1>
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

          <div className="space-y-8">
            {experiences.map((company, companyIndex) => (
              <Card key={companyIndex} className="glass border-0 shadow-xl">
                <CardHeader
                  onClick={() => setOpenIndex(openIndex === companyIndex ? null : companyIndex)}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{company.logo}</span>
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">{company.company}</CardTitle>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openIndex === companyIndex ? "rotate-180" : ""}`} />
                </CardHeader>
                {openIndex === companyIndex && (
                  <CardContent>
                    <div className="space-y-8">
                      {company.positions.map((position, positionIndex) => (
                        <div key={positionIndex} className="pt-4 border-t border-slate-200 dark:border-slate-700">
                          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{position.title}</h3>
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
                            <Badge
                              variant="secondary"
                              className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            >
                              {position.type}
                            </Badge>
                          </div>
                          {position.description && <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{position.description}</p>}
                          {position.responsibilities && (
                            <div className="mt-3">
                              <h4 className="font-semibold mb-1 text-slate-900 dark:text-slate-50">Key Responsibilities:</h4>
                              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                                {position.responsibilities.map((resp, i) => <li key={i}>• {resp}</li>)}
                              </ul>
                            </div>
                          )}
                          {position.achievements && (
                            <div className="mt-3">
                              <h4 className="font-semibold mb-1 text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> Key Achievements:
                              </h4>
                              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                                {position.achievements.map((ach, i) => <li key={i}>• {ach}</li>)}
                              </ul>
                            </div>
                          )}
                          {position.certifications && (
                            <div className="mt-3">
                              <h4 className="font-semibold mb-1 text-slate-900 dark:text-slate-50">Certifications:</h4>
                              <div className="flex flex-wrap gap-2">
                                {position.certifications.map((cert, i) => (
                                  <Badge key={i} variant="outline" className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">{cert}</Badge>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
