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
        <div>
          <form action="" onSubmit={editHandler}>
            <div>
              <label htmlFor="expense">Expense:</label>
              <input
                type="string"
                name="expense"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExpenseItem;
