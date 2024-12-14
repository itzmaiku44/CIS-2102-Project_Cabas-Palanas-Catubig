import React, { useState } from 'react';
import { useBudgetStore } from '../../../stores/budgetStore';
import AddBudgetModal from '../../Modals/AddBudgetModal';
import EditBudgetModal from '../../Modals/EditBudgetModal';
import DeleteBudgetModal from '../../Modals/DeleteBudgetModal';

const Content3 = () => {
  const { budgets, addBudget, editBudget, deleteBudget } = useBudgetStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  // Progress bar calculation
  const calculateProgress = (spent, total) => {
    return (spent / total) * 100;
  };

  const filteredBudgets = budgets.filter(budget =>
    budget.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (newBudget) => {
    addBudget(newBudget);
    setIsAddModalOpen(false);
  };

  const handleEdit = (updatedBudget) => {
    editBudget(updatedBudget);
    setIsEditModalOpen(false);
    setSelectedBudget(null);
  };

  const handleDelete = (budget) => {
    deleteBudget(budget.id);
    setIsDeleteModalOpen(false);
    setSelectedBudget(null);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Title for Budget Progress Bars */}
      <h2 className="text-2xl font-bold mb-6">Budget Categories Overview</h2>

      {/* Top Section - Budget Progress Bars */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {budgets.map(budget => (
          <div key={budget.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{budget.category}</h3>
            <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full ${budget.color}`}
                style={{ width: `${calculateProgress(budget.amountSpent, budget.budgeted)}%` }}
              >
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white font-medium">
                  ₱{budget.amountSpent.toLocaleString()}
                </span>
              </div>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 font-medium">
                ₱{budget.remaining.toLocaleString()} / ₱{budget.budgeted.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section - Existing Budgets List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Existing Budgets</h2>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="ml-2 p-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
            >
              <i className="fas fa-plus text-sm"></i>
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search budgets..."
              className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredBudgets.map((budget, index) => (
            <div
              key={budget.id}
              className={`flex justify-between items-center p-4 ${
                index % 2 === 1 ? 'bg-gray-50' : ''
              }`}
            >
              <span className="font-medium">{budget.category}</span>
              <div className="flex items-center space-x-4">
                <span>₱{budget.budgeted.toLocaleString()}</span>
                <button 
                  onClick={() => {
                    setSelectedBudget(budget);
                    setIsEditModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => {
                    setSelectedBudget(budget);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddBudgetModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAdd}
        />
      )}

      {isEditModalOpen && selectedBudget && (
        <EditBudgetModal
          budget={selectedBudget}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBudget(null);
          }}
          onEdit={handleEdit}
        />
      )}

      {isDeleteModalOpen && selectedBudget && (
        <DeleteBudgetModal
          budget={selectedBudget}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedBudget(null);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Content3;
