import express from "express";

const router = express.Router();

router.post("/run", async (req, res) => {
  try {
    const { language, code, stdin } = req.body;

    // Language mapping for Judge0
    const languageMap = {
      javascript: 63, // Node.js
      python: 71,
      java: 62
    };

    const language_id = languageMap[language];

    // Validate language
    if (!language_id) {
      return res.status(400).json({
        error: "Unsupported or missing language"
      });
    }

    // Send code to Judge0
    const response = await fetch(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_code: code,
          language_id: language_id,
          stdin: stdin || ""
        })
      }
    );

    const data = await response.json();

    const output =
    data.stdout ??
    data.compile_output ??
    data.stderr ??
    data.message ??
    "No output";

    res.json({ output });

  } catch (error) {
    console.error("Execution error:", error);
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;