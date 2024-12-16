import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../Sidebar";
import ExpensesTable from "./ExpensesTable";
import AddExpenseModal from "../../Modals/AddExpensesModal";
import PieChart from "./ExpensesChart";
import { Search } from "lucide-react";
import { fetchExpenses } from "../../../store/expensesApi";
import { fetchBudgets } from "../../../store/budgetApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expensesByCategory, setExpensesByCategory] = useState({});

  const currency = { symbol: "₱" };
  const baseColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledColors = shuffleArray(baseColors);

  const getChartColors = (categoryCount) => {
    const repeatedColors = [];
    while (repeatedColors.length < categoryCount) {
      repeatedColors.push(...shuffledColors);
    }
    return repeatedColors.slice(0, categoryCount);
  };

  // Move calculateExpensesByCategory outside useEffect so we can reuse it
  const calculateExpensesByCategory = (expensesData, budgetData) => {
    const categoryTotals = {};
    expensesData.forEach((expense) => {
      const budget = budgetData.find((b) => b.id === expense.categoryId);
      const categoryName = budget ? budget.budget_name : "Uncategorized";
      categoryTotals[categoryName] =
        (categoryTotals[categoryName] || 0) + expense.amount;
    });
    return categoryTotals;
  };

  // Effect to load initial data
  useEffect(() => {
    const loadExpensesAndBudgets = async () => {
      try {
        const expensesData = await fetchExpenses();
        const budgetData = await fetchBudgets();
        setExpenses(expensesData);
        setBudgets(budgetData);
        setFilteredExpenses(expensesData);
        const categoryTotals = calculateExpensesByCategory(
          expensesData,
          budgetData
        );
        setExpensesByCategory(categoryTotals);
      } catch (err) {
        console.error("Error loading data:", err.message);
      }
    };

    loadExpensesAndBudgets();
  }, []);

  // Effect to update chart when expenses change
  useEffect(() => {
    const categoryTotals = calculateExpensesByCategory(expenses, budgets);
    setExpensesByCategory(categoryTotals);
  }, [expenses, budgets]);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setFilteredExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (deletedExpenseId) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((exp) => exp.id !== deletedExpenseId)
    );
    setFilteredExpenses((prevExpenses) =>
      prevExpenses.filter((exp) => exp.id !== deletedExpenseId)
    );
  };

  const handleSave = (updatedExpense) => {
    // Update the expense in the local state
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setFilteredExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );

    // Recalculate the expenses by category
    const categoryTotals = calculateExpensesByCategory(expenses, budgets);
    setExpensesByCategory(categoryTotals);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: getChartColors(Object.keys(expensesByCategory).length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="w-full p-12 flex flex-col h-screen overflow-y-auto">
        <PieChart
          chartData={chartData}
          expensesByCategory={expensesByCategory}
          chartColors={getChartColors(Object.keys(expensesByCategory).length)}
          currency={currency}
        />

        <section className="w-full flex-1 min-h-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Expenses</h2>
                <button
                  onClick={handleOpenAddModal}
                  className="flex items-center justify-center bg-green-500 text-white w-6 h-6 rounded-full hover:bg-green-600 transition duration-200 leading-none"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>

              <div className="relative flex items-center">
                <Search size={20} className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search expense name..."
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="h-[calc(100%-2rem)]">
            <ExpensesTable
              expenses={filteredExpenses}
              budgets={budgets}
              searchTerm={searchTerm}
              onDeleteExpense={handleDeleteExpense}
              onSave={handleSave}
            />
          </div>
        </section>

        {isAddModalOpen && (
          <AddExpenseModal
            onClose={handleCloseAddModal}
            onSave={handleAddExpense}
          />
        )}
      </div>
    </div>
  );
};

export default Expenses;
