const cron = require('node-cron');
const userMonthly_records = require("../model/userMonthlyRecords");
const userDate_records = require('../model/userDateRecords'); 
const user_signUp_data = require('../model/user_SignUp_Model');

// Function to generate all dates of the current month
let insert_month_date_records = () => {
    function getAllDatesOfCurrentMonth() {
        const date = new Date();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        let dates = [];
    
        // Iterating over all days in the month
        for (let day = 1; day <= 31; day++) {
            const currentDate = new Date(currentYear, currentMonth, day);
            if (currentDate.getMonth() !== currentMonth) break; // Stop if the month changes
            dates.push(currentDate.toLocaleDateString('en-CA')); // Format: YYYY-MM-DD
        }
    
        return dates;
    }

    async function createCurrentMonthDocument() {
        const date = new Date();
        const currentMonthName = date.toLocaleString('default', { month: 'long' });
        const currentYear = date.getFullYear();
        const monthName = `${currentMonthName} ${currentYear}`; // Format: "January 2024"
        
        const existingMonth = await userMonthly_records.findOne({ monthName: monthName });
    
        if (!existingMonth) {
            // Get all userSignUpData object IDs
            const allUsers = await user_signUp_data.find({}, '_id');
            const userIDs = allUsers.map(user => user._id);
    
            // Create a new Monthly record for each user
            for (let userID of userIDs) {
                const newMonthlyRecord = new userMonthly_records({
                    monthName: monthName, // Updated to include year
                    userDB_ID: userID
                });
                await newMonthlyRecord.save();
            }
    
            // Create date_records entries for all users, with separate documents for each date
            const datesOfCurrentMonth = getAllDatesOfCurrentMonth();
            for (let userID of userIDs) {
                for (let date of datesOfCurrentMonth) {
                    const newDateRecord = new userDate_records({
                        userDB_ID: userID,
                        date: date,
                        monthName: monthName // Updated to include year
                    });
                    await newDateRecord.save();
                }
            }
        } 
    }
     
    createCurrentMonthDocument();
    // Schedule cron job to run every month on the first day at midnight
    cron.schedule('0 0 1 * *', () => {
        createCurrentMonthDocument();
        console.log('Monthly check for document creation executed');
    });    
}

module.exports = insert_month_date_records