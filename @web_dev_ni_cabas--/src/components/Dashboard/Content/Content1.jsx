import React, { useState } from 'react';
import WelcomeSection from '../WelcomeSection';
import BudgetCarousel from '../BudgetCarousel';
import ExpensesTable from '../ExpensesTable';

const Content1 = ({ profileData }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Sample budgets data (move to context later)
  const budgets = [
    {
      category: "Food & Dining",
      budgetMoney: 10000,
      moneySpent: 6000,
      remainingBudget: 4000,
    },
    {
      category: "Transportation",
      budgetMoney: 5000,
      moneySpent: 2000,
      remainingBudget: 3000,
    },
    // Add more budget categories as needed
  ];

  // Sample expenses data (move to context later)
  const expenses = [
    { name: 'Groceries', amount: 2500, date: '2024-03-15', budget: 'Food & Dining' },
    { name: 'Gas', amount: 1000, date: '2024-03-14', budget: 'Transportation' },
    { name: 'Restaurant', amount: 1500, date: '2024-03-13', budget: 'Food & Dining' },
    { name: 'Taxi', amount: 500, date: '2024-03-12', budget: 'Transportation' },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Welcome Section */}
      <WelcomeSection userName={profileData.name} />

      {/* Existing Budgets Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
        </div>
        
        {/* Budget Carousel */}
        <div className="relative">
          <BudgetCarousel 
            carouselIndex={carouselIndex}
            setCarouselIndex={setCarouselIndex}
          />
        </div>
      </div>

      {/* Recent Expenses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recent Expenses</h2>
          <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        
        {/* Expenses Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">Expenses</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Budget</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index} className={index % 2 === 1 ? 'bg-blue-600 text-white' : ''}>
                  <td className="p-4">{expense.name}</td>
                  <td className="p-4">₱{expense.amount.toLocaleString()}</td>
                  <td className="p-4">{expense.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full ${
                      index % 2 === 1 ? 'bg-amber-600' : 'bg-blue-500 text-white'
                    }`}>
                      {expense.budget}
                    </span>
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

export default Content1;
