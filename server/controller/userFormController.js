const { google } = require("googleapis");
const path = require("path");
const sendMail = require("../helper/mailer");
require('dotenv').config(); // Load environment variables from .env

// Load credentials from environment variables
const sheets = google.sheets("v4");

// Authenticate with Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace \n with actual new line
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheetId = process.env.Google_Sheets_ID; // Your Google Sheets ID

// Helper function to process email
const processEmail = (email) => {
  // Convert email to lowercase and remove dots
  return email.toLowerCase().replace(/\./g, '');
};

// Function to check if email already exists in the sheet
const checkEmailExists = async (client, email) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: sheetId,
      range: "Sheet1!B:B", // Assuming emails are in column B
    });

    const emailColumn = response.data.values || [];
    return emailColumn.flat().map(processEmail).includes(processEmail(email));
  } catch (error) {
    throw new Error("Error fetching data from Google Sheets: " + error.message);
  }
};

// Function to handle adding data to Google Sheets and sending email
const handleAddToSheet = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Name, Email, Subject, and Message are required" });
  }

  const processedEmail = processEmail(email);

  try {
    const client = await auth.getClient();

    // Check if the email already exists in the sheet
    const emailExists = await checkEmailExists(client, processedEmail);

    if (!emailExists) {
      // Append the data to the sheet
      await sheets.spreadsheets.values.append({
        auth: client,
        spreadsheetId: sheetId,
        range: "Sheet1!A:D", // Adjust if necessary to include subject
        valueInputOption: "RAW",
        resource: {
          values: [[name, email, subject, message]], // Include subject and message
        },
      });
    }

    let msg = `
      <hr>
      <p><b>User Email ID - </b></p>${email}
      <hr>
      <p><b>User Name - </b></p>${name}
      <hr>
      <p><b>Subject - </b></p>${subject}
      <hr>
      <p><b>Message - </b></p>${message}
      <hr>
    `;
    sendMail("filmyzaal@gmail.com", "From Link Shortner Form", msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding data to Google Sheets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleAddToSheet }; // Export the controller function
