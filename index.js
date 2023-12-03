document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const exploreDiv = document.getElementById('explore');
    const searchResults = document.getElementById('searchResults');
    const viewFavouritesBtn = document.getElementById('viewFavouritesBtn');


    viewFavouritesBtn.addEventListener('click', function () {
        window.location.href = 'favourites.html';
    });

    searchInput.addEventListener('input', debounce(searchMovies, 300));

    function searchMovies() {
        const query = searchInput.value.trim();
        if (query === '') {
            exploreDiv.style.display = 'flex';
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        else {
            searchResults.style.display = 'flex';
            exploreDiv.style.display = 'none';
        }

        const apiKey = "ad016456";
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Search) {
                    const results = data.Search.map(movie => {
                        return `<div class="movie-card" data-imdbid=${movie.imdbID}>
                        <img src=${movie.Poster} alt=${movie.Title} Poster" class="movie-poster">
                        <div class="movie-details">
                          <h3>${movie.Title}</h3>
                          <button class="favourite-btn" data-imdbid=${movie.imdbID}>Add to Favourites</button>
                        </div>
                      </div>`;
                    }).join('');

                    searchResults.innerHTML = results;

                    const movieCards = searchResults.querySelectorAll('.movie-card');
                    movieCards.forEach(card => {
                        const addButton = card.querySelector('.favourite-btn');
                        addButton.addEventListener('click', (event) => {
                            event.stopPropagation();                         
                            const imdbID = card.dataset.imdbid;
                            const selectedMovie = data.Search.find(movie => movie.imdbID === imdbID);
                            addToFavourites(selectedMovie);
                        });

                        //the existing click event listener for the card to redirect to the movie details page
                        card.addEventListener('click', () => {
                            const imdbID = card.dataset.imdbid;
                            window.location.href = `moviedetails.html?imdbID=${imdbID}`;
                        });
                    });
                } else {
                    searchResults.innerHTML = 'No results found';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function debounce(func, delay) {
        let timer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }

});

function addToFavourites(movie) {
    // Retrieve existing favourites from localStorage or initialize an empty array
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    // Check if the movie is not already in the favourites
    if (!favourites.some(favMovie => favMovie.imdbID === movie.imdbID)) {
        // Add the movie object to the favourites array
        favourites.push(movie);

        // Update localStorage with the updated favourites array
        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert('Added to Favourites!');
    } else {
        alert('This movie is already in your Favourites!');
    }
}