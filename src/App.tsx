import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import InfiniteScroll from '@/components/InfiniteScroll'
import PostItem from '@/components/PostItem'
import SelectBox from '@/components/SelectBox'
import SearchBox from '@/components/SearchBox'
import { PostStoreProvider, usePostStore, fetchPostItems, IPost } from '@/stores'

export default function App() {
  const fetchData = fetchPostItems()

  return (
    <ErrorBoundary fallback={'Something went wrong!'}>
      <Suspense>
        <PostStoreProvider fetchData={fetchData}>
          <div className="max-w-[1680px] mx-auto py-[80px]">
            <Nav />
            <Main />
          </div>
        </PostStoreProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

function Nav() {
  const { query, setQuery } = usePostStore(store => store)

  function handleSort(value: string) {
    setQuery({ sort: value })
  }

  function handleSearch(value: string) {
    setQuery({ q: value })
  }

  return (
    <>
      <header className="mb-[80px] text-center">
        <h1 className="text-4xl font-extrabold tracking-widest">NEWSROOM</h1>
      </header>
      <nav className="flex flex-col justify-center xs:flex-row xs:justify-end  items-center mb-4">
        <div className="flex mr-2 mb-2">
          <SearchBox 
            defaultValue={query.q} 
            onSubmit={handleSearch} 
          />
        </div>
        <div className="flex mb-2">
          <SelectBox 
            defaultValue={query.sort}
            onChange={handleSort}
            options={[
              { value: 'default', label: 'default' },
              { value: 'desc', label: '높은 조회수' },
              { value: 'asc', label: '낮은 조회수' },
            ]}
          />
        </div>
      </nav>
    </>
  )
}

function Main() {
  const { items, query, hasMore, isEmpty, find } = usePostStore(store => store)

  async function handleLoad(next: number) {
    await find({ 
      ...query, 
      count: query.count + next
    })
  }

  return (
    <main>
      <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item: IPost) => <PostItem key={item.title} post={item} />)}
        <InfiniteScroll
          handleLoad={handleLoad}
          next={items.length}
          hasMore={hasMore}
          fallback={
            <>
              {[...Array(12)].map((_, i) => (
                <PostItem key={i} post={undefined} />
              ))}
            </>
          }
        />
      </div>
      {isEmpty && <p className="text-center">No search result.</p>}
    </main>
  )
}
