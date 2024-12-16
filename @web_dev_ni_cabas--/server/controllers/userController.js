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

// Patch Profile
const updateProfileController = async (req, res) => {
  try {
    const { userId, name, email, password } = req.body;

    const updatedProfile = await userService.updateProfileService({
      userId,
      name,
      email,
      password,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating profile" });
  }
};

module.exports = {
  registerController,
  loginController,
  updateProfileController,
};
