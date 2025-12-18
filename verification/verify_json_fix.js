const assert = require('assert');

// The flawed parsing logic from existing generate-yaml.ts
function flawedExtractJson(text) {
  try {
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) throw new Error("No JSON object found");
    const jsonString = text.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    return null; // Simulate failure
  }
}

// The robust logic we want to implement (from extract-entity.ts + tweaks)
function robustExtractJson(text) {
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const jsonCandidate = text.substring(startIndex, endIndex + 1);
        try {
            return JSON.parse(jsonCandidate);
        } catch (e) {
            // Attempt 1: Strip control characters (0x00-0x1F) except whitespace
            let cleaned = jsonCandidate.replace(/[\u0000-\u001F]+/g, (match) => {
                if (match === '\n' || match === '\r' || match === '\t') return match;
                return '';
            });
            try { return JSON.parse(cleaned); } catch (e2) {}

            // Attempt 2: Handle unescaped newlines in JSON strings?
            // This is harder without a full parser, but let's test if simple replace helps
            // Regex to find newlines that are NOT escaped?
            // For now, let's just stick to the control char stripping which fixed the previous issue

            return null;
        }
    }
    return null;
}

const malformedOutput = `Here is the JSON:
{
  "yaml_code": "automation:
  - alias: Test",
  "explanation": "Something"
}
`;

console.log("Testing Flawed Logic...");
const flawedResult = flawedExtractJson(malformedOutput);
console.log("Flawed Result:", flawedResult ? "Success" : "Failed");

console.log("Testing Robust Logic...");
const robustResult = robustExtractJson(malformedOutput);
console.log("Robust Result:", robustResult ? "Success" : "Failed");

// Note: Real newlines inside a string are invalid JSON. JSON.parse will fail even with robust logic unless we escape them.
// The real fix might be enforcing the model output better OR escaping them manually.
