import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import ErrorMessage from "../shared/ErrorMessage";
import { addBudget } from "../../store/budgetApi";

const AddBudgetModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    amount: "",
    budgetName: "",
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

    if (!formData.budgetName || !formData.amount) {
      setError("Please fill in all fields");
      return;
    }

    const newBudgetData = {
      budget_name: formData.budgetName,
      amount: parseFloat(formData.amount),
    };

    try {
      await addBudget(newBudgetData); // Add to database
      onSave(newBudgetData); // Pass to parent
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add budget");
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
          Add New Budget
        </h2>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-blue-600 font-medium">
                Budget Name
              </label>
              <input
                type="text"
                name="budgetName"
                value={formData.budgetName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 mt-1"
                placeholder="Budget Name"
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

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
          >
            Add Budget
            <Plus size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
