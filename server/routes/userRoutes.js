const express = require('express')
const route = express()
const userController = require('../controller/userController')
const validator = require('../helper/validator')
const middleware = require('../middlewares/jwt_to_userData_middleware')
const { handleAddToSheet } = require("../controller/userFormController")

route.use('/home_dataBase_get', middleware.middleware_userLogin_check)
route.use('/change_password', middleware.middleware_userLogin_check)

route.get('/home_dataBase_get', userController.userHome_dataBase_get)
route.get('/referral_record_get', userController.referral_record_get)
route.get('/user_signUp_login_google', userController.user_signUp_login_google)

route.post('/signUp', validator.signUpValidator, userController.user_signUp)
route.post('/forgotPassword_dataBase_post', userController.userForgotPassword_dataBase_post)
route.post('/login', validator.loginValidator, userController.userLogin)
route.post("/add_to_sheet", handleAddToSheet);

route.patch('/userSignUp_data_update', validator.signUpValidator, userController.userSignUp_data_update)
route.patch('/change_password', validator.passwordValidator, userController.change_password)

module.exports = route