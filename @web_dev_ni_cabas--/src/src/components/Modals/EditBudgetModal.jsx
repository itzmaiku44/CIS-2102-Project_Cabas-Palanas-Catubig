import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCurrency } from '../../context/CurrencyContext';

const EditBudgetModal = ({ budget, onClose, onEdit }) => {
  const { currency } = useCurrency();
  const [budgetData, setBudgetData] = useState({
    category: budget.category,
    budgeted: budget.budgeted,
  });

  // Predefined categories
  const categories = [
    'Food',
    'Travel',
    'Shopping',
    'Entertainment',
    'Health'
  ];

  useEffect(() => {
    setBudgetData({
      category: budget.category,
      budgeted: budget.budgeted,
    });
  }, [budget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...budget,
      ...budgetData,
      budgeted: parseFloat(budgetData.budgeted),
      amountSpent: budget.amountSpent,
      remaining: parseFloat(budgetData.budgeted) - budget.amountSpent
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
              <select
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={budgetData.category}
                onChange={(e) => setBudgetData({ ...budgetData, category: e.target.value })}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Budget Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-600">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={budgetData.budgeted}
                  onChange={(e) => setBudgetData({ ...budgetData, budgeted: e.target.value })}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
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
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    budgeted: PropTypes.number.isRequired,
    amountSpent: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditBudgetModal; 