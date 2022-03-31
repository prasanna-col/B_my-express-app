const express = require("express");
const router = express.Router();
const { DB_NAME, DB_URL, Client } = require("../constant/db_data");
const Col = require("../constant/db_collections_name");

router.post("/", async (request, response) => {
  Client.connect(async (err) => {
    if (err) throw err;

    const DB = Client.db(DB_NAME);
    const collection = Client.db(DB_NAME).collection(Col.Available_products);
    
    // for pagination
    
    // console.log("request.body ------>", request.body.page);
    var perPage = 2;

    var total_doc = await collection.count();
    // console.log("total docs ------>", total_doc);

    var total_pages = Math.ceil(total_doc / perPage);
    // console.log("total pages ------>", total_pages);

    var pageNumber = request.body.page == null ? 1 : request.body.page;
    // console.log("pageNumber ------>", pageNumber);

    var startFrom = (pageNumber - 1) * perPage;
    // console.log("startFrom ------>", startFrom);

    var res = await collection
      .find({})
      // .sort({ id: -1 })
      .skip(startFrom)
      .limit(perPage)
      .toArray();

    // console.log("request.body.page:", Number(request.body.page)," total pages:",total_pages,)
    
    var next_page = (Number(request.body.page) < total_pages) ? (Number(request.body.page) + 1) : total_pages;

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
