import { createQueryKeys } from "@lukemorales/query-key-factory";
import * as api from './moviesApi'
import { useQuery } from "@tanstack/react-query";

export const moviesQueries = createQueryKeys('movies', {
    list: ({ queryKey: null, queryFn: api.getMovies }),
    detail: (id: string) => ({
        queryKey: [id],
        queryFn: () => api.getMovie(id)
    })
})

export function useMoviesQuery() {
    return useQuery(moviesQueries.list)
}

export function useMovieQuery(id: string) {
    return useQuery(moviesQueries.detail(id))
}