import React from 'react';
import { create } from 'zustand';
import { useCurrency } from '../../context/CurrencyContext';

// Expenses Store
export const useExpensesStore = create((set) => ({
  expenses: [],
  addExpense: (expense) => set((state) => ({
    expenses: [...state.expenses, { ...expense, id: Date.now() }]
  })),
  editExpense: (updatedExpense) => set((state) => ({
    expenses: state.expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    )
  })),
  deleteExpense: (expenseId) => set((state) => ({
    expenses: state.expenses.filter(expense => expense.id !== expenseId)
  })),
}));

const ExpensesTable = () => {
  const { currency } = useCurrency();
  const { expenses } = useExpensesStore();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-gray-500 font-medium">Name</th>
            <th className="px-6 py-3 text-left text-gray-500 font-medium">Amount</th>
            <th className="px-6 py-3 text-left text-gray-500 font-medium">Date</th>
            <th className="px-6 py-3 text-left text-gray-500 font-medium">Budget</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4">{expense.name}</td>
              <td className="px-6 py-4">{currency.symbol}{expense.amount.toLocaleString()}</td>
              <td className="px-6 py-4">{expense.date}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                  {expense.budget}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;