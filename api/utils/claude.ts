import Anthropic from '@anthropic-ai/sdk';
import type { DeliverableContent } from './deliverable-loader';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ClaudeResult {
  success: boolean;
  data?: {
    answer: string;
    sessionId?: string;
  };
  error?: string;
}

/**
 * Query Claude with deliverables as context (primary method for Option C pilot)
 */
export async function queryWithDeliverables(
  userQuestion: string,
  deliverables: DeliverableContent[],
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<ClaudeResult> {
  try {
    // Build context from deliverables
    const deliverablesContext = deliverables
      .map(d => `## ${d.title}\n\n${d.content}`)
      .join('\n\n---\n\n');

    const systemPrompt = `You are a brand strategy expert helping a client understand their Brand Intelligence System deliverables.

You have access to the following deliverables for this client:

${deliverablesContext}

When answering questions:
1. Ground your answers in the deliverables - cite specific sections
2. If the question asks about a framework (e.g., "What is Category Design?"), first explain the framework in 2-3 sentences, then connect it to the client's specific strategy
3. Keep your tone professional but conversational
4. Use "For Intus:" or "In your case:" when applying general concepts to client-specific strategy
5. Always cite sources in your answer (e.g., "Per the Brand Archetype Guide...")

Answer the client's question based on these deliverables.`;

    // Build messages array with conversation history
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...conversationHistory,
      {
        role: 'user',
        content: userQuestion,
      },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      system: systemPrompt,
      messages,
    });

    const answer = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    return {
      success: true,
      data: { answer },
    };
  } catch (error) {
    console.error('[Claude API] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Enrich a NotebookLM answer with Claude's framework education
 */
export async function enrichWithClaude(
  userQuestion: string,
  notebookAnswer: string
): Promise<ClaudeResult> {
  try {
    const enrichmentPrompt = buildEnrichmentPrompt(userQuestion, notebookAnswer);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: enrichmentPrompt,
        },
      ],
    });

    const answer = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    return {
      success: true,
      data: { answer },
    };
  } catch (error) {
    console.error('[Claude API] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Build the enrichment prompt for Claude
 */
function buildEnrichmentPrompt(userQuestion: string, notebookAnswer: string): string {
  return `You are a brand strategy expert helping a client understand their Brand Intelligence System deliverables.

The client asked: "${userQuestion}"

The deliverables provided this answer:
"""
${notebookAnswer}
"""

This answer references frameworks or strategic concepts but may not explain WHAT they are or WHY they're valuable for someone unfamiliar with brand strategy.

Your task:
1. If the answer mentions a framework (e.g., "Jungian archetypes", "Category Design", "StoryBrand"), explain what it is in 2-3 sentences
2. Then connect it back to the client's specific strategy using the deliverable answer
3. Keep any existing source citations from the deliverables
4. Keep your tone professional but conversational
5. Use "For Intus:" or "In your case:" to transition from general to specific

Format your response as:
[Framework explanation if needed]

For Intus: [Client-specific application from deliverables]

[Keep source citations if present]

If the answer already fully explains the concept, just return it as-is.`;
}
