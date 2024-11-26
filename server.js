const express = require("express");
const app = express();
const port = 3000;

const routes = require("./routes");

app.use(express.json());

app.use("/transaction", routes.notesRoutes);
app.use("/users", routes.userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

