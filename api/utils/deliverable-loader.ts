import * as fs from 'fs';
import * as path from 'path';

export interface DeliverableContent {
  id: string;
  title: string;
  content: string;
}

/**
 * Load deliverable markdown files for a client
 * Used to build context for Claude API queries
 */
export async function loadDeliverables(clientSlug: string): Promise<DeliverableContent[]> {
  // For serverless deployment, deliverables need to be in the deployment bundle
  // Path: /var/task/deliverables/{clientSlug}/ (Vercel serverless)
  // OR: relative to API endpoint during development

  const deliverablesPath = path.join(process.cwd(), 'deliverables', clientSlug);

  try {
    // Check if deliverables directory exists
    if (!fs.existsSync(deliverablesPath)) {
      console.warn(`[Deliverable Loader] No deliverables found at: ${deliverablesPath}`);
      return [];
    }

    const deliverables: DeliverableContent[] = [];

    // Read all markdown files
    const files = fs.readdirSync(deliverablesPath, { recursive: true }) as string[];
    const mdFiles = files.filter(file => file.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(deliverablesPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract ID from filename
      const id = path.basename(file, '.md');

      // Extract title from first heading
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : id;

      deliverables.push({ id, title, content });
    }

    console.log(`[Deliverable Loader] Loaded ${deliverables.length} deliverables for ${clientSlug}`);
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
