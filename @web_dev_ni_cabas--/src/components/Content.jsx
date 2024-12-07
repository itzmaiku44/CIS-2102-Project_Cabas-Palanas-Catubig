import React, { useState } from 'react';
import ExistingBudget from './ExistingBudget';
import RecentExpenses from './RecentExpenses';

const Content = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const budgets = [
    { category: "Food", spent: 50, remaining: 50 },
    { category: "Travel", spent: 70, remaining: 30 },
    { category: "Shopping", spent: 40, remaining: 60 },
    { category: "Entertainment", spent: 80, remaining: 20 },
    { category: "Health", spent: 60, remaining: 40 },
  ];

  const handlePrevious = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? Math.ceil(budgets.length / 2) - 1 : prev - 1
    );

  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === Math.ceil(budgets.length / 2) - 1 ? 0 : prev + 1
    );
  };

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return (
          <>
            <ExistingBudget 
              budgets={budgets}
              carouselIndex={carouselIndex}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
            <RecentExpenses />
          </>
        );
      case 'expenses':
        return <RecentExpenses />;
      case 'budget':
        return <ExistingBudget 
          budgets={budgets}
          carouselIndex={carouselIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow bg-gray-100 p-6">
      <div className="text-2xl font-bold mb-6">
        Welcome, <span className="text-blue-500">John Doe</span>
      </div>
      {renderContent()}
    </div>
  );
};

export default Content; 






