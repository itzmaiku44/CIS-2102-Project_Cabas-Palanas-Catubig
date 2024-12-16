const express = require("express");
const router = express.Router();
const expense = require("../controllers/expenseController");
const validateToken = require("../middlewares/auth");
const { expenseValidation, validate } = require("../middlewares/validation");

//create expense
router.post(
  "/",
  validateToken,
  expenseValidation,
  validate,
  expense.createExpenseController
);
//display all expenses
router.get("/", validateToken, expense.getExpenseController);
//display specific expenses
router.get("/:id", validateToken, expense.getExpenseByIdController);
//update expenses
router.patch(
  "/:id",
  validateToken,
  expenseValidation,
  validate,
  expense.updateExpenseController
);
//delete expenses
router.delete("/:id", validateToken, expense.deleteExpenseController);

module.exports = router;
