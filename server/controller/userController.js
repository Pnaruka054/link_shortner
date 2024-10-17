const bcrypt = require('bcrypt')
const user_signUp_data = require('../model/user_SignUp_Model')
const resetPassword_req_data = require('../model/user_update_Password_Model')
const otp_data = require('../model/user_OTP_Model')
const sendMail = require('../helper/mailer')
const { validationResult } = require('express-validator')
const randomString = require('randomstring')
const jwt = require('jsonwebtoken')
const referral_records = require("../model/referrals_records")
const oauth2Client = require("../helper/oauth2Client")
const axios = require('axios');

let otpMail_send = async (name, gmail, id) => {
    try {
        let otp = Math.floor((Math.random() * 9000) + 1000)
        let otp_saved_data = await otp_data.findOneAndUpdate({ user_id: id }, { otp, gmail }, { upsert: true }, { new: true })
        const msg = `<p>Hello ${name} Welcome To Earning Planer, Your OTP Is <h4>${otp}</h4></p>`
        sendMail(gmail, 'Verify Email', msg)
        return otp_saved_data;
    } catch (error) {
        console.log(error)
    }
}
let jwt_accessToken = (user) => {
    return jwt.sign({ jwtUser: user }, process.env.JWT_ACCESS_KEY, { expiresIn: '59m' })
}


const user_signUp = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error_msg: errors.array()
            })
        }

        const { name, mobile_number, gmail_address, password, referral_id_signup, date } = req.body

        const bcrypt_pasword = await bcrypt.hash(password, 10)
        const isExists = await user_signUp_data.findOne({ gmail_address })
        if (isExists) {
            return res.status(400).json({
                success: false,
                error_msg: 'User Already Exists'
            })
        }

        let userData = {
            name,
            mobile_number,
            gmail_address,
            password: bcrypt_pasword,
            userName: gmail_address.split('@')[0],
        };

        if (referral_id_signup) {
            const referred_by_userID_DB = await user_signUp_data.findOne({ userName: referral_id_signup })
            if (!referred_by_userID_DB) {
                return res.status(400).json({
                    success: false,
                    error_msg: 'Your Registration Link is invalid'
                })
            }
            let referral_recorded_data = new referral_records({
                userID_DB: referred_by_userID_DB._id,
                date,
                userName: gmail_address.split('@')[0]
            })
            await referral_recorded_data.save()
            userData = {
                name,
                mobile_number,
                gmail_address,
                password: bcrypt_pasword,
                userName: gmail_address.split('@')[0],
                refer_by: referral_id_signup
            };
        }

        const user_data = new user_signUp_data(userData)
        const userModel_data = await user_data.save()

        otpMail_send(userModel_data.name, userModel_data.gmail_address, userModel_data._id)

        res.status(200).json({
            success: true,
            msg: 'Register successfully!',
            user: userModel_data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error_msg: error.message
        })
    }
}

const user_signUp_login_google = async (req, res) => {
    try {
        const google_code = req.query.google_code;
        const referral_id_signup = req.query.referral_id_signup
        const date = req.query.date

        if (!google_code) {
            return res.status(400).json({ message: 'Missing google_code' });
        }
        const googleRes = await oauth2Client.getToken(google_code);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, id } = userRes.data;

        const isExists = await user_signUp_data.findOne({ gmail_address: email })
        if (isExists) {
        if (isExists.google_id.length == 0) {
           return res.status(400).json({
                success: false,
                error_msg: "Please Login With Password"
            })
        }}
       
        let userData = {
            name,
            gmail_address: email,
            userName: email.split('@')[0],
            is_verified: 1,
            google_id: id
        };

        if (referral_id_signup !== 'undefined') {
            const referred_by_userID_DB = await user_signUp_data.findOne({ userName: referral_id_signup })
            if (!referred_by_userID_DB) {
                return res.status(400).json({
                    success: false,
                    error_msg: 'Your Registration Link is invalid'
                })
            }
            let referral_recorded_data = new referral_records({
                userID_DB: referred_by_userID_DB._id,
                date,
                userName: email.split('@')[0]
            })

            await referral_recorded_data.save()

            userData = {
                name,
                gmail_address: email,
                userName: email.split('@')[0],
                is_verified: 1,
                google_id: id,
                refer_by: referral_id_signup
            };
        }
        
        let jwt_token;
        if (!isExists) {
            const user_data = new user_signUp_data(userData)
            let userModel_data = await user_data.save()
            jwt_token = jwt_accessToken(userModel_data)
        } else {
            jwt_token = jwt_accessToken(isExists)
        }
      
        return res.status(200).json({
            success: true,
            jwtToken_msg: jwt_token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error_msg: error.message
        })
    }

}

