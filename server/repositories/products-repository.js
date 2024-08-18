const fs = require("fs").promises;
const path = require("path");

function getProducts() {
  const filePath = path.join(__dirname, "..", "data", "products.json");
  return fs.readFile(filePath, "utf8").then((data) => JSON.parse(data));
}

module.exports = {
  getProducts,
};
