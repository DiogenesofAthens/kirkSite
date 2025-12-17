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
  let cleanText = text;
  if (fenceMatch) {
    cleanText = fenceMatch[1].trim();
  } else {
    // 2. Try to find the first '{' and last '}' to extract the object
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanText = text.substring(firstBrace, lastBrace + 1).trim();
    }
  }

  // 3. Robust Cleanup for common LLM JSON errors
  // Fix unescaped newlines inside JSON strings (risky but often needed for LLMs)
  // This regex looks for newlines that are NOT followed by a control character or valid JSON structural element
  // Actually, safely replacing newlines in JSON values is hard without a parser.
  // Instead, rely on the strict system prompt and strict model.

  return cleanText.trim();
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
  "explanation": "string (markdown allowed, architectural reasoning)"
}

Security Protocol:
- Refactor the "translated_code" to be secure (e.g., use parameterized queries) even if the original was insecure.
- "explanation" should focus on modern patterns, performance, and security.

IMPORTANT JSON RULES:
- Output MUST be valid parsable JSON.
- Do NOT include any text before or after the JSON object.
- Escape all control characters in strings (e.g. use \\n for newlines).
- Do NOT use unescaped double quotes inside strings.
`

  const userPrompt = `Translate the code inside <legacy_codeblock>...</legacy_codeblock> from ${fromLang} to ${toLang}.

<legacy_codeblock>
${sanitizedInput}
</legacy_codeblock>
`

  try {
    const { text } = await generateText({
      model: groq("llama3-8b-8192"),
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

      // FALLBACK RECOVERY: Regex Extraction
      // If JSON.parse fails, try to extract fields using regex
      const translatedCodeMatch = text.match(/"translated_code"\s*:\s*"([\s\S]*?)(?<!\\)"/);
      const explanationMatch = text.match(/"explanation"\s*:\s*"([\s\S]*?)(?<!\\)"/);

      if (translatedCodeMatch) {
          // Manually unescape the string (basic)
          const unescapeJson = (str: string) => str.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');

          return {
              success: true,
              data: {
                  translated_code: unescapeJson(translatedCodeMatch[1]),
                  explanation: explanationMatch ? unescapeJson(explanationMatch[1]) : "Detailed explanation unavailable due to formatting error."
              }
          }
      }

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
      model: groq("llama3-8b-8192"),
      system: systemPrompt,
      prompt: userPrompt,
    })
    return { answer: text }
  } catch (error: any) {
    return { error: error.message || "Failed to answer question" }
  }
}
