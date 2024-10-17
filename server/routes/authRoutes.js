const express = require('express')
const route = express()
const userController = require('../controller/userController')
const validator = require('../helper/validator')

route.get('/resetPasswordForm_get/:id', userController.userResetPassword_Form_get)

route.post('/varify_otp', validator.otpValidator, userController.userVerify_otp)
route.post('/verify_resend_otp', userController.userVerify_resend_otp)
route.post('/resetPassword_Form/:id', validator.passwordValidator, userController.userResetPassword_Form_post)

route.patch('/userVerify_changeEmail_resend_otp',validator.EmailValidator, userController.userVerify_changeEmail_resend_otp)
route.patch('/userVerify_changeEmail_otp',validator.otpValidator, userController.userVerify_changeEmail_otp)

module.exports = route