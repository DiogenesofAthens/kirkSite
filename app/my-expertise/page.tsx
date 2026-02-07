"use client"

import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Code2, Home, ArrowRight } from "lucide-react"
import Link from "next/link"
import Lottie from "@/components/lottie-client"
import rocketAnimation from "@/public/images/rocket-ani.json"
import { Button } from "@/components/ui/button"

export default function Expertise() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <FloatingNav />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-40 sm:w-48 mx-auto mb-8">
              <Lottie animationData={rocketAnimation} loop autoplay />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">My Expertise</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Customer-facing technical leader designing, prototyping, and deploying complex API- and data-driven systems.
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium italic mt-4">
              "Translating ambiguous requirements into production-grade solutions."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-50">Solution Architecture & Enterprise Engagement</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                  Deep experience leading complex enterprise engagements from discovery through deployment. I design systems that work in the real world — not just on paper — through close collaboration with product, engineering, and executive stakeholders.
                </CardDescription>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Enterprise Solution Design</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">API & Data Architecture</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Technical Discovery</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">POC Development</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-50">Product Management & Data Platforms</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                  Led product strategy for enterprise API and data-feed platforms with eight-figure recurring revenue. Hands-on PM who works directly with engineering and with the world&apos;s largest financial institutions.
                </CardDescription>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Product Strategy</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">API / Data Feeds</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Go-to-Market</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Revenue Lifecycle</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-50">AI & Emerging Technology</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                  Passionate about AI, LLMs, and generative AI. This website itself was vibe-coded with Claude — a testament to what&apos;s possible when you pair domain expertise with modern AI tools.
                </CardDescription>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Artificial Intelligence</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">LLMs</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Generative AI</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Workflow Automation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Skills Section */}
          <div className="glass rounded-3xl p-8 shadow-xl mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6 text-center">Strengths at a Glance</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
              These are the skills I draw from every day — whether architecting enterprise solutions, managing data platforms, or exploring what&apos;s next with AI.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Technical Leadership</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 inline-block text-left">
                  <li>• Solution Architecture</li>
                  <li>• API & Data System Design</li>
                  <li>• Cross-Functional Collaboration</li>
                  <li>• Complex Enterprise Engagements</li>
                  <li>• Technical RFP/RFI Execution</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Business & Strategy</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 inline-block text-left">
                  <li>• Product Management</li>
                  <li>• Client Relationship Management</li>
                  <li>• Strategic Account Growth</li>
                  <li>• Revenue Lifecycle Optimization</li>
                  <li>• Go-to-Market Strategy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Live AI Portfolio Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8 text-center">Live AI Portfolio</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/resources/tools/extractor">
                <Card className="glass border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full bg-blue-50/50 dark:bg-slate-900/50">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                       </div>
                       <CardTitle className="text-lg">Entity Extractor</CardTitle>
                    </div>
                    <CardDescription className="text-center">
                      AI-powered document analysis converting unstructured text to JSON.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/tools/translator">
                <Card className="glass border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full bg-blue-50/50 dark:bg-slate-900/50">
                  <CardHeader className="flex flex-col items-center text-center">
                     <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                          <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                       </div>
                       <CardTitle className="text-lg">Code Translator</CardTitle>
                    </div>
                    <CardDescription className="text-center">
                      Legacy code modernization tool using LLMs for architectural translation.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/resources/tools/ha-architect">
                <Card className="glass border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full bg-blue-50/50 dark:bg-slate-900/50">
                  <CardHeader className="flex flex-col items-center text-center">
                     <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                          <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                       </div>
                       <CardTitle className="text-lg">HA Architect</CardTitle>
                    </div>
                    <CardDescription className="text-center">
                      Natural language to YAML generator for Home Assistant automations.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          <div className="flex justify-center pb-8">
            <Link href="/resources">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transform hover:scale-105 transition-all text-lg px-8 py-6 rounded-full">
                View My Content & Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
