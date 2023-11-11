import React, { useEffect, useState } from 'react'
import { postsQueries, usePostQuery } from '../postsQueries'
import { hashKey } from '@tanstack/react-query'
import useQueriesState from '../../../stores/queriesState'

const Page = ({ id }: { id: string }) => {
    const [hashedQueryKey] = useState(() => hashKey(postsQueries.detail(id).queryKey))
    const postQuery = usePostQuery(id)

    useEffect(() => {
        if (postQuery.isSuccess) {
            useQueriesState.setState((prev) => ({
                knownQueries: prev.knownQueries.set(hashedQueryKey, postQuery.isFetched),
                knownTitles: prev.knownTitles.set(hashedQueryKey, postQuery.data.title)
            }))
        }
    }, [hashedQueryKey, postQuery])


    if (postQuery.isError) return <h3>Error {postQuery.error.message}</h3>

    return (
        <>
            <i>isLoading : {`${postQuery.isLoading}`}</i>
            <h1>Post detail</h1>
            <h2>{postQuery.data?.title}</h2>
            <p>{postQuery.data?.body}</p>

            <p>
                Source: <a href={`https://jsonplaceholder.typicode.com/posts/${id}`}>jsonplaceholder.typicode.com/posts/{id}</a>.
            </p>
        </>
    )
}
export default Page