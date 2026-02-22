import type { DeliverableMetadata } from '../../data/types.ts'

export function ProgressTracker({ deliverables }: { deliverables: DeliverableMetadata[] }) {
  const departments = deliverables.filter(d => d.type === 'department')
  const gates = deliverables.filter(d => d.type === 'quality-gate')
  const finals = deliverables.filter(d => d.type === 'final-summary')

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

      <div className="w-full bg-white/5 rounded-full h-2 mb-6">
        <div
          className="bg-primary rounded-full h-2 transition-all duration-500"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <Stat label="Deliverables" count={departments.length} completed={departments.filter(d => d.status === 'completed').length} />
        <Stat label="Quality Gates" count={gates.length} completed={gates.filter(d => d.status === 'completed').length} />
        <Stat label="Executive Summary" count={finals.length} completed={finals.filter(d => d.status === 'completed').length} />
      </div>
    </div>
  )
}

function Stat({ label, count, completed }: { label: string; count: number; completed: number }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{completed}/{count}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  )
}
