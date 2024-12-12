import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBudgetModal = ({ onClose, onAdd }) => {
  const [budgetData, setBudgetData] = useState({
    category: '',
    budgetMoney: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...budgetData,
      budgetMoney: parseFloat(budgetData.budgetMoney),
      moneySpent: 0,
      remainingBudget: parseFloat(budgetData.budgetMoney)
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

          <h2 className="text-2xl font-bold text-blue-600 mb-4">Add New Budget</h2>
          
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
              Add Budget
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

AddBudgetModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddBudgetModal; 