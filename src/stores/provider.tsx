import * as React from 'react'
import { useStore } from 'zustand'
import { IPost } from './types'
import { type PostStore, createPostStore } from './store'

type PostStoreApi = ReturnType<typeof createPostStore>

const PostStoreContext = React.createContext<PostStoreApi | undefined>(undefined)

export const PostStoreProvider = ({ 
  children, 
  fetchData,
}: {
  children: React.ReactNode
  fetchData: Promise<IPost[]>
}) => {
  const storeRef = React.useRef<PostStoreApi>(null)

  const data = React.use(fetchData)

  if (!storeRef.current) {
    storeRef.current = createPostStore({ data })
  }

  return (
    <PostStoreContext.Provider value={storeRef.current}>
      {children}
    </PostStoreContext.Provider>
  )
}

export const usePostStore = <T,>(selector: (store: PostStore) => T,): T => {
  const postStoreContext = React.useContext(PostStoreContext)

  if (!postStoreContext) {
    throw new Error(`usePostStore must be used within PostStoreContext`)
  }

  return useStore(postStoreContext, selector)
}

export const fetchPostItems = async () => {
  const res = await fetch('https://recruiting-api.marvelousdesigner.com/api/data')
  return res.json() 
}
