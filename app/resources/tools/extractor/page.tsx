"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown, FileJson, Loader2, Download, AlertTriangle, Upload, Code, Send, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { extractEntity, answerDocumentQuery } from "@/actions/extract-entity"
import { toast } from "sonner"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const SCHEMA_OPTIONS = [
  { value: "general", label: "Auto-Detect / General" },
  { label: "Sales & Revenue", options: [
      { value: "bant", label: "BANT Qualification" },
      { value: "sow", label: "Statement of Work (SOW)" },
      { value: "msa", label: "Master Services Agreement (MSA)" },
      { value: "order_form", label: "Order Form" },
      { value: "estimate", label: "Construction/Service Estimate" },
  ]},
  { label: "Legal", options: [
      { value: "nda", label: "NDA" },
      { value: "lease", label: "Rent/Lease Agreement" },
      { value: "privacy", label: "Privacy Policy" },
      { value: "employment", label: "Employment Contract" },
  ]},
  { label: "Technical", options: [
      { value: "ticket", label: "Support Ticket" },
      { value: "incident", label: "Incident Report" },
      { value: "spec", label: "Feature Spec" },
  ]}
]

const FLATTENED_OPTIONS = [
  { value: "general", label: "Auto-Detect / General" },
  { value: "bant", label: "BANT Qualification" },
  { value: "sow", label: "Statement of Work (SOW)" },
  { value: "msa", label: "Master Services Agreement (MSA)" },
  { value: "order_form", label: "Order Form" },
  { value: "estimate", label: "Construction/Service Estimate" },
  { value: "nda", label: "NDA" },
  { value: "lease", label: "Rent/Lease Agreement" },
  { value: "privacy", label: "Privacy Policy" },
  { value: "employment", label: "Employment Contract" },
  { value: "ticket", label: "Support Ticket" },
  { value: "incident", label: "Incident Report" },
  { value: "spec", label: "Feature Spec" },
]

