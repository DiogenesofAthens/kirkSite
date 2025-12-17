"use server"

import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

// --- Helper Functions ---

function sanitizeJsonString(text: string): string {
  // 1. Try to find JSON object within Markdown fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenceMatch) {
    return fenceMatch[1].trim();
  }

  // 2. Try to find the first '{' and last '}' to extract the object
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.substring(firstBrace, lastBrace + 1).trim();
  }

  // 3. Fallback: Return text as-is
  return text.trim();
}

// --- Server Actions ---

export async function translateCode(inputCode: string, fromLang: string, toLang: string, includeExplanation: boolean = true) {
  if (!inputCode || !inputCode.trim()) {
    return { error: "Missing input code" }
  }

  // 1. Input Sanitization
  const sanitizedInput = inputCode.trim().substring(0, 50000);

  // 2. System Prompt & Sandwich Defense
  // Enhanced prompt to strictly enforce valid JSON and escaping
  const SYSTEM_PROMPT = `You are a Principal Software Architect and Security Engineer.
Your goal is to translate legacy code into secure, modern, enterprise-grade code.

RETURN ONLY RAW JSON. DO NOT RETURN MARKDOWN.
ENSURE ALL STRINGS ARE PROPERLY ESCAPED.
Structure:
{
  "translated_code": "string (the translated code)",
  "explanation": "string (markdown allowed, architectural reasoning)",
  "security_warning": "string | null (if original code has hardcoded creds, SQLi, etc.)"
}

Security Protocol:
- Detect hardcoded credentials, SQL injection, or XSS risks in the legacy code.
- If found, populate "security_warning" with a specific alert.
- Refactor the "translated_code" to be secure (e.g., use parameterized queries).
- "explanation" should focus on modern patterns, performance, and security.

IMPORTANT:
- Output MUST be valid parsable JSON.
- Do NOT include any text before or after the JSON object.
- Escape all control characters in strings (e.g. use \\n for newlines).
`

  const userPrompt = `Translate the code inside <legacy_codeblock>...</legacy_codeblock> from ${fromLang} to ${toLang}.

<legacy_codeblock>
${sanitizedInput}
</legacy_codeblock>
`

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      temperature: 0.1, // Lower temperature for more deterministic output
    })

    // 3. Robust Parsing
    try {
      const cleanJson = sanitizeJsonString(text);
      const data = JSON.parse(cleanJson);

      // Validate structure loosely
      if (typeof data.translated_code !== 'string') throw new Error("Missing translated_code");

      return { success: true, data };
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw Text:", text);
      // Fallback: Try to recover if it's just a raw string (unlikely given system prompt but good for resilience)
      return {
        error: "AI Response Formatting Error. Please try again.",
        raw_text: text
      };
    }

  } catch (error: any) {
    console.error("Translation Error:", error)
    return { error: error.message || "Failed to translate code." }
  }
}

export async function askTranslationQuestion(translatedCode: string, legacyCode: string, question: string) {
  if (!question.trim()) return { error: "Missing question" };

  const systemPrompt = `You are a Senior Engineer explaining a code migration. Answer the user's question about the translated code or the migration process. Keep it concise and technical.`;

  const userPrompt = `
Legacy Code:
<legacy_codeblock>
${legacyCode.substring(0, 10000)}
</legacy_codeblock>

Translated Code:
<modern_codeblock>
${translatedCode.substring(0, 10000)}
</modern_codeblock>

Question: ${question}
`;

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      prompt: userPrompt,
    })
    return { answer: text }
  } catch (error: any) {
    return { error: error.message || "Failed to answer question" }
  }
}
