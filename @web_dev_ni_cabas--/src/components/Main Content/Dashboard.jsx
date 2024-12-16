import React, { useEffect, useState } from "react";
import BudgetCarousel from "./Budget Page/BudgetCarousel";
import ExpensesTable from "./Expense Page/ExpensesTable";
import Sidebar from "./Sidebar";
import useAuthStore from "../../store/authStore";
import { fetchExpenses } from "../../store/expensesApi";
import { fetchBudgets } from "../../store/budgetApi";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  console.log("User data in Dashboard:", user);

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        try {
          // Fetch expenses and budgets
          const expensesData = await fetchExpenses();
          const budgetsData = await fetchBudgets();

          setExpenses(expensesData);
          setBudgets(budgetsData);
          setFilteredExpenses(expensesData);
          setIsLoading(false);
        } catch (err) {
          console.error("Error loading data:", err.message);
          setIsLoading(false); // Stop loading if there's an error
        }
      };

      loadData();
    }
  }, [user]);

  const handleExpenseUpdate = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      {/* Main Content */}
      <div className="w-full p-12 flex flex-col h-screen">
        {/* Fixed Content Section */}
        <div>
          {/* Header */}
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

          {/* Existing Budgets Section */}
          <section className="w-full mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">Existing Budgets</h2>
            </div>
            <BudgetCarousel budgets={budgets} expenses={expenses} />
          </section>
        </div>

        {/* Recent Expenses Section - Fills remaining space */}
        <section className="w-full flex-1 min-h-0">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Recent Expenses</h2>
          </div>
          <div className="h-[calc(100%-2rem)]">
            <ExpensesTable expenses={filteredExpenses} budgets={budgets} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
