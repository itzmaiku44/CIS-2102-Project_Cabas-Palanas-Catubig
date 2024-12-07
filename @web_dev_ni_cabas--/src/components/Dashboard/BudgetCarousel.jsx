import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../utils/propTypes';

const BudgetCarousel = ({ carouselIndex, setCarouselIndex }) => {
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

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Existing Budgets
        <button className="ml-4 p-1 bg-green-500 text-white rounded-full">+</button>
      </h2>
      <div className="relative flex items-center justify-center">
        <CarouselControl direction="left" onClick={handlePrevious} />
        <CarouselContent budgets={budgets} carouselIndex={carouselIndex} />
        <CarouselControl direction="right" onClick={handleNext} />
      </div>
    </div>
  );
};

const CarouselControl = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="absolute z-10 p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300"
    style={{ [direction]: 0 }}
  >
    <i className={`fas fa-chevron-${direction}`}></i>
  </button>
);

const CarouselContent = ({ budgets, carouselIndex }) => (
  <div className="overflow-hidden w-full m-10">
    <div
      className="flex transition-transform duration-300"
      style={{ transform: `translateX(-${carouselIndex * 50}%)` }}
    >
      {budgets.map((budget, index) => (
        <BudgetCard key={index} budget={budget} />
      ))}
    </div>
  </div>
);

const BudgetCard = ({ budget }) => (
  <div className="w-1/2 px-2 flex-shrink-0">
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="font-semibold mb-2">Category: {budget.category}</h3>
      <div className="h-2 bg-gray-300 rounded mb-2">
        <div
          className="h-full bg-blue-500 rounded"
          style={{ width: `${budget.spent}%` }}
        ></div>
      </div>
      <p className="text-sm">
        <span className="text-red-500 font-bold">{budget.spent}%</span> spent,{" "}
        <span className="text-green-500">{budget.remaining}% remaining</span>
      </p>
      <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded">
        View Details
      </button>
    </div>
  </div>
);

const budgetShape = PropTypes.shape({
  category: PropTypes.string.isRequired,
  spent: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
});

BudgetCarousel.propTypes = {
  carouselIndex: PropTypes.number.isRequired,
  setCarouselIndex: PropTypes.func.isRequired,
};

CarouselControl.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
};

CarouselContent.propTypes = {
  budgets: PropTypes.arrayOf(budgetShape).isRequired,
  carouselIndex: PropTypes.number.isRequired,
};

BudgetCard.propTypes = {
  budget: CustomPropTypes.budget.isRequired,
};

export default BudgetCarousel; 