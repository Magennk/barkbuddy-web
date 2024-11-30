const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// נתיב לקובץ ההסמכה
const credentialsPath = path.join(__dirname, 'Config', 'credentials.json');

// קריאת קובץ ההסמכה
let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(credentialsPath));
} catch (err) {
  console.log('Error reading credentials file:', err);
  process.exit(1);
}

// יצירת לקוח OAuth2
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]  // ודא ש-redirect_uri תואם למה שהוגדר בקונסולה של גוגל
);

// URL לאישור הגישה
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',  // מאפשר שליחה של בקשות מעבר לאישור הראשון
  scope: 'https://www.googleapis.com/auth/calendar.readonly',  // גישה לקריאת יומן
  response_type: 'code'  // מספק את הקוד לשלב הבא
});

// פונקציה לחיבור עם ה-API של Google Calendar
async function getAuthenticatedClient(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

module.exports = { oAuth2Client, authUrl, getAuthenticatedClient };

