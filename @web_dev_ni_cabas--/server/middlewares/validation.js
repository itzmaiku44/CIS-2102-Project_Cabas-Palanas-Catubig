const {body, validationResult} = require("express-validator");

const registerValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("birthdate").isISO8601().withMessage("Invalid date format"),
    body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters"),
];

const expenseValidation = [
    body("expense_name").notEmpty().withMessage("Name is required"),
    body("amount").notEmpty().withMessage("Expense name is required").isFloat({gt: 0}).withMessage("Amount must be a positive number"),
    body("categoryId").notEmpty().withMessage("Category is required").isInt({gt: 0})
]

const budgetValidation = [
    body("budget_name").notEmpty().withMessage("Budget name is required").isLength({ max: 100 }).withMessage("Budget name must not exceed 100 characters"),
    body("amount").notEmpty().withMessage("Amount is required").isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),
  ];


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorDetails = errors.array().map(err => ({
            field: err.param,       
            message: err.msg,      
        }));

        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: errorDetails,   
        });
    }
    next();
}

module.exports = {
    registerValidation,
    expenseValidation,
    budgetValidation,
    validate,
};