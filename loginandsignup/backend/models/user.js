// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");
// const userSchema = new mongoose.Schema({
//   firstname: {
//     type: String,
//     required: true,
//   },

//   lastname: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//   },

//   password: {
//     type: String,
//     required: true,
//   },
// });

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
//     expiresIn: "7d",
//   });
//   return token;
// };

// const User = mongoose.model("user", userSchema);

// const validate = (data) => {
//   const schema = joi.object({
//     firstname: joi.string().required().label("firstname"),
//     lastname: joi.string().required().label("lastname"),
//     email: joi.string().email().required().label("email"),
//     password: passwordComplexity.required().label("password"),
//   });
//   return schema.validate(data);
// };

// module.exports = { User, validate };
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const complexityOptions = {
  min: 8, // Minimum length
  max: 30, // Maximum length
  lowerCase: 1, // Require at least one lowercase letter
  upperCase: 1, // Require at least one uppercase letter
  numeric: 1, // Require at least one number
  symbol: 1, // Require at least one special character
};

const passwordComplexityValidator = passwordComplexity(complexityOptions);

const validate = (data) => {
  const schema = joi.object({
    firstname: joi.string().required().label("firstname"),
    lastname: joi.string().required().label("lastname"),
    email: joi.string().email().required().label("email"),
    password: passwordComplexityValidator.required().label("password"),
  });
  return schema.validate(data);
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };
