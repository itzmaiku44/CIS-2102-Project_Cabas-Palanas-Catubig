import React, { useEffect, useState } from "react";
import { deleteExpense } from "../../../store/expensesApi";
import { Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import EditExpenseModal from "../../Modals/EditExpensesModal";
import DeleteExpenseModal from "../../Modals/DeleteExpenseModal";

const ExpensesTable = ({
  expenses,
  budgets,
  searchTerm,
  onDeleteExpense,
  onSave,
}) => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const location = useLocation();

  useEffect(() => {
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

  const openEditModal = (expense) => {
    const budget = budgets.find((b) => b.id === expense.categoryId);
    setSelectedExpense({
      ...expense,
      budgetName: budget?.budget_name || "No Category",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleSave = (updatedBudget) => {
    onSave(updatedBudget);
    closeModal();
  };

  const openDeleteModal = (e, expense) => {
    e.stopPropagation();
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  const handleDelete = async (expense) => {
    try {
      await deleteExpense(expense.id);
      setFilteredExpenses((prevExpenses) =>
        prevExpenses.filter((exp) => exp.id !== expense.id)
      );
      onDeleteExpense(expense.id);
      closeDeleteModal();
    } catch (err) {
      setError("Failed to delete expense");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const tableClasses = "w-full table-fixed border-separate border-spacing-0";
  const commonCellClasses = "py-2 font-medium";

  return (
    <div className="relative">
      {/* Fixed header */}
      <table className={tableClasses}>
        <colgroup>
          <col className="w-[25%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
          <col className="w-[35%]" />
        </colgroup>
        <thead className="bg-white">
          <tr>
            <th className={`${commonCellClasses} text-left pl-16`}>Expenses</th>
            <th className={`${commonCellClasses} text-right pr-16`}>Amount</th>
            <th className={`${commonCellClasses} text-right pr-16`}>Date</th>
            <th className={`${commonCellClasses} text-left pl-4`}>
              Budget Category
            </th>
          </tr>
        </thead>
      </table>

      {/* Scrollable body */}
      <div className="overflow-y-auto" style={{ height: "300px" }}>
        <table className={tableClasses}>
          <colgroup>
            <col className="w-[25%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[35%]" />
          </colgroup>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No expenses found
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense, index) => {
                const budget = budgets.find(
                  (budget) => budget.id === expense.categoryId
                );

                return (
                  <tr
                    key={expense.id}
                    onClick={
                      location.pathname === "/expenses"
                        ? () => openEditModal(expense)
                        : null
                    }
                    className={`cursor-pointer hover:opacity-80 ${
                      index % 2 === 1 ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    <td className={`${commonCellClasses} pl-16`}>
                      {expense.expense_name}
                    </td>
                    <td className={`${commonCellClasses} text-right pr-16`}>
                      ₱{expense.amount.toFixed(2)}
                    </td>
                    <td className={`${commonCellClasses} text-right pr-16`}>
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                    <td className={`${commonCellClasses} pl-4`}>
                      <div className="flex justify-between items-center">
                        <span
                          className={`px-3 py-1 rounded-full ${
                            index % 2 === 1
                              ? "bg-white text-blue-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {budget?.budget_name || "No Category"}
                        </span>
                        {location.pathname === "/expenses" && (
                          <button
                            className="bg-red-500 p-1.5 rounded-lg hover:bg-red-600 transition-colors mr-4"
                            onClick={(e) => openDeleteModal(e, expense)}
                          >
                            <Trash2 size={16} className="text-white" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <EditExpenseModal
          expense={selectedExpense}
          budgets={budgets}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {isDeleteModalOpen && expenseToDelete && (
        <DeleteExpenseModal
          expense={expenseToDelete}
          onDelete={handleDelete}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default ExpensesTable;
