const budgetsService = require("../services/budgetService");

const createBudgetController = async (req, res) => {
  try {
    const budgetData = req.body;
    const user = req.user;

    budgetData.userId = user.id;

    const newBudget = await budgetsService.createBudget(budgetData);

    res.status(201).json(newBudget);
  } catch (error) {
    console.error("Error creating budget:", error.message);
    res.status(500).json({ error: "Failed to create budget. Please try again later." });
  }
};

const getBudgetsController = async (req, res) => {
  try {
    const user = req.user;

    const budgetsList = await budgetsService.getBudgets(user.id);

    res.json(budgetsList);
  } catch (error) {
    console.error("Error fetching budgets:", error.message);
    res.status(500).json({ error: "Failed to retrieve budgets. Please try again later." });
  }
};

const getBudgetByIdController = async (req, res) => {
  try {
    const budgetId = parseInt(req.params.id);

    const budget = await budgetsService.getBudgetById(budgetId);

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json(budget);
  } catch (error) {
    console.error("Error fetching budget by ID:", error.message);
    res.status(500).json({ error: "Failed to retrieve budget. Please try again later." });
  }
};

const updateBudgetController = async (req, res) => {
  try {
    const budgetId = parseInt(req.params.id);
    const updatedBudgetData = req.body;

    const updatedBudget = await budgetsService.updateBudget(budgetId, updatedBudgetData);

    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json(updatedBudget);
  } catch (error) {
    console.error("Error updating budget:", error.message);
    res.status(500).json({ error: "Failed to update budget. Please try again later." });
  }
};

const deleteBudgetController = async (req, res) => {
  try {
    const budgetId = parseInt(req.params.id);

    const deletedBudget = await budgetsService.deleteBudget(budgetId);

    if (!deletedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json(deletedBudget);
  } catch (error) {
    console.error("Error deleting budget:", error.message);
    res.status(500).json({ error: "Failed to delete budget. Please try again later." });
  }
};

module.exports = {
  createBudgetController,
  getBudgetsController,
  getBudgetByIdController,
  updateBudgetController,
  deleteBudgetController,
};
