import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Blog() {
  const blogPosts = [
    {
      title: "The Future of SaaS Sales: Trends to Watch in 2024",
      excerpt:
        "Exploring emerging trends in software sales and how businesses can adapt to changing customer expectations.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Sales",
      slug: "future-of-saas-sales-2024",
    },
    {
      title: "Optimizing Enterprise Technology Implementations",
      excerpt: "Best practices for successful technology rollouts in large organizations, from planning to execution.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Technology",
      slug: "optimizing-enterprise-tech-implementations",
    },
    {
      title: "Building Effective Sales Processes for Government Contracts",
      excerpt: "Navigate the complexities of government sales with proven strategies and compliance considerations.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Government Sales",
      slug: "government-contract-sales-processes",
    },
    {
      title: "How I Built My Personal Media Server (And How You Can Too)",
      excerpt:
        "A complete guide to setting up your own media server using Unraid, Plex, and automated content management.",
      date: "2024-01-01",
      readTime: "12 min read",
      category: "Technology",
      slug: "personal-media-server-guide",
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

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Blog</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
              Insights on business technology, sales optimization, and industry trends
            </p>
            <p className="text-lg text-blue-600 font-medium italic">
              "Solving business problems with smart processes, strategic thinking, and hands-on tech know-how."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">{post.excerpt}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-100 text-blue-800">Featured</Badge>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Digital Transformation in the Post-Pandemic Era</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              How businesses are adapting their technology strategies and sales processes to thrive in the new normal.
              This comprehensive guide covers the key trends, challenges, and opportunities that organizations face when
              implementing digital transformation initiatives.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  January 20, 2024
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  12 min read
                </div>
              </div>
              <Link
                href="/blog/digital-transformation-post-pandemic"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-slate-900/95 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Never Miss an Update</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Subscribe to get the latest insights on business technology, sales strategies, and industry trends
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
