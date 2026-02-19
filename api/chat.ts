import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing required field: message' });
    }

    const systemPrompt = `You are a brand strategy expert embedded in a client portal. You help clients understand their brand strategy deliverables.

Your knowledge comes from the following deliverables:

${context || 'No deliverables provided.'}

RULES:
- Answer based on the deliverables above. If the question is about general marketing frameworks (e.g. "What are Jungian archetypes?"), you may use your general knowledge but always connect it back to the client's strategy.
- When referencing a deliverable, mention its title naturally (e.g. "According to the Brand Archetype Guide...").
- Be concise but thorough. Use markdown formatting.
- If you genuinely don't know, say so — don't fabricate information.`;

    const messages = [
      ...(history || []),
      { role: 'user' as const, content: message },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      system: systemPrompt,
      messages,
    });

    const answer = response.content[0].type === 'text' ? response.content[0].text : '';

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('[Chat API] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
