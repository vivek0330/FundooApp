/* eslint-disable no-control-regex */
/* eslint-disable prefer-regex-literals */
const Joi = require("joi");

class Validation {
  registraionAuth = Joi.object({
    firstName: Joi.string()
      .min(3)
      .required()
      // .pattern(new RegExp("^[A-Z]{1}[a-z]{1,}$")),
      .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),

    lastName: Joi.string().min(2).required(),

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
      // eslint-disable-next-line no-control-regex
      .pattern(new RegExp("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"))
  });

  loginAuth = Joi.object({
    email: Joi.string()
      .pattern(
        new RegExp(
          "^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$"
        )
      )
      .required(),

    password: Joi.string()
      .required()
      // eslint-disable-next-line no-control-regex
      .pattern(new RegExp("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"))
  });

  authenticateLogin = Joi.object({
    email: Joi.string()
      .pattern(new RegExp("^[a-z0-9.+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$"))
      .required()
  })

  validateReset = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8)
      // .pattern(new RegExp("^(?=.*[!@#$%^&+=])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"))
      .pattern(new RegExp("(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"))
      .required()
  })
}

module.exports = new Validation();
