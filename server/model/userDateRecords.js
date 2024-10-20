const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema({
    userDB_ID: { type: String },
    date: { type: String },
    views: { type: String, default: "0" },
    publisher_earnings: { type: String, default: "0" },
    referral_earnings: { type: String, default: "0" },
    dailyCPM: { type: String, default: "10" },
    monthName: { type: String },
    createdAt: { type: Date, default: Date.now, expires: '1y' }
});

const userDate_records = mongoose.model('userDate_records', monthSchema);

module.exports = userDate_records