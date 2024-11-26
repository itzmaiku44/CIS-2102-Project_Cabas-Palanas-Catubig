const {body, validationResult} = require("express-validator");

const registerValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("birthdate").isISO8601().withMessage("Invalid date format"),
    body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters"),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    next();
}

module.exports = {
    registerValidation,
    validate,
};