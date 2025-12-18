"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Calendar, Clock, ArrowRight, Mail, Search, Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import Lottie from "@/components/lottie-client"
import { ContactModal } from "@/components/contact-modal"
import { cn } from "@/lib/utils"

export default function Blog() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const blogPosts = [
    {
      title: "Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV",
      excerpt:
        "How I dropped my cable bill and built a better live TV experience with Plex and HDHomeRun.",
      date: "2025-07-15",
      readTime: "5 min read",
      category: "Smart Home",
      slug: "cut-cable",
    },
    {
      title: "From Scripts to Speedtest Tracker: How I Monitor My Internet Like a Pro (2025 Edition)",
      excerpt:
        "From using a Raspberry Pi, IFTTT and Google sheets in 2017 to using Docker and Unraid today. Here's how you can log your internet speeds too.",
      date: "2025-05-24",
      readTime: "9 min read",
      category: "Home Networking",
      slug: "speedtest-tracker",
    },
    {
      title: "AI in CPQ and CLM: Hype vs Reality in 2025",
      excerpt:
        "AI in CPQ and CLM? Not everything you hear is real! Here’s what’s working, where the technology struggles, and what to expect next as these tools evolve.",
      date: "2025-03-28",
      readTime: "4 min read",
      category: "Technology",
      slug: "ai-hype",
    },
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
      title: "Selling Enterprise Contract Management Software: Strategy, Discovery, and Results",
      excerpt: "How to uncover pain, match solutions to problems, and deliver ROI with modern CLM platforms.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Enterprise Sales",
      slug: "enterprise-contract-sales-processes",
    },
  ]

  const categories = Array.from(new Set(blogPosts.map(post => post.category)))

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category)
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategories, blogPosts])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <FloatingNav />
      <TimezoneClock />

      <div className="pt-28 pb-2 flex justify-center">
        <div className="w-40 sm:w-48 md:w-56">
          <Lottie animationData={require("@/public/images/blog-ani.json")} loop autoplay />
        </div>
      </div>

      <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mt-2 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Blog</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Insights on business technology, sales optimization, and industry trends
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto mb-8">
                <div className="relative w-full sm:flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search articles..."
                        className="pl-9 bg-white/50 dark:bg-slate-900/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full sm:w-[200px] justify-between bg-white/50 dark:bg-slate-900/50"
                    >
                      {selectedCategories.length > 0
                        ? `${selectedCategories.length} selected`
                        : "Filter Category"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              key={category}
                              value={category}
                              onSelect={() => toggleCategory(category)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCategories.includes(category) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {category}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                <div key={post.slug} className="relative group">
                    <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col text-center">
                    <CardHeader className="flex flex-col items-center">
                        <div className="flex items-center justify-center gap-4 mb-2 w-full">
                        <Badge
                            variant="secondary"
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                            {post.category}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.date + "T12:00:00").toLocaleDateString()}
                        </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-slate-50 text-center">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="hover:underline focus:underline focus:outline-none"
                            tabIndex={0}
                            aria-label={post.title}
                        >
                            {post.title}
                        </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between items-center">
                        <CardDescription className="text-base leading-relaxed mb-4 text-slate-700 dark:text-slate-300 text-center">
                        {post.excerpt}
                        </CardDescription>
                        <div className="flex items-center justify-center gap-4 mt-auto w-full">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                        </div>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
                        >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                        </div>
                    </CardContent>
                    </Card>
                    <Link
                    href={`/blog/${post.slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Read full post: ${post.title}`}
                    tabIndex={-1}
                    />
                </div>
                ))
            ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p>No posts found matching your criteria.</p>
                    <Button variant="link" onClick={() => {setSearchQuery(""); setSelectedCategories([])}}>Clear Filters</Button>
                </div>
            )}
          </div>

          <div className="mt-16 glass rounded-3xl p-8 text-center">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Let's Connect</h2>
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
                Found these insights helpful? Have questions about implementing these strategies in your organization?
                I'd love to discuss how these concepts can be applied to your specific business challenges.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowContactForm(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
