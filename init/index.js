// Intializing DataBase

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

const inDataBase = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "681bbcb93dcc5e73aa7d7df7" }));
  await Listing.insertMany(initData.data); 
  console.log("Data was initialized");
};

inDataBase();
