const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({
      email,
      password,
    });
    if (!admin) {
      return res.send({ msg: "Invalid credentials" });
    }

    const isMatch = (password, adminpassword) => {
      adminpassword = admin.password;
      return password === adminpassword;
    };

    if (!isMatch) {
      return res.status(400).send({ msg: "Invalid Credentials" });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };
    jwt.sign(payload, "nosenti", (err, token) => {
      if (err) throw err;
      res.send({ token: token });
    });

    if (admin == null)
      return res.status(500).send({ status: "wrong credentials" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
