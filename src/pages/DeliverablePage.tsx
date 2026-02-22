import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useClientData, useDeliverable } from '../hooks/useClientData.ts'
import { useAuth } from '../hooks/useAuth.ts'
import { useSupabaseAuth } from '../hooks/useSupabaseAuth.ts'
import { Navbar } from '../components/layout/Navbar.tsx'
import { Sidebar } from '../components/layout/Sidebar.tsx'
import { Footer } from '../components/layout/Footer.tsx'
import { PasswordGate } from '../components/auth/PasswordGate.tsx'
import { SupabaseAuthGate } from '../components/auth/SupabaseAuthGate.tsx'
import { MarkdownRenderer } from '../components/deliverables/MarkdownRenderer.tsx'
import { TableOfContents } from '../components/deliverables/TableOfContents.tsx'
import { ChatPanel } from '../components/chat/ChatPanel.tsx'

export function DeliverablePage() {
  const { clientSlug, deliverableId } = useParams<{ clientSlug: string; deliverableId: string }>()
  const { metadata, loading: metaLoading } = useClientData(clientSlug ?? '')
  const { deliverable, loading: delLoading, error } = useDeliverable(clientSlug ?? '', deliverableId ?? '')
  const { isAuthenticated: isPasswordAuth, authenticate, logout: passwordLogout } = useAuth(clientSlug ?? '')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  if (metaLoading || delLoading || (authMethod === 'supabase' && supabaseLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted text-sm">Loading deliverable...</p>
        </div>
      </div>
    )
  }

  if (!metadata) return null

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

  if (error || !deliverable) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Navbar client={metadata} onLogout={authMethod === 'supabase' ? signOut : (metadata.password ? passwordLogout : undefined)} />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="glass-panel rounded-xl p-8 text-center max-w-md">
            <h1 className="text-xl font-bold text-white mb-2">Deliverable Not Found</h1>
            <p className="text-text-secondary text-sm mb-4">This deliverable doesn't exist.</p>
            <Link to={`/c/${clientSlug}`} className="text-primary hover:underline text-sm">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Find prev/next
  const allDeliverables = metadata.deliverables
  const currentIndex = allDeliverables.findIndex(d => d.id === deliverableId)
  const prev = currentIndex > 0 ? allDeliverables[currentIndex - 1] : null
  const next = currentIndex < allDeliverables.length - 1 ? allDeliverables[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-background-dark">
      <Navbar client={metadata} onLogout={authMethod === 'supabase' ? signOut : (metadata.password ? passwordLogout : undefined)} />

      <Sidebar
        deliverables={metadata.deliverables}
        clientSlug={clientSlug ?? ''}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-30 lg:hidden glass-panel rounded-lg p-2 text-text-secondary hover:text-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Main content */}
      <div className="pt-16 lg:pl-72">
        <div className="max-w-5xl mx-auto px-6 py-8 lg:pr-72">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to={`/c/${clientSlug}`} className="text-text-muted hover:text-text-secondary text-sm transition-colors">
              &larr; Back to dashboard
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-text-muted">{deliverable.metadata.dateGenerated}</span>
              <span className="text-text-muted">&middot;</span>
              <span className="text-xs text-text-muted">{deliverable.metadata.estimatedReadTime} min read</span>
            </div>
            <h1 className="text-3xl font-bold text-white">{deliverable.metadata.title}</h1>
          </div>

          {/* Markdown content (strip first H1 to avoid duplicate title) */}
          <MarkdownRenderer content={deliverable.rawMarkdown.replace(/^#\s+.+\n?/, '')} />

          {/* Prev/Next navigation */}
          <div className="border-t border-white/10 mt-12 pt-8 flex justify-between">
            {prev ? (
              <Link to={`/c/${clientSlug}/${prev.id}`} className="group">
                <p className="text-xs text-text-muted mb-1">&larr; Previous</p>
                <p className="text-sm text-text-secondary group-hover:text-primary transition-colors">{prev.title}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/c/${clientSlug}/${next.id}`} className="group text-right">
                <p className="text-xs text-text-muted mb-1">Next &rarr;</p>
                <p className="text-sm text-text-secondary group-hover:text-primary transition-colors">{next.title}</p>
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* Floating ToC (desktop only) */}
        <div className="hidden lg:block fixed top-24 right-6 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
          <TableOfContents markdown={deliverable.rawMarkdown} />
        </div>

        <Footer />
      </div>

      {/* Chat Panel */}
      <ChatPanel clientSlug={clientSlug ?? ''} clientName={metadata.clientName} />
    </div>
  )
}
