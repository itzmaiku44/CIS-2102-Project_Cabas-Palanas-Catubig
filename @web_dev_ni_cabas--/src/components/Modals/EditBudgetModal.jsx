import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCurrency } from '../../context/CurrencyContext';

const EditBudgetModal = ({ budget, onClose, onEdit }) => {
  const { currency } = useCurrency();
  const [category, setCategory] = useState(budget.category);
  const [budgetAmount, setBudgetAmount] = useState(budget.budgetMoney);

  // Predefined categories
  const categories = [
    'Food',
    'Travel',
    'Shopping',
    'Entertainment',
    'Health'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...budget,
      category,
      budgetMoney: parseFloat(budgetAmount)
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-lg p-6 w-[400px] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <i className="fas fa-times"></i>
          </button>

          <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Budget</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Budget Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-600">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditBudgetModal; 