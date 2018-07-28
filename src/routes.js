// link to handler.js
const handlers = require('./handlers');

const routes = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handlers.homeRoute(request, response);
  } else if (url.includes === "public") {
    handlers.publicRoute(request, response);
  } else if (url.includes === "search/"){
    handlers.queryRoute(request, response);
  } else {
    response.writeHead(404, {"Content-Type" : "text/html"});
    response.end(`this is the custom 404, right here <3`)
  }
};

// make the route variable accessible to server.js
module.exports = routes;
