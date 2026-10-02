import { ImageResponse } from "next/og"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const OG_SIZE = { width: 1200, height: 630 }

type Card = {
  eyebrow: string
  title: string
  subtitle?: string
  footerLeft: string
  footerRight?: string
}

/** A typographic share card in the site's own type and colors. */
export async function ogCard(card: Card) {
  const png = await renderCard(card)
  return new Response(png, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  })
}

// Cached so each card renders once, at build time where possible.
async function renderCard({ eyebrow, title, subtitle, footerLeft, footerRight }: Card): Promise<Uint8Array> {
  "use cache"
  const serif = readFileSync(join(process.cwd(), "assets/fonts/PlayfairDisplay-Regular.ttf"))
  const sans = readFileSync(join(process.cwd(), "assets/fonts/Inter-Regular.ttf"))

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#1a1a1a",
          padding: "72px 84px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#666666" }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Playfair Display",
              fontSize: title.length > 48 ? 60 : title.length > 28 ? 72 : 88,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", marginTop: 26, fontSize: 30, lineHeight: 1.4, color: "#333333", maxWidth: 960 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #eae8e6",
            paddingTop: 26,
            fontSize: 24,
            color: "#666666",
          }}
        >
          <span>{footerLeft}</span>
          <span>{footerRight ?? ""}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Playfair Display", data: serif, style: "normal", weight: 400 },
        { name: "Inter", data: sans, style: "normal", weight: 400 },
      ],
    },
  )
  return new Uint8Array(await image.arrayBuffer())
}
