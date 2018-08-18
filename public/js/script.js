var input = document.getElementById('search');
var button = document.getElementById('submit');
var datalist = document.getElementById('datalist');


// random number generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var giphy_api_key = "7cWhgewjrS2GSML9Sj3iCQZd24zYFLSh";
var giphy_url = "https://api.giphy.com/v1/gifs/trending?&api_key=" + giphy_api_key;
// var giphy_url = "https://api.giphy.com/v1/gifs/random?tag=" + searchTermSanitised + "&api_key=" + giphy_api_key;
console.log('this is the trendy url', giphy_url)


// the generic xhr request wrapped in a function
function xhrRequest(url, cb) {
  // create the new instance of a request object
  var xhr = new XMLHttpRequest(url, cb);
  // console.log('this is xhr:', xhr)
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // ensure that the object returned form the server is parsed
      var parsedObj = JSON.parse(xhr.responseText);
      console.log('this is the parsed data', parsedObj)
      // // transfer the results into the empty object waiting for info
      // globalObj = parsedObj;
      // console.log('this is the parsed obj', globalObj)
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

button.addEventListener('click', function(event) {
  event.preventDefault();
  console.log('you clicked the button')
  // call the
  xhrRequest(giphy_url, function(data) {
    var i = getRandomInt(0,25)
    
    console.log(data.data[i].images.downsized_medium.url)
    var results = document.getElementById('results');
    var img = document.createElement('img')
    img.setAttribute('src', data.data[i].images.downsized_medium.url);
    results.appendChild(img);
  })


})

// // create a URL based on the input from the user
// function urlCreator (url, str) {
//   // takes url and adds a string value that corresponds to the user search input (str)
//   var searchUri = encodeURIComponent(str);
//   console.log('this is the url creaded with the user input:', searchUri)
//   return url + "search/" + searchUri;
// }



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
