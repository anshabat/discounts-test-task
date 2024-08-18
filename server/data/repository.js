const fs = require("fs").promises;
const path = require("path");

function getData(fileName) {
  const filePath = path.join(__dirname, fileName);
  return fs.readFile(filePath, "utf8").then((data) => JSON.parse(data));
}

module.exports = {
  getProducts: () => getData("products.json"),
  getDiscounts: () => getData("discounts.json"),
};
