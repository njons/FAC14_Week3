// // require http module
// const http = require('http');
// // require routes to redirect server requests from http
// const route = require('./route.js');
//
//
// // make a server
// const server = http.createServer(route);
// // setup the port (heroku style) to allow heroku to pick a port and set a local one at 3000
// const port = process.env.PORT || 3000;
//
// server.listen(port, () => {
//   console.log(`Server is up and running on port ${port}`);
// });


const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
