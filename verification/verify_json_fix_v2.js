function improvedExtractJson(text) {
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const jsonCandidate = text.substring(startIndex, endIndex + 1);
        try {
            return JSON.parse(jsonCandidate);
        } catch (e) {
            // Attempt 1: Fix unescaped newlines inside the JSON string
            // This is a naive heuristic: if we see a newline that is NOT preceded by a comma or brace,
            // and we are inside a value... it's hard to know if we are inside a value with regex.

            // Safer approach: replace all literal newlines with \n
            // BUT this breaks the structure if the newlines are formatting the JSON itself.

            // Middle ground: The model usually pretty prints.
            // If the model output "yaml_code": "line1
            // line2", that is the issue.

            // Let's try to parse the 'yaml_code' manualy if JSON.parse fails?
            // Or just rely on the retry logic which prompts the model to fix it.
            return null;
        }
    }
    return null;
}
console.log("Validation: If this script does nothing, we rely on Retry Logic.");
