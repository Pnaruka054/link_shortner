const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema({
    userDB_ID: { type: String },
    monthName: { type: String },
    total_views: { type: String, default: "0" },
    total_earnings: { type: String, default: "0" },
    referral_earnings: { type: String, default: "0" },
    averageCPM: { type: String, default: "0" },
    createdAt: { type: Date, default: Date.now, expires: '1y' }
});

const userMonthly_records = mongoose.model('Monthly_records', monthSchema);

module.exports = userMonthly_records