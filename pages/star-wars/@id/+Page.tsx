export default Page

import React, { useEffect, useState } from 'react'
import { hashKey } from '@tanstack/react-query'
import { moviesQueries, useMovieQuery } from '../moviesQueries'
import useQueriesState from '../../../stores/queriesState'

function Page({ id }: { id: string }) {
  const [hashedQueryKey] = useState(() => hashKey(moviesQueries.detail(id).queryKey))
  const movieQuery = useMovieQuery(id)

  useEffect(() => {
    if (movieQuery.isSuccess) {
      useQueriesState.setState((prev) => ({
        knownQueries: prev.knownQueries.set(hashedQueryKey, movieQuery.isFetched),
        knownTitles: prev.knownTitles.set(hashedQueryKey, movieQuery.data.title)
      }))
    }
  }, [hashedQueryKey, movieQuery])

  if (movieQuery.isError) return <h3>Error {movieQuery.error.message}</h3>
  if (movieQuery.isSuccess)
    return (
      <>
        <i>isLoading : {`${movieQuery.isLoading}`}</i>
        <h1>{movieQuery.data.title}</h1>
        Release Date: {movieQuery.data.release_date}
        <br />
        Director: {movieQuery.data.director}
        <br />
        Producer: {movieQuery.data.producer}
      </>
    )
}
