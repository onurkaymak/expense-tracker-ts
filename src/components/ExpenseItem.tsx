import { useState, useEffect } from "react";
import type { FormEvent } from "react";

interface Props {
  expenseId: string;
  expenseDescription: string;
  expenseAmount: number;
  onEditExpense: (
    id: string,
    editedExpense: string,
    editedAmount: number,
  ) => void;
  onDeleteExpense: (id: string) => void;
  isEditing: boolean;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ExpenseItem = ({
  expenseId,
  expenseDescription,
  expenseAmount,
  onEditExpense,
  onDeleteExpense,
  isEditing,
  setEditingId,
}: Props) => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (isEditing) {
      setDescription(expenseDescription);
      setAmount(expenseAmount);
    }
  }, [isEditing, expenseDescription, expenseAmount]);

  const editHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditExpense(expenseId, description, amount);
    setEditingId(null);
  };

  return (
    <div className="flex items-center bg-white rounded-xl p-4 w-full shadow-sm group">
      {!isEditing ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 shrink-0">
              💸
            </div>
            <p className="font-medium truncate">{expenseDescription}</p>
          </div>
          <p className="font-normal w-20 text-right shrink-0 mx-4">
            $ {expenseAmount}
          </p>
          <div className="flex shrink-0 ml-2">
            <button
              className="text-sm text-white rounded px-2 py-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity m-1"
              onClick={() => setEditingId(expenseId)}
            >
              Edit
            </button>
            <button
              className="text-sm text-white rounded px-2 py-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity m-1"
              onClick={() => onDeleteExpense(expenseId)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form className="w-full" onSubmit={editHandler}>
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Expense
            </label>
            <input
              type="text"
              name="expense"
              value={description}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-purple-400"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={amount}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-purple-400"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-2 text-sm font-medium"
            >
              Save
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-100 text-gray-600 rounded-lg p-2 text-sm font-medium"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExpenseItem;
