const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const {jwtScrete} = require('./../../config/default')
const jwt = require('jsonwebtoken')
const { loginAuth } = require('./../middleware/auth')(jwt, jwtScrete)
const Admin = require('./../model/admin.model')
const Citizens = require('./../model/citizen.model')
const { Router } = require("express");
const {
  login,
  register,
  admin,
  admins,
} = require("./../controller/admin.Controller")(validationResult, Admin, bcrypt, jwt, jwtScrete, Citizens);
const { formReg, formLogin } = require("./../middleware/formValidation")(body);
const adminRouter = Router();

adminRouter.route("/").get(admins);
adminRouter.route("/login").post(formLogin, login);
adminRouter.route("/register").post(formReg, register);
adminRouter.route("/:adminID").get(loginAuth, admin);

module.exports = adminRouter;
