import React, { useEffect, useState } from 'react'
import { postsQueries, usePostQuery } from '../postsQueries'
import { hashKey } from '@tanstack/react-query'
import useQueriesState from '../../../stores/queriesState'

const Page = ({ id }: { id: string }) => {
    const [hashedQueryKey] = useState(() => hashKey(postsQueries.detail(id).queryKey))
    const postQuery = usePostQuery(id)

    useEffect(() => {
        useQueriesState.setState((prev) => ({
            knownQueries: prev.knownQueries.set(hashedQueryKey, postQuery.isFetched),
        }))
        document.title = postQuery.data?.title || `Post Detail ${id}`
    }, [hashedQueryKey, postQuery.isFetched])


    if (postQuery.isError) return <h3>Error {postQuery.error.message}</h3>

    if (postQuery.isSuccess)
        return (
            <>
                <i>isLoading : {`${postQuery.isLoading}`}</i>
                <h2>{postQuery.data?.title}</h2>
                <p>{postQuery.data?.body}</p>

                <p>
                    Source: <a href={`https://jsonplaceholder.typicode.com/posts/${id}`}>jsonplaceholder.typicode.com/posts/{id}</a>.
                </p>
            </>
        )
}
export default Page