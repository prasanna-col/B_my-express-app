const express = require("express");
const router = express.Router();
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");
const Col = require("../constant/db_collections_name");

router.post("/", (request, response) => {
  Client.connect((err) => {
    if (err) throw err;

    const DB = Client.db(DB_NAME);
    const collection = Client.db(DB_NAME).collection(Col.ordered_menus);

    var del_fee_cond = { $gt: ["$delivery_fee", 0] }
    DB.collection(Col.ordered_menus)
      .aggregate([
        {
          $project: {
            _id: 0,
            // order_id:{$cond: [{ $gt: ["$delivery_fee", 0] } ,  "$order_id","$$REMOVE"] },
            order_id:"$order_id",
            order_type:{$cond: { if: { $gt: ["$delivery_fee", 0] }, then: "self_pickup", else:"delivery"}},
            net_food_amount: { $cond: [ del_fee_cond, "$clear_amount", "$$REMOVE" ] },
            delivery_address:{ $cond: [ del_fee_cond, "$restaurant_address.pickup_address", "$$REMOVE" ]},
            non_veg_menus: {
              $filter: {
                input: "$menus",
                as: "menus_array",
                cond:{ $eq: ["$$menus_array.non_veg", "yes"] },
              },
            },
          },
        },
      ])
      .toArray(function (err, res) {
        if (err) throw err;
        var newres = res.filter(value => Object.keys(value).length !== 0);
        response.json({ message: "success", response: newres });
        Client.close();
      });
  });
});

module.exports = router;
