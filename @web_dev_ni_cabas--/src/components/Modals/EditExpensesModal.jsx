import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditExpensesModal = ({ expense, budgets, onClose, onEdit }) => {
  const [expenseData, setExpenseData] = useState({
    name: '',
    amount: '',
    date: '',
    budget: '',
  });

  useEffect(() => {
    if (expense) {
      setExpenseData({
        name: expense.name,
        amount: expense.amount,
        date: expense.date,
        budget: expense.budget,
      });
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...expense,
      ...expenseData,
      amount: parseFloat(expenseData.amount),
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

          <h2 className="text-2xl font-bold text-blue-600 mb-4">Edit Expense</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Expense Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={expenseData.name}
                onChange={(e) => setExpenseData({ ...expenseData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={expenseData.amount}
                onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={expenseData.date}
                onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Budget Category</label>
              <select
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={expenseData.budget}
                onChange={(e) => setExpenseData({ ...expenseData, budget: e.target.value })}
                required
              >
                <option value="">Select a budget category</option>
                {budgets.map((budget) => (
                  <option key={budget.category} value={budget.category}>
                    {budget.category}
                  </option>
                ))}
              </select>
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

EditExpensesModal.propTypes = {
  expense: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
  }).isRequired,
  budgets: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditExpensesModal; 