var express = require("express");
var router = express.Router();

const { fb, firebaseToken, options } = require("../constant/fbconfig");

const payload = {
  notification: {
    title: "Express Express",
    body: "Accept the pain",
    icon: "https://foo.bar.pizza-monster.png" // pass the image url
     
    
  },
};

router.get("/", function (req, res, next) {
  fb.messaging()
    .sendToDevice(firebaseToken, payload, options)
    .then((response) => {
      console.log("Successfully sent notifications! ", response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.status(200).send(error);
    });

    // sample code for multicast
    // try {
    //     const { title, body, icon } = req.body;
    //     await admin.messaging().sendMulticast({
    //       tokens,
    //       notification: {
    //         title,
    //         body,
    //         icon,
    //       },
    //     });
    //     res.status(200).json({ message: "Successfully sent notifications!" });
    //   } catch (err) {
    //     res
    //       .status(err.status || 500)
    //       .json({ message: err.message || "Something went wrong!" });
    //   }
});

module.exports = router;
