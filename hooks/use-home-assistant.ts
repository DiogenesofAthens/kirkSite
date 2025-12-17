"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

interface Entity {
  entity_id: string
  state: string
  attributes: {
    friendly_name?: string
    [key: string]: any
  }
}

export function useHomeAssistant() {
  const [isConnected, setIsConnected] = useState(false)
  const [entities, setEntities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Initialize from localStorage
  useEffect(() => {
    const url = localStorage.getItem("ha_url")
    const token = localStorage.getItem("ha_token")
    if (url && token) {
      setIsConnected(true)
      // Attempt to refresh entities on load if possible, but silently
      refreshEntities(true)
    }
  }, [])

  const connect = async (url: string, token: string) => {
    setLoading(true)

    // Normalize URL
    let validUrl = url.trim().replace(/\/$/, "")
    if (!validUrl.startsWith("http")) {
        validUrl = `http://${validUrl}`
    }
    validUrl = validUrl.replace(/\/api$/, "").replace(/\/lovelace$/, "");

    try {
      // Strategy 1: Direct Client-Side Connection
      // Best for local-to-local (HTTP to HTTP) or properly configured CORS
      console.log("Attempting Direct Connection...")
      const res = await fetch(`${validUrl}/api/states`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        const data: Entity[] = await res.json()
        finalizeConnection(validUrl, token, "direct", data)
        return true
      } else {
         // If res is not OK (e.g. 401), throwing here will skip proxy check.
         // But if it's 401, proxy won't help either.
         if (res.status === 401) throw new Error("Unauthorized: Invalid Token")
         throw new Error(`Direct connection failed with status: ${res.status}`)
      }

    } catch (e: any) {
        console.warn("Direct connection failed:", e.message)

        // If it was a 401, don't try proxy.
        if (e.message.includes("Unauthorized")) {
             toast.error(e.message)
             setLoading(false)
             return false
        }

        // Strategy 2: Server-Side Proxy
        // Best for External HTTPS (CORS) or mixed content scenarios where Server can reach the target
        try {
            console.log("Attempting Proxy Connection...")
            const proxyRes = await fetch('/api/proxy/ha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: validUrl, token })
            })

            if (proxyRes.ok) {
                const data: Entity[] = await proxyRes.json()
                finalizeConnection(validUrl, token, "proxy", data)
                return true
            } else {
                 const errData = await proxyRes.json().catch(() => ({}))
                 throw new Error(errData.error || `Proxy connection failed: ${proxyRes.status}`)
            }
        } catch (proxyError: any) {
             console.error("Proxy connection failed:", proxyError)
             handleConnectionError(e, proxyError, validUrl)
             setLoading(false)
             return false
        }
    }
  }

  const finalizeConnection = (url: string, token: string, mode: "direct" | "proxy", data: Entity[]) => {
      localStorage.setItem("ha_url", url)
      localStorage.setItem("ha_token", token)
      localStorage.setItem("ha_mode", mode) // Store connection mode

      setIsConnected(true)
      processEntities(data)
      setLoading(false)
      toast.success(`Connected to Home Assistant (${mode === 'proxy' ? 'via Remote Proxy' : 'Directly'})!`)
  }

  const handleConnectionError = (directError: any, proxyError: any, url: string) => {
      // Determine the most helpful error message
      const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
      const isTargetHttp = url.startsWith("http:");

      let msg = "Connection Failed."

      if (isHttps && isTargetHttp) {
          msg = "Mixed Content Error: Cannot connect to HTTP (Local IP) from HTTPS. Use your External HTTPS URL."
      } else if (directError.name === 'TypeError' && directError.message === 'Failed to fetch') {
          // Network error on direct fetch (likely CORS)
          // AND Proxy failed (likely Server cannot reach Local IP)
          if (url.includes("192.168") || url.includes(".local")) {
             msg = "Cannot reach Local Home Assistant. If you are using HTTPS, the browser blocks Local HTTP. The server also cannot reach your Local IP."
          } else {
             msg = "Could not connect. Check your URL and Token."
          }
      } else {
          msg = proxyError.message || directError.message
      }

      toast.error(msg)
      setIsConnected(false)
  }

  const disconnect = () => {
      localStorage.removeItem("ha_url")
      localStorage.removeItem("ha_token")
      localStorage.removeItem("ha_mode")
      setIsConnected(false)
      setEntities([])
      toast.info("Disconnected from Home Assistant")
  }

  const refreshEntities = async (silent = false) => {
    const url = localStorage.getItem("ha_url")
    const token = localStorage.getItem("ha_token")
    const mode = localStorage.getItem("ha_mode") || "direct"

    if (!url || !token) {
        if (!silent) toast.error("Not connected")
        return
    }

    if (!silent) setLoading(true)

    try {
        let data: Entity[] = []

        if (mode === 'direct') {
             const res = await fetch(`${url}/api/states`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
             })
             if (!res.ok) throw new Error("Failed to fetch states")
             data = await res.json()
        } else {
             // Proxy Mode
             const res = await fetch('/api/proxy/ha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, token })
            })
            if (!res.ok) throw new Error("Failed to fetch states via proxy")
            data = await res.json()
        }

        processEntities(data)
        if (!silent) toast.success("Entities refreshed")
    } catch (e) {
        if (!silent) toast.error("Failed to refresh entities")
        // If refresh fails, maybe we lost connection? Don't disconnect automatically though.
    } finally {
        if (!silent) setLoading(false)
    }
  }

  const processEntities = (data: Entity[]) => {
      const relevantDomains = ["light", "switch", "binary_sensor", "sensor", "media_player", "climate", "lock", "cover", "input_boolean", "input_select", "script", "automation"]

      const simpleList = data
        .filter(e => {
            const domain = e.entity_id.split(".")[0]
            return relevantDomains.includes(domain)
        })
        .map(e => {
            const name = e.attributes.friendly_name || e.entity_id
            return `${name} (${e.entity_id})`
        })

      setEntities(simpleList)
  }

  return {
    isConnected,
    entities,
    connect,
    disconnect,
    refreshEntities,
    loading
  }
}
