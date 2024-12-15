const userService = require("../services/userService");

const registerController = async (req, res) => {
  try {
    const { name, email, birthdate, password } = req.body;

    const result = await userService.createUser({
      name,
      email,
      birthdate,
      password,
    });

    const { token, user } = result;

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
      },
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong during registration" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Attempt to log in
    const result = await userService.login(email, password);

    if (!result) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const { token, user } = result;

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong during login" });
  }
};

// Change Password Controller
const changePasswordController = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id; // Assume user ID is available in req.user (after authentication)

  // Validate input
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "New password and confirm password do not match." });
  }

  if (newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  try {
    // Call service to change the password
    const result = await changePasswordService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    // If password is successfully changed, respond with success message
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Password changed successfully." });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  registerController,
  loginController,
  changePasswordController,
};
