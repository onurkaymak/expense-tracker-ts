import { useEffect, useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import type { Expense } from "./types";

function App() {
  const [expense, setExpense] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const totalExpenseCalc = (expense: Expense[]) => {
    let total: number = 0;
    expense.forEach((e) => (total += e.amount));
    setTotalAmount(total);
  };

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
    totalExpenseCalc(expense);
  }, [expense]);

  return (
    <div className="flex flex-col bg-black p-10 rounded-xl shadow w-300 h-200 justify-items-center">
      <h1>TOTAL EXPENSE: ${totalAmount}</h1>
      <ExpenseList
        expenses={expense}
        onEditExpense={editExpense}
        onDeleteExpense={deleteExpense}
      ></ExpenseList>
      <ExpenseForm onSetExpense={setExpense}></ExpenseForm>
    </div>
  );
}

export default App;
