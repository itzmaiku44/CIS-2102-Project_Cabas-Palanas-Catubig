const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new expense
const createExpense = async (expenseData) => {
  try {
    const newExpense = await prisma.expenses.create({
      data: {
        amount: expenseData.amount,
        expense_name: expenseData.expense_name,
        category: {
          connect: { id: expenseData.categoryId },
        },
        user: {
          connect: { id: expenseData.userId },
        },
      },
    });
    return newExpense;
  } catch (error) {
    console.error("Error creating expense:", error.message);
    throw new Error("Failed to create expense.");
  }
};

// Get all expenses for a user
const getExpenses = async (userId) => {
  try {
    const expenses = await prisma.expenses.findMany({
      where: { userId },
    });
    return expenses;
  } catch (error) {
    console.error("Error retrieving expenses:", error.message);
    throw new Error("Failed to retrieve expenses.");
  }
};

// Get a single expense by ID
const getExpenseById = async (id) => {
  try {
    const expense = await prisma.expenses.findUnique({
      where: { id },
    });
    return expense;
  } catch (error) {
    console.error("Error retrieving expense by ID:", error.message);
    throw new Error("Failed to retrieve expense.");
  }
};

// Update an expense
const updateExpense = async (id, updatedData) => {
  try {
    const existingExpense = await findExpense(id);
    if (updatedData.categoryId) {
      updatedData.categoryId = parseInt(updatedData.categoryId);
    }

    if (!existingExpense) return null;

    const updatedExpense = await prisma.expenses.update({
      where: { id },
      data: updatedData,
    });

    return updatedExpense;
  } catch (error) {
    console.error("Error updating expense:", error.message);
    throw new Error("Failed to update expense.");
  }
};

// Delete an expense
const deleteExpense = async (id) => {
  try {
    const existingExpense = await findExpense(id);

    if (!existingExpense) return null;

    const deletedExpense = await prisma.expenses.delete({
      where: { id },
    });

    return deletedExpense;
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    throw new Error("Failed to delete expense.");
  }
};

// Helper function to find an expense by ID
const findExpense = async (id) => {
  try {
    const expense = await prisma.expenses.findUnique({
      where: { id },
    });
    return expense;
  } catch (error) {
    console.error("Error finding expense:", error.message);
    throw new Error("Failed to find expense.");
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
