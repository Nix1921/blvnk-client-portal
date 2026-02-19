import { useState, useCallback, useRef } from 'react'
import type { ChatMessage, ChatSource } from '../data/types'

interface UseChatResult {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (message: string) => Promise<void>
  clearMessages: () => void
}

interface DeliverableJSON {
  metadata: { id: string; title: string }
  rawMarkdown: string
}

// Map of keywords to deliverable IDs for source extraction
const SOURCE_KEYWORDS: Record<string, { id: string; title: string }> = {
  'executive summary': { id: 'executive-summary', title: 'Executive Summary' },
  'market intelligence report': { id: '01-market-intelligence-report', title: 'Market Intelligence Report' },
  'competitive dynamics': { id: '02-competitive-dynamics-report', title: 'Competitive Dynamics Model & Strategy' },
  'strategic positioning brief': { id: '03-strategic-positioning-brief', title: 'Strategic Positioning Brief & Category Blueprint' },
  'brand archetype guide': { id: '04-brand-archetype-guide', title: 'Brand Archetype Guide' },
  'brandscript': { id: '05-brandscript-and-manifesto', title: 'BrandScript & Brand Manifesto' },
  'manifesto': { id: '05-brandscript-and-manifesto', title: 'BrandScript & Brand Manifesto' },
  'tone of voice': { id: '06-tone-of-voice-guide', title: 'Tone of Voice Guide, Word Bank & Copy Deck' },
  'brand identity system': { id: '07-brand-identity-system', title: 'Brand Identity System' },
  'design system': { id: '08-design-system', title: 'Design System' },
  'semiotic dictionary': { id: '09-semiotic-dictionary', title: 'Semiotic Dictionary' },
  'website ux': { id: '10-website-ux-wireframes', title: 'Website UX Wireframes & Digital Architecture' },
  'wireframes': { id: '10-website-ux-wireframes', title: 'Website UX Wireframes & Digital Architecture' },
  'content strategy': { id: '11-content-strategy-channel-plan', title: 'Content Strategy & Channel Plan' },
  'email lifecycle': { id: '12-email-lifecycle-system', title: 'Email Lifecycle System' },
  'ad creative': { id: '13-ad-creative-testing-framework', title: 'Ad Creative Testing Framework' },
  'lightning strike': { id: '14-lightning-strike-execution-plan', title: 'Lightning Strike Execution Plan' },
  'measurement framework': { id: '15-measurement-framework', title: 'Measurement Framework & Dashboards' },
  'ninety-day roadmap': { id: '16-ninety-day-roadmap', title: '90-Day Post-Launch Roadmap' },
  '90-day': { id: '16-ninety-day-roadmap', title: '90-Day Post-Launch Roadmap' },
}

function extractSources(answer: string): ChatSource[] {
  const answerLower = answer.toLowerCase()
  const foundIds = new Set<string>()
  const sources: ChatSource[] = []

  for (const [keyword, deliverable] of Object.entries(SOURCE_KEYWORDS)) {
    if (answerLower.includes(keyword) && !foundIds.has(deliverable.id)) {
      foundIds.add(deliverable.id)
      sources.push({ deliverableId: deliverable.id, title: deliverable.title })
    }
  }

  return sources
}

function searchDeliverables(
  deliverables: DeliverableJSON[],
  query: string,
  limit: number = 5
): DeliverableJSON[] {
  const keywords = query.toLowerCase().split(' ').filter(w => w.length > 3)

  const scored = deliverables.map(d => {
    const text = (d.metadata.title + ' ' + d.rawMarkdown).toLowerCase()
    const score = keywords.reduce((acc, kw) => {
      return acc + (text.match(new RegExp(kw, 'g')) || []).length
    }, 0)
    return { d, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.d)
}

// Deliverable file names (matches public/client-data/{slug}/deliverables/)
const DELIVERABLE_FILES = [
  'executive-summary',
  'gate-tracker',
  '01-market-intelligence-report',
  '02-competitive-dynamics-report',
  '03-strategic-positioning-brief',
  '04-brand-archetype-guide',
  '05-brandscript-and-manifesto',
  '06-tone-of-voice-guide',
  '07-brand-identity-system',
  '08-design-system',
  '09-semiotic-dictionary',
  '10-website-ux-wireframes',
  '11-content-strategy-channel-plan',
  '12-email-lifecycle-system',
  '13-ad-creative-testing-framework',
  '14-lightning-strike-execution-plan',
  '15-measurement-framework',
  '16-ninety-day-roadmap',
]

export function useChat(clientSlug: string): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const historyRef = useRef<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const deliverablesCache = useRef<DeliverableJSON[] | null>(null)

  const loadDeliverables = useCallback(async (): Promise<DeliverableJSON[]> => {
    if (deliverablesCache.current) return deliverablesCache.current

    const results: DeliverableJSON[] = []
    for (const file of DELIVERABLE_FILES) {
      try {
        const res = await fetch(`/client-data/${clientSlug}/deliverables/${file}.json`)
        if (res.ok) {
          const data = await res.json()
          results.push(data)
        }
      } catch {
        // Skip failed fetches
      }
    }
    deliverablesCache.current = results
    return results
  }, [clientSlug])

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return

    setIsLoading(true)
    setError(null)

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMessage])

    try {
      // 1. Load all deliverables (cached after first call)
      const allDeliverables = await loadDeliverables()

      // 2. Search for relevant deliverables
      const relevant = searchDeliverables(allDeliverables, message, 5)

      // 3. Build context string from relevant deliverables (truncate to stay within limits)
      const context = relevant
        .map(d => {
          const markdown = d.rawMarkdown.length > 4000
            ? d.rawMarkdown.slice(0, 4000) + '\n\n[... truncated]'
            : d.rawMarkdown
          return `--- ${d.metadata.title} ---\n${markdown}`
        })
        .join('\n\n')

      // 4. Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context,
          history: historyRef.current.slice(-10), // Last 5 exchanges
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()

      // 5. Extract sources from the answer
      const sources = extractSources(data.answer)

      // 6. Update conversation history
      historyRef.current.push(
        { role: 'user', content: message },
        { role: 'assistant', content: data.answer }
      )

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        sources,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('[useChat] Error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [clientSlug, loadDeliverables])

  const clearMessages = useCallback(() => {
    setMessages([])
    historyRef.current = []
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages }
}
