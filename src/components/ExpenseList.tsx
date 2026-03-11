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

  return (
    <div className="mt-5 flex flex-col gap-3">
      {expenses.length === 0 && (
        <p className="text-center text-gray-600 text-sm py-6">
          No expenses yet.
        </p>
      )}
      {expenses.map((e) => {
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
