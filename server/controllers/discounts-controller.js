const express = require("express");
const { getDiscounts } = require("../data/repository");

const discountController = express.Router();

discountController.get("/", (req, res) => {
  getDiscounts()
    .then((jsonData) => {
      res.json(jsonData);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to read data" });
    });
});

module.exports = discountController;
