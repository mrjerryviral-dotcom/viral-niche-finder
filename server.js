import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/niche", async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
You are a professional YouTube niche research expert.

Given topic: ${topic}

Find 5 LOW competition viral YouTube automation niches.

For each niche provide:
- Niche name
- Virality score /10
- Competition level
- Why it can go viral
- Example video idea

Keep it concise and powerful.
`;

    const response = await client.responses.create({
      model: "gpt-5.2",
      input: prompt,
    });

    res.json({ result: response.output_text });
  } catch (err) {
    res.json({ result: "Error: " + err.message });
  }
});

app.listen(3000);
