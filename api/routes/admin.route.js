const { Router} = require('express')

const adminRouter = Router()

adminRouter.route('/').get()
adminRouter.route('/login').post()
adminRouter.route('/register').post()
adminRouter.route('/:adminID').get()