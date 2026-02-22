export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          Confidential &mdash; Powered by BLVNK Intelligence
        </p>
        <p className="text-xs text-text-muted">
          Questions?{' '}
          <a href="mailto:hello@blvnk.space" className="text-primary hover:underline">
            hello@blvnk.space
          </a>
        </p>
      </div>
    </footer>
  )
}
