import React, { useEffect, useState } from "react";
import { fetchBudgets } from "../../../store/budgetApi";
import { fetchExpenses } from "../../../store/expensesApi";
import BudgetCard from "./BudgetCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Existing Budgets Component
const BudgetCarousel = () => {
  const [budgets, setBudgets] = useState([]); // State to store budgets
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of the carousel
  const cardsPerPage = 3; // Number of cards you want to display per page

  useEffect(() => {
    // Fetch budget data from the backend API
    const fetchData = async () => {
      try {
        const budgetData = await fetchBudgets(); // Call the fetchBudgets function

        setBudgets(budgetData); // Set the budgets to state

        // Fetch expenses related to budgets
        const expensesData = await fetchExpenses();
        console.log("inside: ", expensesData);
        setExpenses(expensesData); // Set the expenses to state
      } catch (err) {
        setError(err.message); // Set error state if request fails
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchData();
  }, []);
  console.log("outside: ", expenses);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Function to go to the previous set of cards
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0
        ? prevIndex - cardsPerPage
        : Math.max(budgets.length - cardsPerPage, 0)
    );
  };

  // Function to go to the next set of cards
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < budgets.length - cardsPerPage ? prevIndex + cardsPerPage : 0
    );
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 place-content-evenly">
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
