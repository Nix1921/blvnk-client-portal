import { useState, useCallback } from 'react'
import type { ChatMessage, ChatSource } from '../data/types'

interface UseChatResult {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (message: string) => Promise<void>
  clearMessages: () => void
}

export function useChat(clientSlug: string): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return

    setIsLoading(true)
    setError(null)

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientSlug,
          message,
          sessionId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        sources: data.sources as ChatSource[],
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])

      // Update session ID if new
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId)
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('[useChat] Error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [clientSlug, sessionId])

  const clearMessages = useCallback(() => {
    setMessages([])
    setSessionId(null)
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  }
}
