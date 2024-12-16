import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import ExpensesTable from "./ExpensesTable";
import AddExpenseModal from "../../Modals/AddExpensesModal";
import { Search } from "lucide-react";
import { fetchExpenses } from "../../../store/expensesApi";
import { fetchBudgets } from "../../../store/budgetApi";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadExpensesAndBudgets = async () => {
      try {
        const expensesData = await fetchExpenses();
        const budgetData = await fetchBudgets();
        setExpenses(expensesData);
        setBudgets(budgetData);
        setFilteredExpenses(expensesData);
      } catch (err) {
        console.error("Error loading data:", err.message);
      }
    };

    loadExpensesAndBudgets();
  }, []);

  useEffect(() => {
    // Filter expenses based on the search term
    if (searchTerm) {
      setFilteredExpenses(
        expenses.filter((expense) =>
          expense.expense_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredExpenses(expenses);
    }
  }, [searchTerm, expenses]);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense];
      setFilteredExpenses(updatedExpenses); // Update filteredExpenses here
      return updatedExpenses;
    });
    setIsAddModalOpen(false); // Close modal after adding
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      {/* Main Content */}
      <div className="w-full p-12 flex flex-col h-screen">
        {/* Expense Table Section */}
        <section className="w-full flex-1 min-h-0">
          <div>
            {/* Flex container for Expenses Title and Add Button */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Expenses</h2>
                {/* Add Button with Plus sign in a green circle */}
                <button
                  onClick={handleOpenAddModal}
                  className="flex items-center justify-center bg-green-500 text-white w-6 h-6 rounded-full hover:bg-green-600 transition duration-200 leading-none"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>

              {/* Flex container for Search Input */}
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
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <AddExpenseModal
          onClose={handleCloseAddModal}
          onSave={handleAddExpense}
        />
      )}
    </div>
  );
};

export default Expenses;
