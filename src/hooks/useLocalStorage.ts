import { useEffect, useState } from 'react'

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ?? initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // Storage unavailable (e.g. private mode with quota exceeded) — fail silently.
    }
  }, [key, value])

  return [value, setValue] as const
}
