import { createStore } from 'zustand/vanilla'
import { type IPost } from './api'

export type SortOption = 'default' | 'asc' | 'desc'

export type PostQuery = {
  start: number
  count: number
  sort: SortOption
  q: string
}

export type PostState = {
  data: IPost[]
  items: IPost[]
  total: number
  hasMore: boolean
  isEmpty: boolean
  query: PostQuery
  error: string | null
}

export type PostActions = {
  setQuery: (newQuery: Partial<PostQuery>) => void
  find: (query: PostQuery) => Promise<void>
  clearError: () => void
}

export type PostStore = PostState & PostActions

const DEFAULT_PAGE_SIZE = 12
const NETWORK_DELAY = 500

const searchPosts = (posts: IPost[], searchTerm: string): IPost[] => {
  if (!searchTerm) return posts

  const regexp = new RegExp(`\\b${searchTerm.toLowerCase().split(' ').join('|\\b')}`)
  return posts.filter((item) => 
    regexp.test(`${item.title?.toLowerCase()} ${item.body?.toLowerCase()}`)
  )
}

const sortPosts = (posts: IPost[], sort: SortOption): IPost[] => {
  if (sort === 'default') return posts

  return [...posts].sort((a, b) => 
    sort === 'asc' ? a.viewCnt - b.viewCnt : b.viewCnt - a.viewCnt
  )
}

const paginatePosts = (posts: IPost[], start: number, count: number): IPost[] => {
  return posts.slice(start, start + count)
}

const defaultInitState: PostState = {
  data: [],
  items: [],
  total: 0,
  hasMore: true,
  isEmpty: false,
  error: null,
  query: {
    start: 0,
    count: DEFAULT_PAGE_SIZE,
    sort: 'default',
    q: '',
    ...window.history.state,
  },
}

export const createPostStore = (initState: Partial<PostState> = {}) => {
  return createStore<PostStore>()((set, get) => ({
    ...defaultInitState,
    ...initState,

    setQuery: (newQuery: Partial<PostQuery>) => {
      const { query: prevQuery } = get()
      const query = { ...prevQuery, ...newQuery }
      
      window.history.replaceState(
        { sort: query.sort, q: query.q },
        '',
        window.location.href
      )
      
      return set({ 
        query, 
        items: [], 
        total: 0, 
        hasMore: true,
        error: null 
      })
    },

    clearError: () => set({ error: null }),

    find: async ({ start, count, sort, q }: PostQuery) => {
      try {
        const { data } = get()
        let items = data.slice()

        items = searchPosts(items, q)
        if (!items.length) {
          return set({ 
            items, 
            total: 0, 
            hasMore: false, 
            isEmpty: true,
            error: null 
          })
        }

        items = sortPosts(items, sort)
        const total = items.length
        
        items = paginatePosts(items, start, count)
        const hasMore = start + items.length < total

        await new Promise(resolve => setTimeout(resolve, NETWORK_DELAY))

        set({ 
          items, 
          total, 
          hasMore, 
          isEmpty: false,
          error: null 
        })
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : 'An unknown error occurred',
          items: [],
          total: 0,
          hasMore: false,
          isEmpty: true
        })
      }
    },
  }))
}
