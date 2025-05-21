const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const mongoDB_URL = "mongodb://127.0.0.1:27017/homescape";

main()
  .then(() => {
    console.log("Connected to database..");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoDB_URL);
}

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
