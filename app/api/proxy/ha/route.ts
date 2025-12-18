
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { url, token } = await req.json()

    if (!url || !token) {
      return NextResponse.json({ error: "Missing URL or Token" }, { status: 400 })
    }

    // Security check: Only allow calls to /api/states (for now) to prevent open proxy abuse
    // Although the hook calls /api/states, we might need more later.
    // For now, we will construct the target URL here to be safe.
    // We assume the client passes the BASE URL.

    // Validate valid URL
    let validUrl = url.replace(/\/$/, "")
    if (!validUrl.startsWith("http")) {
        validUrl = `http://${validUrl}`
    }

    // We only proxy to /api/states for the initial connection check & entity fetch.
    const targetEndpoint = `${validUrl}/api/states`

    console.log(`[HA Proxy] Proxying to: ${targetEndpoint}`)

    const response = await fetch(targetEndpoint, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
       console.error(`[HA Proxy] Upstream Error: ${response.status} ${response.statusText}`)
       return NextResponse.json(
           { error: `Upstream Error: ${response.status}` },
           { status: response.status }
       )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error: any) {
    console.error("[HA Proxy] Error:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
