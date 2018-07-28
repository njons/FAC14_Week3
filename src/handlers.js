const fs = require('fs');
const path = require('path');


// const queryString = require('querystring');

const homeRoute = (request, response) => {
  // when files are found - this one is always the index so the content type can be set
  response.writeHead(200, {"Content-Type":"text/html"});
  // read the file
  fs.readFile(
    // create the path where to look
    path.join(__dirname, "..", "public", "index.html"),
    (error, file) => {
      if (error) {
        respose.writeHead(500, {"Content-Type":"text/html"});
        response.end(`<h1>Somethisng went wrong on our end!</h1>`);
      } else {
        response.end(file);
      }
    }
  );
}

function publicRoute(request, response, url){
  // make sure you can handle multiple "Content-Type" for each of the files
  const extension = url.split(".")[1];
  // write an object to hold all of the different "Content-Type"s in the public folder
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript"
  };

  // when files come through
  response.writeHead(200, {"Content-Type" : "text/html" })

  fs.readFile(
    path.join(__dirname, '..', 'public', url), (error, file) => {
      if (error) {
        response.writeHead
      } else {
        response.end(file);
      }
    }
  )
}

function queryRoute(request, response) {

}


// make the handlers functoins accessible to route.js
module.exports = {homeRoute, publicRoute, queryRoute}
