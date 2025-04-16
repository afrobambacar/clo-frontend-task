import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import SelectBox from './SelectBox'

describe('SelectBox', () => {
  const mockOptions = [
    { value: 'default', label: 'Default' },
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  it('should render with default value and options', () => {
    render(<SelectBox options={mockOptions} onChange={() => {}} />)
    
    const selectElement = screen.getByRole('selectbox')
    expect(selectElement).toBeInTheDocument()
    expect(selectElement).toHaveValue('default')
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('should call onChange when selection changes', () => {
    const handleChange = vi.fn()
    render(<SelectBox options={mockOptions} onChange={handleChange} />)
    
    const selectElement = screen.getByRole('selectbox')
    fireEvent.change(selectElement, { target: { value: 'asc' } })
    
    expect(handleChange).toHaveBeenCalledWith('asc')
  })

  it('should use provided defaultValue', () => {
    render(<SelectBox options={mockOptions} onChange={() => {}} defaultValue="asc" />)
    
    const selectElement = screen.getByRole('selectbox')
    expect(selectElement).toHaveValue('asc')
  })

  it('should render with empty options array', () => {
    render(<SelectBox options={[]} onChange={() => {}} />)
    
    const selectElement = screen.getByRole('selectbox')
    expect(selectElement).toBeInTheDocument()
    expect(selectElement.children).toHaveLength(0)
  })
}) 