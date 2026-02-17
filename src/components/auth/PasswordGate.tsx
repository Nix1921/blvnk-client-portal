import { useState, type FormEvent } from 'react'

export function PasswordGate({
  clientName,
  onAuthenticate,
}: {
  clientName: string
  onAuthenticate: (password: string) => boolean
}) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const success = onAuthenticate(password)
    if (!success) {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background-dark">
      <div className="glass-panel rounded-2xl p-8 w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">BLVNK</h1>
          <p className="text-text-muted text-sm">Client Portal</p>
        </div>

        <div className="mb-6">
          <p className="text-text-secondary text-sm">
            Enter the password to view deliverables for
          </p>
          <p className="text-white font-semibold mt-1">{clientName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
            autoFocus
          />
          {error && (
            <p className="text-red-400 text-sm">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition-colors"
          >
            Access Portal
          </button>
        </form>
      </div>
    </div>
  )
}
