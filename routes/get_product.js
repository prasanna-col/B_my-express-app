const express = require("express");
const router = express.Router();
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");
const Col = require("../constant/db_collections_name");

router.post("/", async (request, response) => {
  Client.connect(async (err) => {
    if (err) throw err;

    const DB = Client.db(DB_NAME);
    const collection = Client.db(DB_NAME).collection(Col.Available_products);
    // const collection = Client.db(DB_NAME).collection(Col.order_dimon);
    // const collection = Client.db(DB_NAME).collection(Col.ordered_menus);

    var query = { price_of_product: 50 };
    var checkdata = { customer_address: "theni" };
    var updatedata = { $set: { ordered_date: "2020-01-10" } };
    var orderQuery = { Order_Priority: "HIGH" };
    var statusQuery = { status: "A", model_year: "1972" };

    // collection.find({}, { projection: { _id: 0, items: 0 } }).limit(4).toArray( function (err, res) {
    // collection.find(query, { projection: { items: 0 } }).toArray( function (err, res) {
    // collection.updateMany(checkdata, updatedata, function (err, res) {
    // collection.find(orderQuery).limit(10, 20).toArray(function (err, res) {

    // collection.find(query, { projection: { items: 0 } }).toArray( function (err, res) {
    //     if (err) {
    //       response.json({ message: "failed", response: null }); Client.close();
    //     } else {
    //       response.json({ message: "success", response: res }); Client.close();
    //     }
    //   });

    // collection
    //   .aggregate([
    //     {
    //       $match: { model_year: "1975" },
    //     },
    //     {
    //       $lookup: {
    //         from: Col.car_data,
    //         localField: "status",
    //         foreignField: "status_car",
    //         as: "car_details",
    //       },
    //     },
    //   ]).limit(2).toArray(function (err, res) {
    //     if (err) throw err;
    //     response.json({ message: "success", response: res });
    //     Client.close();
    //   });

    // var del_fee_cond = { $gt: ["$delivery_fee", 0] }
    // DB.collection(Col.ordered_menus)
    //   .aggregate([
    //     // {$unwind: "$menus"},
    //     {
    //       $project: {
    //         _id: 0,

    //         // order_id:{$cond: [{ $gt: ["$delivery_fee", 0] } ,  "$order_id","$$REMOVE"] },
    //         order_id:"$order_id",
    //         order_type:{$cond: { if: { $gt: ["$delivery_fee", 0] }, then: "self_pickup", else:"delivery"}},
    //         net_food_amount: { $cond: [ del_fee_cond, "$clear_amount", "$$REMOVE" ] },
    //         delivery_address:{ $cond: [ del_fee_cond, "$restaurant_address.pickup_address", "$$REMOVE" ]},
    //         // have_menuId_16: "$menus", //{ $cond: [ {$eq:["$menus[0].menu_id","16"]}, "yes", "no" ]}
    //         non_veg_menus: {
    //           $filter: {
    //             input: "$menus",
    //             as: "menus_array",
    //             cond:{ $eq: ["$$menus_array.non_veg", "yes"] },// { $cond: [ {$eq:["$$menus_array.menu_id", 16]}, "yes", "no" ]}
    //           },
    //         },
    //       },
    //     },

    //   ])
    //   .toArray(function (err, res) {
    //     if (err) throw err;
    //     var newres = res.filter(value => Object.keys(value).length !== 0);
    //     response.json({ message: "success", response: newres });
    //     Client.close();
    //   });

    // for pagination
    console.log("request.body ------>", request.body.page);
    var perPage = 2;

    var total_doc = await collection.count();
    console.log("total docs ------>", total_doc);

    var total_pages = Math.ceil(total_doc / perPage);
    console.log("total pages ------>", total_pages);

    var pageNumber = request.body.page == null ? 1 : request.body.page;
    console.log("pageNumber ------>", pageNumber);

    var startFrom = (pageNumber - 1) * perPage;
    console.log("startFrom ------>", startFrom);

    var res = await collection
      .find({})
      // .sort({ id: -1 })
      .skip(startFrom)
      .limit(perPage)
      .toArray();

      console.log("request.body.page:", Number(request.body.page)," total pages:",total_pages,)
    var next_page =
     ( Number(request.body.page) < total_pages) ? (Number(request.body.page) + 1) : total_pages;

    var current_page = Number(request.body.page);

    response.json({
      message: "success",
      total_pages,
      next_page,
      current_page,
      response: res,
    });

  });
});

module.exports = router;
