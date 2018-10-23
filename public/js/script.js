var submit = document.getElementById("submit");
var about = document.getElementById("about");

// random number generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var giphy_api_key = "7cWhgewjrS2GSML9Sj3iCQZd24zYFLSh";
var giphy_url =
  "https://api.giphy.com/v1/gifs/trending?&api_key=" + giphy_api_key;

// the generic xhr request wrapped in a function
function xhrRequest(url, cb) {
  // create the new instance of a request object
  var xhr = new XMLHttpRequest(url, cb);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // ensure that the object returned form the server is parsed
      var parsedObj = JSON.parse(xhr.responseText);
      return cb(parsedObj);
    } else if (xhr.readyState === 4 && xhr.status != 200) {
      // logs error if request gor all the way, but a status code other than 200 is returned
      console.log("you did not get a status code of 200");
    }
  };
  // the url is where to send the request, It can be a local file, a thirdparty server or your own server
  xhr.open("GET", url, true);
  xhr.send();
}

submit.addEventListener("click", function(event) {
  event.preventDefault();
  // xhr to the giphy API
  xhrRequest(giphy_url, function(data) {
    var i = getRandomInt(0, 25);
    var results = document.getElementById("results");
    var img = document.createElement("img");
    img.setAttribute("src", data.data[i].images.downsized_medium.url);
    results.appendChild(img);
  });
});

about.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("you clicked the about button");

  var aboutDiv = document.createElement("div");
  about.textContent = "just a little xhr";
  aboutDiv.classList.add("aboutDiv");
  about.appendChild(aboutDiv);
});
