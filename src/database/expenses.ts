import { db } from "./db";
import { Expense } from "./types";

// Insert new expense
export function createExpense(expense: Expense) {
  const stmt = db.prepare(`
    INSERT INTO expenses 
    (amount, currency, category, description, merchant, original_input)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    expense.amount,
    expense.currency,
    expense.category,
    expense.description,
    expense.merchant,
    expense.original_input
  );

  return {
    id: result.lastInsertRowid,
    ...expense,
  };
}

// Fetch all expenses
export function getAllExpenses() {
  return db
    .prepare(`SELECT * FROM expenses ORDER BY created_at DESC`)
    .all();
}

// Delete expense by id
export function deleteExpense(id: number) {
  return db.prepare(`DELETE FROM expenses WHERE id = ?`).run(id);
}
