import { Link } from 'react-router-dom'
import type { ChatSource } from '../../data/types'

interface SourceCitationProps {
  sources: ChatSource[]
  clientSlug: string
}

export function SourceCitation({ sources, clientSlug }: SourceCitationProps) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <p className="text-xs text-text-muted mb-2">Sources:</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <Link
            key={source.deliverableId}
            to={`/c/${clientSlug}/${source.deliverableId}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-dark border border-white/5 rounded text-xs text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
          >
            <span className="text-primary">📄</span>
            <span>{source.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
