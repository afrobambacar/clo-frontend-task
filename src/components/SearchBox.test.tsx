import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import SearchBox from './SearchBox'

describe('SearchBox', () => {
  it('should render with default value', () => {
    render(<SearchBox defaultValue="test" onSubmit={() => {}} />)
    
    const input = screen.getByRole('searchbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('test')
  })

  it('should update input value when typing', () => {
    render(<SearchBox defaultValue="" onSubmit={() => {}} />)
    
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'new value' } })
    
    expect(input).toHaveValue('new value')
  })

  it('should call onSubmit with input value when form is submitted', () => {
    const handleSubmit = vi.fn()
    render(<SearchBox defaultValue="test" onSubmit={handleSubmit} />)
    
    const form = screen.getByRole('search')
    fireEvent.submit(form)
    
    expect(handleSubmit).toHaveBeenCalledWith('test')
  })

  it('should render with empty default value', () => {
    render(<SearchBox defaultValue="" onSubmit={() => {}} />)
    
    const input = screen.getByRole('searchbox')
    expect(input).toHaveValue('')
  })
}) 