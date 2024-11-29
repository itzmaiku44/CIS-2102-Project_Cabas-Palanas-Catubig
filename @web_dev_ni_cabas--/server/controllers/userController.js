const userService = require("../services/userService");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, birthdate, password } = req.body;

    const user = await userService.createUser({ name, email, birthdate, password });
    res.status(201).json(user);
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message }); 
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message: "Invalid email format"});
    }
  

    // Attempt to log in
    const token = await userService.login(email, password);

    if (!token) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    res.json({ token }); 

  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Something went wrong during login" });
  }
};

module.exports = {
  registerController,
  loginController,
};
