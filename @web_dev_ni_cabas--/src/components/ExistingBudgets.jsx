import React from "react";

const ExistingBudgets = ({ budgets }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-bold mb-3">Existing Budgets</h2>
      <ul className="divide-y divide-gray-200">
        {budgets.map((budget) => (
          <li key={budget.id} className="py-2 flex justify-between">
            <span>{budget.category}</span>
            <span>₱{budget.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExistingBudgets;