import { useState, useEffect } from "react";
import type { FormEvent } from "react";

interface Props {
  expenseId: string;
  expenseDescription: string;
  expenseAmount: number;
  expenseDate: string;
  onEditExpense: (
    id: string,
    editedExpense: string,
    editedAmount: number,
    editedDate: string,
  ) => void;
  onDeleteExpense: (id: string) => void;
  isEditing: boolean;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ExpenseItem = ({
  expenseId,
  expenseDescription,
  expenseAmount,
  expenseDate,
  onEditExpense,
  onDeleteExpense,
  isEditing,
  setEditingId,
}: Props) => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      setDescription(expenseDescription);
      setAmount(expenseAmount);
      setDate(expenseDate);
    }
  }, [isEditing, expenseDescription, expenseAmount, expenseDate]);

  const editHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditExpense(expenseId, description, amount, date);
    setEditingId(null);
  };

  return (
    <div
      className={`flex items-center bg-white rounded-xl p-4 shadow-sm group mx-auto transition-all duration-300 ${isMenuOpen ? "w-full" : "w-11/12"}`}
    >
      {!isEditing ? (
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 shrink-0">
            💸
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="font-medium truncate">{expenseDescription}</p>
            <p className="text-xs text-gray-400">{expenseDate}</p>
          </div>
          <p className="font-large w-20  shrink-0 mx-4">$ {expenseAmount}</p>
          <div className="flex shrink-0 ml-2">
            {!isMenuOpen ? (
              <div
                className={`flex shrink-0 ml-2 ${isMenuOpen ? "w-20" : "w-6"}`}
                onClick={() => setIsMenuOpen(true)}
              >
                ⋮
              </div>
            ) : (
              <div>
                <button
                  className="text-sm text-white rounded px-2 py-1 bg-indigo-500 m-1"
                  onClick={() => setEditingId(expenseId)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-white rounded px-2 py-1 bg-red-500 m-1"
                  onClick={() => onDeleteExpense(expenseId)}
                >
                  Delete
                </button>
              </div>
            )}
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
          <div>
            <input
              type="date"
              value={date ? new Date(date).toLocaleDateString("en-CA") : ""}
              onChange={(e) =>
                setDate(
                  new Date(e.target.value + "T00:00:00").toLocaleDateString(
                    "en-US",
                  ),
                )
              }
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
