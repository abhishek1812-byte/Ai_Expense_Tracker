import axios from "axios";
import { ParsedExpense } from "./types";

const HF_API_URL = "https://router.huggingface.co/hf-inference/models";

// -----------
// Fallback rule-based parser (GUARANTEED)
// -----------
function fallbackParse(text: string): ParsedExpense {
  const lower = text.toLowerCase();

  const amountMatch = text.match(/\d+(\.\d+)?/);
  const amount = amountMatch ? Number(amountMatch[0]) : 0;

  let category = "Other";

  if (
    lower.includes("lunch") ||
    lower.includes("dinner") ||
    lower.includes("food") ||
    lower.includes("restaurant")
  ) {
    category = "Food & Dining";
  } else if (
    lower.includes("uber") ||
    lower.includes("ola") ||
    lower.includes("taxi")
  ) {
    category = "Transport";
  } else if (
    lower.includes("netflix") ||
    lower.includes("movie") ||
    lower.includes("subscription")
  ) {
    category = "Entertainment";
  }

  return {
    amount,
    currency: "INR",
    category,
    description: text,
    merchant: null,
  };
}

// -----------
// Main parser
// -----------
export async function parseExpense(
  text: string
): Promise<ParsedExpense> {
  try {
    const response = await axios.post(
      `${HF_API_URL}/${process.env.HF_MODEL}`,
      {
        inputs: `
Extract expense info and respond ONLY with JSON:
{
  "amount": number,
  "currency": string,
  "category": string,
  "description": string,
  "merchant": string | null
}

Text: "${text}"
`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    const output = response.data?.[0]?.generated_text;
    if (!output) throw new Error("Empty AI output");

    const match = output.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");

    const parsed = JSON.parse(match[0]);

    if (!parsed.amount) throw new Error("Invalid AI JSON");

    return {
      amount: parsed.amount,
      currency: parsed.currency || "INR",
      category: parsed.category || "Other",
      description: parsed.description,
      merchant: parsed.merchant ?? null,
    };
  } catch (error) {
    console.warn("⚠️ AI failed, using fallback parser");
    return fallbackParse(text);
  }
}
