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
      // Optionally fetch entities on load?
      // User prompt says "refreshEntities" does the fetch.
      // We'll let the UI trigger the fetch to avoid auto-spamming on load,
      // or we can do a quick check. For now, just set connected state.
    }
  }, [])

  const connect = async (url: string, token: string) => {
    setLoading(true)
    try {
      // Validate URL format - simple check
      let validUrl = url.replace(/\/$/, "") // remove trailing slash
      if (!validUrl.startsWith("http")) {
          validUrl = `http://${validUrl}`
      }

      const res = await fetch(`${validUrl}/api/states`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error("Connection failed. Check URL and Token.")
      }

      // If successful, save credentials
      localStorage.setItem("ha_url", validUrl)
      localStorage.setItem("ha_token", token)
      setIsConnected(true)

      // Process entities immediately
      const data: Entity[] = await res.json()
      processEntities(data)

      toast.success("Connected to Home Assistant!")
      return true
    } catch (e) {
      console.error(e)
      toast.error("Connection Failed. Check URL (must be reachable from browser) and Token.")
      setIsConnected(false)
      return false
    } finally {
      setLoading(false)
    }
  }

  const disconnect = () => {
      localStorage.removeItem("ha_url")
      localStorage.removeItem("ha_token")
      setIsConnected(false)
      setEntities([])
      toast.info("Disconnected from Home Assistant")
  }

  const refreshEntities = async () => {
    const url = localStorage.getItem("ha_url")
    const token = localStorage.getItem("ha_token")

    if (!url || !token) {
        toast.error("Not connected")
        return
    }

    setLoading(true)
    try {
        const res = await fetch(`${url}/api/states`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        })

        if (!res.ok) throw new Error("Failed to fetch states")

        const data: Entity[] = await res.json()
        processEntities(data)
        toast.success("Entities refreshed")
    } catch (e) {
        toast.error("Failed to refresh entities")
    } finally {
        setLoading(false)
    }
  }

  const processEntities = (data: Entity[]) => {
      // Map to simple string array: "Friendly Name (entity_id)"
      // Filter out some noisy domains if needed, but for now take all or standard ones
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
