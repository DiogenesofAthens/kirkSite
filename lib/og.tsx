import { ImageResponse } from "next/og"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const OG_SIZE = { width: 1200, height: 630 }

type Tile = { value: string; label: string }

type Card = {
  eyebrow: string
  title: string
  subtitle?: string
  footerLeft: string
  footerRight?: string
  /** "dark" = ink background, paper type; the default stays the site's light page */
  theme?: "light" | "dark"
  /** Up to four stats shown as tiles in place of the subtitle */
  tiles?: Tile[]
}

const THEMES = {
  light: { bg: "#ffffff", ink: "#1a1a1a", body: "#333333", muted: "#666666", rule: "#eae8e6", tileBg: "#f7f5f3", tileBorder: "#eae8e6" },
  dark: { bg: "#0f0f0f", ink: "#ece8e3", body: "#cfc9c2", muted: "#9b958e", rule: "#2a2a2a", tileBg: "#161616", tileBorder: "#2a2a2a" },
}

/** A typographic share card in the site's own type and colors. */
export async function ogCard(card: Card) {
  const png = await renderCard(card)
  return new Response(png, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  })
}

// Cached so each card renders once, at build time where possible.
async function renderCard({ eyebrow, title, subtitle, footerLeft, footerRight, theme = "light", tiles = [] }: Card): Promise<Uint8Array> {
  "use cache"
  const c = THEMES[theme]
  const hasTiles = tiles.length > 0
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
          background: c.bg,
          color: c.ink,
          padding: hasTiles ? "64px 84px 56px" : "72px 84px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontSize: hasTiles ? 22 : 26, color: c.muted, ...(hasTiles ? { letterSpacing: "0.12em" } : {}) }}>
          {hasTiles ? eyebrow.toUpperCase() : eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Playfair Display",
              fontSize: title.length > 48 ? (hasTiles ? 58 : 60) : title.length > 28 ? 72 : 88,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 1032,
            }}
          >
            {title}
          </div>
          {subtitle && !hasTiles ? (
            <div style={{ display: "flex", marginTop: 26, fontSize: 30, lineHeight: 1.4, color: c.body, maxWidth: 960 }}>
              {subtitle}
            </div>
          ) : null}
          {hasTiles ? (
            <div style={{ display: "flex", marginTop: 44 }}>
              {tiles.map((t, i) => (
                <div
                  key={t.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    marginLeft: i === 0 ? 0 : 16,
                    padding: "22px 26px 20px",
                    background: c.tileBg,
                    border: `1px solid ${c.tileBorder}`,
                    borderRadius: 10,
                  }}
                >
                  <div style={{ display: "flex", fontFamily: "Playfair Display", fontSize: 54, lineHeight: 1, color: c.ink }}>{t.value}</div>
                  <div style={{ display: "flex", marginTop: 12, fontSize: 19, letterSpacing: "0.08em", color: c.muted }}>
                    {t.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${c.rule}`,
            paddingTop: hasTiles ? 22 : 26,
            fontSize: hasTiles ? 22 : 24,
            color: c.muted,
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
