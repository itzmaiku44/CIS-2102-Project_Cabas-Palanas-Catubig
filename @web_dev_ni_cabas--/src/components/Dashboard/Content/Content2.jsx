import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useCurrency } from '../../../context/CurrencyContext';
import { expensesData } from '../ExpensesTable';

ChartJS.register(ArcElement, Tooltip, Legend);

const Content2 = ({ budgets, modalHandlers, selectionHandlers }) => {
  const { currency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');

  // Use the shared expensesData directly
  const filteredExpenses = expensesData.filter(expense => 
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.budget.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total expenses per category for pie chart
  const expensesByCategory = expensesData.reduce((acc, expense) => {
    acc[expense.budget] = (acc[expense.budget] || 0) + expense.amount;
    return acc;
  }, {});

  // Pie chart data
  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FFD700', // Yellow for Food
          '#4CAF50', // Green for Travel
          '#2196F3', // Blue for Shopping
          '#FFA726', // Orange for Entertainment
          '#F44336', // Red for Health
        ],
      },
    ],
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Expenses by Category</h2>
          <div className="w-full h-[300px] flex items-center justify-center">
            <Pie 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Category Legend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Total Spent</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(expensesByCategory).map(([category, total], index) => (
              <div key={category} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full`} style={{ 
                  backgroundColor: chartData.datasets[0].backgroundColor[index] 
                }} />
                <span>{category}</span>
                <span className="font-bold">{currency.symbol}{total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses Table Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Expenses</h2>
            <button 
              onClick={() => modalHandlers.expense.add.setIsOpen(true)}
              className="ml-2 p-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
            >
              <i className="fas fa-plus text-sm"></i>
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search expenses..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Expenses</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Amount</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Date</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Budget</th>
                <th className="px-6 py-3 text-left text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4">{expense.name}</td>
                  <td className="px-6 py-4">{currency.symbol}{expense.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      {expense.budget}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        selectionHandlers.expense.setSelected(expense);
                        modalHandlers.expense.delete.setIsOpen(true);
                      }}
                      className="text-lg text-red-500 hover:opacity-75"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Content2.propTypes = {
  budgets: PropTypes.array.isRequired,
  modalHandlers: PropTypes.object.isRequired,
  selectionHandlers: PropTypes.object.isRequired,
};

export default Content2;