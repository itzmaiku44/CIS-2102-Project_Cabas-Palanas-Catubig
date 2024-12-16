import React from "react";

const DeleteExpenseModal = ({ expense, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Delete Expense</h2>
        <p>
          Are you sure you want to delete the expense{" "}
          <strong>{expense.expense_name}</strong> of{" "}
          <strong>₱{expense.amount.toFixed(2)}</strong>?
        </p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 p-2 rounded-md mr-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-red-500 p-2 rounded-md text-white"
            onClick={() => onDelete(expense)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;
