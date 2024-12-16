import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import ErrorMessage from "../shared/ErrorMessage";
import { addExpense } from "../../store/expensesApi";
import { fetchBudgets } from "../../store/budgetApi";

const AddExpenseModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    categoryId: "",
  });
  const [error, setError] = useState("");
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const budgetData = await fetchBudgets();
        setBudgets(budgetData);
      } catch (err) {
        console.error("Error loading budgets:", err.message);
        setError("Failed to load categories.");
      }
    };

    loadBudgets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.categoryId) {
      setError("Please fill in all fields");
      return;
    }

    const newExpenseData = {
      expense_name: formData.name,
      amount: parseFloat(formData.amount),
      categoryId: parseInt(formData.categoryId),
    };

    try {
      // Assuming addExpense API is successful, send new expense data to parent
      await addExpense(newExpenseData);
      onSave(newExpenseData); // Call onSave with the new expense
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message || "Failed to add expense");
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

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Add New Expense
        </h2>

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
                className="w-full border border-gray-300 rounded p-2 mt-1"
                placeholder="Amount"
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
              className="w-full border border-gray-300 rounded p-2 mt-1"
              required
            >
              <option value="">Select a category</option>
              {budgets.length === 0 ? (
                <option disabled>No categories available</option>
              ) : (
                budgets.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.budget_name}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
          >
            Add Expense
            <Plus size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
