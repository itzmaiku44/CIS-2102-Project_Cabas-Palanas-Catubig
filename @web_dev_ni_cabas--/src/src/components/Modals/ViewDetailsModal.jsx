import React from 'react';
import PropTypes from 'prop-types';

const ViewDetailsModal = ({ budget, onClose, currency }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-lg p-6 w-[500px] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
          >
            <i className="fas fa-times"></i>
          </button>

          <h2 className="text-2xl font-bold text-blue-600 mb-4">Budget Details</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{budget.category}</h3>
              <div className="h-2 bg-gray-300 rounded mb-4">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${(budget.moneySpent / budget.budgetMoney) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-blue-600">
                  {currency.symbol}{budget.budgetMoney.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Money Spent</p>
                <p className="text-2xl font-bold text-red-500">
                  {currency.symbol}{budget.moneySpent.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Remaining Budget</p>
                <p className="text-2xl font-bold text-green-500">
                  {currency.symbol}{budget.remainingBudget.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Percentage Used</p>
                <p className="text-2xl font-bold text-blue-600">
                  {((budget.moneySpent / budget.budgetMoney) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ViewDetailsModal.propTypes = {
  budget: PropTypes.shape({
    category: PropTypes.string.isRequired,
    budgetMoney: PropTypes.number.isRequired,
    moneySpent: PropTypes.number.isRequired,
    remainingBudget: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewDetailsModal; 