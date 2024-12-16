import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from "../Sidebar";
import ExpensesTable from "./ExpensesTable";
import AddExpenseModal from "../../Modals/AddExpensesModal";
import { Search } from "lucide-react";
import { fetchExpenses } from "../../../store/expensesApi";
import { fetchBudgets } from "../../../store/budgetApi";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expensesByCategory, setExpensesByCategory] = useState({});
  
  // Currency configuration
  const currency = { symbol: '₱' };

  // Colors for the pie chart
  const chartColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
  ];

  useEffect(() => {
    const loadExpensesAndBudgets = async () => {
      try {
        const expensesData = await fetchExpenses();
        const budgetData = await fetchBudgets();
        setExpenses(expensesData);
        setBudgets(budgetData);
        setFilteredExpenses(expensesData);
        calculateExpensesByCategory(expensesData, budgetData);
      } catch (err) {
        console.error("Error loading data:", err.message);
      }
    };

    loadExpensesAndBudgets();
  }, []);

  // Calculate expenses by category
  const calculateExpensesByCategory = (expensesData, budgetData) => {
    const categoryTotals = {};
    
    expensesData.forEach(expense => {
      const budget = budgetData.find(b => b.id === expense.categoryId);
      const categoryName = budget ? budget.budget_name : 'Uncategorized';
      
      if (categoryTotals[categoryName]) {
        categoryTotals[categoryName] += expense.amount;
      } else {
        categoryTotals[categoryName] = expense.amount;
      }
    });

    setExpensesByCategory(categoryTotals);
  };

  // Prepare chart data
  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory),
      backgroundColor: chartColors.slice(0, Object.keys(expensesByCategory).length),
      borderWidth: 1
    }]
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense];
      setFilteredExpenses(updatedExpenses);
      return updatedExpenses;
    });
    setIsAddModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="w-full p-12 flex flex-col h-screen overflow-y-auto">
        {/* Pie Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Expenses by Category</h2>
            <div className="w-full h-[300px] flex items-center justify-center">
              <Pie 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Category Legend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Total Spent</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(expensesByCategory).map(([category, total], index) => (
                <div key={category} className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: chartColors[index] }} 
                  />
                  <span>{category}</span>
                  <span className="font-bold">
                    {currency.symbol}{total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Table Section */}
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
            />
          </div>
        </section>

        {/* Add Expense Modal */}
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
