import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import EditBudgetModal from "../../Modals/EditBudgetModal";
import DeleteBudgetModal from "../../Modals/DeleteBudgetModal";

const BudgetTable = ({ budgets, searchTerm, onDelete, onSave }) => {
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);

  useEffect(() => {
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

  const openEditModal = (budget) => {
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBudget(null);
  };

  const handleSave = (updatedBudget) => {
    onSave(updatedBudget);
    closeModal();
  };

  const openDeleteModal = (e, budget) => {
    e.stopPropagation();
    setBudgetToDelete(budget);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBudgetToDelete(null);
  };

  const handleDelete = (budget) => {
    onDelete(budget);
    closeDeleteModal();
  };

  return (
    <div className="relative">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/2 pb-2 pl-16 text-left">Name</th>
            <th className="w-1/4 pb-2 text-right pr-8">Amount</th>
            <th className="w-1/4 pb-2 text-center">Actions</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto" style={{ height: "300px" }}>
        <table className="w-full table-fixed">
          <tbody>
            {filteredBudgets.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No budgets found
                </td>
              </tr>
            ) : (
              filteredBudgets.map((budget, index) => (
                <tr
                  key={budget.id}
                  onClick={() => openEditModal(budget)}
                  className={`h-12 cursor-pointer hover:opacity-80 transition ${
                    index % 2 === 1 ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  <td className="w-1/2 py-2 pl-16 font-medium">
                    {budget.budget_name}
                  </td>
                  <td className="w-1/4 py-2 pr-8 font-medium text-right">
                    ₱{budget.amount.toFixed(2)}
                  </td>
                  <td className="w-1/4 py-2">
                    <div className="flex justify-center items-center">
                      <button
                        className="bg-red-500 p-1.5 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={(e) => openDeleteModal(e, budget)}
                      >
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedBudget && (
        <EditBudgetModal
          budget={selectedBudget}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {isDeleteModalOpen && budgetToDelete && (
        <DeleteBudgetModal
          budget={budgetToDelete}
          onDelete={handleDelete}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default BudgetTable;
