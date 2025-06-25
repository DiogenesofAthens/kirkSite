import { FloatingNav } from "@/components/floating-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TimezoneClock } from "@/components/timezone-clock"

export default function AreasOfExpertise() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">My Expertise</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive business technology and process consulting across multiple domains
            </p>
            <p className="text-lg text-blue-600 font-medium italic mt-4">
              "Bridging the gap between sales, tech, and process — with proven results."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Sales & Marketing Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  Extensive experience sourcing and closing sales of consumer goods and software solutions, both
                  on-premise and cloud-based. Proven methodologies to drive your bottom line.
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">SaaS Sales</Badge>
                  <Badge variant="secondary">Enterprise Solutions</Badge>
                  <Badge variant="secondary">Lead Generation</Badge>
                  <Badge variant="secondary">Cold Calling</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Website Design & Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  Deployed and customized websites using .NET and PHP content management systems including DNN and
                  WordPress. Expert consultation for your web presence needs.
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">.NET</Badge>
                  <Badge variant="secondary">PHP</Badge>
                  <Badge variant="secondary">WordPress</Badge>
                  <Badge variant="secondary">DNN</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Technology Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  From mobile device optimization to custom computer builds, servers, and home automation systems.
                  Comprehensive technology implementation and consulting services.
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">System Integration</Badge>
                  <Badge variant="secondary">Home Automation</Badge>
                  <Badge variant="secondary">Server Setup</Badge>
                  <Badge variant="secondary">Mobile Optimization</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Skills Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Core Competencies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Sales & Business Development</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Sales Solution Consulting</li>
                  <li>• Account Management</li>
                  <li>• Customer Support Excellence</li>
                  <li>• Lead Generation Strategies</li>
                  <li>• Government & Enterprise Sales</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Technology & Operations</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Technical Troubleshooting</li>
                  <li>• Computer Analytics</li>
                  <li>• Team Management</li>
                  <li>• Operational Excellence</li>
                  <li>• Process Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
