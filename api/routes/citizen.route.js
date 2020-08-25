
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { jwtScrete } = require('./../../config/default')
const { loginAuth } = require('./../middleware/auth')(jwt, jwtScrete)
const Citizens = require('./../model/citizen.model')
const { Router }  = require('express')
const { citizen, citizens, login, logout, register} = require('./../controller/citizen.Controller')(Citizens, crypto, jwt, jwtScrete)
const citizenRouter = Router()

citizenRouter.route('/').get(citizens)
citizenRouter.route('/profile/:citizen').get(loginAuth, citizen)
citizenRouter.route('/register').post(register)
citizenRouter.route('/login').post(login)
citizenRouter.route('/logout').get(logout)

module.exports = citizenRouter