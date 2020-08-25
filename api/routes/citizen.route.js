
const crypto = require('crypto')
const Citizens = require('./../model/citizen.model')
const { Router }  = require('express')
const { citizen, citizens, login, logout, register} = require('./../controller/citizen.Controller')(Citizens, crypto)
const citizenRouter = Router()

citizenRouter.route('/').get(citizens)
citizenRouter.route('/profile/:citizen').get(citizen)
citizenRouter.route('/register').post(register)
citizenRouter.route('/login').get(login)
citizenRouter.route('/logout').get(logout)

module.exports = citizenRouter