const User = require("../models/User");

const admin = {
  fullName: "admin",
  email: "nosenti@gmail.com",
  password: "nosenti",
};

const newUser = new User(admin);
newUser.save();
