"use client"

import ReactMarkdown from "react-markdown"
import Image from "next/image"

const content = `
# Ditching Cable for Good: My OTA + Plex Setup That Replaced Xfinity TV

My Xfinity cable TV promo was about to expire. That meant my bill was about to jump for the same channels, one DVR box, and internet I already had. Instead of locking into another contract, I decided to cut the TV side of the service entirely.

I wanted to keep gigabit internet with unlimited data, and I was able to lock that in for $95/month for the next five years. That left TV. I considered YouTube TV and Hulu + Live TV, but at $83/month each, they didn’t save me much—and they still came with channel bloat and monthly fees.

So I dropped cable and replaced it with a simple, solid OTA setup backed by Plex DVR. Here's what I use.

## What I Bought

- ClearStream 2V antenna – $55  
  Picks up major local channels like NBC, ABC, CBS, FOX, PBS in 1080i

- HDHomeRun Flex 4K – $200  
  Streams live TV over my local network. No coax to every TV needed. Has four tuners and integrates with Plex DVR

- 50ft quad-shield coaxial cable – $19  
  Runs from the attic-mounted antenna to the HDHomeRun box

Total cost: about $275. That’s less than three months of cable TV.

## The Experience

The antenna feeds signal to the HDHomeRun box. That box broadcasts those channels over the network. Plex (with a Plex Pass) handles everything else—live TV, guide, recording, commercial skipping, series pass rules, and mobile streaming.

I can reorder channels, filter out shopping or religious channels I don’t care about, and add favorites. The interface is smooth and modern across TV, tablet, and phone.

## Plex DVR Tips

- You can set up season passes, daily recordings, or one-offs  
- Automatically skip commercials with Comskip  
- Record to NAS or external drive  
- Access live and recorded TV from anywhere with Plex remote streaming  
- Customize your guide so only the channels you want show up in the order you want

## Signal Testing with ChatGPT

While aiming the antenna in the attic, I wanted to test each channel one at a time to dial in reception.

I used ChatGPT to generate quick copy-paste commands for every channel I was testing. Here’s an example of what I asked:

Prompt:
\`\`\`
Give me a command I can run in PowerShell using hdhomerun_config to test a specific virtual channel and return the tuner status. Use channel 6.2 as the example. I’m using tuner0.
\`\`\`

Response:
\`\`\`powershell
.\hdhomerun_config 192.168.86.XX set /tuner0/vchannel 6.2
Start-Sleep -Seconds 2
.\hdhomerun_config 192.168.86.XX get /tuner0/status
\`\`\`

You can change the virtual channel number and repeat for each one. It made checking signal quality fast and easy while moving the antenna slightly between tests.

## Why I Did It

I don’t need hundreds of channels. I wanted reliable access to local news, football, and the ability to record things on my terms. Plex and HDHomeRun delivered exactly that.

Most importantly, I’m not locked into another overpriced bundle with hidden fees and promo deadlines. I still have fast, unlimited internet. I just don’t have a cable box or TV bill anymore.

## Final Thoughts

This setup pays for itself in three months. It gives me more control, better flexibility, and fewer limitations than my old Xfinity bundle ever did. If you're thinking about cutting the cord, skip the streaming bundles and go OTA with a Plex DVR. You’ll never look back.
`

export default function CutCablePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 prose dark:prose-invert">
      <Image
        src="/images/cable.png"
        alt="Throwing away cable box"
        width={800}
        height={400}
        className="rounded-xl mb-8"
      />
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
