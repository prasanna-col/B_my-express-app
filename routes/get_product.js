const express = require("express");
const router = express.Router();
const { DB_NAME,DB_URL, Client } = require("../constant/db_data");
const { Available_products } = require("../constant/db_collections_name");


router.post("/", (request, response) => {

  Client.connect((err) => {
    if (err) throw err;

    const collection = Client.db(DB_NAME).collection(Available_products);

    collection.insertOne(sample_data, function (err, res) {
        if (err) {
            console.log("Failed");
            response.json({
                message: "failed",
                response: null
            });
           Client.close();
        } else {
            // console.log("1 Product updated");
            response.json({
                message: "success",
                response: sample_data
            });
           Client.close();
        }
    });
    
  });
});

module.exports = router;
