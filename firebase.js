const admin = require("firebase-admin");

const serviceAccount = require("./secret/serviceAccount.json");

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hamsterwars.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { auth, db }