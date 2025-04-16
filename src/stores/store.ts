import { createStore } from 'zustand/vanilla'
import { type IPost } from './types'

type PostQuery = {
  start: number
  count: number
  sort: string
  q: string
}

type PostState = {
  data: IPost[]
  items: IPost[]
  total: number
  hasMore: boolean
  isEmpty: boolean
  query: PostQuery,
}

type PostActions = {
  setQuery: (newQuery: Partial<PostQuery>) => void
  find: (query: PostQuery) => Promise<void>
}

export type PostStore = PostState & PostActions

const defaultInitState: PostState = {
  data: [],
  items: [],
  total: 0,
  hasMore: true,
  isEmpty: false,
  query: {
    start: 0,
    count: 12,
    sort: 'default',
    q: '',
    ...window.history.state,
  },
}

export const createPostStore = (initState: Partial<PostState>) => {
  return createStore<PostStore>()((set, get) => ({
    ...defaultInitState,
    ...initState,
    setQuery: (newQuery: Partial<PostQuery>) => {
      const { query: prevQuery } = get() as PostState
      const query = { ...prevQuery, ...newQuery }
      window.history.replaceState({ sort: query.sort, q: query.q }, '')
      return set({ query, items: [], total: 0, hasMore: true })
    },
    find: async ({ start, count, sort, q }: PostQuery) => {
      const { data } = get() as PostStore
      let items = data.slice()

      if (q) {
        const regexp = new RegExp(`\\b${q.toLowerCase().split(' ').join('|\\b')}`)
        items = items.filter((item) => regexp.test(`${item.title?.toLowerCase()} ${item.body?.toLowerCase()}`))
        if (!items.length) {
          return set({ items, total: 0, hasMore: false, isEmpty: true })
        }
      }

      if (sort === 'asc') {
        items.sort((a: IPost, b: IPost) => a.viewCnt - b.viewCnt)
      } else if (sort === 'desc') {
        items.sort((a: IPost, b: IPost) => b.viewCnt - a.viewCnt)
      }

      const total = items.length
      items = items.slice(start, count)
      const hasMore = items.length < total
      // Simulate a network delay for showing skeleton UI.
      // In a real-world application, you would fetch data from an API.
      return new Promise(resolve => {
        setTimeout(() => {
          set({ items, total, hasMore, isEmpty: false })
          resolve(undefined)
        }, 500)
      })
    },
  }))
}
