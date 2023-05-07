const express = require("express");
require("./db/conn");
const path = require("path");

const app = express();

const Ticker = require("./models/tickers");

app.use(express.json());

app.get("/tickers", (req, res) => {
  Ticker.find({})
    .then((tickers) => {
      res.send("Working Perfectly");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving tickers from the database");
    });
});

app.listen(8000, () => {
  console.log("Running Successfully");
});
