const Joi = require("joi");

class Validation {
  registraionAuth = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp("^[A-Z]{1}[a-z]{1,}$")),

    lastName: Joi.string()
      .min(3)
      .max(10)
      .required()
      .pattern(new RegExp("^[A-Z]{1}[a-z]{1,}$")),

    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$"
        )
      ),

    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp("[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}")),
  });
}

module.exports = new Validation();
