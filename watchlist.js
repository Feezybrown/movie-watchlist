
const watchListComp = document.getElementById("watchlist-container")
const removeBtn = document.getElementById("remove-btn")

const savedMovies = JSON.parse(localStorage.getItem("movies"))


function renderWatchList() {
    // Generate HTML for each movie in the watch list
    let moviesHtml = ""
    if(savedMovies.length > 0) {
        moviesHtml = savedMovies.map(movie => {
            return `
            <div class="card">
                <p id="count"></p>
                <img src=${movie.Image} alt="movie image" class="movie-img">
        
                <div class="card-contents">
                    <div class="card-title-wrapper">
                        <h3 class="card-title">${movie.Title}</h3>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <p class="score">${movie.Rating}</p>
                        </div>
                    </div>
        
                    <div class="movie-stats">
                        <p class="runtime">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <div class="add-to-watchList" onClick="removeFromWatchList(event)" id="remove-btn">
                            <i class="fa-solid fa-circle-minus" id="add-watchList"></i>
                            <p >WatchList</p>
                        </div>
                    </div>
        
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>
            `
        }).join('')

    } else {
        moviesHtml = `
        <div id="watchlist-container" class="watchlist-container motion-text">
            <p class="watchlist-text">Your watchlist is looking a little empty...</p>
            <div class="add-movies">
                <a href="index.html"><i class="fa-solid fa-circle-plus"></i></a> 
                <a href="index.html"><p>Lets add some movies!</p></a>
            </div>
        </div>
        `
    }
    // Insert the generated HTML into the watchListComponents element
    watchListComp.innerHTML = moviesHtml
}


function removeFromWatchList(event) {
    const card = event.target.closest(".card")
    const title = card.querySelector(".card-title").textContent

    const movieIndex = savedMovies.findIndex(movie => movie.Title ===title)

    if(movieIndex !== -1) {
        // Remove the movie from the savedMovies array
        savedMovies.splice(movieIndex, 1)

        // Update the local storage with the updated savedMovies array
        localStorage.setItem("movies", JSON.stringify(savedMovies))

        // Render the updated watch list
        renderWatchList()
    }
}

//load watchList when window loads
document.addEventListener("DOMContentLoaded", renderWatchList)