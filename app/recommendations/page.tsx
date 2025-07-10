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
      title: "Director of Marketing",
      content:
        "It’s my absolute pleasure to recommend Grant. I thoroughly enjoyed my time working with such a reliable professional, and came to know him as a truly valuable asset to absolutely any team. He is honest, dependable, and incredibly hard-working. Beyond that, he has impressive sales skills to drive high results. His knowledge of marketing combined with his expertise in sales was a huge advantage to our marketing department. Along with his undeniable talent, Grant has always been an absolute joy to work with. He is a true team player, and always manages to foster positive discussions and bring the best out of other employees. Without a doubt, I confidently recommend Grant.",
      company: "DNN",
    },
    {
      name: "Tony Mai",
      title: "Business Development Manager",
      content:
        "Strategic-minded, proactive, process driven, solution focused, and knack for identifying enterprise inefficiencies – Grant was a privilege to manage. Grant naturally exhibits these qualities and consistently approach his work with care and quality. I’ve hired many reps in the past and would consider Grant one of our department’s top talents. Grant is an unbelievable asset to his organization and any company fortunate of hiring him would be smiling all the way to the bank.",
      company: "Apttus",
    },
    {
      name: "Noah Vo",
      title: "Enterprise Business Development",
      content:
        "I had the pleasure of working with Grant during my time at Apttus and it has been an amazing experience. He is one of the hardest working individuals I’ve met and he is always there to help a colleague, whether it is proof-reading an email template or troubleshooting technical issues with the CRM. He is very analytical and always excels at his job responsibilities, and I can fully recommend him to any team lucky enough to have his talents!",
      company: "Apttus",
    },
    {
      name: "Jack McGannon",
      title: "Chief Executive Officer",
      content:
        "I have had the pleasure of working with Grant Glazer, an account executive for our new SaaS digital asset management offering. Grant consistently exhibits a strong work ethic, an important strength in sales and customer success. This is reflected in his clients, with whom he maintains positive relations. Grant is definitely a team player, working well with others in the organization. Impressively, he is extremely enthusiastic and displays a tenacity that is a key ingredient in his bright future. On top of that, Grant is an overall good person.",
      company: "Canto",
    },
    {
      name: "Navin Nagiah",
      title: "Chief Executive Officer",
      content:
        "Grant Glazer worked at DNN for about 2 years. During this time, I was impressed by Grant’s intelligence and his energy. He is also very good at both project and process management. He started as an SDR and quickly moved to be the lead for the SDR team at DNN, and then to a New Business AE. I still remember him writing a “handbook / manual” so that new SDRs could come up to speed quickly. The manual was both expansive & thorough, and immensely helpful to new hires we brought on-board. Grant’s intelligence, energy and attention to detail will be a huge asset to both himself and any company he chooses to work at.",
      company: "DNN",
    },
    {
      name: "John Malamud",
      title: "Account Executive",
      content:
        "I had the distinct pleasure of working with Grant while he ran the SDR team at DNN. I can say with confidence that Grant is one the sharpest and hardest working individuals I have ever worked with, and his accomplishments at DNN are evidence of this. While he was one of the younger team members, management saw his potential and made him team lead, a role in which he flourished. His dedication to the team he oversaw was admirable, and he never lost focus of the goals that were put in front of him. I highly recommend Grant for any team that is looking for smart and hungry players that can contribute off the bat.",
      company: "DNN",
    },
    {
      name: "Ian Ray",
      title: "Full Stack Web Developer",
      content:
        "Grant is a real team player, willing to roll up his sleeves and approach any task with confident optimism. Grant is highly computer literate. Which allows him to quickly learn and adapt with constantly evolving technology, which he can accurately articulate to customers. Working with Grant was not only fun, but very consistent and reliable. As a fellow Eagle Scout, Grant was incredibly trustworthy, loyal, helpful, friendly, courteous, kind, obedient, cheerful, thrifty, brave, clean, and reverent!",
      company: "Canto",
    },
    {
      name: "Lawrence Woo",
      title: "Enterprise Account Executive",
      content:
        "I worked with Grant in both roles when he was the SDR Team Manager and I continued to work alongside him when he was promoted to an Account Executive here at DNN. Throughout his time here at DNN, Grant consistently brought a tenacious drive to the table, always exceeding management’s expectations and never losing focus on the long term goals. Being an exceptional team player, he was often designated as a resource for newer team members, however he was never afraid to strategize with his colleagues or senior management to discuss alternate solutions when difficult roadblocks arose in deals. Grant’s rate of promotion here at DNN is a testament of what management sees in him, I know he will go far in his personal career and I can fully recommend his talents.",
      company: "DNN",
    },
    {
      name: "Michael Kutulas",
      title: "Sales Development",
      content:
        "I have had the great fortune and pleasure to work with Grant at DNN during my time there. Grant was the Team Lead for the SDR group.",
      company: "DNN",
    },
  ]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-20 pb-6 flex justify-center">
        <div className="w-40 sm:w-48 md:w-56">
          <Lottie animationData={animationData} loop autoplay />
        </div>
      </div>

      <div className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Recommendations</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              A few friendly words about Grant from his past colleagues
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium italic mt-4">
              "From smart homes to smart sales — I help people work better with the right tech."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className="glass border-0 shadow-xl transition-all duration-300 h-full flex flex-col"
              >
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
                <CardContent className="flex-1">
                  <Quote className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-3" />
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{rec.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
