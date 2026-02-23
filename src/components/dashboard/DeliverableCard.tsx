import { Link } from 'react-router-dom'
import type { DeliverableMetadata } from '../../data/types.ts'

const typeStyles = {
  department: { label: 'Department', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  'quality-gate': { label: 'Quality Gate', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  'final-summary': { label: 'Final Summary', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
}

export function DeliverableCard({
  deliverable,
  clientSlug,
}: {
  deliverable: DeliverableMetadata
  clientSlug: string
}) {
  const style = typeStyles[deliverable.type]

  return (
    <Link
      to={`/c/${clientSlug}/${deliverable.id}`}
      className="glass-panel-hover rounded-xl p-6 block group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${style.bg} ${style.color} border ${style.border}`}>
          {deliverable.type === 'department' && deliverable.departmentNumber
            ? `DELV ${deliverable.departmentNumber}`
            : deliverable.type === 'quality-gate' && deliverable.gateNumber
              ? `Gate ${deliverable.gateNumber}`
              : style.label}
        </span>
        <span className="text-xs text-text-muted">{deliverable.estimatedReadTime} min read</span>
      </div>

      <h3 className="text-white font-semibold mb-2 group-hover:text-primary transition-colors">
        {deliverable.title}
      </h3>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-text-muted">{deliverable.dateGenerated}</span>
        <span className={`text-xs font-medium ${
          deliverable.status === 'completed' ? 'text-success' : 'text-warning'
        }`}>
          {deliverable.status === 'completed' ? 'Completed' : 'In Review'}
        </span>
      </div>
    </Link>
  )
}
