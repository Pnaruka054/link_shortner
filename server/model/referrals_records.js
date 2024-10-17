const mongoose = require('mongoose')

const referralRecordSchema = new mongoose.Schema({
    userID_DB: { type: String, require: true },
    date: { type: String, require: true },
    userName: { type: String, require: true },
})

const referral_records = mongoose.model('referral_record', referralRecordSchema)

module.exports = referral_records