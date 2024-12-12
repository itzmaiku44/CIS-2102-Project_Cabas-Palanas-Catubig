import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditBudgetModal = ({ budget, onClose, onEdit }) => {
  const [budgetData, setBudgetData] = useState({
    category: '',
    budgetMoney: '',
  });

  useEffect(() => {
    if (budget) {
      setBudgetData({
        category: budget.category,
        budgetMoney: budget.budgetMoney,
      });
    }
  }, [budget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...budget,
      ...budgetData,
      budgetMoney: parseFloat(budgetData.budgetMoney),
      remainingBudget: parseFloat(budgetData.budgetMoney) - budget.moneySpent
    });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-lg p-6 w-[400px] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
          >
            <i className="fas fa-times"></i>
          </button>

          <h2 className="text-2xl font-bold text-blue-600 mb-4">Edit Budget</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={budgetData.category}
                onChange={(e) => setBudgetData({ ...budgetData, category: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Budget Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={budgetData.budgetMoney}
                onChange={(e) => setBudgetData({ ...budgetData, budgetMoney: e.target.value })}
                min="0"
                required
              />
            </div>

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

EditBudgetModal.propTypes = {
  budget: PropTypes.shape({
    category: PropTypes.string.isRequired,
    budgetMoney: PropTypes.number.isRequired,
    moneySpent: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditBudgetModal; 