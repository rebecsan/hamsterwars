const firebase = require('../../firebase');

// Your web app's Firebase configuration
const { firebaseConfig } = require('../../secret/firebaseConfig');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();
