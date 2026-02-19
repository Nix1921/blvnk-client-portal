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
  // Try multiple possible paths for different environments

  const possiblePaths = [
    path.join(process.cwd(), 'deliverables', clientSlug),           // Standard
    path.join(__dirname, '..', '..', 'deliverables', clientSlug),  // Relative to API
    path.join('/var/task', 'deliverables', clientSlug),            // Vercel Lambda
  ];

  console.log(`[Deliverable Loader] process.cwd(): ${process.cwd()}`);
  console.log(`[Deliverable Loader] __dirname: ${__dirname}`);
  console.log(`[Deliverable Loader] Trying paths:`, possiblePaths);

  let deliverablesPath = '';

  try {
    // Find first path that exists
    for (const tryPath of possiblePaths) {
      if (fs.existsSync(tryPath)) {
        deliverablesPath = tryPath;
        console.log(`[Deliverable Loader] Found deliverables at: ${deliverablesPath}`);
        break;
      }
    }

    // Check if we found a valid path
    if (!deliverablesPath) {
      console.error(`[Deliverable Loader] No deliverables found in any of:`, possiblePaths);
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
