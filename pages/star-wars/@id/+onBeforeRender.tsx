// https://vike.dev/onBeforeRender
export { onBeforeRender }

import type { OnBeforeRenderAsync } from 'vike/types'
import useQueriesState from '../../../stores/queriesState'
import { QueryClient, dehydrate, hashKey } from '@tanstack/react-query'
import { moviesQueries } from '../moviesQueries'

const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const { routeParams: { id } } = pageContext
  const { knownQueries } = useQueriesState.getState()
  const hashedQueryKey = hashKey(moviesQueries.detail(id).queryKey)

  if (!knownQueries.get(hashedQueryKey)) {
    console.log('/movies/@id/+onBeforeRender is fetching id : ', id)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 5000
        }
      }
    })

    const movie = await queryClient.fetchQuery(moviesQueries.detail(id))

    const dehydratedState = dehydrate(queryClient)

    return {
      pageContext: {
        dehydratedState,
        pageProps: {
          id,
        },
        title: movie.title
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
