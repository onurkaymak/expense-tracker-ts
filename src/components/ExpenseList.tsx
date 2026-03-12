import type { FormEvent } from "react";
import { useState } from "react";
import type { Expense } from "../types.ts";
import ExpenseItem from "./ExpenseItem.tsx";

interface Props {
  expenses: Expense[];
  onEditExpense: (
    id: string,
    editedExpense: string,
    editedAmount: number,
    editedDate: string,
  ) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSortedNewest, setIsSortedNewest] = useState<boolean>(true);

  const sortedExpenses = [...expenses].sort((a: Expense, b: Expense) => {
    if (isSortedNewest) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="flex justify-end">
        <button
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-2 text-sm font-medium"
          onClick={() => setIsSortedNewest((prev) => !prev)}
        >
          {!isSortedNewest ? "Show Newest First" : "Show Oldest First"}
        </button>
      </div>
      {expenses.length === 0 && (
        <p className="text-center text-gray-600 text-sm py-6">
          No expenses yet.
        </p>
      )}
      {sortedExpenses.map((e) => {
        return (
          <ExpenseItem
            key={e.id}
            expenseId={e.id}
            expenseDescription={e.description}
            expenseAmount={e.amount}
            expenseDate={e.date}
            onEditExpense={onEditExpense}
            onDeleteExpense={onDeleteExpense}
            isEditing={editingId === e.id}
            setEditingId={setEditingId}
          ></ExpenseItem>
        );
      })}
    </div>
  );
};

export default ExpenseList;
