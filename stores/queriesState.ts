import { create } from 'zustand'

type QueriesState = {
    // A query present in this map means that we have started fetching it. 
    // If the value is true, it means that we have even finished fetching it.
    knownQueries: Map<string, boolean>,
    // A title present in this Map means that we have custom title for page based upon the query data.
    knownTitles: Map<string, string>
}

const useQueriesState = create<QueriesState>()((set) => ({
    knownQueries: new Map<string, boolean>(),
    knownTitles: new Map<string, string>()
}))

export default useQueriesState