import express from "express";

const router = express.Router();

// Judge0 language IDs
const LANGUAGE_MAP = {
  python: 71,
  javascript: 63,
  java: 62
};

router.post("/run", async (req, res) => {
  try {
    const { language, code } = req.body;

    const language_id = LANGUAGE_MAP[language];

    const response = await fetch(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_code: code,
          language_id
        })
      }
    );

    const data = await response.json();

    res.json({
      stdout: data.stdout,
      stderr: data.stderr,
      compile_output: data.compile_output
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;