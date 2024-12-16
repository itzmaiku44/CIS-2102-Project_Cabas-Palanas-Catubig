const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(cors());

const port = 3000;

app.use(express.json());

app.use("/expenses", routes.expenseRoutes);
app.use("/budgets", routes.budgetRoutes);
app.use("/users", routes.userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
