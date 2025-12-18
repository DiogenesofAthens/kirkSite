"use server";

import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

function extractJson(text: string) {
  // 1. Try to find JSON block by looking for first { and last }
  const startIndex = text.indexOf('{');
  const endIndex = text.lastIndexOf('}');

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const jsonCandidate = text.substring(startIndex, endIndex + 1);
    try {
      return JSON.parse(jsonCandidate);
    } catch (e) {
      // If failed, try stripping control characters that might break JSON
      // But be careful not to strip valid whitespace if possible
      const cleaned = jsonCandidate.replace(/[\u0000-\u001F]+/g, (match) => {
        if (match === '\n' || match === '\r' || match === '\t') return match;
        return '';
      });
      try {
        return JSON.parse(cleaned);
      } catch (e2) {
        // Double parsing failed
        throw new Error("JSON Parsing Failed after cleanup");
      }
    }
  }

  // Fallback: Try cleaning markdown and parsing whole text
  let clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(clean);
  } catch (e) {
    throw new Error("No valid JSON object found in response");
  }
}

export async function generateYaml(input: string, mode: "generator" | "debugger") {
  // 1. Security Protocol
  // Input Sanitization
  if (!input || input.trim().length === 0) {
    return { error: "Input cannot be empty" };
  }

  const sanitizedInput = input.trim().slice(0, 100000); // Limit to 100,000 chars (Llama 3.1 128k context)
  console.log(`[GenerateYAML] Input Length: ${sanitizedInput.length} chars`);

  // Sandwich Defense & Prompt Selection
  let systemPrompt = "";
  let userMessage = "";

  const commonInstructions = `
RETURN THE RESULT AS A VALID JSON OBJECT.
Do not use Markdown formatting. Do not wrap in \`\`\`json. Just return the raw JSON string.

IMPORTANT: The "yaml_code" field will be a multi-line string. You MUST strictly escape all newlines as \\n within the JSON string. Do not output raw newlines inside the JSON string values.

The JSON object must have these fields:
- "yaml_code": The valid Home Assistant YAML automation block (string).
- "explanation": Brief summary of the logic or syntax errors fixed (string).`;

  if (mode === "generator") {
    systemPrompt = `You are a Home Assistant Core expert. Your task is to convert natural language descriptions into valid, best-practice YAML automations.

Focus on standard entities (binary_sensor.*, light.*, switch.*).

Structure the output cleanly with alias, trigger, condition (if applicable), and action.

Analyze the request inside <user_description>.

${commonInstructions}`;

    userMessage = `<user_description>${sanitizedInput}</user_description>`;

  } else if (mode === "debugger") {
    systemPrompt = `You are a YAML syntax expert specialized in Home Assistant configuration.

Analyze the code inside <broken_yaml>.

Identify indentation errors, invalid keys, or logical flaws.

Generate the corrected YAML version.

In the explanation field, detail exactly what errors were found and fixed.

${commonInstructions}`;

    userMessage = `<broken_yaml>${sanitizedInput}</broken_yaml>`;
  } else {
    return { error: "Invalid mode selected" };
  }

  const MAX_RETRIES = 2; // 1 initial + 1 retry
  let lastError: any = null;
  let lastText = "";

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[GenerateYAML] Attempt ${attempt}/${MAX_RETRIES}`);

      const { text } = await generateText({
        model: groq("llama-3.1-8b-instant"),
        system: systemPrompt + (attempt > 1 ? " \n\nPREVIOUS ATTEMPT FAILED. ENSURE VALID JSON FORMAT." : ""),
        prompt: userMessage,
      });

      lastText = text;
      const parsedData = extractJson(text);
      return { success: true, data: parsedData };

    } catch (error: any) {
      console.warn(`[GenerateYAML] Attempt ${attempt} failed:`, error.message);
      lastError = error;
      // If it's the last attempt, fall through to error return
      if (attempt === MAX_RETRIES) break;
    }
  }

  console.error("All retry attempts failed. Last Raw text:", lastText);
  // FALLBACK: Return the raw text as the 'explanation' so the user sees something
  return {
    success: true, // Return success true so the UI doesn't crash, but show error in fields
    data: {
      yaml_code: "# Error parsing AI response. See notes.",
      explanation: "AI Raw Output (JSON Parsing Failed):\n" + lastText
    }
  };
}
