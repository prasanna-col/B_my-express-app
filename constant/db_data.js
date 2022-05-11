const { MongoClient, ServerApiVersion } = require("mongodb");

const DB_NAME = "Product"

// password can be created from Database Access under security, and Add new database user
// eg: https://cloud.mongodb.com/v2/6197a245ccfe1e69744378b3#security/database/users
const Pwd = "flutterapidata"

// Atlas
// const DB_URL = "mongodb+srv://Flutter_data:"+Pwd+"@cluster0.5kghi.mongodb.net/"+DB_NAME+"?retryWrites=true&w=majority"; 

// Compass
const DB_URL =  "mongodb+srv://Flutter_data:flutterapidata@cluster0.5kghi.mongodb.net/test"; 

const Client = new MongoClient(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = {
  DB_URL,
  Client,
  DB_NAME
};
