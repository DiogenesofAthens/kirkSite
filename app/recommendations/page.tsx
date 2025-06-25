import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Quote, Award, Users } from "lucide-react"
import { TimezoneClock } from "@/components/timezone-clock"

export default function Recommendations() {
  const recommendations = [
    {
      name: "Franck Ardourel",
      title: "Former Director of Marketing at DNN",
      content:
        "It's my absolute pleasure to recommend Grant. I thoroughly enjoyed my time working with such a reliable professional, and came to know him as a truly valuable asset to absolutely any team. He is honest, dependable, and incredibly hard-working. Beyond that, he has impressive sales skills to drive high results. His knowledge of marketing combined with his expertise in sales was a huge advantage to our marketing department. Along with his undeniable talent, Grant has always been an absolute joy to work with. He is a true team player, and always manages to foster positive discussions and bring the best out of other employees. Without a doubt, I confidently recommend Grant.",
      company: "DNN",
    },
    {
      name: "Tony Mai",
      title: "Former Business Development Manager at Apttus",
      content:
        "Strategic-minded, proactive, process driven, solution focused, and knack for identifying enterprise inefficiencies – Grant was a privilege to manage. Grant naturally exhibits these qualities and consistently approach his work with care and quality. I've hired many reps in the past and would consider Grant one of our department's top talents. Grant is an unbelievable asset to his organization and any company fortunate of hiring him would be smiling all the way to the bank.",
      company: "Apttus",
    },
    {
      name: "Noah Vo",
      title: "Former Enterprise Business Development at Apttus",
      content:
        "I had the pleasure of working with Grant during my time at Apttus and it has been an amazing experience. He is one of the hardest working individuals I've met and he is always there to help a colleague, whether it is proof-reading an email template or troubleshooting technical issues with the CRM. He is very analytical and always excels at his job responsibilities, and I can fully recommend him to any team lucky enough to have his talents!",
      company: "Apttus",
    },
    {
      name: "Jack McGannon",
      title: "Former Chief Executive Officer at Canto",
      content:
        "I have had the pleasure of working with Grant Glazer, an account executive for our new SaaS digital asset management offering. Grant consistently exhibits a strong work ethic, an important strength in sales and customer success. This is reflected in his clients, with whom he maintains positive relations. Grant is definitely a team player, working well with others in the organization. Impressively, he is extremely enthusiastic and displays a tenacity that is a key ingredient in his bright future. On top of that, Grant is an overall good person.",
      company: "Canto",
    },
    {
      name: "Navin Nagiah",
      title: "Former Chief Executive Officer at DNN",
      content:
        "Grant Glazer worked at DNN for about 2 years. During this time, I was impressed by Grant's intelligence and his energy. He is also very good at both project and process management. He started as an SDR and quickly moved to be the lead for the SDR team at DNN, and then to a New Business AE. I still remember him writing a 'handbook / manual' so that new SDRs could come up to speed quickly. The manual was both expansive & thorough, and immensely helpful to new hires we brought on-board. Grant's intelligence, energy and attention to detail will be a huge asset to both himself and any company he chooses to work at.",
      company: "DNN",
    },
    {
      name: "John Malamud",
      title: "Former Account Executive at DNN",
      content:
        "I had the distinct pleasure of working with Grant while he ran the SDR team at DNN. I can say with confidence that Grant is one the sharpest and hardest working individuals I have ever worked with, and his accomplishments at DNN are evidence of this. While he was one of the younger team members, management saw his potential and made him team lead, a role in which he flourished. His dedication to the team he oversaw was admirable, and he never lost focus of the goals that were put in front of him. I highly recommend Grant for any team that is looking for smart and hungry players that can contribute off the bat.",
      company: "DNN",
    },
    {
      name: "Ian Ray",
      title: "Former Full Stack Web Developer at Canto",
      content:
        "Grant is a real team player, willing to roll up his sleeves and approach any task with confident optimism. Grant is highly computer literate. Which allows him to quickly learn and adapt with constantly evolving technology, which he can accurately articulate to customers. Working with Grant was not only fun, but very consistent and reliable. As a fellow Eagle Scout, Grant was incredibly trustworthy, loyal, helpful, friendly, courteous, kind, obedient, cheerful, thrifty, brave, clean, and reverent!",
      company: "DNN",
    },
    {
      name: "Lawrence Woo",
      title: "Former Enterprise Account Executive at DNN",
      content:
        "I worked with Grant in both roles when he was the SDR Team Manager and I continued to work alongside him when he was promoted to an Account Executive here at DNN. Throughout his time here at DNN, Grant consistently brought a tenacious drive to the table, always exceeding management's expectations and never losing focus on the long term goals. Being an exceptional team player, he was often designated as a resource for newer team members, however he was never afraid to strategize with his colleagues or senior management to discuss alternate solutions when difficult roadblocks arose in deals. Grant's rate of promotion here at DNN is a testament of what management sees in him, I know he will go far in his personal career and I can fully recommend his talents.",
      company: "DNN",
    },
    {
      name: "Michael Kutulas",
      title: " Former Sales Development at DNN",
      content:
        "I have had the great fortune and pleasure to work with Grant at DNN during my time there. Grant was the Team Lead for the SDR group. Grant is an enthusiastic and detail oriented individual, who achieves results by rolling up his sleeves and jumping in. He also knows how to communicate with people and understands the importance of timely communication. Grant achieved great success as an SDR by taking the time to learn the product and by consistently following up on his leads. Grant was also out to ensure the Team's success rather than worry about his own. He would freely share good leads with the SDR team and he was always there for us as our representative when issues needed to be brought up to upper management. I can wholly recommend Grant to whomever is considering hiring him for a position. You will get a solid, dedicated, respectful, bright, upbeat and responsible member for your organization!",
      company: "DNN",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Recommendations</h1>
            <p className="text-lg text-blue-600 font-medium italic mt-4">
              "From smart homes to smart sales — I help people work better with the right tech."
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-0 shadow-lg text-center backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">9+</div>
                <div className="text-sm text-slate-600">Professional Recommendations</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <div className="text-sm text-slate-600">CEO Endorsements</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-slate-600">Positive Feedback</div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{rec.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {rec.title} • {rec.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Quote className="w-6 h-6 text-slate-400 mb-3" />
                  <p className="text-slate-700 leading-relaxed text-sm">{rec.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Article */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Featured Article</span>
              </div>
              <CardTitle className="text-2xl">DNN Employee Profile: Grant Glazer</CardTitle>
              <CardDescription className="text-base">Published March 4th, 2016 by Dennis Shiao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  <strong>"I consider Grant Glazer an efficiency expert."</strong> When he met with us in 2015, DNN was
                  one of three companies Grant interviewed with that day. Yes, three on-site interviews in one day.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Grant was attracted to the office environment and noticed that the team enjoyed working with one
                  another. Grant found our Evoq products to be "easy-to-use, innovative and useful."
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  During his first month, Grant found the job to be as expected, except for one thing:{" "}
                  <em>"I didn't know I could have this much fun at work,"</em> he said. Unlike past jobs, Grant noticed
                  that everyone at DNN seems to truly enjoy working with one another.
                </p>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 mb-4">
                  "As an SDR, I specialize in uncovering and qualifying business opportunities for our account
                  executives. I like to step into their shoes, see what they're thinking and understand what's driving
                  their need for a solution."
                </blockquote>
                <p className="text-slate-700 leading-relaxed">
                  According to Grant, "I feel like I'm actually cared about here. My opinions are valued. If I ask
                  someone a question, they answer it. If they don't know the answer, they'll know whom to get the answer
                  from."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Work Together?</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join the growing list of satisfied clients and colleagues who have experienced Grant's expertise and
              dedication firsthand.
            </p>
            <div className="text-sm text-slate-500">
              <p>Additional references and detailed case studies available upon request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
