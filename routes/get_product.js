const express = require("express");
const router = express.Router();
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");
const Col = require("../constant/db_collections_name");

router.post("/", (request, response) => {
  Client.connect((err) => {
    if (err) throw err;

    // const collection = Client.db(DB_NAME).collection(Col.Available_products);
    const collection = Client.db(DB_NAME).collection(Col.order_dimon);

    var query = { price_of_product: 50 };
    var checkdata = { customer_address: "theni" };
    var updatedata = { $set: { ordered_date: "2020-01-10" } };
    var orderQuery = { Order_Priority: "HIGH" };

    // collection.find({}, { projection: { _id: 0, items: 0 } }).limit(4).toArray( function (err, res) {
    // collection.find(query, { projection: { items: 0 } }).toArray( function (err, res) {
    // collection.updateMany(checkdata, updatedata, function (err, res) {

    // collection.find(orderQuery).limit(10, 20).toArray(function (err, res) {
    //     if (err) {
    //       response.json({ message: "failed", response: null });
    //       Client.close();
    //     } else {
    //       response.json({ message: "success", response: res });
    //       Client.close();
    //     }
    //   });

    collection.aggregate([
        { $lookup:
           {
             from: Col.car_data,
             localField: '_id',
             foreignField: '_id',
             as: 'orderdetails'
           }
         }
        ]).toArray(function(err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
      });

    
  });
});

module.exports = router;
