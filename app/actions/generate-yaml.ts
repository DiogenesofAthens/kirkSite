"use server";

import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

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

RETURN THE RESULT AS A VALID JSON OBJECT INSIDE <json_output>...</json_output> TAGS.
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

RETURN THE RESULT AS A VALID JSON OBJECT INSIDE <json_output>...</json_output> TAGS.
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

    // Manually extract JSON from XML tags
    const match = text.match(/<json_output>([\s\S]*?)<\/json_output>/);

    if (match && match[1]) {
      try {
        const parsedData = JSON.parse(match[1]);
        return { success: true, data: parsedData };
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        // Fallback: Return raw text if JSON parsing fails but tags exist
        return {
             success: true,
             data: {
                 yaml_code: "# Error: AI generated invalid JSON formatting.\n# Below is the raw output:\n\n" + text,
                 explanation: "Failed to parse structured output from AI. Raw response provided."
             }
        };
      }
    } else {
      // Fallback: No tags found
      return {
          success: true,
          data: {
              yaml_code: "# Error: AI did not return structured output tags.\n# Below is the raw output:\n\n" + text,
              explanation: "AI response format mismatch. Raw response provided."
          }
      };
    }

  } catch (error) {
    console.error("Error generating YAML:", error);
    return { error: "Failed to generate YAML. Please try again." };
  }
}
