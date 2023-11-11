import { createQueryKeys } from "@lukemorales/query-key-factory";
import * as api from "./postsApi";
import { useQuery } from "@tanstack/react-query";

export const postsQueries = createQueryKeys('posts', {
    list: ({ queryKey: null, queryFn: api.getPosts }),
    detail: (id: string) => ({
        queryKey: [id],
        queryFn: () => api.getPost(id)
    })
})

export function usePostsQuery() {
    return useQuery(postsQueries.list)
}

export function usePostQuery(id: string) {
    return useQuery(postsQueries.detail(id))
}
