import React, { useState, useEffect } from 'react'
import useObserver from '@/hooks/useObserver'

type PropTypes = {
  handleLoad: (next: number) => Promise<void>
  next: number
  hasMore: boolean
  fallback: React.ReactElement
}

export default function InfiniteScroll({ handleLoad, next, hasMore, fallback }: PropTypes) {
  const [loading, setLoading] = useState(false)
  const [inView, viewRef] = useObserver()

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setLoading(true)
      handleLoad(next).then(() => setLoading(false))
    }
  }, [inView, loading, next, hasMore, handleLoad])

  if (loading) return <>{fallback}</>
  if (!hasMore) return <div aria-label="No more items" className="m-6 text-center text-gray-500" />
  return (
    <div 
      aria-label="Loading more items"
      className="m-6 text-center text-gray-500" 
      ref={viewRef}
    >
      ***
    </div>
  )
}
