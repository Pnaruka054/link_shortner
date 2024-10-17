const mongoose = require('mongoose')

const userIPSchema = new mongoose.Schema({
    userID_DB: { type: String, required: true },
    ip_address: { type: String, required: true },
    clicks: { type: Number, default:0 },
    createdAt: { type: Date, default: Date.now, expires: '30m' } // 5-minute expiration time
});

const UserIPRecord = mongoose.model('userIP_record', userIPSchema);

module.exports = UserIPRecord