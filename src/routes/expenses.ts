import express from "express";
import { parseExpense } from "../services/aiService";
import {
  createExpense,
  getAllExpenses,
  deleteExpense,
} from "../database/expenses";

const router = express.Router();

// -------------------------
// POST /api/expenses
// -------------------------
router.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text is required",
    });
  }

  try {
    const parsed = await parseExpense(text);

    const savedExpense = createExpense({
      ...parsed,
      original_input: text,
    });

    res.json(savedExpense);
  } catch (error) {
    res.status(400).json({
      error: "Could not parse expense",
    });
  }
});

// -------------------------
// GET /api/expenses
// -------------------------
router.get("/", (_req, res) => {
  const expenses = getAllExpenses();
  res.json(expenses);
});

// -------------------------
// DELETE /api/expenses/:id
// -------------------------
router.delete("/:id", (req, res) => {
  deleteExpense(Number(req.params.id));
  res.json({ success: true });
});

export default router;
