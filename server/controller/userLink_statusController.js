const userMonthly_records = require("../model/userMonthlyRecords");
const userDate_records = require('../model/userDateRecords');
const user_signUp_data = require('../model/user_SignUp_Model');

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

    const allUsers = await user_signUp_data.find();
    
    // Get all userSignUpData object IDs
    const userIDs = allUsers.map(user => user._id);

    // For each user, check if they already have a record for this month
    for (let userID of userIDs) {
        const existingMonth = await userMonthly_records.findOne({ 
            monthName: monthName, 
            userDB_id: userID 
        });

        // If no record exists for the current month, create a new record
        if (!existingMonth) {
            const newMonthlyRecord = new userMonthly_records({
                monthName: monthName, // Include the year in the monthName
                userDB_id: userID
            });
            await newMonthlyRecord.save();

            // Create date_records entries for all users, with separate documents for each date of the current month
            const datesOfCurrentMonth = getAllDatesOfCurrentMonth();
            for (let date of datesOfCurrentMonth) {
                const newDateRecord = new userDate_records({
                    userDB_id: userID,
                    date: date,
                    monthName: monthName // Include the year in the monthName
                });
                await newDateRecord.save();
            }
        }
    }
}

module.exports = {
    createCurrentMonthDocument
}