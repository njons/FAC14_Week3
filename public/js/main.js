// -------------------------------------------
// LIST THE ELEMENTS
// -------------------------------------------
// GIPHY_REQUEST_URL: https://api.giphy.com/v1/gifs/search?api_key=7cWhgewjrS2GSML9Sj3iCQZd24zYFLSh&q=doggo&limit=50&offset=0&rating=PG-13&lang=en

const API_KEY = '7cWhgewjrS2GSML9Sj3iCQZd24zYFLSh';
// this is your personal identifier to access the GIPHY database

const searchEl = document.querySelector('.search-input');
  // the user search input needs to be stored (so that it can be cross checked in the database)

const hintEl = document.querySelector('.search-hint');
  // hint text needs to change depending on whether:
      // the input is longer than 2 characters
      // the search was succsessful/unsuccsessful
      // 'Enter' has been pressed
  // hint needs ot be replaced with the spinner when the search runs (after enter)

const videosEl = document.querySelector('.videos');
  // the video needs to only show once there is a result
  // to show, the video needs a div to contain the results

const clearEl = document.querySelector('.search-clear');
// the clear search image needs to be invisible until there is any result

let searchTerm = ``;

// -------------------------------------------
// WRITE THE FUNCTIONS
// -------------------------------------------

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  console.log(randIndex)
  return arr[randIndex];
}

const toggleLoading = state => {
  if (state) {
    document.body.classList.add('.loading');
    // searchEl.disabled = true;
  } else {
    document.body.classList.remove('.loading');
    // searchEl.disabled = false;
    // searchEl.focus();
  }
}

const createVideo = src => {
  const video = document.createElement('video');

  video.src = src;
  video.autoplay = true;
  video.loop = true;

  video.className = 'video';

  return video;
}

const doSearch = event => {
 searchTerm = 'meme millenial';

  //if (searchTerm.length > 2) {
    //hintEl.innerHTML = `Hit enter to search ${searchTerm}`;
    hintEl.innerHTML = `Hit enter to search`;
    console.log('you clicked the body')
    document.body.classList.add('show-hint');
    searchGiphy(searchTerm);
  // } else {
  //   document.body.classList.remove('show-hint');
  // }

  // if (event.key === 'Enter' && searchTerm.length > 2) {
  //   searchGiphy(searchTerm);
  // }
}

const searchGiphy = searchTerm => {
  toggleLoading(true);

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`)
  .then (response => {
    return response.json();
  })
  .then (json => {
    const gif = randomChoice(json.data);
    console.log('this is gif: ' + gif)
    const src = gif.images.original.mp4;
    console.log('this is src: ' + src)
    const video = createVideo(src);
    console.log('this is video: ' + video)

    video.addEventListener('loadeddata', event => {
      video.classList.add('visible');
      toggleLoading(false);
      document.body.classList.add('has-result');
      hintEl.innerHTML = `Click to search for more`;
      //hintEl.innerHTML = `Hit enter to search for more ${searchTerm}`;
    })
    videosEl.appendChild(video);
  })
  .catch(error => {
    toggleLoading(false);
    hintEl.innerHTML = `Life is too short`;
    //hintEl.innerHTML = `No results were found for ${searchTerm}`;
  })
}

const clearSearch = event => {
  document.body.classList.remove('has-result');
  searchTerm = ``;
  hintEl.innerHTML = ``;
  videosEl.innerHTML = ``;
  searchEl.value = ``;
  searchEl.focus();
}

// -------------------------------------------
// ADD EVENT LISTENERS
// -------------------------------------------

window.addEventListener('click', doSearch);
clearEl.addEventListener('click', clearSearch);
//searchEl.addEventListener('keyup', doSearch);

document.addEventListener('keyup', event => {
  if(event.key === 'Escape') {
    clearSearch();
  } else if (event.key === 'Enter') {
    hintEl.innerHTML = `Click to search`;
  }
})
