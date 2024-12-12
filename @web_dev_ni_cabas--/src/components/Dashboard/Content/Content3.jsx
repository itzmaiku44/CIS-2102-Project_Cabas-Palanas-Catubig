import React, { useState } from 'react';

const Content3 = () => {
  // Updated budget data with new categories
  const budgets = [
    {
      id: 1,
      category: 'Food',
      amountSpent: 6000,
      budgeted: 10000,
      remaining: 4000,
      color: 'bg-blue-400'
    },
    {
      id: 2,
      category: 'Travel',
      amountSpent: 3000,
      budgeted: 5000,
      remaining: 2000,
      color: 'bg-orange-400'
    },
    {
      id: 3,
      category: 'Shopping',
      amountSpent: 2000,
      budgeted: 4000,
      remaining: 2000,
      color: 'bg-green-400'
    },
    {
      id: 4,
      category: 'Entertainment',
      amountSpent: 4000,
      budgeted: 8000,
      remaining: 4000,
      color: 'bg-purple-400'
    },
    {
      id: 5,
      category: 'Health',
      amountSpent: 1500,
      budgeted: 3000,
      remaining: 1500,
      color: 'bg-red-400'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Progress bar calculation
  const calculateProgress = (spent, total) => {
    return (spent / total) * 100;
  };

  const filteredBudgets = budgets.filter(budget =>
    budget.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Top Section - Budget Progress Bars */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {budgets.map(budget => (
          <div key={budget.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{budget.category}</h3>
            <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full ${budget.color}`}
                style={{ width: `${calculateProgress(budget.amountSpent, budget.budgeted)}%` }}
              >
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-medium">
                  [Amount Spent]
                </span>
              </div>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 font-medium">
                [Remaining] [Budgeted]
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section - Existing Budgets List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Existing Budgets</h2>
          <div className="flex items-center">
            <div className="relative mr-2">
              <input
                type="text"
                placeholder="Search budgets..."
                className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredBudgets.map((budget, index) => (
            <div
              key={budget.id}
              className={`flex justify-between items-center p-4 ${
                index % 2 === 1 ? 'bg-blue-600 text-white' : ''
              }`}
            >
              <span className="font-medium">[Category]</span>
              <div className="flex items-center space-x-4">
                <span>[Budget Money]</span>
                <button className="text-red-500 hover:text-red-700">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content3;
