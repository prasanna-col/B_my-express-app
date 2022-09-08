const express = require("express");
const router = express.Router();
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");
const Col = require("../constant/db_collections_name");

router.post("/", (request, response) => {
    Client.connect((err) => {
        if (err) throw err;

        const DB = Client.db(DB_NAME);
        // const collection = Client.db(DB_NAME).collection(Col.candidate_bio_data);

        //Note: Get details from 2 collections and return th one  desired output.

        DB.collection(Col.nippon_users).aggregate([
            {
                $lookup: {
                    from: Col.nippon_orders,
                    localField: "user_mob",
                    foreignField: "mobile_no",
                    as: "orders_data"
                }
            },
            {
                $unwind: "$orders_data"
            },
            {
                $lookup: {
                    from: Col.nippon_items,
                    localField: "item",
                    foreignField: "orders_data.item",
                    as: "items_data"
                }
            },
            {
                $unwind: "$items_data"
            },
            // {
            //     $project: {
            //         _id: 0,
            //         result: {
            //             $cond: [{ $gt: [{ $toInt: "$items_data.weight" }, 200] }, {
            //                 _id: 0,
            //                 name: "$name",
            //                 mobile_no: "$mobile_no",
            //                 role_id: "$role_id",
            //                 language_code: "$language_code",
            //                 encrypted_password: "$encrypted_password",
            //                 is_salesman: "$is_salesman",
            //                 is_mobile: "$is_mobile",
            //                 orders_data: {
            //                     item: "$orders_data.item",
            //                     qty: "$orders_data.qty",
            //                     user_mob: "$orders_data.user_mob",
            //                     items_data: {
            //                         item: "$items_data.item",
            //                         color: "$items_data.color",
            //                         weight: "$items_data.weight"
            //                     }
            //                 }
            //             }, null]
            //         }
            //     },
            // },
            {
                $project: {
                     _id: 0,
                    result: {
                        $cond: {
                            if: { $gte: [{ $toInt: "$items_data.weight" }, 150] }, then: {
                                _id: 0,
                                name: "$name",
                                mobile_no: "$mobile_no",
                                role_id: "$role_id",
                                language_code: "$language_code",
                                encrypted_password: "$encrypted_password",
                                is_salesman: "$is_salesman",
                                is_mobile: "$is_mobile",
                                orders_data: {
                                    item: "$orders_data.item",
                                    qty: "$orders_data.qty",
                                    user_mob: "$orders_data.user_mob",
                                    items_data: {
                                        item: "$items_data.item",
                                        color: "$items_data.color",
                                        weight: "$items_data.weight"
                                    }
                                }
                            }, else: ""
                        }
                    }


                },
            },
            // {
            //     $project: {
            //          _id: 0,
            //                     name: "$name",
            //                     mobile_no: "$mobile_no",
            //                     role_id: "$role_id",
            //                     language_code: "$language_code",
            //                     encrypted_password: "$encrypted_password",
            //                     is_salesman: "$is_salesman",
            //                     is_mobile: "$is_mobile",
            //                     orders_data: {
            //                         item: "$orders_data.item",
            //                         qty: "$orders_data.qty",
            //                         user_mob: "$orders_data.user_mob",
            //                         items_data: {
            //                             item: "$items_data.item",
            //                             color: "$items_data.color",
            //                             weight: "$items_data.weight"
            //                         }
            //                     }
            //     }
            // }

        ]).toArray(function (err, res) {
            if (err) throw err;

            // var newres = res.filter(value => Object.keys(value.result.message) !== "no data");

            console.log(JSON.stringify(res));
            response.send(res);
        });

    });

});

module.exports = router;
