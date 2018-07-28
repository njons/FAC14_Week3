// link to handler.js
const handler = require('./handler');

const route = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handler.homeRoute(request, response);
  } else if (url.includes === "public") {
    handler.publicRoute(request, response);
  } else if (url.includes === "search/"){
    handler.queryRoute(request, response);
  } else {
    response.writeHead(404, {"Content-Type" : "text/html"});
    response.end(`this is the custom 404, right here <3`)
  }
};

// make variable accessible to server.js
module.exports = route;
