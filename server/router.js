const express = require("express");
const productsRouter = require("./controllers/products-controller.js");
const discountsRouter = require("./controllers/discounts-controller.js");

const router = express.Router();

router.use("/products", productsRouter);
router.use("/discounts", discountsRouter);

module.exports = router;
