"use client"

import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Quote, Award, Users } from "lucide-react"
import { TimezoneClock } from "@/components/timezone-clock"
import Lottie from "lottie-react"
import animationData from "@/public/images/reviews-ani.json"

export default function Recommendations() {
  const recommendations = [
    {
      name: "Franck Ardourel",
      title: "Former Director of Marketing",
      content:
        "It's my absolute pleasure to recommend Grant. I thoroughly enjoyed my time working with such a reliable professional, and came to know him as a truly valuable asset to absolutely any team...",
      company: "DNN",
    },
    {
      name: "Tony Mai",
      title: "Former Business Development Manager",
      content:
        "Strategic-minded, proactive, process driven, solution focused, and knack for identifying enterprise inefficiencies – Grant was a privilege to manage...",
      company: "Apttus",
    },
    {
      name: "Noah Vo",
      title: "Former Enterprise Business Development",
      content:
        "I had the pleasure of working with Grant during my time at Apttus and it has been an amazing experience...",
      company: "Apttus",
    },
    {
      name: "Jack McGannon",
      title: "Former Chief Executive Officer",
      content:
        "I have had the pleasure of working with Grant Glazer, an account executive for our new SaaS digital asset management offering...",
      company: "Canto",
    },
    {
      name: "Navin Nagiah",
      title: "Former Chief Executive Officer",
      content:
        "Grant Glazer worked at DNN for about 2 years. During this time, I was impressed by Grant's intelligence and his energy...",
      company: "DNN",
    },
    {
      name: "John Malamud",
      title: "Former Account Executive",
      content:
        "I had the distinct pleasure of working with Grant while he ran the SDR team at DNN. I can say with confidence that Grant is one the sharpest and hardest working individuals I have ever worked with...",
      company: "DNN",
    },
    {
      name: "Ian Ray",
      title: "Former Full Stack Web Developer",
      content:
        "Grant is a real team player, willing to roll up his sleeves and approach any task with confident optimism...",
      company: "Canto",
    },
    {
      name: "Lawrence Woo",
      title: "Former Enterprise Account Executive",
      content:
        "I worked with Grant in both roles when he was the SDR Team Manager and I continued to work alongside him when he was promoted to an Account Executive here at DNN...",
      company: "DNN",
    },
    {
      name: "Michael Kutulas",
      title: "Former Sales Development at DNN",
      content:
        "I have had the great fortune and pleasure to work with Grant at DNN during my time there...",
      company: "DNN",
    },
  ]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      {/* Lottie Animation */}
      <div className="w-full flex justify-center mt-12 mb-4">
        <div className="w-[300px] md:w-[400px]">
          <Lottie animationData={animationData} loop autoplay />
        </div>
      </div>

      <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Recommendations</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              A few friendly words about Grant from his past colleagues
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium italic mt-4">
              "From smart homes to smart sales — I help people work better with the right tech."
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">9+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Professional Recommendations</div>
              </CardContent>
            </Card>
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">2</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">CEO Endorsements</div>
              </CardContent>
            </Card>
            <Card className="glass border-0 shadow-xl text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Positive Feedback</div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {recommendations.map((rec, index) => (
              <Card key={index} className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg text-slate-900 dark:text-slate-50">{rec.name}</CardTitle>
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
                    {rec.title} • {rec.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Quote className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-3" />
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{rec.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 glass rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Ready to Work Together?</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Join the growing list of satisfied clients and colleagues who have experienced Grant's expertise and dedication firsthand.
            </p>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p>Additional references and detailed case studies available upon request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

