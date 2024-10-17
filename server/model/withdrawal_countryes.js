const mongoose = require('mongoose')

const withdrawal_country_schema = new mongoose.Schema({
    country_code: { type: String, require: true },
    country_name: { type: String, require: true },
})

const withdrawal_countryes = mongoose.model('withdrawal_countrye', withdrawal_country_schema)

module.exports = withdrawal_countryes