const mongoose = require('mongoose')

const resetPasswordSchema = new mongoose.Schema({
    user_id: { type: String, require: true },
    token: { type: String, require: true }
})

const resetPassword_req_data = mongoose.model('resetPassword_req_data', resetPasswordSchema)

module.exports = resetPassword_req_data