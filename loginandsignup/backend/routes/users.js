const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  console.log("Received signup request with data:", req.body);

  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    console.log("Validated user data");

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "user with this id already exists" });

    console.log("User does not exist");

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log("Hashed password");

    await new User({ ...req.body, password: hashPassword }).save();
    console.log("User created successfully.");

    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ message: "internal server error", error: error }); // Log the entire error object
  }
});

module.exports = router;
