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
import { Calendar, MapPin, Award, ChevronDown, GraduationCap } from "lucide-react";
import { TimezoneClock } from "@/components/timezone-clock";

export default function Resume() {
  const [openCompanyIndex, setOpenCompanyIndex] = useState<number | null>(0);

  const experiences = [
    {
      company: "Conga",
      logo: "CG",
      duration: "2019 - Present",
      positions: [
        {
          title: "Principal Solutions Engineer",
          startDate: "2019",
          endDate: "Present",
          location: "Santa Monica, CA",
          type: "Full-time",
          description:
            "Lead solution architect on complex enterprise engagements, owning discovery, system design, and deployment strategy for Conga's Quote-to-Cash and CLM platform.",
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
      duration: "2009 - 2017",
      positions: [
        {
          title: "Senior Relationship Manager — Investment Banking & Private Equity",
          startDate: "2017",
          endDate: "2017",
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
          startDate: "2013",
          endDate: "2015",
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
          startDate: "2010",
          endDate: "2012",
          location: "New York, NY",
          type: "Full-time",
          description:
            "Managed enterprise data feed and API products, partnering with engineering and clients to drive platform adoption.",
        },
        {
          title: "Analyst",
          startDate: "2009",
          endDate: "2010",
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
      duration: "2016 - 2019",
      positions: [
        {
          title: "Strategy Adviser",
          startDate: "2016",
          endDate: "2019",
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

  const scrollRefs = useRef<any>({});

  const expandAll = () => setOpenCompanyIndex(null);
  const collapseAll = () => setOpenCompanyIndex(-1);

  return (
    <>
      <div className="min-h-screen gradient-bg relative overflow-hidden">
        <FloatingNav />
        <TimezoneClock />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Resume
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              15+ years spanning solutions engineering, product management, and enterprise data platforms
            </p>
            <p className="text-lg text-amber-700 dark:text-amber-400 font-medium italic mt-2">
              "I&apos;m most effective in environments where the problem space is evolving and the path to deployment isn&apos;t fully defined."
            </p>

            <div className="grid md:grid-cols-4 gap-6 mt-10 mb-10">
              <Card className="glass border-0 shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-amber-700 dark:text-amber-400 mb-2">Top SE</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Consistently Top-Performing</div>
                </CardContent>
              </Card>
              <Card className="glass border-0 shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">$10M+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Portfolio Managed</div>
                </CardContent>
              </Card>
              <Card className="glass border-0 shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">15+ Years</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Experience</div>
                </CardContent>
              </Card>
              <Card className="glass border-0 shadow-sm text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">ΦΒΚ</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Phi Beta Kappa, USC</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {experiences.map((company, companyIndex) => {
              const isCompanyOpen = openCompanyIndex === null || openCompanyIndex === companyIndex;

              return (
                <Card key={companyIndex} className="glass border-0 shadow-sm">
                  <CardHeader
                    onClick={() =>
                      setOpenCompanyIndex(openCompanyIndex === companyIndex ? -1 : companyIndex)
                    }
                    className="cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4 text-left w-full" style={{ justifyContent: 'flex-start' }}>
                      <div className="w-12 h-12 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{company.logo}</span>
                      </div>
                      <div className="text-left flex flex-col justify-start">
                        <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">{company.company}</CardTitle>
                        <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                          {company.duration}
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
                                    <span>
                                      {position.startDate} - {position.endDate}
                                    </span>
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

            {/* Education Section */}
            <Card className="glass border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-4 text-left w-full" style={{ justifyContent: 'flex-start' }}>
                  <div className="w-12 h-12 bg-red-800 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex flex-col justify-start">
                    <CardTitle className="text-2xl text-slate-900 dark:text-slate-50">University of Southern California</CardTitle>
                    <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                      Marshall School of Business · 2004 - 2008
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    B.S., Cum Laude — Business Administration
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">GPA: 3.7 / 4.0 (Major: 3.8)</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-700 dark:text-yellow-400">
                      Phi Beta Kappa
                    </Badge>
                    <Badge variant="outline" className="text-xs border-red-500 text-red-700 dark:text-red-400">
                      USC Presidential Scholar
                    </Badge>
                    <Badge variant="outline" className="text-xs border-neutral-400 text-neutral-700 dark:text-neutral-300">
                      Dean&apos;s List (All Years)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-12 mb-10">
              <button
                onClick={expandAll}
                className="px-6 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white font-medium transition duration-300 shadow-md hover:shadow-lg"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-6 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium transition duration-300 shadow-md hover:shadow-lg"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
