"use server"

import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

// Initialize Groq provider with the API key from environment
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

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

export async function translateCode(inputCode: string, fromLang: string, toLang: string, includeExplanation: boolean = true) {
  if (!inputCode || !fromLang || !toLang) {
    return { error: "Missing input" }
  }

  try {
    // Check for API Key
    if (!process.env.GROQ_API_KEY) {
      console.warn("Missing GROQ_API_KEY")
      // Fallback/Mock for demo if key is missing
      return {
          text: `// [MOCK MODE: GROQ_API_KEY not found]
// Please check your .env.local file.

// Here is how a Senior Data Engineer would translate your ${fromLang} to ${toLang}:

${includeExplanation ? `/*
 * Analysis:
 * The input code appears to be ${fromLang}.
 * Converting to idiomatic ${toLang}...
 */` : ''}

// Translated Code:
// (This is a simulation because the LLM is not connected)

${toLang === 'Python (Pandas)' ? 'import pandas as pd\n\n# Optimized dataframe operation' : ''}
${toLang === 'TypeScript' ? 'interface DataPayload {\n  id: string;\n}' : ''}
`
      }
    }

    let prompt = `Translate the following ${fromLang === 'Auto Detect' ? 'code (auto-detect language)' : fromLang + ' code'} to ${toLang}.`

    if (!includeExplanation) {
      prompt += `\nIMPORTANT: Return ONLY the code in ${toLang}. Do not include any explanations, markdown backticks, or analysis. Just the raw code.`
    } else {
      prompt += `\nInclude a brief Senior Engineer explanation of the changes and optimizations made.`
    }

    prompt += `\n\nCODE:\n${inputCode}`

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"), // Using high-performance Llama 3 on Groq
      system: SYSTEM_PROMPT,
      prompt: prompt,
    })

    return { text }
  } catch (error) {
    console.error("Translation error:", error)
    return { error: "Failed to translate code. Please try again later." }
  }
}
