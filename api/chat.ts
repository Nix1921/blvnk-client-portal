import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Health check — visit /api/chat in browser to verify function loads
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', hasKey: !!process.env.ANTHROPIC_API_KEY });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing required field: message' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
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
      { role: 'user', content: message },
    ];

    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2048,
        system: systemPrompt,
        messages,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('[Chat API] Anthropic error:', apiResponse.status, errorText);
      return res.status(502).json({
        error: 'Claude API error',
        details: `Status ${apiResponse.status}`,
      });
    }

    const data = await apiResponse.json() as { content?: Array<{ type: string; text?: string }> };
    const answer = data.content?.[0]?.type === 'text' ? data.content[0].text ?? '' : '';

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('[Chat API] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
