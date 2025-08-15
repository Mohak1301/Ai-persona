import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { getHiteshSystemPrompt, getPiyushSystemPrompt } from "./personas.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


app.post("/chat", async (req, res) => {
  const { persona, message, history = [] } = req.body;

  let systemPrompt;
  if (persona === "hitesh") systemPrompt = getHiteshSystemPrompt();
  else if (persona === "piyush") systemPrompt = getPiyushSystemPrompt();
  else return res.status(400).json({ error: "Invalid persona" });

  const messages = [systemPrompt, ...history, { role: "user", content: message }];

  try {
    const completion = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
