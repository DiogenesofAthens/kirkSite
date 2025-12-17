"use server";

import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

function extractJson(text: string) {
  try {
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) throw new Error("No JSON found");
    const jsonString = text.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("JSON Parsing Failed:", text);
    throw new Error("AI generated invalid format. Raw output: " + text.substring(0, 100) + "...");
  }
}

export async function generateYaml(input: string, mode: "generator" | "debugger") {
  // 1. Security Protocol
  // Input Sanitization
  if (!input || input.trim().length === 0) {
    return { error: "Input cannot be empty" };
  }

  const sanitizedInput = input.trim().slice(0, 15000); // Limit to 15,000 chars

  // Sandwich Defense & Prompt Selection
  let systemPrompt = "";
  let userMessage = "";

  if (mode === "generator") {
    systemPrompt = `You are a Home Assistant Core expert. Your task is to convert natural language descriptions into valid, best-practice YAML automations.

Focus on standard entities (binary_sensor.*, light.*, switch.*).

Structure the output cleanly with alias, trigger, condition (if applicable), and action.

Analyze the request inside <user_description>.

RETURN THE RESULT AS A VALID JSON OBJECT.
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
The JSON object must have these fields:
- "yaml_code": The valid Home Assistant YAML automation block (string).
- "explanation": Brief summary of the logic or syntax errors fixed (string).`;

    userMessage = `<broken_yaml>${sanitizedInput}</broken_yaml>`;
  } else {
    return { error: "Invalid mode selected" };
  }

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      prompt: userMessage,
    });

    try {
        const parsedData = extractJson(text);
        return { success: true, data: parsedData };
    } catch (parseError) {
        // Fallback: Return raw text via Partial Success logic
        return {
             success: true,
             data: {
                 yaml_code: "# Error: AI generated invalid JSON formatting.\n# Below is the raw output:\n\n" + text,
                 explanation: "Failed to parse structured output from AI. Raw response provided."
             }
        };
    }

  } catch (error) {
    console.error("Error generating YAML:", error);
    return { error: "Failed to generate YAML. Please try again." };
  }
}
