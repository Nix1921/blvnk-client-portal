import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark">
      <div className="glass-panel rounded-xl p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <p className="text-text-secondary text-sm mb-6">Page not found.</p>
        <Link to="/" className="text-primary hover:underline text-sm">
          Go to portal
        </Link>
      </div>
    </div>
  )
}
