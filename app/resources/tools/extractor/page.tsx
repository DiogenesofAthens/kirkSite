"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown, FileJson, Loader2, Download, AlertTriangle, Upload, Code, Send, Info, X, ArrowLeft, RefreshCw } from "lucide-react"
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
import { FloatingNav } from "@/components/floating-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

// --- Helper: Smart View Component ---

const SmartView = ({ data }: { data: any }) => {
  // Identify Arrays vs Primitives
  const primitiveFields = Object.entries(data).filter(([k, v]) =>
      typeof v !== 'object' && k !== 'analysis_report' && k !== 'extracted_text'
  );

  const arrayFields = Object.entries(data).filter(([k, v]) =>
      Array.isArray(v) && k !== 'user_questions'
  );

  const analysisReport = data.analysis_report;
  const userQuestions = data.user_questions;

  return (
      <div className="space-y-6 overflow-y-auto max-h-[500px] p-2">
          {/* Key-Value Grid */}
          <div className="grid grid-cols-2 gap-4">
              {primitiveFields.map(([key, value]) => (
                  <div key={key} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                      <div className="text-xs font-medium text-slate-500 uppercase mb-1">{key.replace(/_/g, ' ')}</div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate" title={String(value)}>{String(value)}</div>
                  </div>
              ))}
          </div>

          {/* Tables for Arrays */}
          {arrayFields.map(([key, value]) => {
              const arr = value as any[];
              if (arr.length === 0) return null;

              // If array of strings
              if (typeof arr[0] === 'string') {
                  return (
                      <div key={key}>
                          <h4 className="font-semibold mb-2 capitalize">{key.replace(/_/g, ' ')}</h4>
                          <ul className="list-disc list-inside bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                              {arr.map((item, i) => <li key={i} className="text-sm text-slate-700 dark:text-slate-300">{item}</li>)}
                          </ul>
                      </div>
                  )
              }

              // If array of objects (Table)
              if (typeof arr[0] === 'object') {
                  const headers = Object.keys(arr[0]);
                  return (
                       <div key={key} className="border rounded-md overflow-hidden">
                          <h4 className="font-semibold p-2 bg-slate-100 dark:bg-slate-800 capitalize border-b">{key.replace(/_/g, ' ')}</h4>
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      {headers.map(h => <TableHead key={h}>{h}</TableHead>)}
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {arr.map((row, i) => (
                                      <TableRow key={i}>
                                          {headers.map(h => <TableCell key={h}>{row[h]}</TableCell>)}
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                       </div>
                  )
              }
              return null;
          })}

          {/* Advisory Report */}
          {analysisReport && (
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-800 dark:text-blue-200">Advisory Report</AlertTitle>
                  <AlertDescription className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-mono">
                      {analysisReport}
                  </AlertDescription>
              </Alert>
          )}

          {/* User Q&A History */}
          {userQuestions && userQuestions.length > 0 && (
             <div className="border-t pt-4 mt-6">
                 <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-50">Q&A History</h4>
                 <div className="space-y-4">
                     {userQuestions.map((q: any, i: number) => (
                         <div key={i} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-800">
                             <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex justify-between">
                                 <span>{q.question}</span>
                                 {q.timestamp && <span className="text-xs text-slate-400 font-normal">{new Date(q.timestamp).toLocaleTimeString()}</span>}
                             </div>
                             <div className="text-sm text-slate-600 dark:text-slate-400">{q.answer}</div>
                         </div>
                     ))}
                 </div>
             </div>
          )}
      </div>
  )
}


export default function ExtractorPage() {
  const { theme } = useTheme()
  const [text, setText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [schema, setSchema] = useState("general")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("// Extracted data will appear here...")
  const [parsedData, setParsedData] = useState<any>(null)
  const [isError, setIsError] = useState(false)
  const [extractedContext, setExtractedContext] = useState<string>("")
  const [showSecurityBanner, setShowSecurityBanner] = useState(true)

  // Workflow Step
  const [step, setStep] = useState<'input' | 'output'>('input')

  // Options
  const [negotiationAdvice, setNegotiationAdvice] = useState(false)
  const [riskAnalysis, setRiskAnalysis] = useState(false)
  const [missingClauses, setMissingClauses] = useState(false)

  // Interactive Query
  const [query, setQuery] = useState("")
  const [queryLoading, setQueryLoading] = useState(false)

  // Tab State
  const [activeTab, setActiveTab] = useState("smart")

  // Reset result when schema changes
  useEffect(() => {
    setResult("// Extracted data will appear here...")
    setParsedData(null)
    setIsError(false)
    setExtractedContext("")
  }, [schema])

  // Parse result whenever it changes
  useEffect(() => {
      try {
          if (!result || result.startsWith("//")) {
              setParsedData(null);
              return;
          }
          const data = JSON.parse(result);
          setParsedData(data);
          setIsError(false);
      } catch (e) {
          setIsError(true);
          setParsedData(null);
          if (activeTab === 'smart') setActiveTab('raw'); // Force switch to raw if error
      }
  }, [result])


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setText("") // Clear text if file is selected
      setExtractedContext("") // Clear previous context
      toast.info("File selected. Click Analyze to process.")
    }
  }

  const handleStartOver = () => {
      setStep('input')
      setResult("// Extracted data will appear here...")
      setParsedData(null)
      setExtractedContext("")
      setText("")
      setFile(null)
      // Optional: keep schema or reset? keeping schema feels safer
  }

  const handleExtract = async () => {
    if (!text.trim() && !file) {
      toast.error("Please enter text or upload a document")
      return
    }

    setLoading(true)
    setExtractedContext("")
    setIsError(false)

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
        // Auto-switch to Smart View on success
        setActiveTab('smart');
        setStep('output');

        if (res.extracted_text) {
             setExtractedContext(res.extracted_text);
        } else if (text) {
            setExtractedContext(text);
        }
        toast.success("Extraction complete!")
      } else {
        toast.error(res.error)
        setResult(`// Error: ${res.error}`)
        setIsError(true);
      }
    } catch (e) {
      toast.error("An unexpected error occurred")
      setIsError(true);
    } finally {
      setLoading(false)
    }
  }

  const handleQuery = async () => {
      if (!query.trim()) return;

      const docText = extractedContext || text;

      if (!docText) {
          toast.error("Please analyze a document or paste text first.");
          return;
      }

      setQueryLoading(true);
      try {
          const res = await answerDocumentQuery(docText, query);
          if (res.error) {
              toast.error(res.error);
          } else {
              try {
                  const currentData = JSON.parse(result);
                  const newEntry = {
                      question: query,
                      answer: res.answer,
                      timestamp: new Date().toISOString()
                  };

                  const updatedData = {
                      ...currentData,
                      user_questions: currentData.user_questions ? [...currentData.user_questions, newEntry] : [newEntry]
                  };

                  setResult(JSON.stringify(updatedData, null, 2));
                  setQuery("");
                  toast.success("Answer added to extraction.");
              } catch (parseError) {
                   toast.success("Answer: " + res.answer);
              }
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
        const keys = Object.keys(data)
        const header = keys.join(",")
        const row = keys.map(k => {
          const val = data[k]
          if (Array.isArray(val)) {
              // Properly serialize array of objects/strings for CSV cell
              return `"${JSON.stringify(val).replace(/"/g, '""')}"`
          }
          if (typeof val === 'object' && val !== null) {
              return `"${JSON.stringify(val).replace(/"/g, '""')}"`
          }
          // Escape standard double quotes
          return `"${String(val).replace(/"/g, '""')}"`
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans relative pb-20">
      <FloatingNav />

      <div className="p-4 md:p-8 pt-40 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 items-center text-center">
        <div className="flex flex-col items-center mt-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-3 justify-center">
              <FileJson className="w-8 h-8 text-blue-600" />
              Enterprise Entity Extractor
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
              Transform unstructured documents into structured JSON data using Groq AI.
            </p>
        </div>
      </div>

      <div className="mb-6">

        {/* Step 1: Input Pane */}
        {step === 'input' && (
            <Card className="flex flex-col p-6 gap-6 shadow-md bg-white dark:bg-slate-900 h-full border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                <Label className="font-semibold text-xl text-slate-900 dark:text-slate-50">Input Document</Label>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[300px] justify-between bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                    >
                        {schema
                        ? FLATTENED_OPTIONS.find((framework) => framework.value === schema)?.label
                        : "Select document type..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
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
                    <Button variant="outline" className="relative cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 h-12 px-6" asChild>
                    <label>
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Document (PDF/Word)
                        <input type="file" className="hidden" accept=".pdf,.docx,.doc" onChange={handleFileChange} />
                    </label>
                    </Button>
                    {file && <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[300px] bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700">{file.name}</span>}
                    {file && <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"><X className="w-5 h-5" /></Button>}
                </div>
            </div>

            <Textarea
                placeholder={file ? "Document attached. Click Analyze to process." : "Paste your contract, ticket, or agreement here..."}
                className="flex-1 font-mono text-base resize-none p-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 min-h-[200px] h-[300px]"
                value={text}
                onChange={(e) => { setText(e.target.value); setFile(null); }}
                maxLength={50000}
                disabled={!!file}
            />

            {/* Controls: Advisory Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Checkbox id="negotiation" checked={negotiationAdvice} onCheckedChange={(c) => setNegotiationAdvice(!!c)} />
                    <Label htmlFor="negotiation" className="text-base cursor-pointer dark:text-slate-200">Negotiation Advice</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Checkbox id="risks" checked={riskAnalysis} onCheckedChange={(c) => setRiskAnalysis(!!c)} />
                    <Label htmlFor="risks" className="text-base cursor-pointer dark:text-slate-200">Risk Analysis</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Checkbox id="missing" checked={missingClauses} onCheckedChange={(c) => setMissingClauses(!!c)} />
                    <Label htmlFor="missing" className="text-base cursor-pointer dark:text-slate-200">Missing Clauses</Label>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-6">
                <span>{file ? 'File attached' : `${text.length} / 50000 chars`}</span>
                <Button onClick={handleExtract} disabled={loading} size="lg" className="w-48 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {loading ? 'Analyzing...' : 'Analyze Document'}
                </Button>
            </div>
            </Card>
        )}

        {/* Step 2: Output Pane */}
        {step === 'output' && (
            <Card className="flex flex-col p-6 gap-6 shadow-md h-full bg-white dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={handleStartOver} className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Analyze New
                    </Button>
                    <Label className="font-semibold text-xl text-slate-900 dark:text-slate-50">Structured Output</Label>
                </div>
                <div className="flex gap-2">
                {isError && <span className="text-xs text-red-500 font-bold border border-red-200 bg-red-50 px-2 py-1 rounded flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> AI Formatting Error</span>}
                <Button variant="outline" size="sm" onClick={() => handleDownload('json')} disabled={!result || result.startsWith("//")} className="bg-white dark:bg-slate-800 dark:text-slate-200">
                    <Download className="w-4 h-4 mr-2" /> JSON
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload('csv')} disabled={!result || result.startsWith("//")} className="bg-white dark:bg-slate-800 dark:text-slate-200">
                    <Download className="w-4 h-4 mr-2" /> CSV
                </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="smart" disabled={!parsedData}>Smart View (Recommended)</TabsTrigger>
                    <TabsTrigger value="raw">Raw JSON</TabsTrigger>
                </TabsList>

                {/* Interactive Query Input */}
                <div className="flex gap-2 mb-4">
                    <Input
                        placeholder="Ask a question about this document..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                        className="bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                    />
                    <Button size="icon" onClick={handleQuery} disabled={queryLoading || !query.trim()} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                        {queryLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </Button>
                </div>

                <div className="flex-1 border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden relative bg-white dark:bg-slate-900 min-h-[500px]">
                    <TabsContent value="smart" className="h-full m-0 overflow-auto">
                        {parsedData ? <SmartView data={parsedData} key={parsedData.user_questions?.length} /> : <div className="p-4 text-slate-400 text-sm">Extraction pending...</div>}
                    </TabsContent>
                    <TabsContent value="raw" className="h-full m-0">
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
                    </TabsContent>
                </div>
            </Tabs>
            </Card>
        )}

      </div>

      {/* Footer Area */}
      <div className="flex justify-end mt-6 pb-8 pr-8">
          <Link href="/resources/api-docs">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                  <Code className="w-4 h-4" />
                  API Documentation
              </Button>
          </Link>
      </div>

      {/* Bottom Fixed Security Banner */}
      {showSecurityBanner && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-amber-50 dark:bg-slate-900 border-t border-amber-200 dark:border-amber-900 shadow-lg animate-in slide-in-from-bottom-full duration-300">
             <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                 <div className="flex items-center gap-3">
                     <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                     <p className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-amber-700 dark:text-amber-500">Security Note:</span> AI processing active. Please redact strict PII (SSN, Bank Info) before analysis. Data is ephemeral and not stored.
                     </p>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setShowSecurityBanner(false)} className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                     <X className="h-4 w-4" />
                 </Button>
             </div>
          </div>
      )}

      </div>
    </div>
  )
}
