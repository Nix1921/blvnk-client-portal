export function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background-dark">
      <div className="glass-panel rounded-2xl p-8 w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">BLVNK</h1>
          <p className="text-text-muted text-sm">Client Portal</p>
        </div>

        <div className="mb-6">
          <p className="text-text-secondary text-sm leading-relaxed">
            Use the link provided by your strategist to access your deliverables.
          </p>
        </div>

        <div className="rounded-lg bg-white/5 border border-white/10 px-4 py-3">
          <p className="text-text-muted text-xs mb-1">Portal URL format</p>
          <p className="text-white text-sm font-mono">
            portal.blvnk.space/c/<span className="text-primary">your-project</span>
          </p>
        </div>

        <p className="text-text-muted text-xs mt-6">
          Don't have a link?{' '}
          <a href="mailto:hello@blvnk.com" className="text-primary hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  )
}
