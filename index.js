let movieList = [];
function saveToWatchlist(imdbID) {
  const movie = movieData.find(function (currentMovie) {
    return currentMovie.imdbID == imdbID;
  });
  let watchlistJSON = localStorage.getItem("watchlist");
  let watchlist = JSON.parse(watchlistJSON);
  if (watchlist == null) {
    watchlist = [];
  }
  const doubleAdd = watchlist.find((watchlistMovie) => {
    return watchlistMovie.imdbID == imdbID;
  });
  if (doubleAdd) {
    return;
  }
  watchlist.push(movie);
  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem("watchlist", watchlistJSON);
}
document.addEventListener("DOMContentLoaded", function () {
  function renderMovies(searchTerm) {
    for (let index = 0; index < searchTerm.length; index++) {
      const movie = searchTerm[index];
      let indicator = document.createElement("li");
      const caption = document.createElement("div");
      const title = document.createElement("h5");
      const year = document.createElement("p");
      const addMe = document.createElement("button");
      let theMovie = document.createElement("div");
      let thePoster = document.createElement("img");
      indicator.setAttribute("data-target", "#carouselExampleIndicators");
      indicator.setAttribute("data-slide-to", `${index}`);
      if (index === 0) {
        indicator.setAttribute("class", "active");
      }
      caption.setAttribute("class", "carousel-caption d-none d-md-block");
      caption.setAttribute("style", "background: rgba(122, 130, 136, 0.5)");
      addMe.setAttribute("class", "btn-primary");
      document.getElementById("carouselIndicators").appendChild(indicator);
      theMovie.appendChild(thePoster);
      theMovie.setAttribute("class", "carousel-item");
      if (index === 0) {
        theMovie.classList.add("active");
      }
      thePoster.setAttribute("class", "d-block w-12");
      thePoster.style.width = "100%";
      thePoster.setAttribute("src", `${movie.Poster}`);
      document.getElementById("posterLocation").appendChild(theMovie);
      title.textContent = `${movie.Title}`;
      year.textContent = `${movie.Year}`;
      addMe.textContent = "Add Me!";
      addMe.setAttribute("onclick", `saveToWatchlist('${movie.imdbID}')`);
      theMovie.appendChild(caption);
      caption.appendChild(title);
      caption.appendChild(year);
      caption.appendChild(addMe);
    }
  }

  const myForm = document.getElementById("search-form");
  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    $("#carouselIndicators").children().remove();
    $("#posterLocation").children().remove();
    let searchTerm = $(".search-bar").val();
    let encodedSearch = encodeURIComponent(searchTerm);
    axios
      .get(`http://www.omdbapi.com/?apikey=b43843a0&s=${encodedSearch}`)
      .then(function (response) {
        let fullSearch = response.data.Search;
        renderMovies(fullSearch);
      });
  });
});
