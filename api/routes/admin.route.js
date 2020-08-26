const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const Admin = require('./../model/admin.model')
const { Router } = require("express");
const {
  login,
  register,
  admin,
  admins,
} = require("./../controller/admin.Controller")(validationResult, Admin);
const { formReg, formLogin } = require("./../middleware/formValidation")(body);
const adminRouter = Router();

adminRouter.route("/").get(admins);
adminRouter.route("/login").post(formLogin, login);
adminRouter.route("/register").post(formReg, register);
adminRouter.route("/:adminID").get(admin);

module.exports = adminRouter;
