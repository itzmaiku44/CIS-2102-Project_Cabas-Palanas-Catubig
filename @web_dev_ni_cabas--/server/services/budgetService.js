const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new budget
const createBudget = async (budgetData) => {
  try {
    const newBudget = await prisma.budget.create({
      data: {
        budget_name: budgetData.budget_name,
        amount: budgetData.amount,
        user: {
          connect: {
            id: budgetData.userId,
          },
        },
      },
    });
    return newBudget;
  } catch (error) {
    console.error("Error creating budget:", error.message);
    throw new Error("Failed to create budget.");
  }
};

// Get all budgets for a user
const getBudgets = async (userId) => {
  try {
    const budgets = await prisma.budget.findMany({
      where: { userId },
    });
    return budgets;
  } catch (error) {
    console.error("Error retrieving budgets:", error.message);
    throw new Error("Failed to retrieve budgets.");
  }
};

// Get a single budget by ID
const getBudgetById = async (id) => {
  try {
    const budget = await prisma.budget.findUnique({
      where: { id },
    });
    return budget;
  } catch (error) {
    console.error("Error retrieving budget by ID:", error.message);
    throw new Error("Failed to retrieve budget.");
  }
};

// Update a budget
const updateBudget = async (id, updatedData) => {
  try {
    const existingBudget = await findBudget(id);

    if (!existingBudget) return null;

    const updatedBudget = await prisma.budget.update({
      where: { id },
      data: updatedData,
    });

    return updatedBudget;
  } catch (error) {
    console.error("Error updating budget:", error.message);
    throw new Error("Failed to update budget.");
  }
};

// Delete a budget
const deleteBudget = async (id) => {
  try {
    const existingBudget = await findBudget(id);

    if (!existingBudget) return null;

    const deletedBudget = await prisma.budget.delete({
      where: { id },
    });

    return deletedBudget;
  } catch (error) {
    console.error("Error deleting budget:", error.message);
    throw new Error("Failed to delete budget.");
  }
};

// Helper function to find a budget by ID
const findBudget = async (id) => {
  try {
    const budget = await prisma.budget.findUnique({
      where: { id },
    });
    return budget;
  } catch (error) {
    console.error("Error finding budget:", error.message);
    throw new Error("Failed to find budget.");
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
