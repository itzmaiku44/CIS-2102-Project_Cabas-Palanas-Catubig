import React from 'react';
import PropTypes from 'prop-types';

// Move the sample data to a shared location (could be in a context or parent component)
export const expensesData = [
  { name: 'Groceries', amount: 150.00, date: '2024-03-15', budget: 'Food' },
  { name: 'Gas', amount: 45.00, date: '2024-03-14', budget: 'Travel' },
  { name: 'Restaurant', amount: 85.00, date: '2024-03-13', budget: 'Food' },
  { name: 'Movies', amount: 30.00, date: '2024-03-12', budget: 'Entertainment' },
  { name: 'Shopping', amount: 200.00, date: '2024-03-11', budget: 'Shopping' }
];

const ExpensesTable = ({ expenses = expensesData }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <button className="ml-2 p-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600">
            <i className="fas fa-plus text-sm"></i>
          </button>
        </div>
      </div>
      <table className="w-full bg-white shadow rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-4">Expense</th>
            <th className="text-left p-4">Amount</th>
            <th className="text-left p-4">Date</th>
            <th className="text-left p-4">Budget</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{expense.name}</td>
              <td className="p-4">${expense.amount.toFixed(2)}</td>
              <td className="p-4">{expense.date}</td>
              <td className="p-4">
                <span className="bg-blue-500 text-white py-1 px-3 rounded-md">
                  {expense.budget}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const expenseShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(expenseShape),
};

export default ExpensesTable; 