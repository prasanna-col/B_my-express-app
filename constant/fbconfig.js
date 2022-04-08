const firebase = require("firebase-admin");

const serviceAccount = require('./demotest-68868-firebase-adminsdk-awcpz-08e7575acd.json');

// Device ID
const firebaseToken = "e-2wIYGmRLazGrBSLHCq9p:APA91bG-vZCdH8iFOQBY1LsIunwBHjVzFxBju0oGmg9DrsKFky8cH4BTST4Vp72niCHZq79-C3RtVAtuYzTaAtmKUqxv71rOMhp7_5kqt2rtuZEXneO5LUMKzo2aNB3xTjwa-lE5LE_d"; // office android device

var fb = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://demotest-68868-default-rtdb.firebaseio.com/" // this URl from Realtime_database/data
});

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
};

module.exports = { fb, firebaseToken, options };