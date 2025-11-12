import Files from "../model/files.model.js";
import dotenv from "dotenv";

dotenv.config();


export const getFileInsights = async (req, res) => {
  const fileId = req.params.fileId;

  if (!fileId) {
    return res.status(400).json({message: "File ID is required" });
  }

  try {
    const file = await Files.findById(fileId).lean();
    if (!file) {
      return res.status(404).json({message: "File does not exist" });
    }

    const prompt =`You are an expert Educational Data Analyst and Curriculum Specialist.
Given the file data uploaded by a teacher: ${JSON.stringify(file)}

{
  "Overview": "A 2-4 sentence summary of the main topics, grade level suitability, and instructional goal of the file content.",
  "File_Content_Summary": "A detailed summary of the key concepts, main arguments, or specific data/information presented in the file.",
  "Related_Books_and_Resources": [
    {
      "Title": "Title of a relevant book or resource.",
      "Author": "Author(s) of the book.",
      "Relevance_Note": "A brief explanation of how this resource relates to the file content and aids study."
    }
  ],
  "learningStandards": [
    "Relevant Standard 1",
    "Relevant Standard 2",
    "Relevant Standard 3"
  ],
  "differentiationSuggestions": [
    {
      "target": "Struggling Learners",
      "strategy": "Specific, actionable strategy to modify the content for lower proficiency levels."
    },
    {
      "target": "Advanced Learners",
      "strategy": "Specific, actionable strategy to extend the content for higher proficiency levels."
    }
  ]
}

Output must be valid JSON. No commentary, no markdown, no extra text.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.5,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const rawText =
      data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "";

    let parsedOutput;
    try {
      parsedOutput = JSON.parse(rawText);
    } catch {
      parsedOutput = { raw: rawText }; 
    }

    return res.status(200).json({ success: true, data: parsedOutput });
  } catch (err) {
    console.error("AI Insights Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate file insights",
      error : err.message,
});
}
}

export const quizGenerator = async (req, res) => {
  const fileId = req.params.fileId;

  if (!fileId) {
    return res.status(400).json({message: "File ID is required" });
  }

  try {
    const file = await Files.findById(fileId).lean();
    if (!file) {
      return res.status(404).json({message: "File does not exist" });
    }

    const prompt =`You are an expert Educational Data Analyst and Curriculum Specialist.
Given the file data uploaded by a teacher: ${JSON.stringify(file)}

{
  "task": "Generate a 5-question multiple-choice quiz on the topic of [INSERT SUBJECT/TOPIC HERE].",
  "quiz_format": {
    "title": "Quick Check: [INSERT SUBJECT/TOPIC HERE]",
    "instructions": "Select the best answer for each question.",
    "question_count": 5,
    "question_structure": {
      "type": "multiple_choice",
      "options_count": 4,
      "correct_answer_identification": "Must be clearly indicated."
    }
  },
  "constraints": [
    "Ensure questions cover a range of difficulty levels (easy to moderate).",
    "Options must be plausible distractors.",
    "The quiz must be outputted as a JSON array of question objects."
  ]
}

Output must be valid JSON. No commentary, no markdown, no extra text.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.5,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const rawText =
      data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "";

    let parsedOutput;
    try {
      parsedOutput = JSON.parse(rawText);
    } catch {
      parsedOutput = { raw: rawText }; 
    }

    return res.status(200).json({ success: true, data: parsedOutput });
  } catch (err) {
    console.error("AI Insights Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate a quiz",
      error : err.message,
});
}
}