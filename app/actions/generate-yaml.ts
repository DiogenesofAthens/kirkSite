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
  // Input Sanitization
  if (!input || input.trim().length === 0) {
    return { error: "Input cannot be empty" };
  }

  const sanitizedInput = input.trim().slice(0, 100000); // Limit to 100,000 chars

  // 1. THE "GOLD STANDARD" STYLE GUIDE (The Brain)
  const HA_STYLE_GUIDE = `
### HOME ASSISTANT STYLE GUIDE (2025 PRESETS)
You are a logic engine. You do not think; you generate code matching these rules exactly.

#### RULE 1: NOTIFICATIONS
- NEVER use 'notify.notify'. It is deprecated/unreliable.
- ALWAYS use 'notify.mobile_app_<device_name>'.
- IF the user does not specify a device, default to 'notify.mobile_app_iphone' and add a comment.
- BAD: service: notify.notify
- GOOD: service: notify.mobile_app_pixel_10

#### RULE 2: ENTITY IDS
- Input entities are provided in <available_entities>.
- PRIORITY 1: Match user intent to an entity in that list.
- PRIORITY 2: If no match, generate a logical ID in snake_case (e.g., 'light.kitchen_main') and append comment '# CHECK ID'.

#### RULE 3: SYNTAX & STRUCTURE
- Indentation: Strictly 2 spaces.
- Conditions: If no conditions, OMIT the block completely. DO NOT write 'condition: []'.
- Attributes: When using 'numeric_state', always include 'above' or 'below'.

#### RULE 4: OUTPUT FORMAT
- You must return valid JSON.
- The 'yaml_code' string must use \\n for newlines.
`;

  // 2. FEW-SHOT EXAMPLES (The "Monkey See, Monkey Do" Pattern)
  const FEW_SHOT_EXAMPLES = `
### EXAMPLES
User: "Turn on porch light when motion detected"
Response: {
  "yaml_code": "alias: Porch Light Motion\\ntrigger:\\n  - platform: state\\n    entity_id: binary_sensor.porch_motion\\n    to: 'on'\\naction:\\n  - service: light.turn_on\\n    target:\\n      entity_id: light.porch\\nmode: single",
  "explanation": "Standard motion automation."
}

User: "Notify pixel 10 when back door opens"
Response: {
  "yaml_code": "alias: Notify Back Door\\ntrigger:\\n  - platform: state\\n    entity_id: binary_sensor.back_door\\n    from: 'off'\\n    to: 'on'\\naction:\\n  - service: notify.mobile_app_pixel_10\\n    data:\\n      message: 'Back door opened!'\\n      title: 'Security Alert'",
  "explanation": "Used specific mobile_app service for pixel 10."
}
`;

  const commonJsonInstruction = `
FINAL INSTRUCTION:
Return ONLY the raw JSON object. Do not use Markdown. Do not explain outside the JSON.
`;

  // Extract entities if present (Client appends <user_devices>...</user_devices>)
  let entitiesList = "None provided (Guess logical IDs)";
  let userRequest = sanitizedInput;

  // Check for the format used by the frontend
  const deviceMatch = sanitizedInput.match(/<user_devices>(.*?)<\/user_devices>/s);
  if (deviceMatch) {
    entitiesList = deviceMatch[1].trim();
    userRequest = sanitizedInput.replace(deviceMatch[0], "").trim();
  }

  let systemPrompt = "";
  let userMessage = "";

  // 3. CONSTRUCT THE PROMPT
  if (mode === "generator") {
    systemPrompt = `You are a Home Assistant Architect.
${HA_STYLE_GUIDE}
${FEW_SHOT_EXAMPLES}
${commonJsonInstruction}`;

    // Inject Context carefully
    userMessage = `
<available_entities>
${entitiesList}
</available_entities>

<user_request>
${userRequest}
</user_request>
`;

  } else if (mode === "debugger") {
    systemPrompt = `You are a YAML Syntax Repair Engine.
${HA_STYLE_GUIDE}
Analyze the code in <broken_yaml>. Fix indentation, service calls, and deprecated syntax.
${commonJsonInstruction}`;

    // We use userRequest to ensure we don't accidentally include XML tags if they were appended
    userMessage = `<broken_yaml>${userRequest}</broken_yaml>`;
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
