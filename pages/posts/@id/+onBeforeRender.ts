import { QueryClient, dehydrate, hashKey } from "@tanstack/react-query";
import { PageContextBuiltInServer } from "vike/types";
import { postsQueries } from "../postsQueries";
import useQueriesState from "../../../stores/queriesState";

export default async function onBeforeRender(pageContext: PageContextBuiltInServer) {
    const { knownQueries } = useQueriesState.getState()
    const { routeParams: { id } } = pageContext
    const hashedQueryKey = hashKey(postsQueries.detail(id).queryKey)

    if (!knownQueries.get(hashedQueryKey)) {
        // We haven't started fetching the post with this id yet.

        // Note: this gets executed only once per post id and browser session, namely the
        // first time this post gets visited. If this visit happens coming from
        // another page through client-side navigation, this gets executed on
        // the client. Otherwise it gets executed on the server.

        console.log('/posts/@id/+onBeforeRender is fetching id : ', id)

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    gcTime: 5000
                }
            }
        })

        const post = await queryClient.fetchQuery(postsQueries.detail(id))

        const dehydratedState = dehydrate(queryClient)

        return {
            pageContext: {
                dehydratedState,
                pageProps: {
                    id
                },
                title: post.title
            }
        }
    }

    return {
        pageContext: {
            pageProps: {
                id
            },
        }
    }
}