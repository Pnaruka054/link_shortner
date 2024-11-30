const mongoose = require('mongoose')

const shortLinks_records_schema = new mongoose.Schema({
    userDB_id: { type: String, require: true },
    date: { type: String, require: true },
    longURL: { type: String, require: true },
    shortURL_ID: { type: String, require: true },
    title: { type: String, default:"" },
    discription: { type: String, default:"" },
    totalClicks: { type: Number, default:0 },
    last_30_Days_clicks: { type: Number, default:0 },
    traffic_countries: { type: String, default:"" },
    alias: { type: String, default:"" },
    link_status: { type: String, default:"show" },
    links_referrers: { type: String, default:"" },
})

const shortLinks_records = mongoose.model('shortLinks_records', shortLinks_records_schema)

module.exports = shortLinks_records