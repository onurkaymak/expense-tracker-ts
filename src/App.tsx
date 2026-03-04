import { useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import type { Expense } from "./types";

function App() {
  const [expense, setExpense] = useState<Expense[]>([]);

  const editExpense = (
    editingId: string,
    editedExpense: string,
    editedAmount: number,
  ) => {
    const updatedExpsense: Expense = {
      id: editingId,
      description: editedExpense,
      amount: editedAmount,
    };
    setExpense((prev) =>
      prev.map((e) =>
        e.id === updatedExpsense.id ? { ...e, ...updatedExpsense } : e,
      ),
    );
  };

  const deleteExpense = (id: string) => {
    setExpense((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      <ExpenseList
        expenses={expense}
        onEditExpense={editExpense}
        onDeleteExpense={deleteExpense}
      ></ExpenseList>
      <ExpenseForm onSetExpense={setExpense}></ExpenseForm>
    </>
  );
}

export default App;
