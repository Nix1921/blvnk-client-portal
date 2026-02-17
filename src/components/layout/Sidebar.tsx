import { Link, useParams } from 'react-router-dom'
import type { DeliverableMetadata } from '../../data/types.ts'

const typeIcons = {
  department: '\u25CB',
  'quality-gate': '\u25C7',
  'final-summary': '\u2605',
}

const typeLabels = {
  department: 'Department',
  'quality-gate': 'Quality Gate',
  'final-summary': 'Final Summary',
}

export function Sidebar({
  deliverables,
  clientSlug,
  isOpen,
  onClose,
}: {
  deliverables: DeliverableMetadata[]
  clientSlug: string
  isOpen: boolean
  onClose: () => void
}) {
  const { deliverableId } = useParams()

  const departments = deliverables.filter(d => d.type === 'department')
  const gates = deliverables.filter(d => d.type === 'quality-gate')
  const finals = deliverables.filter(d => d.type === 'final-summary')

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-surface-dark border-r border-white/5 z-40 overflow-y-auto scrollbar-thin transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          <SidebarSection title="Department Reports" items={departments} clientSlug={clientSlug} activeId={deliverableId} icon={typeIcons.department} />
          <SidebarSection title="Quality Gates" items={gates} clientSlug={clientSlug} activeId={deliverableId} icon={typeIcons['quality-gate']} />
          <SidebarSection title="Final Summary" items={finals} clientSlug={clientSlug} activeId={deliverableId} icon={typeIcons['final-summary']} />
        </div>
      </aside>
    </>
  )
}

function SidebarSection({
  title,
  items,
  clientSlug,
  activeId,
  icon,
}: {
  title: string
  items: DeliverableMetadata[]
  clientSlug: string
  activeId?: string
  icon: string
}) {
  if (items.length === 0) return null

  return (
    <div>
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map(item => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <Link
                to={`/c/${clientSlug}/${item.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xs">{icon}</span>
                <span className="truncate">{item.title}</span>
                <span className="ml-auto text-xs text-text-muted">{item.estimatedReadTime}m</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { typeLabels }
