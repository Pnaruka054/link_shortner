const user_withdrawal_records = require("../model/user_withdrawal_records")
const withdrawal_methods = require("../model/withdrawal_methods")
const withdrawal_countryes = require("../model/withdrawal_countryes")
const user_signUp_data = require("../model/user_SignUp_Model")
const crypto = require('crypto');


const generateId = () => {
    let id = '';

    while (id.length < 6) {
        // Generate random bytes and convert to hex
        const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase(); // 3 bytes gives 6 hex characters
        id += randomHex.replace(/([0-9A-F]{2})/g, (m) => {
            return Math.random() < 0.5 ? m : String.fromCharCode(m.charCodeAt(0) + 32); // Convert to lowercase
        });
    }

    return id.slice(0, 6); // Ensure exactly 6 characters
};

let current_time_get = async(req, res) => {
    const currentTime = new Date();
    res.json({ time: currentTime.toISOString() }); // Return current time in UTC
}


let user_withdrawal_record_get = async(req, res) => {
    try {
        let userID_DB = req.query.userID_DB
        let withdrawal_records = await user_withdrawal_records.find({userID_DB})
        res.status(200).json({
            success:true,
            msg: withdrawal_records
        }) 
    } catch (error) {
        res.status(400).json({
            success:false,
            error_msg: error.message
        }) 
    }
}

let withdrawal_methods_get = async(req,res) =>{
    try {
        let withdrawal_methods_data = await withdrawal_methods.find()
        res.status(200).json({
            success:true,
            msg: withdrawal_methods_data
        }) 
    } catch (error) {
        res.status(400).json({
            success:false,
            error_msg: error.message
        }) 
    }
}

let withdrawal_country_get = async(req,res) =>{
    try {
        let withdrawal_countryes_data = await withdrawal_countryes.find()
        res.status(200).json({
            success:true,
            msg: withdrawal_countryes_data
        }) 
    } catch (error) {
        res.status(400).json({
            success:false,
            error_msg: error.message
        }) 
    }
}

let withdrawal_record_post = async(req,res) =>{
    try {
        const { status, publisher_earnings, referral_earnings, total_amount,date, withdrawal_method, withdrawal_account, userID_DB, total_withdrawal_amount, pending_withdrawal_amount } = req.body;
        
        if(withdrawal_method === ''){
            return res.status(400).json({
                success:false,
                error_msg: `withdrawal_method`
            })
        }

        let user_withdrawal_method = await withdrawal_methods.findOne({withdrawal_method})

        if((+total_amount) < (+user_withdrawal_method.minimum_amount)){
            return res.status(400).json({
                success:false,
                error_msg: `Withdraw amount should be equal or greater than $${user_withdrawal_method.minimum_amount}`
            })
        }

        let id = generateId();
        let existingRecord = await user_withdrawal_records.findOne({ ID: id });
    
        if (existingRecord) {
            return res.status(400).json({
                success:false,
                error_msg:"Server Error Try Again"
            })
        }

        let withdrawal_record = new user_withdrawal_records({ 
            ID: id, 
            date, 
            status, 
            publisher_earnings, 
            referral_earnings, 
            total_amount, 
            withdrawal_method, 
            withdrawal_account, 
            userID_DB 
        })

        let new_withdrawl_amount = {
            available_amount: "0",
            publisher_earnings: "0",
            referral_earnings: "0",
            pending_withdrawal_amount: (+pending_withdrawal_amount) + (+total_amount),
            total_withdrawal_amount: total_withdrawal_amount
        }

        let withdrawal_record_data = await withdrawal_record.save()

        await user_signUp_data.findByIdAndUpdate(userID_DB,new_withdrawl_amount)

        res.status(200).json({
            success:true,
            msg: withdrawal_record_data
        }) 
    } catch (error) {
        res.status(400).json({
            success:false,
            error_msg: error.message
        }) 
    }
}


module.exports = {
    user_withdrawal_record_get,
    withdrawal_methods_get,
    withdrawal_country_get,
    withdrawal_record_post,
    current_time_get
}