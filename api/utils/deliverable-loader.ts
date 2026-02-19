import deliverablesBundle from '../deliverables-bundle.json';

export interface DeliverableContent {
  id: string;
  title: string;
  content: string;
}

/**
 * Load deliverable markdown files for a client
 * Loads from pre-bundled JSON (created at build time)
 */
export async function loadDeliverables(clientSlug: string): Promise<DeliverableContent[]> {
  try {
    const deliverables = (deliverablesBundle as Record<string, DeliverableContent[]>)[clientSlug] || [];
    console.log(`[Deliverable Loader] Loaded ${deliverables.length} deliverables for ${clientSlug} from bundle`);
    return deliverables;
  } catch (error) {
    console.error(`[Deliverable Loader] Error loading deliverables:`, error);
    return [];
  }
}

/**
 * Search deliverables for relevant content based on query
 * Simple keyword matching for now; can be upgraded to semantic search later
 */
export function searchDeliverables(
  deliverables: DeliverableContent[],
  query: string,
  limit: number = 3
): DeliverableContent[] {
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(' ').filter(w => w.length > 3);

  // Score each deliverable by keyword matches
  const scored = deliverables.map(d => {
    const contentLower = (d.title + ' ' + d.content).toLowerCase();
    const score = keywords.reduce((acc, keyword) => {
      const matches = (contentLower.match(new RegExp(keyword, 'g')) || []).length;
      return acc + matches;
    }, 0);

    return { deliverable: d, score };
  });

  // Sort by score and return top N
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.deliverable);
}
