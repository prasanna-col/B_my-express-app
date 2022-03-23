const firebase = require("firebase-admin");

const serviceAccount = require('./demotest-68868-firebase-adminsdk-awcpz-08e7575acd.json');

// Device ID
const firebaseToken = "d7jVdx9tR1uZVBbUtAZX4L:APA91bGOqH5ojnwnhlLUo7vdMss85D4XYzwddUlWBC7MIuJXN68DiYUIV48NaOQ2ZGucSVes35wdO-TLPhxoP_gI4f5KrYrSd6R3GvF-0T5XPOF7VzThbSrJL66gYrEe-n4VmZ3mKLF_"

var fb = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://demotest-68868-default-rtdb.firebaseio.com/"
});

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
};

module.exports = { fb, firebaseToken, options };