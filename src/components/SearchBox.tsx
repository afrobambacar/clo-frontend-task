import { useState } from 'react'

type PropTypes = {
  defaultValue: string
  onSubmit: (value: string) => void
}

export default function SearchBox({ 
  defaultValue = '', 
  onSubmit 
}: PropTypes) {
  const [value, setValue] = useState<string>(defaultValue)

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <form 
      role="search"
      onSubmit={handleSubmit}
      className="flex items-center justify-center xs:justify-end">
      <input 
        role="searchbox"
        type="search"
        value={value}
        placeholder="Title, Content..." 
        onChange={e => setValue(e.target.value)}
        className="p-2 leading-tight border border-gray-400 focus:outline-none "
      />
      <button 
        type="submit"
        className="py-2 px-4 leading-tight border border-gray-400"
      >
        Search
      </button>
    </form>
  )
}
