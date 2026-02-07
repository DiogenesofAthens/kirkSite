"use client";

import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />

      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="font-serif text-6xl font-normal tracking-tight mb-4">
          404
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
        >
          Return home
        </Link>
      </main>
    </div>
  );
}
