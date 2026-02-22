import { useParams } from 'react-router-dom'
import { useClientData } from '../hooks/useClientData.ts'
import { useAuth } from '../hooks/useAuth.ts'
import { useSupabaseAuth } from '../hooks/useSupabaseAuth.ts'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { PasswordGate } from '../components/auth/PasswordGate.tsx'
import { SupabaseAuthGate } from '../components/auth/SupabaseAuthGate.tsx'
import { Dashboard } from '../components/dashboard/Dashboard.tsx'
import { ChatPanel } from '../components/chat/ChatPanel.tsx'

export function ClientPortal() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const { metadata, loading, error } = useClientData(clientSlug ?? '')
  const { isAuthenticated: isPasswordAuth, authenticate, logout: passwordLogout } = useAuth(clientSlug ?? '')

  const authMethod = metadata?.authMethod ?? 'password'
  const {
    isAuthenticated: isSupabaseAuth,
    loading: supabaseLoading,
    unauthorized,
    userEmail,
    signInWithMagicLink,
    signInWithGoogle,
    signOut,
  } = useSupabaseAuth(authMethod === 'supabase' ? metadata?.allowedEmails : undefined)

  if (loading || (authMethod === 'supabase' && supabaseLoading)) {
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

  // Password auth gate
  if (authMethod === 'password' && metadata.password && !isPasswordAuth) {
    return (
      <PasswordGate
        clientName={metadata.clientName}
        onAuthenticate={(pw) => authenticate(pw, metadata.password!)}
      />
    )
  }

  // Supabase auth gate
  if (authMethod === 'supabase' && (!isSupabaseAuth || unauthorized)) {
    return (
      <SupabaseAuthGate
        clientName={metadata.clientName}
        unauthorizedEmail={unauthorized ? userEmail : null}
        onMagicLink={signInWithMagicLink}
        onGoogle={signInWithGoogle}
      />
    )
  }

  const handleLogout = authMethod === 'supabase' ? signOut : (metadata.password ? passwordLogout : undefined)

  return (
    <div className="min-h-screen bg-background-dark">
      <Navbar client={metadata} onLogout={handleLogout} />
      <Dashboard client={metadata} />
      <Footer />
      <ChatPanel clientSlug={clientSlug ?? ''} clientName={metadata.clientName} />
    </div>
  )
}
