document.addEventListener('DOMContentLoaded', function () {
    displayFavourites();
});

function displayFavourites() {
    const favouritesContainer = document.getElementById('favourites');
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.length > 0) {
        const results = favourites.map(movie => {
            return `<div class="movie-card" data-imdbid=${movie.imdbID}>
                <img src=${movie.Poster} alt=${movie.Title} Poster" class="movie-poster">
                <div class="movie-details">
                    <h3>${movie.Title}</h3>
                    <button class="remove-btn" data-imdbid=${movie.imdbID}>Remove from Favourites</button>
                </div>
            </div>`;
        }).join('');

        favouritesContainer.innerHTML = results;

        const removeButtons = favouritesContainer.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const imdbID = button.dataset.imdbid;
                removeFromFavourites(imdbID);
                displayFavourites();
            });
        });
    } else {
        favouritesContainer.innerHTML = 'No favourites added yet.';
    }
}

function removeFromFavourites(imdbID) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    // Filter out the movie with the specified imdbID
    favourites = favourites.filter(movie => movie.imdbID !== imdbID);

    // Update localStorage with the updated favourites array
    localStorage.setItem('favourites', JSON.stringify(favourites));
}
