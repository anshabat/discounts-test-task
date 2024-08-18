const express = require("express");

const productsController = express.Router();

productsController.get("/", (req, res) => {
  res.status(200).json({ message: "get products" });
});

module.exports = productsController;
