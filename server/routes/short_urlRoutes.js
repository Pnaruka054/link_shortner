const express = require('express')
const route = express()
const user_link_shortnerController = require('../controller/user_link_shortnerController')

route.get('/shortURL_first_page_get', user_link_shortnerController.shortURL_first_page_get)
route.get('/shortURL_secound_page_get', user_link_shortnerController.shortURL_secound_page_get)
route.get('/shortURL_third_page_get', user_link_shortnerController.shortURL_third_page_get)
route.get('/get_all_links', user_link_shortnerController.get_all_links)

route.post('/longurl_to_short_post', user_link_shortnerController.longurl_to_short_post)

route.put('/shortURL_first_page_first_btn_click_put', user_link_shortnerController.shortURL_first_page_first_btn_click_put)
route.put('/shortURL_secound_page_first_btn_click_put', user_link_shortnerController.shortURL_secound_page_first_btn_click_put)
route.put('/shortURL_third_page_first_btn_click_put', user_link_shortnerController.shortURL_third_page_first_btn_click_put)
route.put('/hide_and_show_link', user_link_shortnerController.hide_and_show_link)

module.exports = route