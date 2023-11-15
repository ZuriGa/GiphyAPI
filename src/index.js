import './css/styles.css';

//Business Logic

function searchGiphy(search, trend, random) {
  let request = new XMLHttpRequest();
  let url;
  
  if (search) {
    url= `http://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=${process.env.API_KEY}`;
  } else if (trend) {
    url = `http://api.giphy.com/v1/gifs/trending?&limit=10&api_key=${process.env.API_KEY}`;
  } else if (random) {
    url= `http://api.giphy.com/v1/gifs/random?&api_key=${process.env.API_KEY}`;
  }

  

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search, trend, random);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic


function printElements(apiResponse, search, trend, random) {
  const resultsContainer = document.querySelector('#showResults');
  const gif = document.createElement('img');
  gif.src = `${apiResponse.data[0].images.original.url}`
  resultsContainer.innerText = `Results for ${search}:`;
  resultsContainer.appendChild(gif);

}

function printTrendElements(apiResponse, trend) {
  const trendContainer = document.querySelector('#showTrends');
  const trendGif = document.createElement('img');
  trendGif.src = `${apiResponse.data[0].images.original.url}`
  trendContainer.innerText = `Trending results: `;
  trendContainer.appendChild(trendGif);
}

function printRandomElements(apiResponse, random) {
  const randomContainer = document.querySelector('#showRandom');
  const randomGif = document.createElement('img');
  randomGif.src = `${apiResponse.data[0].images.original.url}`
  randomContainer.innerText = `Random GIF: `;
  randomContainer.appendChild(randomGif);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#searchInput').value;
  document.querySelector('#searchForm').value = null;
  searchGiphy(search, trend, random);
}

window.addEventListener("load", function () {
  document.querySelector('#searchForm').addEventListener("submit", handleFormSubmission);
  document.querySelector('#trend').addEventListener("click", handleFormSubmission);
  document.querySelector('#randomGif').addEventListener("click", handleFormSubmission);
});

