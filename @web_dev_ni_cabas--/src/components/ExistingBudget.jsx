import React from 'react';

const ExistingBudget = ({ budgets, carouselIndex, handlePrevious, handleNext }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Existing Budgets
        <button className="ml-4 p-1 bg-green-500 text-white rounded-full">+</button>
      </h2>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          disabled={carouselIndex === 0}
        >
          <i className={`fas fa-chevron-left ${carouselIndex === 0 ? 'text-gray-300' : 'text-gray-600'}`}></i>
        </button>

        {/* Budget Cards Container */}
        <div className="flex gap-4 overflow-hidden px-8">
          {budgets.slice(carouselIndex, carouselIndex + 3).map((budget, index) => (
            <div 
              key={budget.id} 
              className="flex-shrink-0 w-1/3 p-4 bg-white rounded-lg shadow-md"
            >
              <h3 className="font-semibold mb-2">{budget.name}</h3>
              <p className="text-gray-600">Total: ${budget.total}</p>
              <p className="text-gray-600">Spent: ${budget.spent}</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(budget.spent / budget.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          disabled={carouselIndex >= budgets.length - 3}
        >
          <i className={`fas fa-chevron-right ${carouselIndex >= budgets.length - 3 ? 'text-gray-300' : 'text-gray-600'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default ExistingBudget;