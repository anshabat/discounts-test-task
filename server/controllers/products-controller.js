const express = require("express");
const { getProducts } = require("../repositories/products-repository");

const productsController = express.Router();

productsController.get("/", (req, res) => {
  getProducts()
    .then((jsonData) => {
      res.json(jsonData);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to read data" });
    });
});

module.exports = productsController;
