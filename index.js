const Express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const serviceAccount = require("./demotest-68868-firebase-adminsdk-awcpz-08e7575acd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [];

const app = new Express();
const router = Express.Router();

app.use(bodyParser.json());
app.use("/", router);

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

router.post("/register", (req, res) => {
  tokens.push(req.body.token);
  res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.post("/notifications", async (req, res) => {
  try {
    const { title, body, imageUrl } = req.body;
    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
        imageUrl,
      },
    });
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});
// import express from 'express'
// import bodyparser from 'body-parser'
// import { admin } from './firebase-config'

// const app = express()
// app.use(bodyparser.json())

// const port = 3000
// const notification_options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24
//   };
// app.post('/firebase/notification', (req, res)=>{
//     const  registrationToken = req.body.registrationToken
//     const message = req.body.message
//     const options =  notification_options
    
//       admin.messaging().sendToDevice(registrationToken, message, options)
//       .then( response => {

//        res.status(200).send("Notification sent successfully")
       
//       })
//       .catch( error => {
//           console.log(error);
//       });

// })
// app.listen(port, () =>{
// console.log("listening to port"+port)
// })
