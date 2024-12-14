import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../utils/propTypes';
import { useBudgetStore } from '../../stores/budgetStore';
import { useCurrency } from '../../context/CurrencyContext';
import ViewDetailsModal from '../Modals/ViewDetailsModal';

const BudgetCarousel = ({ carouselIndex, setCarouselIndex }) => {
  const { currency } = useCurrency();
  const budgets = useBudgetStore((state) => state.budgets);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

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

  const handleViewDetails = (budget) => {
    setSelectedBudget({
      ...budget,
      budgetMoney: budget.budgeted,
      moneySpent: budget.amountSpent,
      remainingBudget: budget.remaining
    });
    setIsViewDetailsOpen(true);
  };

  return (
    <div className="relative flex items-center justify-center">
      <CarouselControl direction="left" onClick={handlePrevious} />
      <CarouselContent 
        budgets={budgets} 
        carouselIndex={carouselIndex} 
        onViewDetails={handleViewDetails}
      />
      <CarouselControl direction="right" onClick={handleNext} />

      {/* View Details Modal */}
      {isViewDetailsOpen && selectedBudget && (
        <ViewDetailsModal
          budget={selectedBudget}
          onClose={() => {
            setIsViewDetailsOpen(false);
            setSelectedBudget(null);
          }}
          currency={currency}
        />
      )}
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

const CarouselContent = ({ budgets, carouselIndex, onViewDetails }) => (
  <div className="overflow-hidden w-full m-10">
    <div
      className="flex transition-transform duration-300"
      style={{ transform: `translateX(-${carouselIndex * 50}%)` }}
    >
      {budgets.map((budget) => (
        <BudgetCard 
          key={budget.id} 
          budget={budget} 
          onViewDetails={() => onViewDetails(budget)}
        />
      ))}
    </div>
  </div>
);

const BudgetCard = ({ budget, onViewDetails }) => {
  const spentPercentage = (budget.amountSpent / budget.budgeted) * 100;
  const remainingPercentage = 100 - spentPercentage;

  return (
    <div className="w-1/2 px-2 flex-shrink-0">
      <div className="p-4 border rounded-lg shadow bg-white">
        <h3 className="font-semibold mb-2">Category: {budget.category}</h3>
        <div className="h-2 bg-gray-300 rounded mb-2">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${spentPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm">
          <span className="text-red-500 font-bold">{spentPercentage.toFixed(1)}%</span> spent,{" "}
          <span className="text-green-500">{remainingPercentage.toFixed(1)}% remaining</span>
        </p>
        <button 
          onClick={onViewDetails}
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const budgetShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  budgeted: PropTypes.number.isRequired,
  amountSpent: PropTypes.number.isRequired,
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
  onViewDetails: PropTypes.func.isRequired,
};

BudgetCard.propTypes = {
  budget: budgetShape.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default BudgetCarousel; 