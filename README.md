[<img src="https://vike.dev/vike-readme.svg" align="right" height="90">](https://vike.dev)

## Integration of Vike (without builtin renderer) with Tanstack Query v5

This is an example of integrating [Vike](https://vike.dev) with [Tanstack-Query](https://tanstack.com/query/latest).

Special thanks to [brillout](https://github.com/brillout) and [AurelienLourot](https://github.com/AurelienLourot) for the discussion :
* https://github.com/vikejs/vike-react/discussions/30

To run this example:

```bash
git clone git@github.com:phonzammi/vike-react-tanstack-query
cd vike-react-tanstack-query/
# with pnpm
pnpm install
pnpm run dev
# or with npm
npm install
npm run dev
```

Fetching/Prefetching patterns : 

1. Use global `/renderer/onBeforeRender.tsx` for simple or generic query.
* Prefetching with global `onBeforeRender()` can be apply to any page with a simple or generic query, e.g. prefetching all posts or movies, etc.
* Example : the `posts/index/+prefetchQuery.ts` exports the required query for `posts/index/+Page.tsx`, this query will be prefetched in the global `onBeforeRender()` (`/renderer/+onBeforeRender.ts`). 

2. Use local `onBeforeRender.tsx` inside each pages for complex query.
* Fetching/Prefetching with local `onBeforeRender()` only apply to a page for complex query, e.g. depends on routeParams, filters, etc.
* Example: the `/posts/@id/onBeforeRender.tsx` to fetch/prefetch a single post for `/posts/@id/+Page.tsx` with id param.

**This repo was modified from example [react-full-v1](https://github.com/vikejs/vike/tree/main/examples/react-full-v1)**

**Note : This pattern can also be applied using builtin renderer from [vike-react](https://github.com/vikejs/vike-react) or scaffold with [Bati](https://batijs.github.io/).**

**Official documentations of Vike. [_vike.dev_](https://vike.dev).**