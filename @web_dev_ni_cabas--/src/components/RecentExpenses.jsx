import React from "react";

const RecentExpenses = ({ recentExpenses }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold mb-3">Recent Expenses</h2>
      <ul className="divide-y divide-gray-200">
        {recentExpenses.map((expense) => (
          <li key={expense.id} className="py-2 flex justify-between">
            <span>{expense.category}</span>
            <span>₱{expense.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentExpenses;