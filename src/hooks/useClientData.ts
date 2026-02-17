import { useState, useEffect } from 'react'
import type { ClientMetadata, Deliverable } from '../data/types.ts'

export function useClientData(clientSlug: string) {
  const [metadata, setMetadata] = useState<ClientMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/client-data/${clientSlug}/metadata.json`)
      .then(res => {
        if (!res.ok) throw new Error('Client not found')
        return res.json()
      })
      .then((data: ClientMetadata) => {
        setMetadata(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [clientSlug])

  return { metadata, loading, error }
}

export function useDeliverable(clientSlug: string, deliverableId: string) {
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`/client-data/${clientSlug}/deliverables/${deliverableId}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Deliverable not found')
        return res.json()
      })
      .then((data: Deliverable) => {
        setDeliverable(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [clientSlug, deliverableId])

  return { deliverable, loading, error }
}
