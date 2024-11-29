const express = require("express");
const router = express.Router();
const budget = require("../controllers/budgetController");
const validateToken = require("../middlewares/auth");
const { budgetValidation, validate } = require("../middlewares/validation");

// Add budgetValidation before going to create a budget
router.post("/", validateToken, budgetValidation, validate, budget.createBudgetController);
router.get("/", validateToken, budget.getBudgetsController);
router.get("/:id", validateToken, budget.getBudgetByIdController);
router.put("/:id", validateToken, budgetValidation, validate, budget.updateBudgetController);
router.delete("/:id", validateToken, budget.deleteBudgetController);

module.exports = router;
