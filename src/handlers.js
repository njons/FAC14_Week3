const fs = require('fs');
const path = require('path');


// const queryString = require('querystring');

const homeRoute = (request, response) => {
  // read the file
  fs.readFile(
    // create the path where to look
    path.join(__dirname, "..", "public", "index.html"),
    (error, file) => {
      if (error) {
        // when no files come through
        respose.writeHead(500, {"Content-Type":"text/html"});
        response.end(`<h1>Oops something went wrong with the server. Try again!</h1>`);
      } else {
        // when files are found - this one is always the index so the content type can be set
        response.writeHead(200, {"Content-Type":"text/html"});
        response.end(file);
      }
    }
  );
}

const publicRoute = (request, response, url) => {
  //make sure you can handle multiple "Content-Type" for each of the files
  const extension = url.split(".")[1];
  // write an object to hold all of the different "Content-Type"s in the public folder
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpg",
    png: "image/png",
    json: "application/json"
  };

  // read the files
  fs.readFile(
    // tell browser trying to reach the server where the files can be found
    path.join(__dirname, "..", url),
    (error, file) => {
      if (error) {
        // when no files come through
        response.writeHead(500, {"Content-Type": "text/html"});
        response.end(`<h1>Oops something went wrong with the server. Try again!</h1>`);
      } else {
        // when files come through
        response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
        response.end(file);
      }
    }
  );
}

const queryRoute = (request, response, url) => {
  console.log(request.url)
  // get the end of the URL to findout what the user searched
  let urlEnd = url.split('search/')[1];
  // clean up the search by only allowing upper/lowercase letters, numbers and cutting out spaces at the end
  let sanitsiedUrl = urlEnd.replace(/[^A-Za-z0-9' ]/g, "").trim();
  //  un-URL the URL and turn it into plain language
  let decodedQuery = decodeURI(sanitsiedUrl);
  console.log(`this is the decoded query`, decodedQuery)
  // this needs to be used to match in the json database
  response.end()
}


const createResultsArrayCb = (data, filterdArray) => {
  // window.location.href = decodedQuery
}




// make the handlers functoins accessible to route.js
module.exports = {homeRoute, publicRoute, queryRoute, createResultsArrayCb}
