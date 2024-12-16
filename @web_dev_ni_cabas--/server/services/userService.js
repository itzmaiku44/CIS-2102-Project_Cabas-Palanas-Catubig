const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const createUser = async ({ name, email, birthdate, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        birthdate: new Date(birthdate),
        password: hashedPassword,
      },
    });

    // Generate a token for the new user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token, user };
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target.includes("email")) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return null; // User not found

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token, user };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Patch User Profile
const updateProfileService = async ({ userId, name, email, password }) => {
  try {
    // Fetch user by ID
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    const updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    // Update user in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error in updateUserProfile service:", error);
    throw new Error("Failed to update profile");
  }
};

module.exports = {
  createUser,
  login,
  updateProfileService,
};
