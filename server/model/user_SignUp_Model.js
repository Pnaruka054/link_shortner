const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    mobile_number: { type: Number, default: 0 },
    gmail_address: { type: String, require: true },
    password: { type: String, default: "" },
    is_verified: { type: Number, default: 0 },
    available_amount: { type: String, default: "0.000" },
    pending_withdrawal_amount: { type: String, default: "0.000" },
    total_withdrawal_amount: { type: String, default: "0.000" },
    publisher_earnings: { type: String, default: "0.000" },
    referral_earnings: { type: String, default: "0.000" },
    withdrawal_account_information: { type: String, default: "" },
    refer_by: { type: String, default: "" },
    withdrawal_method: { type: String, default: "" },
    country: { type: String, default: "" },
    zip_code: { type: Number, default: 0 },
    place_state: { type: String, default: "" },
    city: { type: String, default: "" },
    userName: { type: String },
    address: { type: String, default: "" },
    google_id: { type: String, default: "" }
})

const user_signUp_data = mongoose.model('user_signUp_data', userSchema)

module.exports = user_signUp_data