"use client"

import { useState, useEffect } from "react"
import QRCode from "qrcode"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Download, Link2 } from "lucide-react"

export function QrCodeGenerator() {
  const [input, setInput] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  useEffect(() => {
    if (input) {
      QRCode.toDataURL(input, { width: 300, margin: 2, color: { dark: "#000000", light: "#ffffff" } })
        .then((url) => {
          setQrCodeUrl(url)
        })
        .catch((err) => {
          console.error(err)
          setQrCodeUrl("")
        })
    } else {
      setQrCodeUrl("")
    }
  }, [input])

  const downloadQR = () => {
    if (qrCodeUrl) {
      const downloadLink = document.createElement("a")
      downloadLink.download = "qrcode.png"
      downloadLink.href = qrCodeUrl
      downloadLink.click()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto glass shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="w-6 h-6 text-primary" /> QR Code Generator
        </CardTitle>
        <CardDescription>Generate and download QR codes for links or text.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter URL or text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex justify-center p-4 bg-white rounded-lg border min-h-[300px] items-center">
          {qrCodeUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64 object-contain" />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
              Enter text to generate
            </div>
          )}
        </div>

        <Button
          onClick={downloadQR}
          disabled={!qrCodeUrl}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" /> Download PNG
        </Button>
      </CardContent>
    </Card>
  )
}
