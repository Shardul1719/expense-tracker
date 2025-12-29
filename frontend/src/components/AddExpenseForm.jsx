import { useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function AddExpenseForm() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    expense_date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/expenses", form);
    window.location.reload(); // simple refresh for now
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>

      {["title", "amount", "category", "expense_date"].map((field) => (
        <input
          key={field}
          placeholder={field.replace("_", " ")}
          type={field === "expense_date" ? "date" : "text"}
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, [field]: e.target.value })
          }
        />
      ))}

      <button className="w-full bg-primary text-white py-2 rounded hover:scale-105 transition">
        Add Expense
      </button>
    </motion.form>
  );
}
