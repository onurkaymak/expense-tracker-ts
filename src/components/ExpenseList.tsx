import type { FormEvent } from "react";
import { useState } from "react";
import type { Expense } from "../types.ts";

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
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const editHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditExpense(editingId, description, amount);
    setEditingId(null);
  };

  return (
    <>
      <div className="flex flex-row bg-black p-10 rounded-xl shadow">
        {expenses.length === 0 && <p>There is no expense yet.</p>}
        {expenses.length !== 0 &&
          expenses.map((e) => {
            if (e.id === editingId) {
              return (
                <div key={e.id}>
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
              );
            } else {
              return (
                <div
                  key={e.id}
                  className="bg-gray-500 p-1 pt-3 pb-3 rounded-lg shadow m-2 w-50"
                >
                  <div>
                    {e.description} : {e.amount}
                    <div>
                      <button
                        onClick={() => {
                          setEditingId(e.id);
                          setDescription(e.description);
                          setAmount(e.amount);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDeleteExpense(e.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default ExpenseList;
