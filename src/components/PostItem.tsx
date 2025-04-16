import moment from 'moment'
import { memo } from 'react'
import { type IPost } from '@/stores'

export type Thumbnail = {
  w: number
  h: number
  q: number
  f: string
  fit: string
}

type PropTypes = {
  post?: IPost
  thumbnail?: Thumbnail
}

function PostItem({ 
  post, 
  thumbnail = { w: 405, h: 234, q: 100, f: 'webp', fit: 'cover' } 
}: PropTypes) {
  function handleImageLoadError (e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = `https://placehold.co/${thumbnail.w}x${thumbnail.h}?text=404`
    e.currentTarget.alt = 'Image not available'
  }

  return post ? (
    <div className="border border-gray-300">
      <div className="w-full xs:h-[234px] overflow-hidden">
        <img
          role="thumbnail" 
          src={`${post.imgList}?w=${thumbnail.w}&h=${thumbnail.h}&f=${thumbnail.f}&q=${thumbnail.q}&fit=${thumbnail.fit}`}
          alt={post.title} 
          draggable={false}
          onError={handleImageLoadError}
          className="w-full h-full object-cover object-top transform transition-transform duration-300 scale-103 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="mb-4 after:mx-auto after:w-[70px] after:h-[2px] after:bg-amber-300 after:block after:content=['']">
          <h2 role="title" className="mb-[8px] line-clamp-2 leading-relaxed h-[4rem] text-center text-xl font-semibold">
            {post.title}
          </h2>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <p role="creator" className="truncate">{post.creator}</p>
          <p className="truncate">
            <span>{post.viewCnt} views</span> / <span>{moment(post.startDt).format('MMM D YYYY')}</span></p>
        </div>
      </div>
    </div>
  ) : (
    <div data-testid="skeleton" className="border border-gray-100 animate-pulse">
      <div className="w-full h-[234px] overflow-hidden">
        <div className="flex items-center justify-center h-234 bg-gray-200" />
      </div>
      <div className="p-4 text-center">
        <div className="inline-block h-3 w-full my-2 rounded-full bg-gray-200" />
        <div className="inline-block h-3 w-30 my-2 rounded-full bg-gray-200" />
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="inline-block h-1.5 w-25 rounded-full bg-gray-200" />
        <div className="inline-block h-1.5 w-25 rounded-full bg-gray-200" />
      </div>
    </div>
  )
}

export default memo(PostItem)
