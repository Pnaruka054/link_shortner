const { check } = require("express-validator");

const signUpValidator = [
    check('mobile_number', 'Mobile number must be 10 digits').isLength({
        max: 10,
        min: 10
    }),
    check('gmail_address', 'Please enter valid gmail address').isEmail().normalizeEmail({
        gmail_lowercase: true,
        gmail_remove_dots: true,
    }),
    check('password', 'Password must contain min 8 character(min[1 number, 1 speciel character, 1 word]').isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
]

const EmailValidator = [
    check('gmail_address', 'Please enter valid gmail address').isEmail().normalizeEmail({
        gmail_lowercase: true,
        gmail_remove_dots: true,
    }),
]

const passwordValidator = [
    check('password', 'Password must contain min 8 character(min[1 number, 1 speciel character, 1 word]').isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
]

const loginValidator = [
    check('gmail_id', 'Please enter valid gmail address').isEmail().normalizeEmail({
        gmail_lowercase: true,
        gmail_remove_dots: true,
    })
]

const otpValidator = [
    check('otp', 'OTP is only 4 digits').isLength({
        max: 4,
        min: 4
    })
]

module.exports = {
    signUpValidator,
    passwordValidator,
    loginValidator,
    otpValidator,
    EmailValidator
}