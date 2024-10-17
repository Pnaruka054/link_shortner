const mongoose = require('mongoose')

const withdrawal_methods_schema = new mongoose.Schema({
    withdrawal_method: { type: String, require: true },
    minimum_amount: { type: String, require: true },
})

const withdrawal_methods = mongoose.model('withdrawal_method', withdrawal_methods_schema)

module.exports = withdrawal_methods