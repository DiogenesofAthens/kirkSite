"use client";

import { useTheme } from "next-themes";
import Lottie from "@/components/lottie-client";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);

  // Ensure dark mode/theme only renders after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamically fetch Lottie JSON (avoids SSR issues)
  useEffect(() => {
    fetch("/images/404.json")
      .then((res) => res.json())
      .then(setLottieData);
  }, []);

  if (!mounted) return null; // Prevents initial theme mismatch flash

  return (
    <div
      className={`relative min-h-screen flex flex-col transition-colors duration-500 ${
        resolvedTheme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-white text-slate-900"
      }`}
    >
      {/* If FloatingNav should not affect centering, give it fixed/absolute position */}
      <FloatingNav />

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md mb-8 mx-auto">
          {lottieData && <Lottie animationData={lottieData} loop={true} />}
        </div>
        <h1 className="text-4xl font-bold mb-2 text-center">
          Houston, we have a 404...
        </h1>
        <p className="mb-6 text-lg text-center max-w-xl">
          It’s full of stars... and 0 content.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded bg-neutral-900 text-white hover:bg-neutral-800 transition"
        >
          Abort Mission
        </Link>
      </main>
    </div>
  );
}
