import React, { useState, useEffect } from "react";
import { X, SquarePen } from "lucide-react";
import { updateExpense } from "../../store/expensesApi";
import ErrorMessage from "../shared/ErrorMessage";

const EditExpenseModal = ({ expense, budgets, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: expense?.expense_name || "",
    amount: expense?.amount || "",
    categoryId: expense?.categoryId || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpenseData = {
      expense_name: formData.name,
      amount: parseFloat(formData.amount),
      categoryId: parseInt(formData.categoryId),
    };

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
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-blue-600 font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-blue-600 font-medium">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.budget_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
