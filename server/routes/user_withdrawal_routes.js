const express = require('express')
const route = express()
const userTransactionController = require("../controller/userTransactionController")

route.get('/user_withdrawal_record_get', userTransactionController.user_withdrawal_record_get)
route.get('/withdrawal_methods', userTransactionController.withdrawal_methods_get)
route.get('/withdrawal_country_get', userTransactionController.withdrawal_country_get)
route.get('/current_time', userTransactionController.current_time_get);

route.post('/withdrawal_record_post', userTransactionController.withdrawal_record_post)

module.exports = route