import { useParams } from 'react-router-dom'
import { useClientData } from '../hooks/useClientData.ts'
import { useAuth } from '../hooks/useAuth.ts'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { PasswordGate } from '../components/auth/PasswordGate.tsx'
import { Dashboard } from '../components/dashboard/Dashboard.tsx'
import { ChatPanel } from '../components/chat/ChatPanel.tsx'

export function ClientPortal() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const { metadata, loading, error } = useClientData(clientSlug ?? '')
  const { isAuthenticated, authenticate, logout } = useAuth(clientSlug ?? '')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted text-sm">Loading portal...</p>
        </div>
      </div>
    )
  }

  if (error || !metadata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="glass-panel rounded-xl p-8 text-center max-w-md">
          <h1 className="text-xl font-bold text-white mb-2">Portal Not Found</h1>
          <p className="text-text-secondary text-sm">
            The client portal you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    )
  }

  if (metadata.password && !isAuthenticated) {
    return (
      <PasswordGate
        clientName={metadata.clientName}
        onAuthenticate={(pw) => authenticate(pw, metadata.password!)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Navbar client={metadata} onLogout={metadata.password ? logout : undefined} />
      <Dashboard client={metadata} />
      <Footer />
      <ChatPanel clientSlug={clientSlug ?? ''} clientName={metadata.clientName} />
    </div>
  )
}
