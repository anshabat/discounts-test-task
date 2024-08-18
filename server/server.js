const http = require("node:http");
const app = require("./app.js");

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`Server is running on 3000`);
});
