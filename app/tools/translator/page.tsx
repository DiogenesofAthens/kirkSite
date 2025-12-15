"use client"

import { useState, useEffect } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRightLeft, Code2, Sparkles, ClipboardPaste, Copy, Check } from "lucide-react"
import Editor from "@monaco-editor/react"
import { translateCode } from "@/actions/translate"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SOURCE_OPTIONS = [
  { value: "auto", label: "✨ Auto Detect" },
  { value: "apex", label: "Salesforce Apex" },
  { value: "sql", label: "SQL / SOQL" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript / TypeScript" },
  { value: "csharp", label: "C# / .NET" },
  { value: "java", label: "Java" },
  { value: "excel", label: "Excel Formula" },
]

const TARGET_OPTIONS = [
  {
    label: "Modern Web & Backend",
    options: [
      { value: "typescript", label: "TypeScript (Node.js)" },
      { value: "python", label: "Python (Pandas/FastAPI)" },
      { value: "go", label: "Go (Golang)" },
    ]
  },
  {
    label: "Data & Enterprise",
    options: [
      { value: "sql", label: "Standard SQL" },
      { value: "csharp", label: "C# (.NET Core)" },
      { value: "java", label: "Java (Modern)" },
    ]
  },
  {
    label: "Documentation & Logic",
    options: [
      { value: "english", label: "Plain English Explanation" },
      { value: "mermaid", label: "Mermaid.js Flowchart" },
      { value: "jira", label: "Jira Ticket Requirements" },
    ]
  }
]

export default function CodeTranslatorPage() {
  const { theme } = useTheme()
  const [inputCode, setInputCode] = useState("// Paste your legacy code here...")
  const [outputCode, setOutputCode] = useState("// Translation will appear here...")
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("typescript")
  const [includeExplanation, setIncludeExplanation] = useState(true)
  const [loading, setLoading] = useState(false)
  const [editorTheme, setEditorTheme] = useState("vs-dark")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setEditorTheme(theme === 'dark' ? "vs-dark" : "light")
  }, [theme])

  const handleSwap = () => {
    if (sourceLanguage === "auto") {
      setSourceLanguage(targetLanguage)
      setTargetLanguage("python") // Safe fallback
    } else {
      setSourceLanguage(targetLanguage)
      setTargetLanguage(sourceLanguage)
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputCode(text)
    } catch (err) {
      toast.error("Failed to read clipboard")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success("Copied to clipboard")
  }

  const getLabel = (value: string, options: any[]): string => {
    for (const opt of options) {
      if (opt.value === value) return opt.label
      if (opt.options) {
        const found = opt.options.find((o: any) => o.value === value)
        if (found) return found.label
      }
    }
    return value
  }

  const handleTranslate = async () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to translate")
      return
    }

    setLoading(true)
    try {
      const fromLabel = getLabel(sourceLanguage, SOURCE_OPTIONS)
      const toLabel = getLabel(targetLanguage, TARGET_OPTIONS)

      const result = await translateCode(inputCode, fromLabel, toLabel, includeExplanation)
      if (result.error) {
        toast.error(result.error)
      } else if (result.text) {
        setOutputCode(result.text)
        toast.success("Translation complete!")
      }
    } catch (e) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getMonacoLang = (lang: string) => {
    const map: Record<string, string> = {
      auto: "text",
      apex: "java",
      sql: "sql",
      python: "python",
      javascript: "javascript",
      typescript: "typescript",
      csharp: "csharp",
      java: "java",
      excel: "text",
      go: "go",
      english: "markdown",
      mermaid: "markdown",
      jira: "text"
    }
    return map[lang] || "text"
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <FloatingNav />

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto h-[calc(100vh-20px)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/10 rounded-xl">
              <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                Enterprise Code Translator
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-medium">
                  AI-Powered
                </span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Senior Engineer logic for converting legacy systems to modern stacks.
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-4">

           {/* Source Select */}
           <div className="flex items-center gap-2 w-full md:w-auto">
             <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
               <SelectTrigger className="w-full md:w-[220px]">
                 <SelectValue placeholder="Source Language" />
               </SelectTrigger>
               <SelectContent>
                 {SOURCE_OPTIONS.map(opt => (
                   <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>

           <Button variant="ghost" size="icon" onClick={handleSwap} className="hidden md:flex shrink-0">
             <ArrowRightLeft className="w-4 h-4 text-slate-400" />
           </Button>

           {/* Target Select */}
           <div className="flex items-center gap-2 w-full md:w-auto">
             <Select value={targetLanguage} onValueChange={setTargetLanguage}>
               <SelectTrigger className="w-full md:w-[220px]">
                 <SelectValue placeholder="Target Language" />
               </SelectTrigger>
               <SelectContent>
                 {TARGET_OPTIONS.map(group => (
                   <SelectGroup key={group.label}>
                     <SelectLabel>{group.label}</SelectLabel>
                     {group.options.map(opt => (
                       <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                     ))}
                   </SelectGroup>
                 ))}
               </SelectContent>
             </Select>
           </div>

           <div className="flex items-center space-x-2 border-l pl-4 border-slate-200 dark:border-slate-700 ml-2">
              <Checkbox
                id="explanation"
                checked={includeExplanation}
                onCheckedChange={(c) => setIncludeExplanation(c as boolean)}
              />
              <Label htmlFor="explanation" className="text-sm font-medium leading-none cursor-pointer text-slate-600 dark:text-slate-300">
                Explain Code
              </Label>
           </div>

           <div className="flex-1" />

           <Button
             onClick={handleTranslate}
             disabled={loading}
             className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
           >
             {loading ? (
               <>
                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                 Translating...
               </>
             ) : (
               <>
                 <Sparkles className="w-4 h-4 mr-2" />
                 Convert
               </>
             )}
           </Button>
        </div>

        {/* Editor Area - Split Screen */}
        <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-[500px]">
            <TooltipProvider>
            {/* Input */}
            <Card className="overflow-hidden flex flex-col shadow-lg border-slate-200 dark:border-slate-800">
               <div className="bg-slate-100 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex justify-between items-center h-10">
                  <span className="font-bold">INPUT</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-800" onClick={handlePaste}>
                        <ClipboardPaste className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span className="sr-only">Paste code from clipboard</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Paste code from clipboard</p>
                    </TooltipContent>
                  </Tooltip>
               </div>
               <div className="flex-1 relative">
                 <Editor
                   height="100%"
                   defaultLanguage="text"
                   language={getMonacoLang(sourceLanguage)}
                   value={inputCode}
                   onChange={(val) => setInputCode(val || "")}
                   theme={editorTheme}
                   options={{
                     minimap: { enabled: false },
                     fontSize: 14,
                     padding: { top: 16 },
                     scrollBeyondLastLine: false,
                   }}
                 />
               </div>
            </Card>

            {/* Output */}
            <Card className="overflow-hidden flex flex-col shadow-lg border-slate-200 dark:border-slate-800">
               <div className="bg-slate-100 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex justify-between items-center h-10">
                  <span className="font-bold">OUTPUT</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-800 group" onClick={handleCopy}>
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
                        )}
                        <span className="sr-only">Copy translation to clipboard</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy translation to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
               </div>
               <div className="flex-1 relative bg-slate-50 dark:bg-[#1e1e1e]">
                 <Editor
                   height="100%"
                   defaultLanguage="typescript"
                   language={getMonacoLang(targetLanguage)}
                   value={outputCode}
                   theme={editorTheme}
                   options={{
                     minimap: { enabled: false },
                     fontSize: 14,
                     padding: { top: 16 },
                     readOnly: true,
                     scrollBeyondLastLine: false,
                   }}
                 />
               </div>
            </Card>
            </TooltipProvider>
        </div>
      </main>
    </div>
  )
}
