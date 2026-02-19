import { SourceCitation } from './SourceCitation'
import type { ChatMessage as ChatMessageType } from '../../data/types'

interface ChatMessageProps {
  message: ChatMessageType
  clientSlug: string
}

export function ChatMessage({ message, clientSlug }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message bubble */}
        <div
          className={`px-4 py-3 rounded-lg ${
            isUser
              ? 'bg-primary text-background-dark'
              : 'glass-panel text-text-primary'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Source citations (assistant messages only) */}
        {!isUser && message.sources && (
          <SourceCitation sources={message.sources} clientSlug={clientSlug} />
        )}

        {/* Timestamp */}
        <p className="text-xs text-text-muted mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
