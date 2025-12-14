"use client"

import { useState, useEffect } from "react"
import { FloatingNav } from "@/components/floating-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRightLeft, Code2, Sparkles } from "lucide-react"
import Editor from "@monaco-editor/react"
import { translateCode } from "@/actions/translate"
import { toast } from "sonner"
import { useTheme } from "next-themes"

const INPUT_LANGUAGES = [
  "Auto Detect",
  "Apex",
  "C#",
  "Excel Formula",
  "Salesforce SOQL",
  "SQL",
  "Legacy Java"
]

const OUTPUT_LANGUAGES = [
  "C#",
  "Apex",
  "Python (Pandas)",
  "TypeScript",
  "English (Explanation)"
]

export default function CodeTranslatorPage() {
  const { theme } = useTheme()
  const [inputCode, setInputCode] = useState("// Paste your legacy code here...")
  const [outputCode, setOutputCode] = useState("// Translation will appear here...")
  const [fromLang, setFromLang] = useState("Salesforce SOQL")
  const [toLang, setToLang] = useState("Python (Pandas)")
  const [includeExplanation, setIncludeExplanation] = useState(true)
  const [loading, setLoading] = useState(false)
  const [editorTheme, setEditorTheme] = useState("vs-dark")

  // Force dark theme for editor if page is dark, or just default to dark for "hacker" feel
  useEffect(() => {
    setEditorTheme(theme === 'dark' ? "vs-dark" : "light")
  }, [theme])

  const handleTranslate = async () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to translate")
      return
    }

    setLoading(true)
    try {
      const result = await translateCode(inputCode, fromLang, toLang, includeExplanation)
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

  // Map language names to Monaco language IDs for syntax highlighting
  const getMonacoLang = (lang: string) => {
    switch(lang) {
      case "Auto Detect": return "text"
      case "Apex": return "java" // apex is close to java
      case "Salesforce SOQL": return "sql"
      case "Legacy Java": return "java"
      case "Excel Formula": return "text"
      case "Python (Pandas)": return "python"
      case "TypeScript": return "typescript"
      case "C#": return "csharp"
      case "English (Explanation)": return "markdown"
      default: return lang.toLowerCase()
    }
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
           <div className="flex items-center gap-2 w-full md:w-auto">
             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">From</span>
             <Select value={fromLang} onValueChange={setFromLang}>
               <SelectTrigger className="w-full md:w-[200px]">
                 <SelectValue placeholder="Source Language" />
               </SelectTrigger>
               <SelectContent>
                 {INPUT_LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
               </SelectContent>
             </Select>
           </div>

           <ArrowRightLeft className="w-4 h-4 text-slate-400 hidden md:block" />

           <div className="flex items-center gap-2 w-full md:w-auto">
             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">To</span>
             <Select value={toLang} onValueChange={setToLang}>
               <SelectTrigger className="w-full md:w-[200px]">
                 <SelectValue placeholder="Target Language" />
               </SelectTrigger>
               <SelectContent>
                 {OUTPUT_LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
               </SelectContent>
             </Select>
           </div>

           <div className="flex items-center space-x-2 border-l pl-4 border-slate-200 dark:border-slate-700">
              <Checkbox
                id="explanation"
                checked={includeExplanation}
                onCheckedChange={(c) => setIncludeExplanation(c as boolean)}
              />
              <Label htmlFor="explanation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-600 dark:text-slate-300">
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
            {/* Input */}
            <Card className="overflow-hidden flex flex-col shadow-lg border-slate-200 dark:border-slate-800">
               <div className="bg-slate-100 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex justify-between">
                  <span>INPUT: {fromLang.toUpperCase()}</span>
                  <span>Lines: {inputCode.split('\n').length}</span>
               </div>
               <div className="flex-1 relative">
                 <Editor
                   height="100%"
                   defaultLanguage={getMonacoLang(fromLang)}
                   language={getMonacoLang(fromLang)}
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
               <div className="bg-slate-100 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex justify-between">
                  <span>OUTPUT: {toLang.toUpperCase()}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 text-[10px] px-2"
                    onClick={() => {
                      navigator.clipboard.writeText(outputCode)
                      toast.success("Copied to clipboard")
                    }}
                  >
                    COPY
                  </Button>
               </div>
               <div className="flex-1 relative bg-slate-50 dark:bg-[#1e1e1e]">
                 <Editor
                   height="100%"
                   defaultLanguage={getMonacoLang(toLang)}
                   language={getMonacoLang(toLang)}
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
        </div>
      </main>
    </div>
  )
}