export default function ExtractorPage() {
  const { theme } = useTheme()
  const [text, setText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [schema, setSchema] = useState("general")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("// Extracted data will appear here...")

  // Options
  const [negotiationAdvice, setNegotiationAdvice] = useState(false)
  const [riskAnalysis, setRiskAnalysis] = useState(false)
  const [missingClauses, setMissingClauses] = useState(false)

  // Interactive Query
  const [query, setQuery] = useState("")
  const [queryLoading, setQueryLoading] = useState(false)
  const [queryAnswer, setQueryAnswer] = useState<string | null>(null)

  // Reset result when schema changes
  useEffect(() => {
    setResult("// Extracted data will appear here...")
    setQueryAnswer(null)
  }, [schema])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setText("") // Clear text if file is selected
      toast.info("File selected. Click Analyze to process.")
    }
  }

  const handleExtract = async () => {
    if (!text.trim() && !file) {
      toast.error("Please enter text or upload a document")
      return
    }

    setLoading(true)
    setQueryAnswer(null)

    const options = {
        negotiation_advice: negotiationAdvice,
        risk_analysis: riskAnalysis,
        missing_clauses: missingClauses,
    }

    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('schema', schema);
        formData.append('options', JSON.stringify(options));
        res = await extractEntity(formData as any);
      } else {
        res = await extractEntity(text, schema, JSON.stringify(options));
      }

      if (res.success) {
        setResult(JSON.stringify(res.data, null, 2))
        toast.success("Extraction complete!")
      } else {
        toast.error(res.error)
        setResult(`// Error: ${res.error}`)
      }
    } catch (e) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleQuery = async () => {
      if (!query.trim()) return;
      if (!text && !file && (!result || result.startsWith("//"))) {
          toast.error("Please analyze a document first or paste text.");
          return;
      }

      let docText = text;
      // Note: If using a file, we can't easily query without re-uploading or storing state.
      // For this implementation, we restrict Query to text mode or warn the user.
      if (file && !docText) {
           toast.error("Interactive query currently only supports pasted text. Please copy text into the box for Q&A.");
           return;
      }

      setQueryLoading(true);
      try {
          const res = await answerDocumentQuery(docText, query);
          if (res.error) {
              toast.error(res.error);
          } else {
              setQueryAnswer(res.answer);
          }
      } catch (e) {
          toast.error("Failed to get answer");
      } finally {
          setQueryLoading(false);
      }
  }

  const handleDownload = (format: 'json' | 'csv') => {
    if (!result || result.startsWith("//")) return

    try {
      const data = JSON.parse(result)
      let content = ""
      let type = ""
      let ext = ""

      if (format === 'json') {
        content = JSON.stringify(data, null, 2)
        type = "application/json"
        ext = "json"
      } else if (format === 'csv') {
        // Flatten simple CSV
        const keys = Object.keys(data)
        const header = keys.join(",")
        const row = keys.map(k => {
          const val = data[k]
          if (Array.isArray(val)) return `"${val.join('; ')}"`
          if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`
          return `"${val}"`
        }).join(",")
        content = `${header}\n${row}`
        type = "text/csv"
        ext = "csv"
      }

      const blob = new Blob([content], { type })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `extraction-${Date.now()}.${ext}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      toast.error("Invalid JSON data for export")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans p-4 md:p-8 pt-24 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex flex-col gap-4 mb-4">
         {/* Minimized Security Banner */}
        <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-md px-3 py-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-600">
                Security Note: AI processing active. Please redact strict PII before analysis. Data is ephemeral.
            </span>
        </div>

        <div className="flex justify-between items-start mt-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-3">
              <FileJson className="w-8 h-8 text-blue-600" />
              Enterprise Entity Extractor
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Transform unstructured documents into structured JSON data using Groq AI.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 min-h-[600px] mb-6">

        {/* Left: Input */}
        <Card className="flex flex-col p-4 gap-4 shadow-md bg-white dark:bg-slate-900 h-full border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between">
              <Label className="font-semibold text-lg text-slate-900 dark:text-slate-50">Input Document</Label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                  >
                    {schema
                      ? FLATTENED_OPTIONS.find((framework) => framework.value === schema)?.label
                      : "Select document type..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput placeholder="Search document type..." />
                    <CommandList>
                      <CommandEmpty>No schema found.</CommandEmpty>
                      <CommandGroup>
                        {FLATTENED_OPTIONS.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setSchema(currentValue === schema ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                schema === framework.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* File Upload / Text Toggle */}
            <div className="flex items-center gap-2">
                <Button variant="outline" className="relative cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700" asChild>
                  <label>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Doc (PDF/Word)
                    <input type="file" className="hidden" accept=".pdf,.docx,.doc" onChange={handleFileChange} />
                  </label>
                </Button>
                {file && <span className="text-sm text-slate-600 dark:text-slate-300 truncate max-w-[200px]">{file.name}</span>}
                {file && <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-red-500">Remove</Button>}
            </div>
          </div>

          <Textarea
            placeholder={file ? "Document attached. Click Analyze to process." : "Paste your contract, ticket, or agreement here..."}
            className="flex-1 font-mono text-sm resize-none p-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 min-h-[300px]"
            value={text}
            onChange={(e) => { setText(e.target.value); setFile(null); }}
            maxLength={50000}
            disabled={!!file}
          />

          {/* Controls: Advisory Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                  <Checkbox id="negotiation" checked={negotiationAdvice} onCheckedChange={(c) => setNegotiationAdvice(!!c)} />
                  <Label htmlFor="negotiation" className="text-sm cursor-pointer dark:text-slate-200">Negotiation Advice</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <Checkbox id="risks" checked={riskAnalysis} onCheckedChange={(c) => setRiskAnalysis(!!c)} />
                  <Label htmlFor="risks" className="text-sm cursor-pointer dark:text-slate-200">Risk Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <Checkbox id="missing" checked={missingClauses} onCheckedChange={(c) => setMissingClauses(!!c)} />
                  <Label htmlFor="missing" className="text-sm cursor-pointer dark:text-slate-200">Missing Clauses</Label>
              </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
             <span>{file ? 'File attached' : `${text.length} / 50000 chars`}</span>
             <Button onClick={handleExtract} disabled={loading} className="w-32 bg-blue-600 hover:bg-blue-700 text-white">
               {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
               {loading ? 'Analyzing' : 'Analyze'}
             </Button>
          </div>
        </Card>

        {/* Right: Output */}
        <Card className="flex flex-col p-4 gap-4 shadow-md h-full bg-slate-50 dark:bg-[#1e1e1e] overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <Label className="font-semibold text-lg text-slate-900 dark:text-slate-50">Structured Output</Label>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" onClick={() => handleDownload('json')} disabled={!result || result.startsWith("//")} className="bg-white dark:bg-slate-800 dark:text-slate-200">
                 <Download className="w-4 h-4 mr-2" /> JSON
               </Button>
               <Button variant="outline" size="sm" onClick={() => handleDownload('csv')} disabled={!result || result.startsWith("//")} className="bg-white dark:bg-slate-800 dark:text-slate-200">
                 <Download className="w-4 h-4 mr-2" /> CSV
               </Button>
            </div>
          </div>

          <div className="flex-1 border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden relative bg-white dark:bg-[#1e1e1e] min-h-[400px]">
             <Editor
               height="100%"
               defaultLanguage="json"
               value={result}
               theme={theme === 'dark' ? "vs-dark" : "light"}
               options={{
                 minimap: { enabled: false },
                 fontSize: 14,
                 readOnly: true,
                 scrollBeyondLastLine: false,
                 wordWrap: "on",
                 automaticLayout: true,
               }}
             />
          </div>

          {/* Interactive Query Input */}
          <div className="flex gap-2 mt-2">
              <Input
                placeholder="Ask a question about this document..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                className="bg-white dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
              />
              <Button size="icon" onClick={handleQuery} disabled={queryLoading || !query.trim()} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                  {queryLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
          </div>
          {queryAnswer && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-slate-800 dark:text-slate-200 border border-blue-100 dark:border-blue-800 animate-in fade-in slide-in-from-bottom-2">
                  <span className="font-semibold block mb-1">Answer:</span>
                  {queryAnswer}
              </div>
          )}
        </Card>

      </div>

      {/* Footer Area */}
      <div className="flex justify-end mt-6">
          <Link href="/resources/api-docs">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                  <Code className="w-4 h-4" />
                  API Documentation
              </Button>
          </Link>
      </div>
    </div>
  )
}
