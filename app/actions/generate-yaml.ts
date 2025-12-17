"use server";

import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

function extractJson(text: string) {
  try {
    // Find the first '{' and the last '}'
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) throw new Error("No JSON object found in response");

    // Extract just the JSON part
    const jsonString = text.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON Parsing Failed. Raw text:", text);
    // FALLBACK: Return the raw text as the 'explanation' so the user sees something
    return {
      yaml_code: "# Error parsing AI response. See notes.",
      explanation: "AI Raw Output: " + text
    };
  }
}

export async function generateYaml(input: string, mode: "generator" | "debugger") {
  // 1. Security Protocol
  // Input Sanitization
  if (!input || input.trim().length === 0) {
    return { error: "Input cannot be empty" };
  }

  const sanitizedInput = input.trim().slice(0, 30000); // Limit to 30,000 chars

  // Sandwich Defense & Prompt Selection
  let systemPrompt = "";
  let userMessage = "";

  if (mode === "generator") {
    systemPrompt = `You are a Home Assistant Core expert. Your task is to convert natural language descriptions into valid, best-practice YAML automations.

Focus on standard entities (binary_sensor.*, light.*, switch.*).

Structure the output cleanly with alias, trigger, condition (if applicable), and action.

Analyze the request inside <user_description>.

RETURN THE RESULT AS A VALID JSON OBJECT.
Do not use Markdown formatting. Do not wrap in \`\`\`json. Just return the raw JSON string.

The JSON object must have these fields:
- "yaml_code": The valid Home Assistant YAML automation block (string).
- "explanation": Brief summary of the logic or syntax errors fixed (string).`;

    userMessage = `<user_description>${sanitizedInput}</user_description>`;

  } else if (mode === "debugger") {
    systemPrompt = `You are a YAML syntax expert specialized in Home Assistant configuration.

Analyze the code inside <broken_yaml>.

Identify indentation errors, invalid keys, or logical flaws.

Generate the corrected YAML version.

In the explanation field, detail exactly what errors were found and fixed.

RETURN THE RESULT AS A VALID JSON OBJECT.
Do not use Markdown formatting. Do not wrap in \`\`\`json. Just return the raw JSON string.

The JSON object must have these fields:
- "yaml_code": The valid Home Assistant YAML automation block (string).
- "explanation": Brief summary of the logic or syntax errors fixed (string).`;

    userMessage = `<broken_yaml>${sanitizedInput}</broken_yaml>`;
  } else {
    return { error: "Invalid mode selected" };
  }

  try {
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: systemPrompt,
      prompt: userMessage,
    });

    const parsedData = extractJson(text);
    return { success: true, data: parsedData };

  } catch (error) {
    console.error("Error generating YAML:", error);
    return { error: "Failed to generate YAML. Please try again." };
  }
}
