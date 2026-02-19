import { useState, useRef } from 'react'
import type { KeyboardEvent } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  disabled?: boolean
}

export function ChatInput({ onSendMessage, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!message.trim() || isLoading || disabled) return

    onSendMessage(message.trim())
    setMessage('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <div className="border-t border-white/10 p-4 bg-background-dark">
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your brand strategy..."
          disabled={disabled || isLoading}
          className="flex-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/40 resize-none min-h-[42px] max-h-[120px] disabled:opacity-50"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isLoading || disabled}
          className="px-4 py-2 bg-primary text-background-dark rounded-lg font-medium text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-background-dark border-t-transparent rounded-full animate-spin" />
              <span>Thinking...</span>
            </>
          ) : (
            <span>Send</span>
          )}
        </button>
      </div>
      <p className="text-xs text-text-muted mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
}
