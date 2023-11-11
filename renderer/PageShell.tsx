import React from 'react'
import logoUrl from './logo.svg'
import { PageContextProvider } from './usePageContext'
import { Link } from './Link'
import type { PageContext } from 'vike/types'
import RQProvider from '../providers/RQProvider'
import { HydrationBoundary } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export { PageShell }

function PageShell({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) {
  const { dehydratedState } = pageContext
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <RQProvider>
          <HydrationBoundary state={dehydratedState}>
            <Layout>
              <Sidebar>
                <Logo />
                <Link href="/">Welcome</Link>
                <Link href="/markdown">Markdown</Link>
                <Link href="/star-wars">Data Fetching</Link>
                <Link href="/hello">Routing</Link>
                <Link href="/posts">Posts</Link>
              </Sidebar>
              <Content>{children}</Content>
            </Layout>
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </RQProvider>
      </PageContextProvider>
    </React.StrictMode>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto'
      }}
    >
      {children}
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      style={{
        padding: 20,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.8em',
        borderRight: '2px solid #eee'
      }}
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: '100vh'
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10
      }}
    >
      <a href="/">
        <img src={logoUrl} height={64} width={64} />
      </a>
    </div>
  )
}
