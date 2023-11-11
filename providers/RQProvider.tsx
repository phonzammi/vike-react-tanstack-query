import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RQProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
            }
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}