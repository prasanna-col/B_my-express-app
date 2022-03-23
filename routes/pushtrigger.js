var express = require('express');
var router = express.Router();

const { fb, firebaseToken, options } = require('../constant/fbconfig')

const payload = {
    notification: {
        title: 'Express Express',
        body: 'Accept the pain',
    }
};

router.get('/', function (req, res, next) {
    fb.messaging().sendToDevice(firebaseToken, payload, options)
        .then((response) => {
            console.log('Successfully sent message:', response);
            res.status(200).send(response)
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            res.status(200).send(error)
        });
});

module.exports = router;
