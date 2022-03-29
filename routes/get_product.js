const express = require("express");
const router = express.Router();
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");
const Col = require("../constant/db_collections_name");

router.post("/", (request, response) => {
  Client.connect((err) => {
    if (err) throw err;

    const DB = Client.db(DB_NAME);
    // const collection = Client.db(DB_NAME).collection(Col.Available_products);
    // const collection = Client.db(DB_NAME).collection(Col.order_dimon);
    const collection = Client.db(DB_NAME).collection(Col.candidate_bio_data);

    var query = { price_of_product: 50 };
    var checkdata = { customer_address: "theni" };
    var updatedata = { $set: { ordered_date: "2020-01-10" } };
    var orderQuery = { Order_Priority: "HIGH" };
    var statusQuery = { status: "A", model_year: "1972" };

    // collection.find({}, { projection: { _id: 0, items: 0 } }).limit(4).toArray( function (err, res) {
    // collection.find(query, { projection: { items: 0 } }).toArray( function (err, res) {
    // collection.updateMany(checkdata, updatedata, function (err, res) {
    // collection.find(orderQuery).limit(10, 20).toArray(function (err, res) {

    // collection.find(statusQuery).toArray(function (err, res) {
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

    DB.collection(Col.candidate_marks)
      .aggregate([
        // {
        //   $group: {
        //     totalmarks:{$sum:["$Physics_Marks", "$Chem_Marks", "$Biology_Marks"]}
        //   },
        // },
        {
          $lookup: {
            from: Col.candidate_bio_data,
            localField: "Application_No",
            foreignField: "Application_No",
            as: "ph_marks",
          },
        },
        {
          $unwind: "$ph_marks",
        },
        {
          $project: {
            student_id: "$Application_No",
            student_name: "$ph_marks.Name",
            dob: "$ph_marks.DOB",
            core_sub_marks:{
              phy_mark: {$toInt:"$Physics_Marks"},
              Chem_Marks: {$toInt:"$Chem_Marks"},
              Biology_Marks: {$toInt:"$Biology_Marks"},
            },
            core_sub_total: {$sum: [ { $toInt: "$Physics_Marks" }, { $toInt: "$Chem_Marks" }, { $toInt: "$Biology_Marks" }, ],},
          },
        },
      ])
      .toArray(function (err, res) {
        if (err) throw err;
        response.json({ message: "success", response: res });
        Client.close();
      });
  });
});

module.exports = router;
