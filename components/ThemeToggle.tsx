'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Prevent hydration mismatch — render placeholder until mounted
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Alternar tema"
      className="flex items-center justify-center w-9 h-9 rounded-sm border border-gold/25 text-gold/70 hover:border-gold/70 hover:text-gold hover:bg-gold/5 transition-all"
    >
      {resolvedTheme === 'dark'
        ? <Sun size={18} strokeWidth={1.5} />
        : <Moon size={18} strokeWidth={1.5} />
      }
    </button>
  )
}
