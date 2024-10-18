const crypto = require('crypto');
let shortLinks_records = require("../model/shortlinks_records")
const user_signUp_data = require('../model/user_SignUp_Model')
const UserIPRecord = require('../model/userIp_records')

let shortURL_ID_genrater = () => {
    let code;
    do {
        code = crypto.randomBytes(4).toString('hex');
    } while (/\d$/.test(code))
    return code;
}
function getClientIp(req) {
    let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    if (ipAddress && ipAddress.startsWith('::ffff:')) {
        ipAddress = ipAddress.split(':').pop();
    }
    return ipAddress === '::1' ? '127.0.0.1' : ipAddress;
}



let longurl_to_short_post = async (req, res) => {
    try {
        let { userID_DB, longURL, alias, date } = req.body;
        let shortURL_ID = alias ? alias : shortURL_ID_genrater(); // Use alias if provided, else generate new ID

        let userData = await user_signUp_data.findById(userID_DB)
        if(userData.is_verified === 0){
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
            userID_DB,
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
            // Extract userID_DB from idExist
            let userID_DB = idExist.userID_DB;

            // Check if the IP address already exists in userIP_record collection with the same userID_DB
            let existingIPRecord = await UserIPRecord.findOne({ ip_address: ip, userID_DB: userID_DB });

            // Store IP address and userID_DB in userIP_record collection only if it doesn't already exist
            if (userID_DB && ip && !existingIPRecord) {
                const userIPData = new UserIPRecord({
                    userID_DB: userID_DB,
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

            // Get userID_DB from existingIPRecord
            let userID_DB = existingIPRecord.userID_DB;

            
            // Update publisher earnings in user_signUp_data
            let userSignUp = await user_signUp_data.findById( userID_DB);

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
        // Extract userID_DB and link_status from the request
        let { userID_DB, link_status } = req.query;
        
        // Find documents in shortLinks_records matching both userID_DB and link_status
        let links = await shortLinks_records.find({ 
            userID_DB: userID_DB, 
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