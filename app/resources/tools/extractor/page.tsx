"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown, FileJson, Loader2, Download, AlertTriangle } from "lucide-react"
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
import { extractEntity } from "@/actions/extract-entity"
import { toast } from "sonner"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

const SCHEMA_OPTIONS = [
  { value: "general", label: "Auto-Detect / General" },
  { label: "Sales & Revenue", options: [
      { value: "bant", label: "BANT Qualification" },
      { value: "sow", label: "Statement of Work (SOW)" },
      { value: "msa", label: "Master Services Agreement (MSA)" },
      { value: "order_form", label: "Order Form" },
  ]},
  { label: "Legal", options: [
      { value: "nda", label: "NDA" },
      { value: "lease", label: "Rent/Lease Agreement" },
      // "Employment Contract" and "Privacy Policy" mapped to generic or specific?
      // I'll map them to 'general' or 'sow' if suitable, but prompt didn't specify fields.
      // I'll add them as options but they will use general or I should extend the mapping.
      // Re-reading prompt: "The Expert Schemas... Legal: NDA, Privacy Policy, Rent/Lease, Employment Contract".
      // But Part 2 only defined Rent/Lease. I will use 'general' logic or 'sow' logic (parties, dates) for others if no specific schema defined.
      // I'll stick to what I defined in actions/extract-entity.ts for now to avoid errors,
      // or update actions/extract-entity.ts to handle them.
      // Let's add them to the list and handle in backend (fallback to general).
      { value: "privacy", label: "Privacy Policy" },
      { value: "employment", label: "Employment Contract" },
  ]},
  { label: "Technical", options: [
      { value: "ticket", label: "Support Ticket" },
      { value: "incident", label: "Incident Report" },
      { value: "spec", label: "Feature Spec" },
  ]}
]

// Flattened list for the Combobox search
const FLATTENED_OPTIONS = [
  { value: "general", label: "Auto-Detect / General" },
  { value: "bant", label: "BANT Qualification" },
  { value: "sow", label: "Statement of Work (SOW)" },
  { value: "msa", label: "Master Services Agreement (MSA)" },
  { value: "order_form", label: "Order Form" },
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
  const [schema, setSchema] = useState("general")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("// Extracted data will appear here...")

  const handleExtract = async () => {
    if (!text.trim()) {
      toast.error("Please enter text to analyze")
      return
    }

    setLoading(true)
    try {
      const res = await extractEntity(text, schema)
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
        // Flatten simple object
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
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-3">
              <FileJson className="w-8 h-8 text-blue-600" />
              Enterprise Entity Extractor
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Transform unstructured documents into structured JSON data using Groq AI.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            {/* Additional actions could go here */}
          </div>
        </div>

        {/* Security Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-start gap-3 text-sm text-amber-800 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Security Warning:</strong> This tool processes data using Groq AI.
            Do not upload PII (Personally Identifiable Information) or unredacted confidential data without proper authorization.
            Data is processed ephemerally and not stored.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[600px]">

        {/* Left: Input */}
        <Card className="flex flex-col p-4 gap-4 shadow-md h-full">
          <div className="flex items-center justify-between">
            <Label className="font-semibold text-lg">Input Document</Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[250px] justify-between"
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

          <Textarea
            placeholder="Paste your contract, ticket, or agreement here..."
            className="flex-1 font-mono text-sm resize-none p-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={50000}
          />

          <div className="flex justify-between items-center text-xs text-slate-500">
             <span>{text.length} / 50000 chars</span>
             <Button onClick={handleExtract} disabled={loading} className="w-32">
               {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
               {loading ? 'Analyzing' : 'Analyze'}
             </Button>
          </div>
        </Card>

        {/* Right: Output */}
        <Card className="flex flex-col p-4 gap-4 shadow-md h-full bg-slate-50 dark:bg-[#1e1e1e]">
          <div className="flex items-center justify-between">
            <Label className="font-semibold text-lg">Structured Output</Label>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" onClick={() => handleDownload('json')} disabled={!result || result.startsWith("//")}>
                 <Download className="w-4 h-4 mr-2" /> JSON
               </Button>
               <Button variant="outline" size="sm" onClick={() => handleDownload('csv')} disabled={!result || result.startsWith("//")}>
                 <Download className="w-4 h-4 mr-2" /> CSV
               </Button>
            </div>
          </div>

          <div className="flex-1 border rounded-md overflow-hidden relative">
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
                 wordWrap: "on"
               }}
             />
          </div>
        </Card>

      </div>
    </div>
  )
}
