import { v4 as uuidv4 } from "uuid";

import { useRef } from "react";
import type { Expense } from "../types";

interface Props {
  onSetExpense: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseForm = ({ onSetExpense }: Props) => {
  const expenseInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    expenseInputRef.current?.value;
    const newExpense: Expense = {
      id: uuidv4(),
      description: expenseInputRef.current.value,
      amount: parseInt(amountInputRef.current.value),
    };
    onSetExpense((prevExpense) => [...prevExpense, newExpense]);
    expenseInputRef.current.value = "";
    amountInputRef.current.value = "";
  };

  return (
    <div className="mt-auto justify-items-center">
      <div className="w-100">
        <form
          action=""
          className="bg-gray-500 p-10 rounded-xl"
          onSubmit={formSubmitHandler}
        >
          <div>
            <label htmlFor="expense-name">Expense:</label>
            <input
              type="text"
              name="expense-name"
              className="border-solid m-2"
              ref={expenseInputRef}
            />
          </div>
          <div>
            <label htmlFor="expense-amount">Amount:</label>
            <input
              type="number"
              name="expense-amount"
              className="border-solid m-2"
              ref={amountInputRef}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default ExpenseForm;
