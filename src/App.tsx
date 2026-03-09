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
    <div className="h-screen bg-gray-100 p-5">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 rounded-xl p-5">
          <p className="text-white text-sm">Total Expenses</p>
          <h1 className="text-white mt-2 text-xl font-semibold">
            ${totalAmount}
          </h1>
        </div>
        <ExpenseList
          expenses={expense}
          onEditExpense={editExpense}
          onDeleteExpense={deleteExpense}
        ></ExpenseList>
        <ExpenseForm onSetExpense={setExpense}></ExpenseForm>
      </div>
    </div>
  );
}

export default App;
