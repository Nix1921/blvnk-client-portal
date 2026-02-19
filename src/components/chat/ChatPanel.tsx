import { useState, useEffect, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'

interface ChatPanelProps {
  clientSlug: string
  clientName: string
}

export function ChatPanel({ clientSlug, clientName }: ChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, isLoading, error, sendMessage, clearMessages } = useChat(clientSlug)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isMinimized])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 glass-panel rounded-xl px-6 py-4 flex items-center gap-3 hover:bg-primary/10 transition-all shadow-lg group"
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-medium text-text-primary">Ask about your strategy</span>
        <span className="text-xl">💬</span>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-xl shadow-2xl flex flex-col transition-all border border-white/10 ${
        isMinimized ? 'w-80 h-16' : 'w-[480px] h-[600px]'
      }`}
      style={{ background: 'rgba(10, 12, 18, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div>
            <h3 className="font-semibold text-text-primary text-sm">
              Brand Intelligence Assistant
            </h3>
            <p className="text-xs text-text-muted">{clientName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all messages?')) {
                  clearMessages()
                }
              }}
              className="text-text-muted hover:text-text-secondary transition-colors p-1"
              title="Clear messages"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M5.5 4V3a1 1 0 011-1h3a1 1 0 011 1v1m2 0v9a1 1 0 01-1 1h-8a1 1 0 01-1-1V4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-text-muted hover:text-text-secondary transition-colors p-1"
          >
            {isMinimized ? '⬆' : '⬇'}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-muted hover:text-text-secondary transition-colors p-1"
          >
            ✕
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-sm">
                  <p className="text-text-muted text-sm mb-4">
                    Ask me anything about your brand strategy, deliverables, or the
                    frameworks we used.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => sendMessage('What is our brand archetype?')}
                      className="w-full text-left px-3 py-2 bg-surface-dark rounded text-xs text-text-secondary hover:text-primary hover:border-primary/40 border border-white/5 transition-colors"
                    >
                      What is our brand archetype?
                    </button>
                    <button
                      onClick={() => sendMessage('What is Category Design?')}
                      className="w-full text-left px-3 py-2 bg-surface-dark rounded text-xs text-text-secondary hover:text-primary hover:border-primary/40 border border-white/5 transition-colors"
                    >
                      What is Category Design?
                    </button>
                    <button
                      onClick={() => sendMessage('What are the three rules?')}
                      className="w-full text-left px-3 py-2 bg-surface-dark rounded text-xs text-text-secondary hover:text-primary hover:border-primary/40 border border-white/5 transition-colors"
                    >
                      What are the three rules?
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    clientSlug={clientSlug}
                  />
                ))}
                {error && (
                  <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-sm text-red-400">
                    Error: {error}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </>
      )}
    </div>
  )
}
