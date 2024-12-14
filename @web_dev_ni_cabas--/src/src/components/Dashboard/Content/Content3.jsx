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

  // Group budgets by category and sum their values
  const groupedBudgets = budgets.reduce((acc, budget) => {
    if (!acc[budget.category]) {
      acc[budget.category] = {
        id: budget.id,
        category: budget.category,
        budgeted: 0,
        amountSpent: 0,
        remaining: 0,
        color: budget.color
      };
    }
    acc[budget.category].budgeted += budget.budgeted;
    acc[budget.category].amountSpent += budget.amountSpent;
    acc[budget.category].remaining += budget.remaining;
    return acc;
  }, {});

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
      <h2 className="text-2xl font-bold mb-4">Budget Categories Overview</h2>

      {/* Top Section - Budget Progress Bars */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {Object.values(groupedBudgets).map(budget => (
          <div key={budget.category} className="bg-white p-3 rounded-lg shadow">
            <h3 className="text-md font-semibold mb-1">{budget.category}</h3>
            
            {/* Labels above the progress bar */}
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-gray-600">Amount Spent</span>
              <span className="text-xs font-medium text-gray-600">Remaining Budget</span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-6 bg-gray-200 rounded-md overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full ${budget.color}`}
                style={{ width: `${calculateProgress(budget.amountSpent, budget.budgeted)}%` }}
              >
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-sm font-medium">
                  ₱{budget.amountSpent.toLocaleString()}
                </span>
              </div>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 text-sm font-medium">
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
          {/* Add Table Headers */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 border-b">
            <div className="text-center font-semibold text-gray-600">Category</div>
            <div className="text-center font-semibold text-gray-600">Budget Money</div>
            <div className="text-center font-semibold text-gray-600"></div>
          </div>

          {/* Table Content */}
          {filteredBudgets.map((budget, index) => (
            <div
              key={budget.id}
              className={`grid grid-cols-3 gap-2 p-4 ${
                index % 2 === 1 ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-center font-medium">{budget.category}</span>
              <div className="text-center">₱{budget.budgeted.toLocaleString()}</div>
              <div className="flex items-center space-x-2 justify-center">
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
