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
  ) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-row bg-black p-10 rounded-xl shadow">
        {expenses.length === 0 && <p>There is no expense yet.</p>}
        {expenses.map((e) => {
          return (
            <ExpenseItem
              key={e.id}
              expenseId={e.id}
              expenseDescription={e.description}
              expenseAmount={e.amount}
              onEditExpense={onEditExpense}
              onDeleteExpense={onDeleteExpense}
              isEditing={editingId === e.id}
              setEditingId={setEditingId}
            ></ExpenseItem>
          );
        })}
      </div>
    </>
  );
};

export default ExpenseList;
