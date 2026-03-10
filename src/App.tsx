import { useEffect, useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import type { Expense } from "./types";

function App() {
  const [expense, setExpense] = useState<Expense[]>(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const editExpense = (
    editingId: string,
    editedExpense: string,
    editedAmount: number,
  ) => {
    const updatedExpense: Expense = {
      id: editingId,
      description: editedExpense,
      amount: editedAmount,
    };
    setExpense((prev) =>
      prev.map((e) =>
        e.id === updatedExpense.id ? { ...e, ...updatedExpense } : e,
      ),
    );
  };

  const deleteExpense = (id: string) => {
    setExpense((prev) => prev.filter((e) => e.id !== id));
  };

  useEffect(() => {
    const total = expense.reduce((sum, e) => sum + e.amount, 0);
    setTotalAmount(total);
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
          radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
          radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
          radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
          radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
          linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
        `,
        }}
      />
      <div className="relative z-10 max-w-md mx-auto px-5 py-40">
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 rounded-xl p-5 text-center">
          <p className="text-white text-sm">Total Expenses</p>
          <h1 className="text-white mt-2 text-xl font-semibold">
            ${totalAmount}
          </h1>
        </div>
        <ExpenseList
          expenses={expense}
          onEditExpense={editExpense}
          onDeleteExpense={deleteExpense}
        />
        <ExpenseForm onSetExpense={setExpense} />
      </div>
    </div>
  );
}

export default App;
