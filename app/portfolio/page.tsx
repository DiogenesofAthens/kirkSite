import type { Metadata } from "next"
import { ProjectList } from "@/components/project-list"
import { PostList } from "@/components/post-list"
import { PROJECTS } from "@/lib/projects"
import { getPosts } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Portfolio",
  openGraph: { title: "Portfolio — Kirk Wessman", url: "/portfolio" },
}

export default function Portfolio() {
  const posts = getPosts()

  return (
    <div className="pb-6 pt-28 sm:pt-32">
      <h1 className="mb-3 font-serif text-[40px] font-normal leading-[1.05] tracking-tight text-foreground sm:text-[44px]">
        Portfolio
      </h1>
      <p className="mb-10 text-[17px] text-muted-foreground">Selected work and the occasional creative detour.</p>

      <section className="border-t border-border py-10">
        <h2 className="label mb-5">Projects</h2>
        <ProjectList projects={PROJECTS.filter((p) => p.group === "projects")} />
      </section>

      <section className="border-t border-border py-10">
        <h2 className="label mb-5">Also built</h2>
        <ProjectList projects={PROJECTS.filter((p) => p.group === "also")} />
      </section>

      {posts.length > 0 && (
        <section className="border-t border-border py-10">
          <h2 className="label mb-5">Writing</h2>
          <PostList posts={posts} />
        </section>
      )}
    </div>
  )
}
