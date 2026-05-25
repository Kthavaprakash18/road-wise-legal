import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1)
    .max(40),
});

const SYSTEM_PROMPT = `You are DriveLegal AI, an expert assistant on Indian traffic laws, the Motor Vehicles Act, 1988 (as amended by the 2019 Amendment Act), state-specific RTO rules, fines, penalties, and road safety.

Guidelines:
- Be concise, accurate, and structured (use short paragraphs and bullets).
- Always mention the relevant section of the MV Act when applicable.
- When discussing fines, note that amounts vary by state and provide a typical range.
- For ambiguous queries, ask one clarifying question.
- If asked about regional languages (Tamil, Hindi, English), respond in that language.
- Never provide legal advice that bypasses the law. Encourage compliance and safety.
- Tagline reminder: "Know the Law Before You Break It."`;

export const askDriveLegal = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "AI service is not configured. Please contact the administrator." };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...data.messages,
          ],
        }),
      });

      if (!res.ok) {
        if (res.status === 429) return { reply: "Rate limit reached. Please try again in a moment." };
        if (res.status === 402) return { reply: "AI usage credits exhausted. Please add credits in workspace settings." };
        const text = await res.text();
        console.error("AI gateway error:", res.status, text);
        return { reply: "Sorry, the AI service returned an error. Please try again." };
      }

      const json = await res.json();
      const reply = json?.choices?.[0]?.message?.content ?? "I couldn't generate a response.";
      return { reply };
    } catch (err) {
      console.error("askDriveLegal failed", err);
      return { reply: "Network error reaching the AI service. Please try again." };
    }
  });
