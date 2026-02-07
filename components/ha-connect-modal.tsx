"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useHomeAssistant } from "@/hooks/use-home-assistant"
import { Wifi, Loader2, Check, AlertTriangle, LogOut, HelpCircle, ExternalLink } from "lucide-react"

interface HAConnectModalProps {
  haHook: ReturnType<typeof useHomeAssistant>
}

export function HAConnectModal({ haHook }: HAConnectModalProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [token, setToken] = useState("")
  const [connectionError, setConnectionError] = useState(false)

  const handleConnect = async () => {
    if (!url || !token) return
    setConnectionError(false)
    const success = await haHook.connect(url, token)
    if (success) {
        setOpen(false)
        setConnectionError(false)
    } else {
        setConnectionError(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={haHook.isConnected ? "outline" : "secondary"} className={`gap-2 ${haHook.isConnected ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400" : ""}`}>
           {haHook.isConnected ? <Check className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
           {haHook.isConnected ? "Connected to HA" : "Connect Home Assistant"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect to Home Assistant</DialogTitle>
          <DialogDescription>
            Provide your local HA URL and a Long-Lived Access Token to allow the AI to see your entities.
          </DialogDescription>
        </DialogHeader>

        {!haHook.isConnected ? (
            <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="url">Home Assistant URL</Label>
                <Input
                id="url"
                placeholder="http://homeassistant.local:8123"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="token">Long-Lived Access Token</Label>
                <Input
                id="token"
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200 dark:border-amber-800 flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                    Credentials are stored <strong>locally in your browser</strong>. We cannot see them. This connection happens directly between your browser and your Home Assistant instance.
                </p>
            </div>

            {/* CORS Error Help */}
            {connectionError && (
                <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-md border border-red-200 dark:border-red-800 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-semibold text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        Connection Blocked?
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-300">
                        You must enable CORS in your Home Assistant <code>configuration.yaml</code> to allow this connection:
                    </p>
                    <pre className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-[10px] font-mono overflow-x-auto text-slate-800 dark:text-slate-200">
{`http:
  cors_allowed_origins:
    - https://kirkwessman.com
    - http://localhost:3000`}
                    </pre>
                    <p className="text-xs text-red-600 dark:text-red-300 font-semibold">
                        Restart Home Assistant after saving.
                    </p>
                </div>
            )}

            </div>
        ) : (
             <div className="py-6 flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                     <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                 </div>
                 <p className="text-center text-slate-600 dark:text-slate-300">
                     You are connected! The AI now has access to your <strong>{haHook.entities.length}</strong> entities.
                 </p>
                 <Button variant="destructive" onClick={() => { haHook.disconnect(); setOpen(false); }}>
                     <LogOut className="w-4 h-4 mr-2" />
                     Disconnect
                 </Button>
             </div>
        )}

        {!haHook.isConnected && (
            <DialogFooter>
            <Button onClick={handleConnect} disabled={haHook.loading}>
                {haHook.loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Connect & Fetch Entities
            </Button>
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
