const Profile = require("../models/Profile");

let adminProfile = {
  projects: ["hello", "there"],
};

const adminUser = new Profile(adminProfile);
adminUser.save();

module.exports = adminProfile;
