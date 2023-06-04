require("dotenv").config();
const http = require("http");
const port = process.env.PORT || 5000;
const app = require("./app/app");

// vercel deploy
// https://assignment-12-manufacturer-company-server-site-8j7uu5jff.vercel.app//api/v1/tools
// http://localhost:5000/api/v1/tools

// express server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running port is ${port}`);
});
