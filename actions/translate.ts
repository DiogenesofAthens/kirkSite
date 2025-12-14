"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define a Senior Data Engineer persona
const SYSTEM_PROMPT = `
You are a Senior Data Engineer and Full-Stack Architect with deep expertise in enterprise systems.
Your goal is to translate code from one language/format to another, while explaining the "why" behind the changes.

When translating:
1.  **Analyze**: Understand the intent of the legacy or source code (especially if it's Salesforce SOQL, Apex, or Legacy Java).
2.  **Translate**: Produce optimized, modern, and idiomatic code in the target language (C#, Python Pandas, TypeScript, etc.).
3.  **Educate**: Add comments or a brief summary explaining *why* you made specific choices (e.g., "Used vectorization in Pandas instead of a loop for performance", "Mapped SOQL relationship query to EF Core Include").

Input Languages: Apex, C#, Excel Formula, Salesforce SOQL, SQL, Legacy Java
Output Languages: C#, Apex, Python (Pandas), TypeScript, English (Explanation)

Format your response as markdown code blocks if possible, or clear text.
`

export async function translateCode(inputCode: string, fromLang: string, toLang: string) {
  if (!inputCode || !fromLang || !toLang) {
    return { error: "Missing input" }
  }

  try {
    // Check for API Key (environment variable must be set)
    if (!process.env.OPENAI_API_KEY) {
      // Fallback/Mock for demo if key is missing
      return {
          text: `// [MOCK MODE: OPENAI_API_KEY not found]
// Here is how a Senior Data Engineer would translate your ${fromLang} to ${toLang}:

/*
 * Analysis:
 * The input code appears to be ${fromLang}.
 * Converting to idiomatic ${toLang}...
 */

// Translated Code:
// (This is a simulation because the LLM is not connected)

${toLang === 'Python (Pandas)' ? 'import pandas as pd\n\n# Optimized dataframe operation' : ''}
${toLang === 'TypeScript' ? 'interface DataPayload {\n  id: string;\n}' : ''}

// Note: Please configure the OPENAI_API_KEY in your project settings to get real AI translations.
`
      }
    }

    const { text } = await generateText({
      model: openai("gpt-4o"), // or gpt-4-turbo
      system: SYSTEM_PROMPT,
      prompt: `Translate the following ${fromLang} code to ${toLang}:\n\n${inputCode}`,
    })

    return { text }
  } catch (error) {
    console.error("Translation error:", error)
    return { error: "Failed to translate code. Please try again later." }
  }
}
