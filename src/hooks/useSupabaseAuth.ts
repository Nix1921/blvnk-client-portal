import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.ts'
import type { Session } from '@supabase/supabase-js'

export function useSupabaseAuth(allowedEmails?: string[]) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session && allowedEmails?.length) {
        setUnauthorized(!allowedEmails.includes(session.user.email ?? ''))
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session && allowedEmails?.length) {
        setUnauthorized(!allowedEmails.includes(session.user.email ?? ''))
      } else {
        setUnauthorized(false)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [allowedEmails])

  const signInWithMagicLink = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href,
      },
    })
    return { error }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href,
      },
    })
    return { error }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUnauthorized(false)
  }, [])

  const isAuthenticated = !!session && !unauthorized

  return {
    session,
    loading,
    isAuthenticated,
    unauthorized,
    userEmail: session?.user.email ?? null,
    signInWithMagicLink,
    signInWithGoogle,
    signOut,
  }
}
