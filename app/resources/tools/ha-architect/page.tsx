"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Copy, Loader2, Info, Sparkles, X, Check } from "lucide-react"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { generateYaml } from "@/app/actions/generate-yaml"

export default function HomeAssistantArchitect() {
  const { theme, resolvedTheme } = useTheme()
  const [mode, setMode] = useState<"generator" | "debugger">("generator")
  const [input, setInput] = useState("")
  const [yamlCode, setYamlCode] = useState("// Generated YAML will appear here...")
  const [explanation, setExplanation] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSecurityBanner, setShowSecurityBanner] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please provide some input.")
      return
    }

    setLoading(true)
    setYamlCode("// Processing...")
    setExplanation("")

    try {
      const result = await generateYaml(input, mode)

      if (result.error) {
        toast.error(result.error)
        setYamlCode(`// Error: ${result.error}`)
      } else if (result.success && result.data) {
        setYamlCode(result.data.yaml_code)
        setExplanation(result.data.explanation)
        toast.success(mode === "generator" ? "Automation generated!" : "YAML fixed!")
      }
    } catch (e) {
      toast.error("An unexpected error occurred")
      setYamlCode("// An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!yamlCode || yamlCode.startsWith("//")) return
    navigator.clipboard.writeText(yamlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success("Copied to clipboard")
  }

  // Determine Monaco Editor Theme
  // If mounted, check resolvedTheme. If not mounted, default to something safe or light/dark depending on preference.
  // Using resolvedTheme ensures we handle system preferences correctly.
  const editorTheme = resolvedTheme === 'dark' ? "vs-dark" : "light"

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 relative">
      <FloatingNav />

      {/* Main Content */}
      <main className="pt-24 md:pt-28 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-2 gap-2 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-3 flex-wrap justify-center">
              Home Assistant Architect
              <span className="text-xs font-normal bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                YAML Generator & Debugger
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Create and repair Home Assistant automations with expert AI assistance.
            </p>
        </div>

        {/* Split Pane Layout */}
        <div className="grid md:grid-cols-2 gap-6 min-h-[600px]">

            {/* Left Pane: Input & Controls */}
            <Card className="flex flex-col p-6 gap-4 shadow-lg border-slate-200 dark:border-slate-800 h-full bg-white dark:bg-slate-900 relative">
                <Tabs value={mode} onValueChange={(v) => { setMode(v as "generator" | "debugger"); setInput(""); }} className="w-full flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                        <TabsList className="grid w-[200px] grid-cols-2">
                            <TabsTrigger value="generator">Generator</TabsTrigger>
                            <TabsTrigger value="debugger">Debugger</TabsTrigger>
                        </TabsList>

                        {/* Action Button Moved to Header */}
                         <Button
                            onClick={handleGenerate}
                            disabled={loading || !input.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                         >
                             {loading ? (
                                 <>
                                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                     Processing...
                                 </>
                             ) : (
                                 <>
                                     <Sparkles className="w-4 h-4 mr-2" />
                                     {mode === "generator" ? "Generate YAML" : "Fix YAML"}
                                 </>
                             )}
                         </Button>
                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col gap-2">
                             <Label className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                 {mode === "generator" ? "Describe your desired automation" : "Paste broken/invalid YAML here"}
                             </Label>
                             <p className="text-sm text-slate-500 dark:text-slate-400">
                                 {mode === "generator"
                                    ? "Be specific about triggers, conditions, and actions."
                                    : "Paste the configuration block that is causing errors."}
                             </p>
                        </div>

                        <Textarea
                            placeholder={mode === "generator"
                                ? "e.g., Turn on the living room lights when the motion sensor detects movement, but only after sunset."
                                : "alias: My Automation\ntrigger: ..."}
                            className={`flex-1 resize-none p-4 text-base ${mode === "debugger" ? "font-mono text-sm" : "font-sans"} bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 min-h-[300px]`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            maxLength={15000}
                        />

                        <div className="flex justify-between items-center text-xs text-slate-400">
                             <span>{input.length} / 15000 chars</span>
                        </div>
                    </div>
                </Tabs>
            </Card>

            {/* Right Pane: Output */}
            <div className="flex flex-col gap-6 h-full">
                {/* YAML Editor */}
                <Card className="flex-1 overflow-hidden flex flex-col shadow-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[400px]">
                   <div className="bg-slate-100 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex justify-between items-center h-10">
                      <span className="font-bold">RESULT</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-800 group" onClick={handleCopy} disabled={!yamlCode || yamlCode.startsWith("//")}>
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                        )}
                        <span className="sr-only">Copy code</span>
                      </Button>
                   </div>
                   {/* Explicit dark mode background for the editor container to fix visual glitch */}
                   <div className="flex-1 relative bg-slate-50 dark:bg-[#1e1e1e]">
                         <Editor
                           height="100%"
                           defaultLanguage="yaml"
                           language="yaml"
                           value={yamlCode}
                           theme={editorTheme}
                           options={{
                             minimap: { enabled: false },
                             fontSize: 14,
                             padding: { top: 16 },
                             readOnly: true,
                             scrollBeyondLastLine: false,
                             automaticLayout: true,
                           }}
                         />
                   </div>
                </Card>

                {/* Explanation Card */}
                <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Architect Notes
                    </h3>
                    <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                        {explanation || "AI explanations and debugging notes will appear here."}
                    </div>
                </Card>
            </div>
        </div>

      </main>

       {/* Security Banner - Moved to Footer */}
       {showSecurityBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-amber-50 dark:bg-slate-900 border-t border-amber-200 dark:border-amber-900 shadow-md animate-in slide-in-from-bottom-full duration-300">
           <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                   <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                   <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-amber-700 dark:text-amber-500">Security Note:</span> AI processing active. Please redact sensitive keys/passwords. Data is ephemeral.
                   </p>
               </div>
               <Button variant="ghost" size="icon" onClick={() => setShowSecurityBanner(false)} className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                   <X className="h-4 w-4" />
               </Button>
           </div>
        </div>
      )}
    </div>
  )
}
