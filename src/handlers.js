const fs = require('fs');
const path = require('path');


// const queryString = require('querystring');

const homeRoute = (request, response) => {
  // when a response goes through - this one is always the index so the content type can be set
  response.writeHead(200, {"Content-Type":"text/html"});
  // read the file
  fs.readFile(
    // create the path where to look
    path.join(__dirname, "..", "public", "index.html"),
    (error, file) => {
      if (error) {
        respose.writeHead(500, `Internal Server Error: ${error}`);
      } else {
        response.end(file);
      }
    }
  );
}

function publicRoute(request, response){

}

function queryRoute(request, response) {

}


// make the handlers functoins accessible to route.js
module.exports = {homeRoute, publicRoute, queryRoute}
