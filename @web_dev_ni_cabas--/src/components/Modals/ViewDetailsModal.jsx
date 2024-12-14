import React from 'react';
import PropTypes from 'prop-types';
import { useExpensesStore } from '../Dashboard/ExpensesTable';
import { useBudgetStore } from '../../stores/budgetStore';

const ViewDetailsModal = ({ budget, onClose }) => {
  const { expenses } = useExpensesStore();
  const { editBudget } = useBudgetStore();

  // Calculate total spent for this category from actual expenses
  const totalSpent = expenses
    .filter(expense => expense.budget === budget.category)
    .reduce((total, expense) => total + expense.amount, 0);

  // Calculate remaining based on actual spent
  const remaining = budget.budgetMoney - totalSpent;

  // Update the budget store with actual spent and remaining values
  React.useEffect(() => {
    editBudget({
      ...budget,
      amountSpent: totalSpent,
      remaining: remaining
    });
  }, [totalSpent, remaining]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">{budget.category} Details</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Budget Money:</p>
            <p className="text-xl font-semibold">₱{budget.budgetMoney.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-gray-600">Money Spent:</p>
            <p className="text-xl font-semibold">₱{totalSpent.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-gray-600">Remaining Budget:</p>
            <p className="text-xl font-semibold">₱{remaining.toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

ViewDetailsModal.propTypes = {
  budget: PropTypes.shape({
    category: PropTypes.string.isRequired,
    budgetMoney: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewDetailsModal; 
