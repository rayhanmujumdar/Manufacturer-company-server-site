const http = require("http");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = require("./app/app");

// vercel deploy
// https://assignment-12-manufacturer-company-server-site-rayhanmujumdar.vercel.app 

// express server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running port is ${port}`);
});
