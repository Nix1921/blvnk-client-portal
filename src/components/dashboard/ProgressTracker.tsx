import type { DeliverableMetadata } from '../../data/types.ts'

export function ProgressTracker({ deliverables }: { deliverables: DeliverableMetadata[] }) {
  const total = deliverables.length
  const completed = deliverables.filter(d => d.status === 'completed').length

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Progress</h2>
        <span className="text-sm text-text-secondary">
          {completed}/{total} deliverables complete
        </span>
      </div>

      <div className="w-full bg-white/5 rounded-full h-2 mb-4">
        <div
          className="bg-primary rounded-full h-2 transition-all duration-500"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold text-white">{completed}/{total}</p>
        <p className="text-sm text-text-muted mt-2">Deliverables Complete</p>
      </div>
    </div>
  )
}
