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
    <div className="bg-gray-800 p-5">
      {!isEditing ? (
        <div>
          <div>
            {expenseDescription} : {expenseAmount}
            <div>
              <button
                className="m-1"
                onClick={() => {
                  setEditingId(expenseId);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDeleteExpense(expenseId);
                }}
              >
                Delete
              </button>
            </div>
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
