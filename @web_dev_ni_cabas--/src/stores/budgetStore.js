import { create } from 'zustand';

export const useBudgetStore = create((set) => ({
  budgets: [
    {
      id: 1,
      category: 'Food',
      budgeted: 10000,
      amountSpent: 6000,
      remaining: 4000,
      color: 'bg-blue-400'
    },
    {
      id: 2,
      category: 'Travel',
      budgeted: 5000,
      amountSpent: 3000,
      remaining: 2000,
      color: 'bg-orange-400'
    },
    {
      id: 3,
      category: 'Shopping',
      budgeted: 4000,
      amountSpent: 2000,
      remaining: 2000,
      color: 'bg-green-400'
    },
    {
      id: 4,
      category: 'Entertainment',
      budgeted: 8000,
      amountSpent: 4000,
      remaining: 4000,
      color: 'bg-purple-400'
    },
    {
      id: 5,
      category: 'Health',
      budgeted: 3000,
      amountSpent: 1500,
      remaining: 1500,
      color: 'bg-red-400'
    }
  ],
  addBudget: (budget) => set((state) => ({
    budgets: [...state.budgets, {
      ...budget,
      id: Math.max(...state.budgets.map(b => b.id)) + 1,
      remaining: budget.budgeted - budget.amountSpent,
      color: getRandomColor()
    }]
  })),
  editBudget: (updatedBudget) => set((state) => ({
    budgets: state.budgets.map(budget => 
      budget.id === updatedBudget.id 
        ? { ...updatedBudget, remaining: updatedBudget.budgeted - updatedBudget.amountSpent }
        : budget
    )
  })),
  deleteBudget: (budgetId) => set((state) => ({
    budgets: state.budgets.filter(budget => budget.id !== budgetId)
  })),
}));

// Helper function to generate random colors for new budgets
const getRandomColor = () => {
  const colors = [
    'bg-blue-400', 'bg-orange-400', 'bg-green-400',
    'bg-purple-400', 'bg-red-400', 'bg-yellow-400',
    'bg-indigo-400', 'bg-pink-400', 'bg-teal-400'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}; 