import './css/styles.css';

//Business Logic

function searchGiphy(search) {
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElements(apiResponse, search) {
  const resultsContainer = document.querySelector('#showResults');
  const gif = document.createElement('img');
  gif.src = `${apiResponse.data[0].images.original.url}`
  resultsContainer.innerText = `Results for ${search}:`;
  resultsContainer.appendChild(gif);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#searchInput').value;
  document.querySelector('#searchForm').value = null;
  searchGiphy(search);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission)
});