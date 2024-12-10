const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const createUser = async (user) => {
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(user.password, 12);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        birthdate: new Date(user.birthdate),
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target.includes("email")) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

// Login with email and password
const login = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
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

module.exports = {
  createUser,
  login,
};
