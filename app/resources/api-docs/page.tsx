import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, ShieldAlert, Code, Copy, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans p-4 md:p-8 pt-24 max-w-[1200px] mx-auto">

      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-blue-600" />
            Entity Extraction API
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
            Enterprise-grade extraction for your applications.
            </p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">Operational</Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">v1.0.0</Badge>
        </div>
      </div>

      <div className="grid gap-8">

        {/* Overview */}
        <Card className="border-l-4 border-l-blue-600 shadow-sm">
          <CardHeader>
            <CardTitle>Endpoint Information</CardTitle>
            <CardDescription>
               Send a POST request to the extraction endpoint to process text.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg font-mono text-sm border border-slate-200 dark:border-slate-800">
               <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">POST</Badge>
               <span className="text-slate-700 dark:text-slate-300 font-medium">https://grantglazer.com/api/extract</span>
             </div>

             <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900 text-red-800 dark:text-red-300">
               <ShieldAlert className="h-4 w-4" />
               <AlertTitle>Rate Limits</AlertTitle>
               <AlertDescription>
                 Public API is rate limited to 10 requests/minute. Contact Sales for Enterprise Access with higher throughput.
               </AlertDescription>
             </Alert>
          </CardContent>
        </Card>

        {/* Integration Examples */}
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Integration Examples</CardTitle>
                <CardDescription>Copy and paste these snippets to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="curl" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                        <TabsTrigger value="js">Node.js</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>

                    <TabsContent value="curl">
                        <div className="relative">
                            <pre className="p-4 bg-slate-900 text-slate-50 rounded-lg overflow-x-auto font-mono text-sm border border-slate-700">
{`curl -X POST https://grantglazer.com/api/extract \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "text": "The quick brown fox...",
    "schema": "general"
  }'`}
                            </pre>
                        </div>
                    </TabsContent>

                    <TabsContent value="js">
                        <div className="relative">
                            <pre className="p-4 bg-slate-900 text-slate-50 rounded-lg overflow-x-auto font-mono text-sm border border-slate-700">
{`const response = await fetch('https://grantglazer.com/api/extract', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    text: "Review the attached SOW...",
    schema: "sow"
  })
});

const data = await response.json();
console.log(data);`}
                            </pre>
                        </div>
                    </TabsContent>

                    <TabsContent value="python">
                        <div className="relative">
                            <pre className="p-4 bg-slate-900 text-slate-50 rounded-lg overflow-x-auto font-mono text-sm border border-slate-700">
{`import requests

url = "https://grantglazer.com/api/extract"
headers = {
    "x-api-key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "text": "Review the attached SOW...",
    "schema": "sow"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`}
                            </pre>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>

        {/* Schema Reference */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Supported Schemas</CardTitle>
            <CardDescription>Pass these values in the <code>schema</code> field.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['general', 'bant', 'sow', 'msa', 'order_form', 'nda', 'lease', 'ticket', 'incident'].map(s => (
                    <div key={s} className="p-2 bg-slate-100 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-center font-mono text-sm text-slate-700 dark:text-slate-300">
                        {s}
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
