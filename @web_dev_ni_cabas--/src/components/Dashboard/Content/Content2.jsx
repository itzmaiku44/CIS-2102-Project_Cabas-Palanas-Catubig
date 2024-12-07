import React, { useState } from 'react';

const Content2 = () => {
  // Sample data for pie chart (move to context later)
  const categories = [
    { name: 'Food & Dining', color: '#FFD700', percentage: 33 },  // Gold
    { name: 'Transportation', color: '#4169E1', percentage: 33 },  // Royal Blue
    { name: 'Entertainment', color: '#3CB371', percentage: 34 },  // Medium Sea Green
  ];

  // Sample expenses data (move to context later)
  const expenses = [
    { id: 1, name: 'Groceries', amount: 2500, date: '2024-03-15', budget: 'Food & Dining' },
    { id: 2, name: 'Bus Fare', amount: 1000, date: '2024-03-14', budget: 'Transportation' },
    { id: 3, name: 'Movie Night', amount: 800, date: '2024-03-13', budget: 'Entertainment' },
    { id: 4, name: 'Restaurant', amount: 1500, date: '2024-03-12', budget: 'Food & Dining' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.budget.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Pie Chart Section */}
      <div className="mb-8 flex">
        <div className="w-1/3">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {categories.reduce((acc, category, index) => {
                const previousPercentage = acc.previousPercentage || 0;
                const dashArray = `${category.percentage} 100`;
                const dashOffset = -previousPercentage;

                acc.elements.push(
                  <circle
                    key={category.name}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={category.color}
                    strokeWidth="20"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-500"
                  />
                );

                acc.previousPercentage = previousPercentage + category.percentage;
                return acc;
              }, { elements: [], previousPercentage: 0 }).elements}
            </svg>
          </div>
        </div>

        {/* Categories Legend */}
        <div className="w-2/3 grid grid-cols-3 gap-4 pt-8">
          {categories.map(category => (
            <div key={category.name} className="flex items-center">
              <div 
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: category.color }}
              ></div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Expenses</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search expenses..."
              className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="p-4">Expenses</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={expense.id} className={index % 2 === 1 ? 'bg-blue-600 text-white' : ''}>
                  <td className="p-4">{expense.name}</td>
                  <td className="p-4">₱{expense.amount.toLocaleString()}</td>
                  <td className="p-4">{expense.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full ${
                      index % 2 === 1 ? 'bg-red-500' : 'bg-blue-500 text-white'
                    }`}>
                      {expense.budget}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-red-500 hover:text-red-700">
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

export default Content2;