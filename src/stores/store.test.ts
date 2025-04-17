import { describe, it, expect, beforeEach } from 'vitest'
import { createPostStore, PostStore } from './store'
import { type IPost } from './api'
import { StoreApi } from 'zustand'

describe('PostStore', () => {
  let store: StoreApi<PostStore>

  beforeEach(() => {
    store = createPostStore({
      data: [
        { seq: 1, title: 'Post One', body: 'Body of post one', viewCnt: 10 },
        { seq: 2, title: 'Post Two', body: 'Body of post two', viewCnt: 20 },
        { seq: 3, title: 'Another Post', body: 'Another body', viewCnt: 5 },
      ] as IPost[],
    })
  })

  it('should initialize with default state', () => {
    const state = store.getState()
    expect(state.items).toEqual([])
    expect(state.total).toBe(0)
    expect(state.hasMore).toBe(true)
    expect(state.isEmpty).toBe(false)
    expect(state.query).toEqual({
      start: 0,
      count: 12,
      sort: 'default',
      q: '',
      ...window.history.state,
    })
  })

  it('should update query and reset items when setQuery is called', () => {
    let state = store.getState()
    state.setQuery({ q: 'test', sort: 'asc' })
    
    state = store.getState()
    expect(state.query.q).toBe('test')
    expect(state.query.sort).toBe('asc')
    expect(state.items).toEqual([])
    expect(state.total).toBe(0)
    expect(state.hasMore).toBe(true)
  })

  it('should filter and sort items when find is called', async () => {
    let state = store.getState()
    await state.find({ start: 0, count: 2, sort: 'asc', q: 'post' })

    state = store.getState()
    expect(state.total).toBe(3)
    expect(state.hasMore).toBe(true)
    expect(state.isEmpty).toBe(false)
  })

  it('should handle empty results when find is called with no matches', async () => {
    let state = store.getState()
    await state.find({ start: 0, count: 2, sort: 'asc', q: 'nonexistent' })
    
    state = store.getState()
    expect(state.items).toStrictEqual([])
    expect(state.total).toBe(0)
    expect(state.hasMore).toBe(false)
    expect(state.isEmpty).toBe(true)
  })

  it('should paginate results correctly', async () => {
    let state = store.getState()
    await state.find({ start: 0, count: 2, sort: 'default', q: '' })
    
    state = store.getState()
    expect(state.items.length).toBe(2)
    expect(state.total).toBe(3)
    expect(state.hasMore).toBe(true)

    await state.find({ start: 0, count: 4, sort: 'default', q: '' })
    
    state = store.getState()
    expect(state.items.length).toBe(3)
    expect(state.hasMore).toBe(false)
  })
})