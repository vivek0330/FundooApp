/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable prefer-regex-literals */

/**************************************************************************************************************
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : joiValidation.js
 * @author        : Vivek Varshney
*****************************************************************************************************************/

const Joi = require("joi");

class Validation {
  /**
     * @description   : validating all parameters we are getting from the user for registration
     * @method        : string, min, required, pattern of JOI
    */
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

  /**
     * @description   : validating all parameters we are getting from the user for login
     * @method        : string, min, required, pattern of JOI
    */
  loginSchema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9._+!%-]{1,64}|)|\"[a-zA-Z0-9.+! -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$"
        )
      ),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
  });

  authenticateLogin = Joi.object({
    email: Joi.string()
      .pattern(new RegExp("^[a-z0-9.+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$"))
      .required()
  })

  validateReset = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8)
      .pattern(new RegExp("[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}"))
      .required()
  })

   resetSchema = Joi.object({
     email: Joi.string().required(),
     password: Joi.string()
       .min(8)
       .max(20)
       .pattern(
         new RegExp(
           "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
         )
       )
       .required()
   });
}

module.exports = new Validation();
