var input = document.getElementById('search');
var button = document.getElementById('submit');
var datalist = document.getElementById('datalist');

// create an object ready to hold the final filtered object with rearch results
var globalObj = {};

var searchTermSanitised
var giphy_api_key = "7cWhgewjrS2GSML9Sj3iCQZd24zYFLSh";
var giphy_url = "https://api.giphy.com/v1/gifs/random?tag=" + searchTermSanitised + "&api_key=" + giphy_api_key;

button.addEventListener('submit', function(event) {
  event.preventDefault();
  xhrRequest('api.giphy.com/v1/gifs/trending/'
api_key: string, '')

})

// create a URL based on the input from the user
function urlCreator (url, str) {
  // takes url and adds a string value that corresponds to the user search input (str)
  var searchUri = encodeURIComponent(str);
  console.log('this is the url creaded with the user input:', searchUri)
  return url + "search/" + searchUri;
}

// the generic xhr request wrapped in a function
function xhrRequest(url, cb) {
  // create the new instance of a request object
  var xhr = new XMLHttpRequest(url, cb);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // ensure that the object returned form the server is parsed
      var parsedObj = JSON.parse(xhr.responseText);
      // transfer the results into the empty object waiting for info
      globalObj = parsedObj;
      console.log('this is the parsed obj', globalObj)
      return cb(parsedObj);
    } else if (xhr.readyState === 4 && xhr.status != 200){
      // logs error if request gor all the way, but a status code other than 200 is returned
      console.log('you did not get a status code of 200')
    }
  }
  // the url is where to send the request, It can be a local file, a thirdparty server or your own server
  xhr.open("GET", url, true);
  xhr.send();
}

// function createResultArrayCb(obj) {
//   console.log('this is the returning obj:', obj)
//   var array = createLimitedArray(obj);
//   constructDatalist(array);
//   console.log("create results array got exported!");
// }
//
// function constructDataList(array) {
//   var lists = "";
//
//   arr.forEach(function(item) {
//     var list = document.cerateElement('li')
//     list.value = item;
//   })
//
//   datalist.appendChild(list);
// }
//
//
// function createLimitedArray(obj){
//   var limitedArray = Object.keys(obj);
//   if (limitedArray.length > 5) {
//    limitedArray = limitedArray.slice(0,5);
//  } else if (limitedArray.length === 0) {
//    // if object is empty
//    limitedArray.push('No matches found');
//  }
//  return limitedArray;
// }
