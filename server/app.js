const express = require("express");
const cors = require("cors");
const router = require("./router.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/v1", router);

module.exports = app;
