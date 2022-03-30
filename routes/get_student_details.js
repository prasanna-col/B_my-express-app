const express = require("express");
const router = express.Router();
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");
const Col = require("../constant/db_collections_name");

router.post("/", (request, response) => {
  Client.connect((err) => {
    if (err) throw err;

    const DB = Client.db(DB_NAME);
    const collection = Client.db(DB_NAME).collection(Col.candidate_bio_data);

    DB.collection(Col.candidate_marks)
      .aggregate([
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
            _id:0,
            student_id: "$Application_No",
            student_name: "$ph_marks.Name",
            dob: "$ph_marks.DOB",
            core_sub_marks:{
              phy_mark: {$toInt:"$Physics_Marks"},
              Chem_Marks: {$toInt:"$Chem_Marks"},
              Biology_Marks: {$toInt:"$Biology_Marks"},
            },
            core_sub_total: {$sum: [ { $toInt: "$Physics_Marks" }, { $toInt: "$Chem_Marks" }, { $toInt: "$Biology_Marks" }]},
            percentage:{ $avg:[ { $toInt: "$Physics_Marks" }, { $toInt: "$Chem_Marks" }, { $toInt: "$Biology_Marks" }]},
            result:{$cond: { if: { $gte: [ { $avg:[ { $toInt: "$Physics_Marks" }, { $toInt: "$Chem_Marks" }, { $toInt: "$Biology_Marks" }]}, 75 ] }, then: "pass", else: "fail" }}
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
