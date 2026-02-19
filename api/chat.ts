import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadDeliverables, searchDeliverables } from './utils/deliverable-loader';
import { queryWithDeliverables } from './utils/claude';
import { extractSources } from './utils/source-parser';

// In-memory session storage (for serverless, use Vercel KV or Redis in production)
const sessions = new Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { clientSlug, message, sessionId } = req.body;

    // Validate required fields
    if (!clientSlug || !message) {
      return res.status(400).json({ error: 'Missing required fields: clientSlug, message' });
    }

    // TODO: Add authentication check
    // Verify the user has access to this client's data
    // For now, we'll skip this since auth is client-side via sessionStorage

    console.log(`[Chat API] Query for client: ${clientSlug}`);
    console.log(`[Chat API] Message: "${message}"`);

    // Step 1: Load all deliverables for this client
    const allDeliverables = await loadDeliverables(clientSlug);

    if (allDeliverables.length === 0) {
      return res.status(404).json({
        error: 'No deliverables found for this client',
        details: `Client slug: ${clientSlug}`
      });
    }

    // Step 2: Search for relevant deliverables based on the query
    const relevantDeliverables = searchDeliverables(allDeliverables, message, 5);

    console.log(`[Chat API] Found ${relevantDeliverables.length} relevant deliverables`);

    // Step 3: Get or create conversation history
    const newSessionId = sessionId || generateSessionId();
    const conversationHistory = sessions.get(newSessionId) || [];

    // Step 4: Query Claude with deliverables as context
    const claudeResult = await queryWithDeliverables(
      message,
      relevantDeliverables,
      conversationHistory
    );

    if (!claudeResult.success) {
      return res.status(500).json({
        error: 'Claude API query failed',
        details: claudeResult.error
      });
    }

    const answer = claudeResult.data!.answer;

    // Step 5: Update conversation history
    conversationHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: answer }
    );
    sessions.set(newSessionId, conversationHistory);

    // Clean up old sessions (keep last 100)
    if (sessions.size > 100) {
      const oldestKey = sessions.keys().next().value;
      sessions.delete(oldestKey);
    }

    // Step 6: Extract source citations from the answer
    const sources = extractSources(answer, clientSlug);

    // Step 7: Return response
    return res.status(200).json({
      answer,
      sources,
      sessionId: newSessionId,
      conversationLength: conversationHistory.length / 2,
    });

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}
