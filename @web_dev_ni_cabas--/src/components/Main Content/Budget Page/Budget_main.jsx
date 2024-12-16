import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import BudgetTable from "./BudgetTable";
import BudgetCarousel from "./BudgetCarousel";
import AddBudgetModal from "../../Modals/AddBudgetModal";
import { Search } from "lucide-react";
import { fetchBudgets } from "../../../store/budgetApi";
import { fetchExpenses } from "../../../store/expensesApi"; // Import fetchExpenses API function

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]); // State for expenses
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadBudgetsAndExpenses = async () => {
      try {
        const [budgetData, expenseData] = await Promise.all([
          fetchBudgets(),
          fetchExpenses(), // Fetch expenses
        ]);
        setBudgets(budgetData);
        setFilteredBudgets(budgetData);
        setExpenses(expenseData); // Store fetched expenses
      } catch (err) {
        console.error("Error loading data:", err.message);
      }
    };

    loadBudgetsAndExpenses();
  }, []);

  useEffect(() => {
    // Filter budgets based on the search term
    if (searchTerm) {
      setFilteredBudgets(
        budgets.filter((budget) =>
          budget.budget_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredBudgets(budgets);
    }
  }, [searchTerm, budgets]);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddBudget = (newBudget) => {
    setBudgets((prevBudgets) => {
      const updatedBudgets = [...prevBudgets, newBudget];
      setFilteredBudgets(updatedBudgets); // Update filteredBudgets here
      return updatedBudgets;
    });
    setIsAddModalOpen(false); // Close modal after adding
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (budget) => {
    setBudgets(budgets.filter((b) => b.id !== budget.id));
  };

  const handleSave = (updatedBudget) => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === updatedBudget.id ? updatedBudget : budget
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      {/* Main Content */}
      <div className="w-full p-12 flex flex-col h-screen mt-4">
        {/* Pass budgets and expenses to the BudgetCarousel */}
        <BudgetCarousel budgets={budgets} expenses={expenses} />

        {/* Budget Table Section */}
        <section className="w-full flex-1 min-h-0">
          <div>
            {/* Flex container for Budgets Title and Add Button */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Budgets</h2>
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
                  placeholder="Search budget name..."
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="h-[calc(100%-2rem)]">
            <BudgetTable
              budgets={filteredBudgets}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          </div>
        </section>
      </div>

      {/* Add Budget Modal */}
      {isAddModalOpen && (
        <AddBudgetModal
          onClose={handleCloseAddModal}
          onSave={handleAddBudget}
        />
      )}
    </div>
  );
};

export default Budgets;
