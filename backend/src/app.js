import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

//global middlewares
app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

// auth routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ success: true, message: "MySQL connected 🎉" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "DB connection failed" });
  }
});
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    user: req.user,
  });
});


export default app;
