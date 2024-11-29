const expensesService = require("../services/expenseService");

const createExpenseController = async (req, res) => {
  try {
    const expenseData = req.body;
    const user = req.user;

    expenseData.userId = user.id;

    const newExpense = await expensesService.createExpense(expenseData);

    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error creating expense:", error.message);
    res.status(500).json({ error: "Failed to create expense. Please try again later." });
  }
};

const getExpenseController = async (req, res) => {
  try {
    const user = req.user;

    const expensesList = await expensesService.getExpenses(user.id);

    res.json(expensesList);
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({ error: "Failed to retrieve expenses. Please try again later." });
  }
};

const getExpenseByIdController = async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);

    const expense = await expensesService.getExpenseById(expenseId);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    console.error("Error fetching expense by ID:", error.message);
    res.status(500).json({ error: "Failed to retrieve expense. Please try again later." });
  }
};

const updateExpenseController = async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);
    const updatedExpenseData = req.body;

    const updatedExpense = await expensesService.updateExpense(expenseId, updatedExpenseData);

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error.message);
    res.status(500).json({ error: "Failed to update expense. Please try again later." });
  }
};

const deleteExpenseController = async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);

    const deletedExpense = await expensesService.deleteExpense(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(deletedExpense);
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    res.status(500).json({ error: "Failed to delete expense. Please try again later." });
  }
};

module.exports = {
  createExpenseController,
  getExpenseController,
  getExpenseByIdController,
  updateExpenseController,
  deleteExpenseController,
};
