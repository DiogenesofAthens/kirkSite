// Extract just the inner logic to verify it against the "broken" string pattern
function extractJson(text) {
  const startIndex = text.indexOf('{');
  const endIndex = text.lastIndexOf('}');

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const jsonCandidate = text.substring(startIndex, endIndex + 1);
    try {
      return JSON.parse(jsonCandidate);
    } catch (e) {
      const cleaned = jsonCandidate.replace(/[\u0000-\u001F]+/g, (match) => {
        if (match === '\n' || match === '\r' || match === '\t') return match;
        return '';
      });
      try {
        return JSON.parse(cleaned);
      } catch (e2) {
        throw new Error("JSON Parsing Failed");
      }
    }
  }
  return null;
}

// Test case 1: Valid
try {
    const res = extractJson('some text { "key": "value" } end text');
    console.log("Test 1 (Valid):", res.key === "value" ? "PASS" : "FAIL");
} catch(e) { console.log("Test 1 (Valid): FAIL", e.message); }

// Test 2: Control chars (not newlines)
try {
    const res = extractJson('some text { "key": "value\x00" } end text');
    console.log("Test 2 (Control Chars):", res.key === "value" ? "PASS" : "FAIL");
} catch(e) { console.log("Test 2 (Control Chars): FAIL", e.message); }

// Test 3: Unescaped newlines (Should FAIL locally, but trigger RETRY in production)
try {
    const res = extractJson(' { "key": "line1\nline2" } ');
    console.log("Test 3 (Unescaped NL):", "FAIL (Unexpected Success - JSON.parse usually fails this)");
} catch(e) {
    console.log("Test 3 (Unescaped NL): PASS (Correctly threw error for retry logic)");
}
