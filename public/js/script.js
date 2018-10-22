var input = document.getElementById("search");
var button = document.getElementById("submit");
var datalist = document.getElementById("datalist");

// random number generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// giphy info (key and url)
var giphy_api_key = "7cWhgewjrS2GSML9Sj3iCQZd24zYFLSh";
var giphy_url =
  "https://api.giphy.com/v1/gifs/trending?&api_key=" + giphy_api_key;
console.log("this is the trendy url", giphy_url);

// the generic xhr request wrapped in a function
function xhrRequest(url, cb) {
  // create the new instance of a request object
  var xhr = new XMLHttpRequest(url, cb);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // ensure that the object returned from the server is parsed
      var parsedObj = JSON.parse(xhr.responseText);
      console.log("this is the parsed data", parsedObj);
      return cb(parsedObj);
    } else if (xhr.readyState === 4 && xhr.status != 200) {
      // logs error if request gor all the way, but a status code other than 200 is returned
      return "you did not get a status code of 200";
    }
  };
  // the url is where to send the request, it can be a local file, a thirdparty server or your own server
  xhr.open("GET", url, true);
  xhr.send();
}

button.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("you clicked the button");
  // call the
  xhrRequest(giphy_url, function(data) {
    var i = getRandomInt(0, 25);
    console.log(data.data[i].images.downsized_medium.url);
    var results = document.getElementById("results");
    var img = document.createElement("img");
    img.setAttribute("src", data.data[i].images.downsized_medium.url);
    results.appendChild(img);
  });
});
