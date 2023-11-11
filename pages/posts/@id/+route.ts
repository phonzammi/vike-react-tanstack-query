import partRegex from 'part-regex'
import { PageContext } from 'vike/types'

const route = (pageContext:PageContext) => {
  // We can use RegExp / any library we want
  if (!partRegex`/posts/${/[0-9]+/}`.test(pageContext.urlPathname)) {
    return false
  }
  const id = pageContext.urlPathname.split('/')[2]

  return {
    // Make `id` available as pageContext.routeParams.id
    routeParams: { id }
  }
}

export default route