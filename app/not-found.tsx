// app/not-found.tsx
"use client";

import { useTheme } from "next-themes"; // If you use next-themes for dark/light
import Lottie from "lottie-react";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav"; // Adjust if your nav path is different
import { useEffect, useState } from "react";

export default function NotFound() {
  const { theme } = useTheme(); // Only if you use next-themes
  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    // Dynamically import the Lottie JSON to avoid SSR issues
    fetch("/images/404.json")
      .then((res) => res.json())
      .then(setLottieData);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
      theme === "dark"
        ? "bg-slate-900 text-slate-100"
        : "bg-white text-slate-900"
    }`}>
      <FloatingNav />
      <div className="flex-1 flex flex-col items-center justify-center pt-24">
        <div className="w-full max-w-md mb-8">
          {lottieData && (
            <Lottie animationData={lottieData} loop={true} />
          )}
        </div>
        <h1 className="text-4xl font-bold mb-2">Houston, we have a 404...</h1>
        <p className="mb-6 text-lg text-center max-w-xl">
          It’s full of stars... and 0 content.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Abort Mission
        </Link>
      </div>
    </div>
  );
}
