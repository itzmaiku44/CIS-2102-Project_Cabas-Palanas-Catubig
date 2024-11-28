const express = require("express");
const router = express.Router();
const expense = require("../controllers/expenseController");
const validateToken = require("../middlewares/auth");
const {expenseValidation, validate} = require("../middlewares/validation");

//add expenseValidation before going to create an expense
router.post("/", validateToken, expenseValidation, validate, expense.createExpenseController);
router.get("/", validateToken,expenseValidation, validate, expense.getExpenseController);
router.get("/:id", validateToken, expenseValidation, validate, expense.getExpenseByIdController);
router.put("/:id", validateToken, expenseValidation, validate, expense.updateExpenseController);
router.delete("/:id", validateToken, expenseValidation, validate, expense.deleteExpenseController);

module.exports = router;
