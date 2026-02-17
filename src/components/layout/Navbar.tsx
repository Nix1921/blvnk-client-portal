import { Link } from 'react-router-dom'
import type { ClientMetadata } from '../../data/types.ts'

const packageLabels = {
  'brand-sprint': 'Brand Sprint',
  'market-recon': 'Market Recon',
  'launch-kit': 'Launch Kit',
}

export function Navbar({ client, onLogout }: { client: ClientMetadata; onLogout?: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={`/c/${client.clientId}`} className="flex items-center gap-3">
          <span className="text-xl font-bold text-white tracking-tight">BLVNK</span>
          <span className="text-text-muted">|</span>
          <span className="text-text-secondary text-sm">Client Portal</span>
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
