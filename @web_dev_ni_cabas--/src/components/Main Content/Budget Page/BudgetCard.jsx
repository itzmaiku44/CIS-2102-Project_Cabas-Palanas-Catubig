import React, { useState } from "react";
import ViewDetailsModal from "../../Modals/ViewDetailsModal"; // Import the ExpenseModal component

const BudgetListCard = ({ budget, expenses }) => {
  const { budget_name, amount } = budget;
  const moneySpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  ); // Calculate total money spent
  const remainingBudget = amount - moneySpent;
  const spentPercentage = Math.min((moneySpent / amount) * 100, 100);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg w-96">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{budget_name}</span>
        <span className="font-medium">{formatCurrency(amount)}</span>
      </div>

      {/* Always show the progress bar, even if exceeded, but in red if exceeded */}
      <div className="w-full bg-gray-200 h-6 rounded-full mb-2">
        <div
          className={`h-full rounded-full ${
            moneySpent > amount ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{ width: `${spentPercentage}%` }}
        />
      </div>

      {/* Display money spent and remaining budget or Exceeded message */}
      {moneySpent <= amount ? (
        <div className="flex justify-between text-sm mb-2">
          <span>Money Spent: {formatCurrency(moneySpent)}</span>
          <span>Remaining Budget: {formatCurrency(remainingBudget)}</span>
        </div>
      ) : (
        <div className="text-red-500 font-semibold text-sm">Exceeded</div>
      )}

      {/* View Details button */}
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded w-full hover:bg-blue-600"
        onClick={openModal}
      >
        View Details
      </button>

      {/* Render Expense Modal */}
      <ViewDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        expenses={expenses}
      />
    </div>
  );
};

export default BudgetListCard;
