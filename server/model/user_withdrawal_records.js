const mongoose = require('mongoose')

const user_withdrawal_records_schema = new mongoose.Schema({
    ID: { type: String, require: true, unique: true },
    date: { type: String, require: true },
    status: { type: String, require: true },
    publisher_earnings: { type: String, require: true },
    referral_earnings: { type: String, require: true },
    total_amount: { type: String, require: true },
    withdrawal_method: { type: String, require: true },
    withdrawal_account: { type: String, require: true },
    userDB_id: { type: String, require: true },
    withdrawal_paid_date: { type: String, require: true, default:"N/A" },
    description: { type: String, require: true, default:"N/A" }
})

const user_withdrawal_records = mongoose.model('user_withdrawal_record', user_withdrawal_records_schema)

module.exports = user_withdrawal_records