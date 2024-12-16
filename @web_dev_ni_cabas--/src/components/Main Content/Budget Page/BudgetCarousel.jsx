import React, { useState } from "react";
import BudgetCard from "./BudgetCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BudgetCarousel = ({ budgets, expenses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3;

  // Function to go to the previous set of cards
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return Math.floor(budgets.length / cardsPerPage) * cardsPerPage;
      } else {
        return prevIndex - cardsPerPage;
      }
    });
  };

  // Function to go to the next set of cards
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex < budgets.length - cardsPerPage
        ? prevIndex + cardsPerPage
        : 0;
    });
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto pb-4 place-content-evenly"
          style={{ scrollBehavior: "smooth" }}
        >
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-4">
            {budgets
              .slice(currentIndex, currentIndex + cardsPerPage)
              .map((budget, index) => (
                <BudgetCard
                  key={index}
                  budget={budget}
                  expenses={expenses.filter(
                    (exp) => exp.categoryId === budget.id
                  )}
                />
              ))}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetCarousel;