const userVerify_otp = async (req, res) => {
    try {
        const { otp, gmail_address } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                verify_error_array_msg: errors.array()[0].msg
            })
        }

        isExists = await otp_data.findOne({ otp })
        if (!isExists) {
            return res.status(400).json({
                success: false,
                verify_error_otp_not_matched_msg: 'Wrong OTP please try again'
            })
        }

        const totalUserData = await user_signUp_data.findOne({ _id: isExists.user_id })

        if (totalUserData.is_verified === 1) {
            await otp_data.deleteMany({ gmail: gmail_address })
            return res.status(400).json({
                success: false,
                verify_error_otp_already_verified_msg: 'Your Email is Already Verified Please Login'
            })
        }

        await user_signUp_data.findByIdAndUpdate({ _id: isExists.user_id }, { is_verified: 1 }, { new: true })

        return res.status(200).json({
            success: true,
            verify_success_msg: '🎉🥳 Congratulations Your are Verified !'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: '😔 Sorry Invalid User'
        })
    }
}

const userVerify_resend_otp = async (req, res) => {
    try {
        const { gmail_address } = req.body

        const isExists = await user_signUp_data.findOne({ gmail_address })

        if (isExists.is_verified === 1) {
            return res.status(400).json({
                success: false,
                user_verify_link_gmailAlready_verified_msg: 'Gmail Already Verified Please Login'
            })
        }

        await otpMail_send(isExists.name, isExists.gmail_address, isExists._id)

        res.status(200).json({
            success: true,
            msg: 'Verification OTP Sended Successfully! Please Check',
        })
    } catch (error) {
        console.log(error)
    }
}

const userVerify_changeEmail_otp = async (req, res) => {
    try {
        const { otp, gmail_address } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error_msg: errors.array()[0].msg
            })
        }

        isExists = await otp_data.findOne({ otp })
        if (!isExists) {
            return res.status(400).json({
                success: false,
                error_msg: 'Wrong OTP please try again'
            })
        }

        await user_signUp_data.findByIdAndUpdate({ _id: isExists.user_id }, { is_verified: 1, gmail_address: gmail_address.toLowerCase() }, { new: true })

        return res.status(200).json({
            success: true,
            success_msg: '🎉🥳 Congratulations Your are Verified !'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error_msg: '😔 Sorry Invalid User'
        })
    }
}

const userVerify_changeEmail_resend_otp = async (req, res) => {
    try {
        const { gmail_address, currentEmail } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()[0].msg
            })
        }

        const isExists = await user_signUp_data.findOneAndUpdate({ gmail_address: currentEmail.toLowerCase() }, { is_verified: 0 }, { new: true })

        await otpMail_send(isExists.name, gmail_address.toLowerCase(), isExists._id)

        res.status(200).json({
            success: true,
            msg: 'Verification OTP Sended Successfully! Please Check',
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error_msg: error.message,
        })
    }
}

