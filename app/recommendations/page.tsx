"use client"

import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Bot, Linkedin, ArrowRight } from "lucide-react"
import { TimezoneClock } from "@/components/timezone-clock"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Recommendations() {
  const highlights = [
    {
      stat: "Top SE",
      label: "Consistently Top-Performing",
      description: "Consistently among the highest-performing Solutions Engineers across an 80-person global SE organization.",
      color: "text-amber-700 dark:text-amber-400",
    },
    {
      stat: "$10M+",
      label: "Portfolio Managed",
      description: "Owned and grew an eight-figure portfolio of investment banking and private equity clients at S&P Global.",
      color: "text-green-600 dark:text-green-400",
    },
    {
      stat: "Phi Beta Kappa",
      label: "USC Marshall",
      description: "B.S. Cum Laude in Business Administration with a 3.7 GPA. Presidential Scholar and Dean's List all four years.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      stat: "15+ Years",
      label: "Cross-Functional Experience",
      description: "From Wall Street data platforms to enterprise SaaS to independent consulting — a career built on translating complexity into clarity.",
      color: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Career Highlights</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              A track record of delivering results across solutions engineering, product management, and enterprise data platforms.
            </p>
            <p className="text-lg text-amber-700 dark:text-amber-400 font-medium italic mt-4">
              &quot;I build systems that work in the real world — not just on paper.&quot;
            </p>
          </div>

          {/* Career Highlights Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="glass border-0 shadow-sm transition-all duration-300 h-full flex flex-col animate-fade-in"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                  </div>
                  <CardTitle className={`text-3xl font-bold ${highlight.color}`}>{highlight.stat}</CardTitle>
                  <CardDescription className="text-base font-medium text-slate-700 dark:text-slate-300">
                    {highlight.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Vibe-Coded Section */}
          <div className="glass rounded-2xl p-8 md:p-12 shadow-sm mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-amber-700 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                This Site Was Vibe-Coded with Claude
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mb-4">
                I didn&apos;t just update a template — I used Claude (Anthropic&apos;s AI) as a collaborative coding partner to transform a friend&apos;s Next.js site into my own professional presence. From rewriting data models to restructuring pages to crafting copy, every change was a conversation between domain expertise and AI capability.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                It&apos;s a small example of something I believe deeply: the best results come from pairing human judgment with the right tools. That&apos;s true whether you&apos;re architecting an enterprise CPQ deployment or building a personal website.
              </p>
            </div>
          </div>

          {/* LinkedIn CTA */}
          <div className="glass rounded-2xl p-8 shadow-sm text-center">
            <div className="flex flex-col items-center">
              <Linkedin className="w-10 h-10 text-amber-700 dark:text-amber-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Connect on LinkedIn
              </h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-xl mx-auto mb-6">
                Want to know what colleagues and clients say about working with me? Check out my LinkedIn profile for endorsements, recommendations, and more.
              </p>
              <a href="https://www.linkedin.com/in/kwessman" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white">
                  <Linkedin className="w-4 h-4 mr-2" />
                  View LinkedIn Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
