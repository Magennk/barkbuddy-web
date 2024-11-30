const { getAuthenticatedClient, authUrl } = require('./googleCalendar');
const readline = require("readline");

// שלב 1: הצגת ה-URL לאישור גישה
console.log("Authorize this app by visiting this url:", authUrl);

// שלב 2: חיבור עם readline כדי לקרוא את הקוד מהמשתמש
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", async (code) => {
  try {
    const oAuth2Client = await getAuthenticatedClient(code);
    console.log("Successfully authenticated!");
    
    // שלב 3: יצירת אירוע (לאחר האימות)
    // כאן אפשר להוסיף קוד ליצירת אירוע בגוגל קלנדר (לא הוסף בקוד הנוכחי)
    rl.close();
  } catch (error) {
    console.error("Error during authentication", error);
    rl.close();
  }
});

