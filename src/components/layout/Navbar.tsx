import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { ClientMetadata } from '../../data/types.ts'

const packageLabels = {
  'brand-sprint': 'Brand Sprint',
  'market-recon': 'Market Recon',
  'launch-kit': 'Launch Kit',
}

export function Navbar({ client, onLogout }: { client: ClientMetadata; onLogout?: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 transition-all duration-300 ${
      scrolled ? 'bg-background-dark/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={`/c/${client.clientId}`} className="flex items-center gap-3 text-base tracking-[0.12em]">
          <span className="font-semibold text-white">BLVNK</span>
          <span className="font-light text-text-secondary">Client Portal</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-text-secondary hidden sm:block">{client.clientName}</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {packageLabels[client.packageType]}
          </span>
          {onLogout && (
            <button
              onClick={onLogout}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
