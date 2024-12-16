import React, { useState, useEffect } from "react";
import ErrorMessage from "../shared/ErrorMessage";
import { updateBudget } from "../../store/budgetApi";

const EditBudgetModal = ({ budget, onClose, onSave }) => {
  const [budgetData, setBudgetData] = useState({
    budget_name: budget.budget_name,
    amount: budget.amount,
  });

  const [errors, setErrors] = useState({
    budget_name: "",
    amount: "",
  });

  useEffect(() => {
    setBudgetData({
      budget_name: budget.budget_name,
      amount: budget.amount,
    });
  }, [budget]);

  const validateFields = () => {
    const newErrors = {};

    if (!budgetData.budget_name.trim()) {
      newErrors.budget_name = "Budget name is required.";
    } else if (budgetData.budget_name.length < 3) {
      newErrors.budget_name = "Budget name must be at least 3 characters.";
    }

    if (!budgetData.amount) {
      newErrors.amount = "Budget amount is required.";
    } else if (budgetData.amount <= 0) {
      newErrors.amount = "Budget amount must be greater than zero.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const updatedBudget = {
          id: budget.id, // Use the budget ID to identify the item to update
          budget_name: budgetData.budget_name,
          amount: parseFloat(budgetData.amount),
        };

        // Call updateBudget and pass the updated budget data
        await updateBudget(budget.id, updatedBudget);

        // Call onSave to notify the parent component of the update
        onSave(updatedBudget);

        // Close the modal after successful update
        onClose();
      } catch (err) {
        console.error("Error updating budget:", err.message);
        // Optionally, you can set an error state here to display a message to the user
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg p-6 w-[400px] relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
          >
            <i className="fas fa-times"></i>
          </button>

          <h2 className="text-2xl font-bold text-blue-600 mb-4">Edit Budget</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Budget Name */}
            <div>
              <label className="block text-gray-700 mb-2">Budget Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={budgetData.budget_name}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, budget_name: e.target.value })
                }
              />
              <ErrorMessage message={errors.budget_name} />
            </div>

            {/* Budget Amount */}
            <div>
              <label className="block text-gray-700 mb-2">Budget Amount</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full pl-2 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={budgetData.amount}
                  onChange={(e) =>
                    setBudgetData({ ...budgetData, amount: e.target.value })
                  }
                  min="0"
                  step="0.01"
                />
              </div>
              <ErrorMessage message={errors.amount} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBudgetModal;
