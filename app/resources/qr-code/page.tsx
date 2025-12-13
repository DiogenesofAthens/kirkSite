"use client"

import { FloatingNav } from "@/components/floating-nav"
import { QrCodeGenerator } from "@/components/qr-code-generator"
import { TimezoneClock } from "@/components/timezone-clock"

export default function QrCodePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <main className="px-4 pt-32 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">QR Code Generator</h1>
          <p className="text-muted-foreground">
            Create custom QR codes instantly. No data is sent to any server; everything happens in your browser.
          </p>
        </div>
        <QrCodeGenerator />
      </main>
    </div>
  )
}
