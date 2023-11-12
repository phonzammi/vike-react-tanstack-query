import axios from "axios";
import { Movie, MovieDetails } from "./types";

export async function getMovies(): Promise<Movie[]> {
    const response = await axios('https://star-wars.brillout.com/api/films.json')

    let movies: MovieDetails[] = await response.data.results
    movies = movies.map((movie: MovieDetails, i: number) => ({
        ...movie,
        id: String(i + 1)
    }))

    let filteredMovies = filterMoviesData(movies)

    return filteredMovies
}

export async function getMovie(id:string): Promise<MovieDetails> {
    const response = await axios(`https://star-wars.brillout.com/api/films/${id}.json`)

    const movie: MovieDetails = await response.data

    return movie
}

function filterMoviesData(movies: MovieDetails[]): Movie[] {
    return movies.map((movie: MovieDetails) => {
        const { title, release_date, id } = movie
        return { title, release_date, id }
    })
}