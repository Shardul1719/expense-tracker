import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    api.get("/expenses").then((res) => setExpenses(res.data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-bold mb-4">Your Expenses</h2>

      <div className="space-y-3">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between p-3 rounded bg-slate-100 dark:bg-slate-700 hover:scale-[1.02] transition"
          >
            <span>{exp.title}</span>
            <span className="font-semibold">₹{exp.amount}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
