import { useState, type FormEvent } from 'react'

type AuthState = 'idle' | 'sending' | 'check-email' | 'unauthorized'

export function SupabaseAuthGate({
  clientName,
  unauthorizedEmail,
  onMagicLink,
  onGoogle,
}: {
  clientName: string
  unauthorizedEmail?: string | null
  onMagicLink: (email: string) => Promise<{ error: unknown }>
  onGoogle: () => Promise<{ error: unknown }>
}) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<AuthState>(
    unauthorizedEmail ? 'unauthorized' : 'idle'
  )
  const [error, setError] = useState<string | null>(null)

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setState('sending')
    setError(null)

    const { error: authError } = await onMagicLink(email.trim())
    if (authError) {
      setError('Failed to send magic link. Please try again.')
      setState('idle')
    } else {
      setState('check-email')
    }
  }

  const handleGoogle = async () => {
    setError(null)
    const { error: authError } = await onGoogle()
    if (authError) {
      setError('Failed to sign in with Google. Please try again.')
    }
  }

  if (state === 'unauthorized') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background-dark">
        <div className="glass-panel rounded-2xl p-8 w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">BLVNK</h1>
            <p className="text-text-muted text-sm">Client Portal</p>
          </div>
          <div className="mb-6">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-400">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-white font-semibold mb-2">Not Authorized</p>
            <p className="text-text-secondary text-sm">
              {unauthorizedEmail} does not have access to the {clientName} portal.
            </p>
            <p className="text-text-muted text-xs mt-2">
              Contact hello@blvnk.space if you believe this is an error.
            </p>
          </div>
          <button
            onClick={() => {
              setState('idle')
              setEmail('')
            }}
            className="text-primary text-sm hover:underline"
          >
            Try a different account
          </button>
        </div>
      </div>
    )
  }

  if (state === 'check-email') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background-dark">
        <div className="glass-panel rounded-2xl p-8 w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">BLVNK</h1>
            <p className="text-text-muted text-sm">Client Portal</p>
          </div>
          <div className="mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-white font-semibold mb-2">Check Your Email</p>
            <p className="text-text-secondary text-sm">
              We sent a magic link to <span className="text-white">{email}</span>
            </p>
            <p className="text-text-muted text-xs mt-2">
              Click the link in the email to access the portal.
            </p>
          </div>
          <button
            onClick={() => {
              setState('idle')
              setEmail('')
            }}
            className="text-primary text-sm hover:underline"
          >
            Use a different email
          </button>
        </div>
      </div>
    )
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
            Sign in to view deliverables for
          </p>
          <p className="text-white font-semibold mt-1">{clientName}</p>
        </div>

        <form onSubmit={handleMagicLink} className="space-y-4 mb-4">
          <input
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setError(null)
            }}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
            autoFocus
          />
          <button
            type="submit"
            disabled={state === 'sending' || !email.trim()}
            className="w-full px-4 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === 'sending' ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#12121a] px-3 text-text-muted">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-4">{error}</p>
        )}
      </div>
    </div>
  )
}
