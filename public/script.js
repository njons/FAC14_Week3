// client-side js

var input = document.getElementById('search');
var button = document.getElementById('button');

console.log('this is the submit button', button)

// create an object ready to hold the final filtered object with rearch results
var globalObj = {};

// send xhr request to the server for each letter typed by the user
input.addEventListener('keyup', function(event){
  // get the input from the user
  var searchInput = input.value;
  console.log('this is the search input from the user', searchInput)

  // make sure there is input from the user
  if(searchInput) {
    // if there is input, make the request call
    // let pageUrl = window.location.href;
    // console.log('this is the page url', pageUrl);
    xhrRequest(urlCreator(window.location.href, searchInput), cb)
  }
})

// create a URL based on the input from the user
function urlCreator (url, str){
    // takes url and adds a string value that corresponds to the user search input (str)
    var searchUri = encodeURIComponent(str);
    return url + "search/" + searchUri;
}

// the generic xhr request wrapped in a function
function xhrRequest(url, cb) {
  // create the new instance of a request object
  var xhr = new XMLHttpRequest(url, cb);

  xhr.onreadystatechange = function() {

    if (xhr.readyState === 4 && xhr.statusCode === 2000) {
      // ensure that the object returned form the server is parsed
      var parsedObj = JSON.parse(xhr.responseText);
      // transfer the results into the empty object waiting for info
      // globalObj = parsedObj;
      return cb(parsedObj);
    } else if (xhr.readyState === 4 && xhr.statusCode !== 200){
      // logs error if request gor all the way, but a status code other than 200 is returned
      console.log('you did not get a status code of 200')
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
}

button.addEventListener('click', function(event){
  event.preventDefault();
})
