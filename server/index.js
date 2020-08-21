const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

const router = require("./routes/routes");
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Portfolio API",
//       description: "Innocent's Portfolio API Information",
//       contact: {
//         name: "Innocent Ingabire",
//       },
//       servers: ["http://localhost:5000"],
//     },
//   },
//   // ['.routes/*.js']
//   apis: ["./routes"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect("mongodb://localhost:27017/innocent-portfolio", {
    useNewUrlParser: true,
    saveUninitialized: true,
    useUnifiedTopology: true,
    resave: true,
  })
  .then(() => {
    require("./seeds/admin");
    app.use(session({ secret: "secret" }));
    // app.use(passport.initialize());

    // app.use(passport.session());
    app.use("/", router);

    console.log("Dababase connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});

module.exports = app;
