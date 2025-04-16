import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import PostItem, { type Thumbnail } from './PostItem'
import { type IPost } from '@/stores'

describe('PostItem', () => {
  const mockPost: IPost = {
    seq: 1,
    creator: 'John Doe',
    title: 'Test Post',
    body: 'Test content',
    imgList: 'https://example.com/image.jpg',
    viewCnt: 100,
    startDt: '2024-03-20',
  }

  const mockThumbnail: Thumbnail = {
    w: 500,
    h: 234,
    q: 100,
    f: 'webp',
    fit: 'cover',
  }

  it('should render post content when post is provided', () => {
    render(<PostItem post={mockPost} thumbnail={mockThumbnail} />)

    expect(screen.getByText(mockPost.title)).toBeInTheDocument()
    expect(screen.getByText(mockPost.creator)).toBeInTheDocument()
    expect(screen.getByText(`${mockPost.viewCnt} views`)).toBeInTheDocument()
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', `${mockPost.imgList}?w=${mockThumbnail.w}&h=${mockThumbnail.h}&f=${mockThumbnail.f}&q=${mockThumbnail.q}&fit=${mockThumbnail.fit}`)
    expect(image).toHaveAttribute('alt', mockPost.title)
  })

  it('should render loading skeleton when post is not provided', () => {
    render(<PostItem />)
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('should handle image load error', () => {
    render(<PostItem post={mockPost} thumbnail={mockThumbnail} />)
    
    const image = screen.getByRole('img')
    fireEvent.error(image)
    
    expect(image).toHaveAttribute('src', 'https://placehold.co/500x234?text=404')
    expect(image).toHaveAttribute('alt', 'Image not available')
  })
}) 