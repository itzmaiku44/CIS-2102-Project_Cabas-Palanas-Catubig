const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const validateToken = require("../middlewares/auth");
const { registerValidation, validate } = require("../middlewares/validation");

router.post("/register", registerValidation, validate, user.registerController);
router.post("/login", user.loginController);
router.patch("/changePassword", validateToken, user.updateProfileController);

module.exports = router;

//sir for some reason dili mo gana ang api endpoint na /changeProfile. sa /changePassword ra sa siya mugana
