import { useState, useRef, useCallback } from 'react'

export default function useObserver(): [boolean, (node: HTMLDivElement | null) => void] {
  const [inView, setInView] = useState<boolean>(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const viewRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return setInView(false)
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      setInView(entries[0]?.isIntersecting ?? false)
    })
    if (node) observer.current.observe(node)
  }, [])

  return [inView, viewRef]
}
