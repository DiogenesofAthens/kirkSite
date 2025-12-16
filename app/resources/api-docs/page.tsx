import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, ShieldAlert } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans p-4 md:p-8 pt-24 max-w-[1200px] mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          Entity Extraction API
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Programmatic access to the Enterprise Entity Extractor.
        </p>
      </div>

      <div className="grid gap-8">

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Endpoint</CardTitle>
            <CardDescription>
               Send a POST request to the extraction endpoint to process text.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg font-mono text-sm">
               <Badge variant="default" className="bg-blue-600">POST</Badge>
               <span className="text-slate-700 dark:text-slate-300">https://grantglazer.com/api/extract</span>
             </div>

             <Alert variant="destructive">
               <ShieldAlert className="h-4 w-4" />
               <AlertTitle>Anti-Abuse Limit</AlertTitle>
               <AlertDescription>
                 Rate limited to 10 requests/minute. Contact Grant for Enterprise Access.
               </AlertDescription>
             </Alert>
          </CardContent>
        </Card>

        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
               Include your API key in the headers.
             </p>
             <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg font-mono text-sm border border-slate-200 dark:border-slate-800">
               x-api-key: [YOUR_KEY]
             </div>
          </CardContent>
        </Card>

        {/* Request Format */}
        <Card>
          <CardHeader>
            <CardTitle>Request Body</CardTitle>
            <CardDescription>JSON payload</CardDescription>
          </CardHeader>
          <CardContent>
             <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg font-mono text-sm border border-slate-200 dark:border-slate-800 overflow-x-auto text-slate-800 dark:text-slate-200">
{`{
  "text": "The quick brown fox...", // Max 50k chars
  "schema": "sow" // Optional. Options: general, sow, bant, ticket, etc.
}`}
             </pre>
          </CardContent>
        </Card>

        {/* Example Response */}
        <Card>
           <CardHeader>
             <CardTitle>Response</CardTitle>
           </CardHeader>
           <CardContent>
             <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg font-mono text-sm border border-slate-200 dark:border-slate-800 overflow-x-auto text-green-600 dark:text-green-400">
{`{
  "doc_type": "SOW",
  "extraction_date": "2023-10-27T10:00:00Z",
  "confidence_score": 0.98,
  "start_date": "2023-11-01",
  "total_contract_value": "$50,000",
  ...
}`}
             </pre>
           </CardContent>
        </Card>

      </div>
    </div>
  )
}
