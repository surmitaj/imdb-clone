document.addEventListener('DOMContentLoaded', function () {
    const movieDetails = document.getElementById('movieDetails');

    // Function to get IMDb ID from the query parameter
    function getImdbIDFromQuery() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('imdbID');
    }

    // Function to fetch movie details by IMDb ID
    function fetchMovieDetails(imdbID) {
        const apiKey = "ad016456";
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Render movie details on the page
                const movieDetailsHTML = `
                    <div class="movie-info">
                        <img src=${data.Poster} alt=${data.Title} "Poster" class="movie-poster">
                        <div class="movie-details">
                            <h3>${data.Title}</h3>
                            <p>${data.Plot}</p>
                            <p>Released: ${data.Released}</p>
                        </div>
                    </div>`;
                movieDetails.innerHTML = movieDetailsHTML;
            })
            .catch(error => console.error('Error fetching movie details:', error));
    }

    // Get IMDb ID from the query parameter
    const imdbID = getImdbIDFromQuery();

    // Fetch and display movie details
    if (imdbID) {
        fetchMovieDetails(imdbID);
    } else {
        // Handle the case where IMDb ID is not provided
        movieDetails.innerHTML = 'IMDb ID not found in the query parameters.';
    }
});