const userForgotPassword_dataBase_post = async (req, res) => {
    try {
        const { gmailID_state } = req.body
        const isExists = await user_signUp_data.findOne({ gmail_address: gmailID_state.toLowerCase() })
        const fullUrl = req.headers.origin || `${req.protocol}://${req.get('host')}`;
        if (!isExists) {
            return res.status(400).json({
                success: false,
                forgotPassword_error_notExist_msg: 'Sorry User not Found Please Check Your Email'
            })
        }
        let token = randomString.generate()
        let obj = {
            user_id: isExists._id,
            token
        }
        let insert = new resetPassword_req_data(obj)
        let data = await insert.save()

        const msg = `<p>Hello ${isExists.name} Welcome To Earning Planer, Click <a href="${fullUrl}/password_reset_form/${data.token}"> here </a> To Reset Your Password</p>`
        sendMail(isExists.gmail_address, 'Reset/update Password', msg)

        return res.status(200).json({
            success: true,
            forgotPassword_success_msg: 'Password reset email sended successfully!',
            user: data
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const userResetPassword_Form_get = async (req, res) => {
    const id = req.params.id
    const isExists = await resetPassword_req_data.findOne({ token: id })
    if (!isExists) {
        return res.status(404).json({
            success: false,
            updatePassword: 'Sorry 404 Page not Found'
        })
    }
    return res.status(200).json({
        success: true,
        msg: 'Data matched'
    })

}

const userResetPassword_Form_post = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()[0].msg
            })
        }
        const id = req.params.id
        const isExists = await resetPassword_req_data.findOne({ token: id })
        const Obj_Id = isExists.user_id
        const password = req.body.password
        const bcrypted_password = await bcrypt.hash(password, 10)

        await user_signUp_data.findOneAndUpdate({ _id: Obj_Id }, { password: bcrypted_password }, { new: true })
        await resetPassword_req_data.deleteMany({ user_id: Obj_Id })

        return res.status(200).json({
            success: true,
            msg: 'Password Reseted SuccessFully!'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            msg: 'Bad Request 400'
        })
    }
}

const userLogin = async (req, res) => {
    try {
        let { gmail_id, password } = req.body
        let userName = gmail_id.split("@")[1]
        const isExists = await user_signUp_data.findOne({
            $or: [
                { gmail_address: gmail_id },
                { userName: userName }
            ]
        });
        if (!isExists) {
            return res.status(400).json({
                success: false,
                login_invalid_gmailPassword_msg: 'Invalid Gmail or Password'
            })
        }

        let passwordMatched = await bcrypt.compare(password, isExists.password)

        if (!passwordMatched) {
            return res.status(400).json({
                success: false,
                login_invalid_password_msg: 'Password not Matched'
            })
        }
        let jwt_token = jwt_accessToken(isExists)

        return res.status(200).json({
            success: true,
            jwtToken_msg: jwt_token
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const userHome_dataBase_get = async (req, res) => {
    try {
        userData = req.user
        user_gmail_address = userData.gmail_address
        let user_new_Data = await user_signUp_data.findOne({ gmail_address: user_gmail_address })
        return res.status(200).json({
            success: true,
            userData: user_new_Data
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: 'not found'
        })
    }
}

const userSignUp_data_update = async (req, res) => {
    try {
        let { gmail_address } = req.query
        let userNewData = req.body
        let new_updated_userData = await user_signUp_data.findOneAndUpdate({ gmail_address }, userNewData, { new: true })
        res.status(200).json({
            success: true,
            update_success_msg: 'Updated successfully!',
            new_updated_userData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            update_false_msg: userModel_data
        })
    }
}

const change_password = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: errors.array()[0].msg,
            });
        }

        const Obj_Id = req.user._id
        const { currentPassword, password, jwt_token } = req.body;

        const user = await user_signUp_data.findById(Obj_Id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found.',
            });
        }
        if (currentPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    msg: 'Current password is incorrect.',
                });
            }

        }
        const bcrypted_password = await bcrypt.hash(password, 10);

        await user_signUp_data.findOneAndUpdate({ _id: Obj_Id }, { password: bcrypted_password }, { new: true });
        user.google_id = ""
        await user.save()

        return res.status(200).json({
            success: true,
            msg: 'Password reset successfully!',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            update_false_msg: error
        })
    }
}

const referral_record_get = async (req, res) => {
    try {
        let userID_DB = req.query.userID_DB
        let referral_record_get = await referral_records.find({ userID_DB })
        res.status(200).json({
            success: true,
            msg: referral_record_get
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    user_signUp,
    userVerify_otp,
    userVerify_resend_otp,
    userForgotPassword_dataBase_post,
    userResetPassword_Form_post,
    userResetPassword_Form_get,
    userLogin,
    userHome_dataBase_get,
    userSignUp_data_update,
    change_password,
    userVerify_changeEmail_resend_otp,
    userVerify_changeEmail_otp,
    referral_record_get,
    user_signUp_login_google
}