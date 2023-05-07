const axios = require("axios");
const mongoose = require("mongoose");

// Define the schema for the ticker data
const tickerSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
});

// Create a model for the ticker data
const Ticker = mongoose.model("Ticker", tickerSchema);

// Fetch data from the API and store it in the database
axios
  .get("https://api.wazirx.com/api/v2/tickers")
  .then((response) => {
    const tickers = Object.values(response.data);
    const top10 = tickers.slice(0, 10);

    top10.forEach((ticker) => {
      const { name, last, buy, sell, volume, base_unit } = ticker;

      const newTicker = new Ticker({
        name,
        last,
        buy,
        sell,
        volume,
        base_unit,
      });

      newTicker
        .save()
        .then(() => console.log(`Saved ${name} ticker to the database`))
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

module.exports = Ticker;
