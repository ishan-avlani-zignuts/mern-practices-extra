const router = require("express").Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "invalid email or password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("email"),
    password: joi.string().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = router;
