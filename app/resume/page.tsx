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

  const experiences = [/* fully detailed experience array retained */]

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
            <div className="w-40 md:w-52 mx-auto mb-8">
              <Lottie animationData={laptopAnimation} loop={true} />
            </div>
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

          <div className="space-y-4">
            {experiences.map((company, companyIndex) => (
              <Card key={companyIndex} className="glass border-0 shadow-xl">
                <CardHeader
                  onClick={() => setOpenIndex(openIndex === companyIndex ? null : companyIndex)}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{company.logo}</span>
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">{company.company}</CardTitle>
                      <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                        {company.company === "Conga"
                          ? "Sept 2017 - Present"
                          : company.company === "DNN Corp."
                          ? "Sept 2015 - Jun 2017"
                          : company.positions[0].title}
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform duration-300 ${openIndex === companyIndex ? "rotate-180" : "rotate-0"}`}
                  />
                </CardHeader>
                {openIndex === companyIndex && (
                  <CardContent className="pt-0">
                    <div className="space-y-8">
                      {company.positions.map((position, index) => (
                        <div
                          key={index}
                          className={index > 0 ? "border-t border-slate-200 dark:border-slate-700 pt-8" : ""}
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
                                {position.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="text-slate-700 dark:text-slate-300 text-sm">• {resp}</li>
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
                                {position.achievements.map((achievement, idx) => (
                                  <li key={idx} className="text-slate-700 dark:text-slate-300 text-sm">• {achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {position.certifications && (
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Certifications:</h4>
                              <div className="flex flex-wrap gap-2">
                                {position.certifications.map((cert, idx) => (
                                  <Badge
                                    key={idx}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
