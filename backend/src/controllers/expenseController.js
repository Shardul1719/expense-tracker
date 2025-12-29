import pool from "../config/db.js";

// CREATE EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, expense_date } = req.body;
    const userId = req.user.id; // from JWT

    if (!title || !amount || !expense_date) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await pool.query(
      `INSERT INTO expenses (user_id, title, amount, category, expense_date)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, title, amount, category, expense_date]
    );

    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error("Add Expense Error 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER EXPENSES
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const [expenses] = await pool.query(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY expense_date DESC",
      [userId]
    );

    res.json(expenses);
  } catch (error) {
    console.error("Get Expenses Error 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE EXPENSE
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, expense_date } = req.body;
    const userId = req.user.id;

    const [result] = await pool.query(
      `UPDATE expenses
       SET title = ?, amount = ?, category = ?, expense_date = ?
       WHERE id = ? AND user_id = ?`,
      [title, amount, category, expense_date, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [result] = await pool.query(
      "DELETE FROM expenses WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// MONTHLY TOTAL
export const getMonthlyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res
        .status(400)
        .json({ message: "Month and year are required" });
    }

    const [result] = await pool.query(
      `
      SELECT IFNULL(SUM(amount), 0) AS total
      FROM expenses
      WHERE user_id = ?
        AND MONTH(expense_date) = ?
        AND YEAR(expense_date) = ?
      `,
      [userId, month, year]
    );

    res.json({
      month,
      year,
      total: result[0].total,
    });
  } catch (error) {
    console.error("Monthly Total Error 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CATEGORY-WISE TOTAL
export const getCategorySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [result] = await pool.query(
      `
      SELECT category, SUM(amount) AS total
      FROM expenses
      WHERE user_id = ?
      GROUP BY category
      ORDER BY total DESC
      `,
      [userId]
    );

    res.json(result);
  } catch (error) {
    console.error("Category Summary Error 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};
