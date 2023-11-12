export default Page

import React, { useEffect, useState } from 'react'
import { moviesQueries, useMoviesQuery } from '../moviesQueries'
import { hashKey } from '@tanstack/react-query'
import useQueriesState from '../../../stores/queriesState'

function Page() {
  const [hashedQueryKey] = useState(() => hashKey(moviesQueries.list.queryKey))
  const moviesQuery = useMoviesQuery()

  useEffect(() => {
    useQueriesState.setState((prev) => ({
      knownQueries: prev.knownQueries.set(hashedQueryKey, moviesQuery.isFetched)
    }))
  }, [hashedQueryKey, moviesQuery.isFetched])

  if (moviesQuery.isSuccess)
    return (
      <>
        <i>isLoading : {`${moviesQuery.isLoading}`}</i>
        <h1>Star Wars Movies</h1>
        <ol>
          {moviesQuery.data.map(({ id, title, release_date }) => (
            <li key={id}>
              <a href={`/star-wars/${id}`}>{title}</a> ({release_date})
            </li>
          ))}
        </ol>
        <p>
          Source: <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
        </p>
        <p>
          Data can be fetched by using the <code>onBeforeRender()</code> hook.
        </p>
      </>
    )
}
