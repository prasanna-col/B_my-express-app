
var admin = require("firebase-admin");

var serviceAccount = require('./demotest-68868-firebase-adminsdk-awcpz-08e7575acd.json');

console.log("serviceAccount --> ", serviceAccount)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

