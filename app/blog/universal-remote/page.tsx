"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, X, ChevronDown, ChevronUp, Check, Copy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function UniversalRemotePage() {
  const [modalImage, setModalImage] = useState<null | { url: string; alt: string }>(null)

  const content = {
    title: "The \"Where's the Remote?\" Solution: Building a Universal Controller in Home Assistant",
    excerpt: "The couch cushions ate it. The dog hid it. It has transcended into another dimension. Here is how I designed my \"always-there\" universal remote in Home Assistant.",
    category: "Smart Home",
    readTime: "7 min read",
    publishDate: "2025-09-20",
    heroImage: "/images/blog/remote.jpg",
    body: [
      {
        type: "markdown",
        text: `# The "Where's the Remote?" Solution: Building a Universal Controller in Home Assistant

It’s 8:00 PM on a Friday. The pizza just arrived. You sink into the couch, ready to fire up Plex or binge the latest Netflix series. You reach for the remote...
And it’s gone.
The couch cushions ate it. The dog hid it. It has transcended into another dimension.

I use a Logitech Harmony Hub setup with an LG Smart TV. It works great, when I can find the physical remote. After spending way too many evenings tearing the living room apart looking for a piece of black plastic, I decided to build the ultimate backup plan.

I built a Universal TV Remote right inside Home Assistant.

This isn't just a clunky list of switches. It's a fully designed interface that lives on my phone (which is always in my pocket), my tablet, my work laptop, and, best of all, on my wrist via Wear OS.

Here is how I designed my "always-there" universal remote.`
      },
      {
        type: "markdown",
        text: `## The Strategy: Clean, Functional, and Everywhere

A good software remote needs to be faster than digging under the sofa. It needs to look good and respond instantly.

To achieve the aesthetic I wanted, clean buttons, intuitive layout, and distinct sections, I relied heavily on a few custom Lovelace cards. If you don't have these installed via HACS yet, go get them:

• Mushroom Cards: For the overall clean aesthetic.
• custom:button-card: The heavy lifter. It allows for precise control over styling, icons, and tap actions.
• vertical-stack-in-card: To group elements tightly together without borders.`
      },
      {
        type: "markdown",
        text: `## The Main Stage: The LG & Harmony Interface

My primary view is designed for speed. It handles the 90% use cases: turning things on, changing volume, and navigating simple menus.

It leverages the Harmony Hub integration to switch activities (Plex, Laptop HDMI, Netflix, Xbox, Switch) with a single tap. The directional pad and volume controls send commands directly to the LG TV or Soundbar via the Hub.

It looks clean on mobile, but it's ridiculously convenient on my Wear OS watch. I set up Home Assistant tiles on my watch face, so I can turn on Netflix or mute the volume without even picking up my phone. It feels like living in the future.

Here is the YAML for my main remote view.

Note: I’ve replaced my specific device IDs with placeholders. You’ll need to plug in your own Harmony Hub device ID. Give your Device ID and this code to a LLM and it will plug it in for you!`
      },
      {
        type: "code-block",
        title: "Main Remote View YAML",
        language: "yaml",
        code: `views:
  - title: Harmony
    path: harmony
    icon: mdi:remote-tv
    theme: Mushroom
    badges: []
    cards:
      - type: horizontal-stack
        cards:
          - type: custom:vertical-stack-in-card
            cards:
              - type: markdown
                content: |2
                        # <center> LG TV Remote </center>
              - type: custom:button-card
                tap_action:
                  action: toggle
                name: Power
                icon: mdi:power
                entity: remote.harmony_hub
                size: 15%
              - type: grid
                cards:
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.turn_on
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        activity: Plex
                    icon: mdi:plex
                    entity: remote.harmony_hub
                    name: Plex
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.turn_on
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        activity: Laptop hdmi
                    icon: mdi:laptop
                    entity: remote.harmony_hub
                    name: Laptop HDMI
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.turn_on
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        activity: Watch Netflix
                    icon: mdi:netflix
                    entity: remote.harmony_hub
                    name: Netflix
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.turn_on
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        activity: Prime Video
                    icon: mdi:cart-variant
                    entity: remote.harmony_hub
                    name: Prime Video
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.turn_on
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        activity: Play Xbox One
                    icon: mdi:microsoft-xbox
                    entity: remote.harmony_hub
                    name: Xbox
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.turn_on
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        activity: Nintendo Switch
                    icon: mdi:nintendo-switch
                    entity: remote.harmony_hub
                    name: Nintendo Switch
              # --- Directional Pad and Controls below ---
              - type: grid
                columns: 3
                cards:
                  - type: custom:gap-card
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG TV
                        command: DirectionUp
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:arrow-up-bold-outline
                    name: Up
                    entity: remote.harmony_hub
                    hold_action:
                      action: none
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG TV
                        command: Settings
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:cog-outline
                    entity: remote.harmony_hub
                    name: Settings
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG TV
                        command: DirectionLeft
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:arrow-left-bold-outline
                    entity: remote.harmony_hub
                    name: Left
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        num_repeats: 1
                        delay_secs: 0.4
                        hold_secs: 0
                        device: LG TV
                        command: OK
                    entity: remote.harmony_hub
                    name: Select
                    icon: mdi:checkbox-blank-circle-outline
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        num_repeats: 1
                        delay_secs: 0.4
                        hold_secs: 0
                        device: LG TV
                        command: DirectionRight
                    entity: remote.harmony_hub
                    name: Right
                    icon: mdi:arrow-right-bold-outline
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG TV
                        command: Home
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:home
                    entity: remote.harmony_hub
                    name: Smart TV Home
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        num_repeats: 1
                        delay_secs: 0.4
                        hold_secs: 0
                        command: Back
                        device: LG TV
                    entity: remote.harmony_hub
                    icon: mdi:arrow-left-bold-circle-outline
                    name: Back
                  - type: custom:gap-card
              # --- Media & Volume Controls ---
              - type: grid
                columns: 3
                cards:
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG TV
                        command: Input
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:import
                    entity: remote.harmony_hub
                    name: Input
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG TV
                        command: Rewind
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:rewind
                    entity: remote.harmony_hub
                    name: Rewind
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                      data:
                        num_repeats: 1
                        delay_secs: 0.4
                        hold_secs: 0
                        device: LG TV
                        command: FastForward
                    entity: remote.harmony_hub
                    name: Fast Forward
                    icon: mdi:fast-forward
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG Soundbar
                        command: VolumeDown
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:volume-minus
                    entity: remote.harmony_hub
                    name: Volume Down
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG Soundbar
                        command: Mute
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:volume-mute
                    entity: remote.harmony_hub
                    name: Mute
                  - show_name: true
                    show_icon: true
                    type: button
                    tap_action:
                      action: call-service
                      service: remote.send_command
                      data:
                        device: LG Soundbar
                        command: VolumeUp
                      target:
                        device_id: YOUR_HARMONY_DEVICE_ID
                    icon: mdi:volume-plus
                    entity: remote.harmony_hub
                    name: Volume Up
              # --- Throwing a light in there for good measure ---
              - type: light
                entity: light.sink_light
                name: Living Room Light`
      },
      {
        type: "markdown",
        text: `## The Deep Dive: The Xfinity Secondary Remote

Sometimes you need the deep cuts. The specific DVR button, the "Info" button, or the actual number pad to type in a channel.

I didn't want these buttons cluttering up the main view, so I created a secondary "sections" view specifically for Xfinity controls.

For this view, I used custom:button-card extensively to style the Xfinity icons with their distinct purple brand color (#6138F6), making it visually distinct from the main remote.

Here is the code for the Xfinity specific remote interface:`
      },
      {
        type: "code-block",
        title: "Xfinity Remote View YAML",
        language: "yaml",
        code: `type: horizontal-stack
cards:
  - type: custom:vertical-stack-in-card
    cards:
      - type: markdown
        content: |2
                # <center> Xfinity Remote </center>
      - type: grid
        cards:
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
              data:
                command: Menu
                device: Xfinity DVR
            entity: remote.harmony_hub
            icon: mdi:menu
            name: Xfinity Menu
            styles:
              icon:
                - color: "#6138F6"
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
              data:
                device: Xfinity DVR
                command: DirectionUp
            icon: mdi:arrow-up-bold-outline
            name: Up
            styles:
              icon:
                - color: "#6138F6"
            entity: remote.harmony_hub
            hold_action:
              action: none
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              data:
                device: Xfinity DVR
                command: Guide
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
            icon: mdi:television-guide
            entity: remote.harmony_hub
            name: Guide
            styles:
              icon:
                - color: "#6138F6"
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              target:
                entity_id: remote.harmony_hub
              data:
                device: Xfinity DVR
                command: DirectionLeft
            entity: remote.harmony_hub
            name: Left
            icon: mdi:arrow-left-bold-outline
            styles:
              icon:
                - color: "#6138F6"
            show_state: false
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
              data:
                device: Xfinity DVR
                command: Select
            entity: remote.harmony_hub
            name: Select
            icon: mdi:checkbox-blank-circle-outline
            styles:
              icon:
                - color: "#6138F6"
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
              data:
                device: Xfinity DVR
                command: DirectionRight
            entity: remote.harmony_hub
            name: Right
            icon: mdi:arrow-right-bold-outline
            styles:
              icon:
                - color: "#6138F6"
          # --- Numpad and Extra Controls ---
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
              data:
                command: Record
                device: Xfinity DVR
            icon: mdi:record-rec
            entity: remote.harmony_hub
            name: Record
            styles:
              icon:
                - color: "#6138F6"
          - type: custom:gap-card
          - show_name: true
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              data:
                device: Xfinity DVR
                command: Info
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
            icon: mdi:information-outline
            entity: remote.harmony_hub
            name: Info
            styles:
              icon:
                - color: "#6138F6"
          # (Note: Truncated numpad for brevity, but the pattern continues for 1-0)
          - show_name: false
            show_icon: true
            type: custom:button-card
            tap_action:
              action: call-service
              service: remote.send_command
              target:
                device_id: YOUR_HARMONY_DEVICE_ID
              data:
                device: Xfinity DVR
                command: 1
            entity: remote.harmony_hub
            name: "1"
            icon: mdi:numeric-1
            styles:
              icon:
                - color: "#6138F6"
          # ... repeat for numbers 2 through 0 ...`
      },
      {
        type: "markdown",
        text: `## Final Thoughts

Is it as tactile as a physical remote? No. But is it always available, impossible to lose, and accessible from literally every screen I own? Yes.

Stop digging in the couch cushions. Build a backup.`
      }
    ]
  }

  function CollapsibleCodeBlock({ title, language, code }: { title: string, language: string, code: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="my-8 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="font-mono text-sm font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal text-xs">{language}</Badge>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        {isOpen && (
          <div className="relative">
             <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 rounded-md bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="bg-slate-950 text-slate-50 p-4 overflow-x-auto m-0">
              <code className="text-sm font-mono whitespace-pre">{code}</code>
            </pre>
          </div>
        )}
      </div>
    )
  }

  function renderBody() {
    return content.body.map((block, index) => {
      if (block.type === "markdown") {
        return block.text.split("\n").map((line, i) => {
          if (line.startsWith("# ")) return <h1 key={`${index}-${i}`} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>
          if (line.startsWith("## ")) return <h2 key={`${index}-${i}`} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>
          if (line.startsWith("### ")) return <h3 key={`${index}-${i}`} className="text-xl font-bold mt-4 mb-2">{line.slice(4)}</h3>
          if (line.startsWith("• ")) return <li key={`${index}-${i}`} className="ml-4 list-disc mb-2">{line.slice(2)}</li>
           if (line.trim() === "") return <br key={`${index}-${i}`} />
          return <p key={`${index}-${i}`} className="mb-4 leading-relaxed">{line}</p>
        })
      } else if (block.type === "code-block") {
        return (
          <CollapsibleCodeBlock
            key={index}
            title={block.title || "Code"}
            language={block.language || "text"}
            code={block.code || ""}
          />
        )
      }
    })
  }

  function ImageModal({ image, onClose }: { image: { url: string; alt: string }; onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
        <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 z-10"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>
          <Image
            src={image.url}
            alt={image.alt}
            width={1200}
            height={800}
            className="rounded shadow-sm w-full max-h-[80vh] object-contain"
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      {modalImage && <ImageModal image={modalImage} onClose={() => setModalImage(null)} />}

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Writing
          </Link>

          <Card className="glass border-0 shadow-sm mb-8">
            <CardContent className="p-8">
              <Badge variant="secondary" className="mb-4">{content.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-gray-100">{content.title}</h1>

              <div className="flex items-center gap-6 text-sm text-slate-600 mb-6 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(content.publishDate + "T12:00:00").toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {content.readTime}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalImage({ url: content.heroImage, alt: content.title })}
                className="w-full"
                style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
                aria-label="View hero image"
              >
                <Image
                  src={content.heroImage || "/placeholder.svg"}
                  alt={content.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain rounded-lg transition-transform hover:scale-[1.02] duration-200"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </button>

              <p className="text-lg text-slate-600 mt-6 leading-relaxed dark:text-gray-400">{content.excerpt}</p>
            </CardContent>
          </Card>

          <Card className="glass border-0 shadow-sm mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none dark:text-gray-400 dark:prose-invert whitespace-pre-wrap">
                {renderBody()}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Link href="/blog" className="text-amber-700 hover:text-amber-800">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
