const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const {registerValidation, validate} = require("../middlewares/validation");

router.post("/register", registerValidation, validate , user.registerController);
router.post("/login", user.loginController);

module.exports = router;


