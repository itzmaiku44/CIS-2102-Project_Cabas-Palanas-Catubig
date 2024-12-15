import React from "react";

const ViewDetailsModal = ({ isOpen, onClose, expenses }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Expenses Details</h3>
        <ul className="space-y-2">
          {expenses.length === 0 ? (
            <li>No expenses available for this budget.</li>
          ) : (
            expenses.map((expense, index) => (
              <li key={index} className="flex justify-between">
                <span>{expense.expense_name} </span>
                <span>
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(expense.amount)}
                </span>
              </li>
            ))
          )}
        </ul>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
