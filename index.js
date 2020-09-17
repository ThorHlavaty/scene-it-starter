function renderMovies() {
  for (let index = 0; index < movieData.length; index++) {
    const movie = movieData[index];
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
    theMovie.setAttribute("id", movie.Title);
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
    theMovie.appendChild(caption);
    caption.appendChild(title);
    caption.appendChild(year);
    caption.appendChild(addMe);
  }
}

const myForm = document.getElementById("search-form");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  renderMovies();
});
