import type { FormEvent } from "react";
import { useState } from "react";
import { useRef } from "react";
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

  const editExpenseRef = useRef<HTMLInputElement>(null);
  const editAmountRef = useRef<HTMLInputElement>(null);

  const editHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditExpense(
      editingId,
      editExpenseRef.current?.value,
      parseInt(editAmountRef.current?.value),
    );
    setEditingId(null);
  };

  return (
    <>
      <div className="flex flex-row bg-black p-10 rounded-xl shadow">
        {expenses.length === 0 && <p>There is no expense yet.</p>}
        {expenses.length !== 0 &&
          expenses.map((e) => {
            if (editingId !== null && e.id === editingId) {
              return (
                <div key={e.id}>
                  <form action="" onSubmit={editHandler}>
                    <div>
                      <label htmlFor="expense">Expense:</label>
                      <input
                        type="string"
                        name="expense"
                        ref={editExpenseRef}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="amount">Amount:</label>
                      <input type="number" name="amount" ref={editAmountRef} />
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
