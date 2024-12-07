import React from 'react';
import { useState } from 'react';

const RecentExpenses = () => {
  const [recentExpenses] = useState([
    { id: 1, category: "Utilities", amount: 800 },
    { id: 2, category: "Transport", amount: 500 },
  ]);
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Recent Expenses
        <button className="ml-4 p-1 bg-green-500 text-white rounded-full">+</button>
      </h2>
      <table className="w-full bg-white shadow rounded-md">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentExpenses.map((expense) => (
            <tr key={expense.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{expense.category}</td>
              <td className="px-6 py-4">${expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentExpenses;