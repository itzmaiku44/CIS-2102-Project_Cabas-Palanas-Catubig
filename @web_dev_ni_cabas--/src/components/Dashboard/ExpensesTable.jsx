import React from 'react';
import PropTypes from 'prop-types';

const ExpensesTable = () => {
  const expenses = [
    { name: 'Groceries', amount: 150.00, date: '2024-03-15', budget: 'Food' },
    { name: 'Gas', amount: 45.00, date: '2024-03-14', budget: 'Travel' },
    // Add more sample data as needed
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Recent Expenses
        <button className="ml-4 p-1 bg-green-500 text-white rounded-full">+</button>
      </h2>
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

ExpensesTable.defaultProps = {
  expenses: [],
};

export default ExpensesTable; 