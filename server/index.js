const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const passport = require("./config/passport");

const router = require("./routes/routes");

app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/innocent-portfolio", {
    useNewUrlParser: true,
  })
  .then(() => {
    require("./seeds/admin");
    app.use(session({ secret: "secret" }));
    app.use(passport.initialize());

    app.use(passport.session());
    app.use("/", router);

    console.log("Dababase connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
