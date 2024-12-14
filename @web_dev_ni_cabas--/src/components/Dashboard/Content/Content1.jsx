import React, { useState } from 'react';
import WelcomeSection from '../WelcomeSection';
import BudgetCarousel from '../BudgetCarousel';
import ExpensesTable from '../ExpensesTable';
import AddExpensesModal from '../../Modals/AddExpensesModal';
import AddBudgetModal from '../../Modals/AddBudgetModal';
import { useBudgetStore } from '../../../stores/budgetStore';
import { useExpensesStore } from '../ExpensesTable';

const Content1 = ({ profileData }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  
  const { budgets, addBudget } = useBudgetStore();
  const { addExpense } = useExpensesStore();

  const handleAddBudget = (newBudget) => {
    addBudget(newBudget);
    setIsAddBudgetModalOpen(false);
  };

  const handleAddExpense = (newExpense) => {
    addExpense({
      ...newExpense,
      date: new Date(newExpense.date).toISOString().split('T')[0]
    });
    setIsAddExpenseModalOpen(false);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Welcome Section */}
      <WelcomeSection userName={profileData.name} />

      {/* Existing Budgets Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">Existing Budgets</h2>
          <button 
            onClick={() => setIsAddBudgetModalOpen(true)}
            className="ml-2 p-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
          >
            <i className="fas fa-plus text-sm"></i>
          </button>
        </div>
        <BudgetCarousel 
          carouselIndex={carouselIndex}
          setCarouselIndex={setCarouselIndex}
        />
      </div>

      {/* Recent Expenses Section */}
      <div>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Expenses</h2>
          <button 
            onClick={() => setIsAddExpenseModalOpen(true)}
            className="ml-2 p-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
          >
            <i className="fas fa-plus text-sm"></i>
          </button>
        </div>
        <ExpensesTable />
      </div>

      {/* Add Budget Modal */}
      {isAddBudgetModalOpen && (
        <AddBudgetModal
          onClose={() => setIsAddBudgetModalOpen(false)}
          onAdd={handleAddBudget}
        />
      )}

      {/* Add Expense Modal */}
      {isAddExpenseModalOpen && (
        <AddExpensesModal
          onClose={() => setIsAddExpenseModalOpen(false)}
          onAdd={handleAddExpense}
          budgets={budgets}
        />
      )}
    </div>
  );
};

export default Content1;