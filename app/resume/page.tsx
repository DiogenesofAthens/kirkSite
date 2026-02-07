"use client";

import { useRef, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
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

  return (
    <>
      <div className="bg-background relative overflow-hidden">
        <FloatingNav />
        <TimezoneClock />

        <div className="min-h-screen pt-32 pb-20 px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-4">
                Resume
              </h1>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                15+ years spanning solutions engineering, product management, and enterprise data platforms
              </p>
              <p className="text-base text-muted-foreground italic">
                "I'm most effective in environments where the problem space is evolving and the path to deployment isn't fully defined."
              </p>
            </div>

            {/* Experiences */}
            <div className="space-y-12">
              {experiences.map((company, companyIndex) => {
                const isCompanyOpen = openCompanyIndex === null || openCompanyIndex === companyIndex;

                return (
                  <div key={companyIndex} className="border-b border-border pb-12 last:border-b-0">
                    {/* Company Header */}
                    <button
                      onClick={() =>
                        setOpenCompanyIndex(openCompanyIndex === companyIndex ? -1 : companyIndex)
                      }
                      className="w-full text-left flex items-start justify-between gap-4 group mb-6 focus:outline-none"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-8 h-8 rounded-full bg-muted-foreground/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-muted-foreground">
                              {company.logo}
                            </span>
                          </div>
                          <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground">
                            {company.company}
                          </h2>
                        </div>
                        <p className="text-muted-foreground text-sm ml-11">
                          {company.duration}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground mt-1 transition-transform duration-300 flex-shrink-0 ${
                          isCompanyOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {/* Positions */}
                    {isCompanyOpen && (
                      <div className="space-y-8 ml-11">
                        {company.positions.map((position, positionIndex) => (
                          <div
                            key={positionIndex}
                            ref={el => (scrollRefs.current[`${companyIndex}-${positionIndex}`] = el)}
                            className={`${
                              positionIndex > 0 ? "border-t border-border pt-8" : ""
                            }`}
                          >
                            {/* Position Title */}
                            <h3 className="font-serif text-2xl font-normal tracking-tight text-foreground mb-3">
                              {position.title}
                            </h3>

                            {/* Meta Information */}
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                              <div className="flex flex-wrap items-center gap-4">
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
                                <span className="text-xs bg-muted/50 px-2.5 py-1 rounded">
                                  {position.type}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            {position.description && (
                              <p className="text-foreground mb-6 leading-relaxed">
                                {position.description}
                              </p>
                            )}

                            {/* Responsibilities */}
                            {position.responsibilities && (
                              <div className="mb-6">
                                <h4 className="font-serif text-sm font-normal tracking-tight text-foreground mb-3 uppercase letter-spacing">
                                  Key Responsibilities
                                </h4>
                                <ul className="space-y-2">
                                  {position.responsibilities.map((resp, respIndex) => (
                                    <li
                                      key={respIndex}
                                      className="text-foreground text-sm leading-relaxed pl-4 border-l border-muted-foreground/20"
                                    >
                                      {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Achievements */}
                            {position.achievements && (
                              <div className="mb-6">
                                <h4 className="font-serif text-sm font-normal tracking-tight text-foreground mb-3 uppercase letter-spacing">
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {position.achievements.map((achievement, achIndex) => (
                                    <li
                                      key={achIndex}
                                      className="text-foreground text-sm leading-relaxed pl-4 border-l border-muted-foreground/20"
                                    >
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Certifications */}
                            {position.certifications && (
                              <div>
                                <h4 className="font-serif text-sm font-normal tracking-tight text-foreground mb-3 uppercase letter-spacing">
                                  Certifications
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {position.certifications.map((cert, certIndex) => (
                                    <span
                                      key={certIndex}
                                      className="text-xs text-muted-foreground border border-muted-foreground/30 px-3 py-1.5 rounded"
                                    >
                                      {cert}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Education Section */}
            <div className="mt-16 pt-12 border-t border-border">
              <button
                onClick={() => setOpenCompanyIndex(3)}
                className="w-full text-left focus:outline-none mb-6"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-muted-foreground/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-muted-foreground">◉</span>
                  </div>
                  <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground">
                    Education
                  </h2>
                </div>
              </button>

              <div className="ml-11">
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-normal tracking-tight text-foreground mb-1">
                    University of Southern California
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Marshall School of Business · 2004 - 2008
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-serif text-lg font-normal tracking-tight text-foreground">
                      B.S., Cum Laude — Business Administration
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      GPA: 3.7 / 4.0 (Major: 3.8)
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground border border-muted-foreground/30 px-3 py-1.5 rounded">
                      Phi Beta Kappa
                    </span>
                    <span className="text-xs text-muted-foreground border border-muted-foreground/30 px-3 py-1.5 rounded">
                      USC Presidential Scholar
                    </span>
                    <span className="text-xs text-muted-foreground border border-muted-foreground/30 px-3 py-1.5 rounded">
                      Dean's List (All Years)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
