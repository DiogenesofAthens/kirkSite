"use client"

import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Code2, Home } from "lucide-react"
import Link from "next/link"
import Lottie from "@/components/lottie-client"
import rocketAnimation from "@/public/images/rocket-ani.json"

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
              Comprehensive business technology and process consulting across multiple domains.
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium italic mt-4">
              "Bridging the gap between sales, tech, and process with proven results."
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
                <CardTitle className="text-xl text-slate-900 dark:text-slate-50">Sales & Marketing Knowledge</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                  Deep experience sourcing and closing sales across software and consumer goods, including both on-premise and cloud-based solutions. I apply practical strategies that generate real results and long-term value.
                </CardDescription>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">SaaS Sales</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Enterprise Solutions</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Lead Generation</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Cold Calling</Badge>
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
                <CardTitle className="text-xl text-slate-900 dark:text-slate-50">Website Design & Implementation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                  I build scalable, modern web apps with Next.js and Vercel, and have hands-on experience with AI-powered UI tools. I'm also comfortable with legacy platforms like WordPress and DNN for migrations and integrations.
                </CardDescription>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Next.js</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Vercel</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">WordPress</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">DNN</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-slate-50">Technology Consulting</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                  Whether it's optimizing devices, building custom PCs, setting up servers, or automating your home — I help people get the most out of their tech. Hands-on and strategy-driven.
                </CardDescription>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">System Integration</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Home Automation</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Server Setup</Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Device Optimization</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Skills Section */}
          <div className="glass rounded-3xl p-8 shadow-xl mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6 text-center">Strengths at a Glance</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-center">
              These are the skills I draw from every day — whether solving business challenges, improving technical systems, or launching new ideas.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Sales & Business Development</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 inline-block text-left">
                  <li>• Solution-Oriented Selling</li>
                  <li>• Strategic Account Growth</li>
                  <li>• Customer Success Leadership</li>
                  <li>• Scalable Lead Generation</li>
                  <li>• Complex Deal Execution</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Technology & Operations</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 inline-block text-left">
                  <li>• Technical Diagnostics</li>
                  <li>• Data-Driven Systems Analysis</li>
                  <li>• Cross-Functional Team Leadership</li>
                  <li>• Workflow Design & Optimization</li>
                  <li>• Operational Process Improvement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Live AI Portfolio Section - Moved to Bottom */}
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

        </div>
      </div>
    </div>
  )
}
