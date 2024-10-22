require("dotenv").config()
const express = require('express')
const app = express()
// const path = require('path')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const user_withdrawal_routes = require("./routes/user_withdrawal_routes")
const short_urlRoutes = require("./routes/short_urlRoutes")
const cors = require('cors')
const PORT = process.env.PORT
const bodyParser = require("body-parser");
const {createCurrentMonthDocument} = require("./controller/userLink_statusController")

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

cron.schedule('0 0 1 * *', () => {
    createCurrentMonthDocument();
    console.log('Monthly check for document creation executed');
})

async function modelCalled() {
   try {
    await mongoose.connect(process.env.DATABASE_URL)
       console.log('database connected successfully')
   } catch (error) {
    console.log(error)
   }
}

modelCalled()

app.use('/api', userRouter)
app.use('/withdrawal', user_withdrawal_routes)
app.use('/linkShort', short_urlRoutes)
app.use('/', authRouter)

app.listen(PORT, () => {
    console.log(`server started on port - ${PORT}`)
})