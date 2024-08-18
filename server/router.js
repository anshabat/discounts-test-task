const express = require("express");
const productsRouter = require("./controllers/products-controller.js");

const router = express.Router();

router.use("/products", productsRouter);

module.exports = router;
