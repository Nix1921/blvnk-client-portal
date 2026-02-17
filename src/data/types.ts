export interface ClientMetadata {
  clientId: string
  clientName: string
  packageType: 'brand-sprint' | 'market-recon' | 'launch-kit'
  packagePrice: string
  dateCompleted: string
  password?: string
  deliverables: DeliverableMetadata[]
}

export interface DeliverableMetadata {
  id: string
  type: 'department' | 'quality-gate' | 'final-summary'
  title: string
  departmentNumber?: number
  gateNumber?: number
  dateGenerated: string
  status: 'completed' | 'in-review' | 'pending'
  order: number
  estimatedReadTime: number
}

export interface Deliverable {
  metadata: DeliverableMetadata
  rawMarkdown: string
}

export interface TOCEntry {
  id: string
  title: string
  level: number
  children: TOCEntry[]
}
