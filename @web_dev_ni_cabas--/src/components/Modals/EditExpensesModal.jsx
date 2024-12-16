import React, { useState, useEffect } from "react";
import { X, SquarePen } from "lucide-react";
import { updateExpense } from "../../store/expensesApi";
import ErrorMessage from "../shared/ErrorMessage";

const EditExpenseModal = ({ expense, budgets, onClose, onSave }) => {
  console.log("inside edit expense:", expense);
  console.log("inside edit expenses:", budgets);
  const [formData, setFormData] = useState({
    name: expense?.expense_name || "",
    amount: expense?.amount || "",
    categoryId: expense?.categoryId || "",
  });
  const [error, setError] = useState("");

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside handleSubmit", formData);

    // Prepare the updated expense data, including the expense ID
    const updatedExpenseData = {
      expense_name: formData.name,
      amount: parseFloat(formData.amount),
      categoryId: parseInt(formData.categoryId),
    };
    console.log("updated expense data", updatedExpenseData);

    try {
      const updatedExpense = await updateExpense(
        expense.id,
        updatedExpenseData
      );

      // Pass the updated expense data back to the parent component
      onSave(updatedExpense);
      onClose();
    } catch (err) {
      setError("Failed to update expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 relative border-2 border-dashed border-gray-300">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-red-500 hover:text-red-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Expense</h2>

        {/* Use ErrorMessage component for error handling */}
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-blue-600 font-medium">
                Expense Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 mt-1"
                placeholder="Expense Name"
              />
            </div>

            <div className="flex-1">
              <label className="block text-blue-600 font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 mt-1"
                placeholder="Amount"
              />
            </div>
          </div>

          {/* Category field */}
          <div>
            <label className="block text-blue-600 font-medium">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            >
              {budgets?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.budget_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
          >
            Edit Expense
            <SquarePen size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
