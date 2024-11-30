const crypto = require('crypto');
let shortLinks_records = require("../model/shortlinks_records")
const user_signUp_data = require('../model/user_SignUp_Model')
const UserIPRecord = require('../model/userIp_records')
const userDate_records = require('../model/userDateRecords');
const userMonthly_records = require('../model/userMonthlyRecords')

let shortURL_ID_genrater = () => {
    let code;
    do {
        code = crypto.randomBytes(4).toString('hex');
    } while (/\d$/.test(code))
    return code;
}
function getClientIp(req) {
    // X-Forwarded-For header ko check karein
    let ipAddress = req.headers['x-forwarded-for'];

    if (ipAddress) {
        // Agar multiple IPs hain, to pehla IP lo (jo asli client ko represent karta hai)
        ipAddress = ipAddress.split(',')[0].trim();
    } else {
        // Agar header nahi hai, to connection se IP lo
        ipAddress = req.connection.remoteAddress || req.ip;
    }

    // IPv6 format se IPv4 mein convert karna
    if (ipAddress && ipAddress.startsWith('::ffff:')) {
        ipAddress = ipAddress.split(':').pop();
    }

    // Localhost ko handle karna
    return ipAddress === '::1' ? '127.0.0.1' : ipAddress;
}

let longurl_to_short_post = async (req, res) => {
    try {
        let { userDB_id, longURL, alias, date } = req.body;
        let shortURL_ID = alias ? alias : shortURL_ID_genrater(); // Use alias if provided, else generate new ID

        let userData = await user_signUp_data.findById(userDB_id)
        if (userData.is_verified === 0) {
            return res.status(400).json({
                success: false,
                msg: "First Verify Your Email to short Link"
            });
        }
        // Check if alias (or generated shortURL_ID) already exists in the records
        let shortIDExists = await shortLinks_records.findOne({ shortURL_ID: shortURL_ID });
        if (shortIDExists) {
            return res.status(400).json({
                success: false,
                msg: alias ? "Alias already available, try another" : "Sorry My Mistake, Please try again"
            });
        }

        // Prepare the data for saving
        let req_data = {
            userDB_id,
            date,
            longURL,
            shortURL_ID,
            alias
        };

        // Save the new short link record
        let shortLinks_records_enter = new shortLinks_records(req_data);
        await shortLinks_records_enter.save();

        // Send success response
        res.status(200).json({
            success: true,
            msg: shortURL_ID
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

// for first page of ads
let shortURL_first_page_get = async (req, res) => {
    try {
        let ip = getClientIp(req);
        let shortID = req.query.shortID;

        // Check if the short ID exists
        let idExist = await shortLinks_records.findOne({ shortURL_ID: shortID });

        if (idExist) {
            // Extract userDB_id from idExist
            let userDB_id = idExist.userDB_id;

            // Check if the IP address already exists in userIP_record collection with the same userDB_id
            let existingIPRecord = await UserIPRecord.findOne({ ip_address: ip, userDB_id: userDB_id });

            // Store IP address and userDB_id in userIP_record collection only if it doesn't already exist
            if (userDB_id && ip && !existingIPRecord) {
                const userIPData = new UserIPRecord({
                    userDB_id: userDB_id,
                    ip_address: ip
                });

                await userIPData.save(); // Save the document to the database
            }
        }

        // Send response
        res.status(200).json({
            success: true,
            msg: idExist
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
};

let shortURL_first_page_first_btn_click_put = async (req, res) => {
    try {
        let ip = getClientIp(req);

        // Check if the IP address exists in the UserIPRecord collection
        let existingIPRecord = await UserIPRecord.findOne({ ip_address: ip });

        if (existingIPRecord) {
            // Check if clicks is 0
            if (existingIPRecord.clicks === 0) {
                // Increment the clicks value by 1
                existingIPRecord.clicks += 1;
                await existingIPRecord.save(); // Save the updated document to the database
            }
        }

        // Send response
        res.status(200).json({
            success: true,
            msg: 'Click recorded successfully or already counted.'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
};

// for secound page of ads
let shortURL_secound_page_get = async (req, res) => {
    try {
        let shortID = req.query.shortID; // Get shortID from request query
        let ip = getClientIp(req); // Get client IP address

        // Check if the short ID exists in shortLinks_records
        let idExist = await shortLinks_records.findOne({ shortURL_ID: shortID });

        // Check if the IP address exists in UserIPRecord
        let existingIPRecord = await UserIPRecord.findOne({ ip_address: ip });

        // Determine success based on both checks
        if (idExist && existingIPRecord) {
            res.status(200).json({
                success: true,
                msg: 'Both shortID and IP address exist.'
            });
        } else {
            res.status(200).json({
                success: false,
                msg: 'Either shortID or IP address does not exist.'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
};

let shortURL_secound_page_first_btn_click_put = async (req, res) => {
    try {
        let ip = getClientIp(req); // Get client IP address

        // Check if the IP address exists in the UserIPRecord collection
        let existingIPRecord = await UserIPRecord.findOne({ ip_address: ip });

        // If the record exists
        if (existingIPRecord) {
            // Check if clicks is 1
            if (existingIPRecord.clicks === 1) {
                // Increment the clicks value by 1 (set it to 2)
                existingIPRecord.clicks = 2;
                await existingIPRecord.save(); // Save the updated document to the database
            }
        }

        // Send response
        res.status(200).json({
            success: true,
            msg: 'Click recorded successfully or already counted.'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
};

// for third page of ads
let shortURL_third_page_get = async (req, res) => {
    try {
        let shortID = req.query.shortID; // Get shortID from request query
        let ip = getClientIp(req); // Get client IP address

        // Check if the short ID exists in shortLinks_records
        let idExist = await shortLinks_records.findOne({ shortURL_ID: shortID });

        // Check if the IP address exists in UserIPRecord
        let existingIPRecord = await UserIPRecord.findOne({ ip_address: ip });

        // Determine success based on both checks
        if (idExist && existingIPRecord) {
            res.status(200).json({
                success: true,
                msg: idExist
            });
        } else {
            res.status(200).json({
                success: false,
                msg: 'Either shortID or IP address does not exist.'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
};

let shortURL_third_page_first_btn_click_put = async (req, res) => {
    try {
        let ip = getClientIp(req); // Client IP address
        let shortID = req.query.shortID; // Get shortID from request

        // Check if the IP address exists in UserIPRecord and clicks is 2
        let existingIPRecord = await UserIPRecord.findOne({ ip_address: ip });

        // Check if the short ID exists in shortLinks_records
        let idExist = await shortLinks_records.findOne({ shortURL_ID: shortID });

        if (existingIPRecord && idExist && existingIPRecord.clicks === 2) {
            // Increment clicks in UserIPRecord
            existingIPRecord.clicks += 1;
            await existingIPRecord.save();

            // Increment totalClicks in shortLinks_records
            idExist.totalClicks += 1;
            await idExist.save();

            // Get userDB_id from existingIPRecord
            let userDB_id = existingIPRecord.userDB_id;

            // Update publisher earnings in user_signUp_data
            let userSignUp = await user_signUp_data.findById(userDB_id);

            if (userSignUp) {
                // Convert available_amount and publisher_earnings from string to number
                let availableAmount = parseFloat(userSignUp.available_amount) || 0;
                let publisherEarnings = parseFloat(userSignUp.publisher_earnings) || 0;

                // Increment values by 0.001
                availableAmount += 0.001;
                publisherEarnings += 0.001;

                // Update the fields in the database
                userSignUp.available_amount = availableAmount.toString();
                userSignUp.publisher_earnings = publisherEarnings.toString();
                await userSignUp.save();
                // Get refer_by from the current user's data
                let refer_by = userSignUp.refer_by;
                // Find the referring user in user_signUp_data using userName

                // Get current UTC time to update daily stats in userDate_records
                const currentDate = new Date();
                const utcDateString = currentDate.toISOString().split('T')[0]; // Get current UTC date (YYYY-MM-DD)

                function convertToMonthYearFormat(utcDateString) {
                    // Step 1: UTC date ko Date object mein convert karna
                    const date = new Date(utcDateString);

                    // Step 2: Month aur year ko extract karna aur format karna
                    const options = { year: 'numeric', month: 'long' }; // "long" month name ko use karega (e.g., November)
                    const monthName = date.toLocaleDateString('en-US', options);

                    return monthName;  // "November 2024" type ka output milega
                }

                const monthName = convertToMonthYearFormat(utcDateString);

                if (refer_by) {
                    let referringUser = await user_signUp_data.findOne({ userName: refer_by });
                    // Increment referral_earnings by 25% of the current user's publisher_earnings
                    if (referringUser) {
                        let referralEarnings = parseFloat(referringUser.referral_earnings)
                        let available_mount = parseFloat(referringUser.available_amount)
                        referralEarnings += 0.25 * 0.001;
                        referringUser.referral_earnings = referralEarnings.toString();
                        referringUser.available_amount = (available_mount + 0.25 * 0.001).toString();
                        await referringUser.save();

                        let userDB_id = referringUser._id

                        // Find the userDate_records entry for the current user and date
                        let userDateRecord = await userDate_records.findOne({
                            userDB_id: userDB_id,
                            date: utcDateString
                        });

                        if (userDateRecord) {
                            // Convert referral_earnings from string to number, increment, and then convert back to string
                            userDateRecord_referral_earnings = parseFloat(userDateRecord.referral_earnings) || 0; // Convert to number or default to 0 if not a valid number
                            userDateRecord_referral_earnings += 0.25 * 0.001;  // Increment referral_earnings
                            userDateRecord.referral_earnings = userDateRecord_referral_earnings.toString();  // Convert back to string

                            await userDateRecord.save();

                            let userMonthData = await userMonthly_records.findOne({
                                userDB_id: userDB_id,
                                monthName
                            })
                            if (userMonthData) {
                                let userMonthData_referral_earnings = parseFloat(userMonthData.referral_earnings)
                                userMonthData_referral_earnings += 0.25 * 0.001;  // Increment referral_earnings
                                userMonthData.referral_earnings = userMonthData_referral_earnings.toString()

                                // Save the updated userMonthData
                                await userMonthData.save();
                            }
                        }
                    }
                }

                // Find the userDate_records entry for the current user and date
                let userDateRecord = await userDate_records.findOne({
                    userDB_id: userDB_id,
                    date: utcDateString
                });

                let userMonthData = await userMonthly_records.findOne({
                    userDB_id: userDB_id,
                    monthName
                })

                if (userDateRecord) {
                    // Convert views from string to number, increment, and then convert back to string
                    userDateRecord_views = parseInt(userDateRecord.views) || 0; // Convert to number or default to 0 if not a valid number
                    userDateRecord_views += 1;  // Increment views
                    userDateRecord.views = userDateRecord_views.toString();  // Convert back to string

                    // Convert publisher_earnings from string to number, increment, and then convert back to string
                    userDateRecord_publisher_earnings = parseFloat(userDateRecord.publisher_earnings) || 0; // Convert to number or default to 0 if not a valid number
                    userDateRecord_publisher_earnings += 0.001;  // Increment publisher_earnings
                    userDateRecord.publisher_earnings = userDateRecord_publisher_earnings.toString();  // Convert back to string

                    // Convert dailyCPM from string to number, set to a fixed value, and then convert back to string
                    userDateRecord_dailyCPM = parseFloat(userDateRecord.dailyCPM) || 0; // Convert to number or default to 0 if not a valid number
                    userDateRecord_dailyCPM = 200;  // Set dailyCPM to 200 (fixed value)
                    userDateRecord.dailyCPM = userDateRecord_dailyCPM.toString();  // Convert back to string

                    // Save the updated userDateRecord
                    await userDateRecord.save();

                    if (userMonthData) {
                        let userMonthData_total_earnings = parseFloat(userMonthData.total_earnings)
                        userMonthData_total_earnings += 0.001;  // Increment total_earnings
                        userMonthData.total_earnings = userMonthData_total_earnings.toString()

                        let userMonthData_total_views = parseFloat(userMonthData.total_views)
                        userMonthData_total_views += 1;  // Increment total_views
                        userMonthData.total_views = userMonthData_total_views.toString()

                        // Save the updated userMonthData
                        await userMonthData.save();
                    }
                }

            }

            // Send success response
            res.status(200).json({
                success: true,
                msg: 'Click recorded and earnings updated successfully.'
            });
        } else {
            // If conditions are not met, send an appropriate response
            res.status(400).json({
                success: false,
                msg: 'Conditions not met for click increment or earnings update.'
            });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
};

let get_all_links = async (req, res) => {
    try {
        // Extract userDB_id and link_status from the request
        let { userDB_id, link_status } = req.query;

        // Find documents in shortLinks_records matching both userDB_id and link_status
        let links = await shortLinks_records.find({
            userDB_id: userDB_id,
            link_status: link_status
        });

        // Send the response with the found links
        res.status(200).json({
            success: true,
            data: links
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        });
    }
};


let hide_and_show_link = async (req, res) => {
    try {
        // Extract status and shortID from the request
        let { status, shortID } = req.query;

        // Determine the new status based on the current status
        let newStatus = status === "show" ? "hide" : status === "hide" ? "show" : null;

        if (!newStatus) {
            // If status is neither "show" nor "hide", send an error response
            return res.status(400).json({
                success: false,
                msg: "Invalid status value"
            });
        }

        // Find and update the record in shortLinks_records with the new status
        let updatedRecord = await shortLinks_records.findOneAndUpdate(
            { shortURL_ID: shortID },
            { link_status: newStatus },
            { new: true }
        );

        if (!updatedRecord) {
            // If no record is found, send an error response
            return res.status(404).json({
                success: false,
                msg: "Record not found"
            });
        }

        // Send success response with the updated record
        res.status(200).json({
            success: true,
            msg: "Link status updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};



module.exports = {
    longurl_to_short_post,
    shortURL_first_page_get,
    shortURL_first_page_first_btn_click_put,
    shortURL_secound_page_get,
    shortURL_secound_page_first_btn_click_put,
    shortURL_third_page_get,
    shortURL_third_page_first_btn_click_put,
    get_all_links,
    hide_and_show_link
}