const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/routes");
const app = express();
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/innocent-portfolio", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Dababase connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
