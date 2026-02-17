import type { ClientMetadata } from '../../data/types.ts'
import { DeliverableCard } from './DeliverableCard.tsx'
import { ProgressTracker } from './ProgressTracker.tsx'

const packageLabels = {
  'brand-sprint': 'Brand Sprint',
  'market-recon': 'Market Recon',
  'launch-kit': 'Launch Kit',
}

export function Dashboard({ client }: { client: ClientMetadata }) {
  const departments = client.deliverables.filter(d => d.type === 'department')
  const gates = client.deliverables.filter(d => d.type === 'quality-gate')
  const finals = client.deliverables.filter(d => d.type === 'final-summary')

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-primary text-sm font-medium mb-2">
            {packageLabels[client.packageType]} &mdash; {client.packagePrice}
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">
            Your Deliverables
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Welcome to your BLVNK client portal. Below you'll find all deliverables from your{' '}
            {packageLabels[client.packageType]} engagement, organized by department.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <ProgressTracker deliverables={client.deliverables} />
        </div>

        {/* Department Reports */}
        {departments.length > 0 && (
          <Section title="Department Reports">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map(d => (
                <DeliverableCard key={d.id} deliverable={d} clientSlug={client.clientId} />
              ))}
            </div>
          </Section>
        )}

        {/* Quality Gates */}
        {gates.length > 0 && (
          <Section title="Quality Gates">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gates.map(d => (
                <DeliverableCard key={d.id} deliverable={d} clientSlug={client.clientId} />
              ))}
            </div>
          </Section>
        )}

        {/* Final Summary */}
        {finals.length > 0 && (
          <Section title="Final Summary">
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {finals.map(d => (
                <DeliverableCard key={d.id} deliverable={d} clientSlug={client.clientId} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      {children}
    </div>
  )
}
