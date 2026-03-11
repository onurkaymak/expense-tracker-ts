import { v4 as uuidv4 } from "uuid";

import { useRef } from "react";
import type { Expense } from "../types";

interface Props {
  onSetExpense: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseForm = ({ onSetExpense }: Props) => {
  const expenseInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: uuidv4(),
      description: expenseInputRef.current.value,
      amount: parseFloat(amountInputRef.current.value),
      date: new Date(
        dateInputRef.current.value + "T00:00:00",
      ).toLocaleDateString("en-US"),
    };
    onSetExpense((prevExpense) => [...prevExpense, newExpense]);
    expenseInputRef.current.value = "";
    amountInputRef.current.value = "";
    dateInputRef.current.value = "";
  };

  return (
    <div className="mt-5">
      <form
        className="bg-white rounded-xl p-5 shadow-sm"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Expense
          </label>
          <input
            type="text"
            name="expense-name"
            className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-purple-400"
            ref={expenseInputRef}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Amount
          </label>
          <input
            type="number"
            name="expense-amount"
            className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-purple-400"
            ref={amountInputRef}
          />
        </div>
        <div>
          <input type="date" ref={dateInputRef} />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-2 text-sm font-medium"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};
export default ExpenseForm;
