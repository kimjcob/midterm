document.addEventListener('DOMContentLoaded', () => {
    category();
});
API_KEY = 'bc7cd37ea5498a6f0430d167e9a38cb0'
API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzdjZDM3ZWE1NDk4YTZmMDQzMGQxNjdlOWEzOGNiMCIsIm5iZiI6MTcyMDY0NzA3OS45MTYzMzgsInN1YiI6IjY2OGRjM2FkNGQxYmJmNjc1MjNlMDczYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kmJnY8EcaRCRRoYuh95EN068-LmmJfFfAIgXsEPGis4'
popoular_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
topRated_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2'
upcoming_URL = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
async function category() {
    movies(popoular_URL, 'Popular')
    movies(topRated_URL, 'Toprated')
    movies(upcoming_URL, 'Upcoming')

        }

async function movies(url, categoryID) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const movieData = data.results.map(movie => ({
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids,
            description: movie.overview
        }));

        generateUI(movieData, categoryID);
    } catch (error) {
        console.log(error);
    }
}
function generateUI(movieData, categoryID) {
    const output = document.getElementById(categoryID);
    
        output.innerHTML = movieData.map(movie => ` 
            <div class="overflow-y-scroll min-w-[210px] max-h-[320px] border p-2">
            <img src="${movie.poster}" alt="${movie.title}" style="width:200px;">
            <p>${movie.title} (${movie.release_date})</p>
            <p>${movie.genre_ids.join(', ')}</p>
            <p>${movie.description}</p>
        </div>`).join('');

}
