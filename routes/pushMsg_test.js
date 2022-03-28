var express = require("express");
var router = express.Router();

const { fb, firebaseToken, options } = require("../constant/fbconfig");

const tokens = [];

router.post("/register", (req, res) => {
  tokens.push(req.body.token);
  res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.post("/notifications", async (req, res) => {
  try {
    const { title, body, imageUrl } = req.body;
    await fb.messaging().sendMulticast({
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
