const express = require("express");
const router = express.Router();
// const autoIncrement = require("mongodb-autoincrement");
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");

const { Available_products } = require("../constant/db_collections_name");

const sample_data = {
  //   _id: 1,
  customer_address: "kadalur",
  ordered_date: "2020-03-01",
  price_of_product: 10,
  items: [
    {
      Product: "orange",
      Quantity: 60,
      price_of_product: 2.5,
    },
    {
      product: "apples",
      Quantity: 10,
      price_of_product: 2.5,
    },
  ],
  status: "A",
};

router.post("/", (request, response) => {

  // Methoed 1
  Client.connect((err) => {
    if (err) throw err;

    const collection = Client.db(DB_NAME).collection(Available_products);

    var collection_name = Available_products

    // autoIncrement.getNextSequence(DB_NAME, collection_name, function (err, autoIndex) {
    //     let newObj = { ...data, itemId: String(autoIndex) };
    // });

    collection.insertOne(sample_data, function (err, res) {
      if (err) {
        // console.log("insertOne Failed");
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


  // Methoed 2
  //   MongoClient.connect(DB_URL, async function (err, db) {
  //     if (err) throw err;
  //     var dbmy = db.db(DB_NAME);
  //      var collection = dbmy.collection(Available_products)

  //      collection.insertOne(sample_data, function (err, res) {
  //         if (err) throw err;
  //         console.log("data inserted");
  //         response.json(
  //           {
  //             message: "success",
  //             response: sample_data
  //           }
  //         )

  //         db.close()
  //       })
  //   });
});

module.exports = router;
