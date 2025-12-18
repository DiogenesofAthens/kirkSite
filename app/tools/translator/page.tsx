"use client"

import { useState, useEffect, useRef } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, ArrowRightLeft, Sparkles, ClipboardPaste, Copy, Check, AlertTriangle, Send, X, Info, Code2 } from "lucide-react"
import Editor, { OnMount } from "@monaco-editor/react"
import { translateCode, askTranslationQuestion } from "@/actions/translate"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

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
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [inputCode, setInputCode] = useState("// Paste your legacy code here...")
  const [outputCode, setOutputCode] = useState("// Translation will appear here...")
  const [explanation, setExplanation] = useState("")

  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("typescript")
  const [includeExplanation, setIncludeExplanation] = useState(true)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Auto-select logic
  const hasAutoSelectedRef = useRef(false)
  const editorRef = useRef<any>(null)

  // Question State
  const [query, setQuery] = useState("")
  const [queryLoading, setQueryLoading] = useState(false)
  const [qaHistory, setQaHistory] = useState<{question: string, answer: string}[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

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
    setOutputCode("// Translation pending...")
    setExplanation("")
    setQaHistory([]) // Reset Q&A

    try {
      const fromLabel = getLabel(sourceLanguage, SOURCE_OPTIONS)
      const toLabel = getLabel(targetLanguage, TARGET_OPTIONS)

      // First Attempt
      let result = await translateCode(inputCode, fromLabel, toLabel, includeExplanation)

      // Auto-Retry Logic (One time)
      if (result.error || (!result.success && !result.raw_text)) {
          console.warn("First translation attempt failed, retrying...")
          toast.loading("First attempt failed, retrying...", { duration: 2000 })
          result = await translateCode(inputCode, fromLabel, toLabel, includeExplanation)
      }

      if (result.error) {
        toast.error(result.error)
        setOutputCode(`// Error: ${result.error}`)
      } else if (result.success && result.data) {
        setOutputCode(result.data.translated_code)
        setExplanation(result.data.explanation)
        toast.success("Translation complete!")
      } else if (result.raw_text) {
          // Fallback if parsing failed but we got text
          setOutputCode(result.raw_text)
          toast.warning("Received raw output (formatting issue)")
      }
    } catch (e) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleQuery = async () => {
      if (!query.trim()) return;
      if (outputCode.startsWith("//")) {
          toast.error("Translate some code first!");
          return;
      }

      setQueryLoading(true)
      try {
          const res = await askTranslationQuestion(outputCode, inputCode, query)
          if (res.error) {
              toast.error(res.error)
          } else if (res.answer) {
              setQaHistory(prev => [...prev, { question: query, answer: res.answer }])
              setQuery("")
              toast.success("Question answered")
          }
      } catch (e) {
          toast.error("Failed to get answer")
      } finally {
          setQueryLoading(false)
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

  // Handle editor mount to setup focus listener for auto-select
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.onDidFocusEditorText(() => {
       if (!hasAutoSelectedRef.current) {
           const currentValue = editor.getValue();
           if (currentValue === "// Paste your legacy code here...") {
               editor.setSelection(editor.getModel()?.getFullModelRange() as any);
               hasAutoSelectedRef.current = true;
           }
       }
    });
  }

  // Determine editor theme based on resolved theme (handling system pref)
  // Default to vs-dark if not mounted to prevent flash, or light if we prefer
  // Ideally we wait for mounted to render editor to avoid mismatch
  const editorTheme = mounted ? (resolvedTheme === 'dark' ? "vs-dark" : "light") : "vs-dark"

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 relative">
      <FloatingNav />

      {/* Increased top padding to pt-36 for consistent spacing */}
      <main className="pt-28 md:pt-32 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-2 gap-2 z-10 relative text-center">
            {/* Logo removed as requested */}
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-3">
              Code Translator
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Senior Engineer logic for converting legacy systems to modern stacks.
            </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

           {/* Source Select */}
           <div className="flex items-center gap-2 w-full md:w-auto">
             <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
               <SelectTrigger className="w-full md:w-[220px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
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
               <SelectTrigger className="w-full md:w-[220px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
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
             className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white min-w-[140px] shadow-lg shadow-blue-500/20"
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
        <div className="grid md:grid-cols-2 gap-6 min-h-[500px]">
            <TooltipProvider>
            {/* Input */}
            <Card className="overflow-hidden flex flex-col shadow-lg border-slate-200 dark:border-slate-800 h-full">
               <div className="bg-slate-100 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex justify-between items-center h-10">
                  <span className="font-bold">LEGACY CODE</span>
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
               <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 min-h-[500px]">
                 {mounted ? (
                     <Editor
                       height="100%"
                       defaultLanguage="text"
                       language={getMonacoLang(sourceLanguage)}
                       value={inputCode}
                       onChange={(val) => {
                           setInputCode(val || "");
                           // Reset auto-select if user clears code manually, or keep it true?
                           // User said "don't do it again if the user pastes in there".
                           // If they clear it, and type, it shouldn't auto-select again.
                           // So we never reset hasAutoSelectedRef unless maybe component unmounts.
                       }}
                       onMount={handleEditorDidMount}
                       theme={editorTheme}
                       options={{
                         minimap: { enabled: false },
                         fontSize: 14,
                         padding: { top: 16 },
                         scrollBeyondLastLine: false,
                         automaticLayout: true,
                       }}
                     />
                 ) : (
                     <div className="flex items-center justify-center h-full text-slate-400">Loading Editor...</div>
                 )}
               </div>
            </Card>

            {/* Output */}
            <Card className="overflow-hidden flex flex-col shadow-lg border-slate-200 dark:border-slate-800 h-full">
               <div className="bg-slate-100 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex justify-between items-center h-10">
                  <span className="font-bold">OUTPUT CODE</span>
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
               <div className="flex-1 relative bg-slate-50 dark:bg-slate-950">
                 {mounted ? (
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
                         automaticLayout: true,
                       }}
                     />
                 ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">Loading Editor...</div>
                 )}
               </div>
            </Card>
            </TooltipProvider>
        </div>

        {/* Architectural Analysis Card */}
        {explanation && (
            <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Architectural Analysis
                </h3>
                <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                    {explanation}
                </div>
            </Card>
        )}

        {/* Q&A Section */}
        {outputCode && !outputCode.startsWith("//") && (
            <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Ask a Question</h3>
                 <div className="flex gap-2">
                    <Input
                        placeholder="Ask about the translated code (e.g., 'Why did you use map here?')"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                        className="bg-white dark:bg-slate-900"
                    />
                    <Button onClick={handleQuery} disabled={queryLoading || !query.trim()}>
                        {queryLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                 </div>

                 {qaHistory.map((qa, i) => (
                     <Card key={i} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Q: {qa.question}</div>
                         <div className="text-slate-600 dark:text-slate-400 text-sm">A: {qa.answer}</div>
                     </Card>
                 ))}
            </div>
        )}

      </main>

      {/* Footer Area */}
      <div className="flex flex-col items-center justify-center mt-6 pb-8 gap-4 max-w-[1600px] mx-auto">
          <Link href="/resources/api-docs">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                  <Code2 className="w-4 h-4" />
                  API Documentation
              </Button>
          </Link>
          <p className="text-xs text-slate-500 text-center mt-4 opacity-70">
            Security Note: AI processing active. Please redact sensitive information. Data is never stored on my site.
          </p>
      </div>
    </div>
  )
}
