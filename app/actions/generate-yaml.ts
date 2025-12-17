"use server";

import { generateObject } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

// Unified schema for both modes
const HaResponseSchema = z.object({
  yaml_code: z.string().describe("Valid Home Assistant YAML automation block without markdown formatting"),
  explanation: z.string().describe("Brief summary of the logic implemented or syntax errors corrected")
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

Analyze the request inside <user_description>. Return the result matching the defined JSON schema.`;

    userMessage = `<user_description>${sanitizedInput}</user_description>`;

  } else if (mode === "debugger") {
    systemPrompt = `You are a YAML syntax expert specialized in Home Assistant configuration.

Analyze the code inside <broken_yaml>.

Identify indentation errors, invalid keys, or logical flaws.

Generate the corrected YAML version.

In the explanation field, detail exactly what errors were found and fixed.`;

    userMessage = `<broken_yaml>${sanitizedInput}</broken_yaml>`;
  } else {
    return { error: "Invalid mode selected" };
  }

  try {
    const result = await generateObject({
      model: groq("llama-3.3-70b-versatile"),
      schema: HaResponseSchema,
      system: systemPrompt,
      prompt: userMessage,
    });

    return { success: true, data: result.object };

  } catch (error) {
    console.error("Error generating YAML:", error);
    return { error: "Failed to generate YAML. Please try again." };
  }
}
