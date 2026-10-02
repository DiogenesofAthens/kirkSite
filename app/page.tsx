import Link from "next/link"
import { ContactLink } from "@/components/contact-link"
import { ProjectList } from "@/components/project-list"
import { PostList } from "@/components/post-list"
import { PROJECTS, LINKS } from "@/lib/projects"
import { getPosts } from "@/lib/writing"

export default function Home() {
  const posts = getPosts().slice(0, 3)

  return (
    <>
      <section className="pb-10 pt-32 sm:pt-40">
        <h1 className="mb-5 font-serif text-[44px] font-normal leading-[1.05] tracking-tight text-foreground sm:text-[56px]">
          Kirk Wessman
        </h1>
        <p className="mb-1.5 text-lg text-foreground sm:text-[19px]">Solutions Engineer · Enterprise AI Systems</p>
        <p className="mb-6 text-[17px] text-muted-foreground">Discovery, architecture, evals, and security review.</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
          <ContactLink className="link" />
          <a className="link" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </section>

      <section className="pb-12">
        <p className="max-w-[40rem] text-[17px] leading-[1.7] text-body sm:text-lg">
          My focus extends well beyond signature. On a practical level, I own the customer’s usage curve. On a human
          level, I care whether they’re glad they bought it.{" "}
          <Link href="/about" className="link">
            More about me
          </Link>
        </p>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="label mb-5">Featured</h2>
        <a href={LINKS.evals} target="_blank" rel="noopener noreferrer" className="group block max-w-[40rem]">
          <span className="block text-[19px] font-medium leading-snug text-foreground underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-underline">
            Swapping model providers under a layered eval harness ↗
          </span>
          <span className="mt-1.5 block text-base leading-relaxed text-body">
            Three providers, nine deterministic gates, a cross-family judge run in both orderings. Results as static
            JSON; the page makes no model calls.
          </span>
          <span className="meta mt-2 block">PortKey · September 2026</span>
        </a>
      </section>

      {posts.length > 0 && (
        <section className="border-t border-border py-10">
          <h2 className="label mb-5">Writing</h2>
          <PostList posts={posts} />
        </section>
      )}

      <section className="border-t border-border py-10">
        <h2 className="label mb-5">Projects</h2>
        <ProjectList projects={PROJECTS.filter((p) => p.featured)} />
        <p className="mt-7 text-[15px]">
          <Link href="/portfolio" className="link">
            All projects →
          </Link>
        </p>
      </section>
    </>
  )
}
