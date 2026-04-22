'use server';

import { NextRequest, NextResponse } from 'next/server';

const TAVUS_API_BASE = 'https://tavusapi.com/v2';

export async function POST(req: NextRequest) {
  const apiKey = process.env.TAVUS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'TAVUS_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { action, conversation_id, persona_id, replica_id, conversation_name, conversational_context, custom_greeting } = body;

    if (action === 'create') {
      const payload: Record<string, string> = {};
      if (persona_id) payload.persona_id = persona_id;
      if (replica_id) payload.replica_id = replica_id;
      if (conversation_name) payload.conversation_name = conversation_name;
      if (conversational_context) payload.conversational_context = conversational_context;
      if (custom_greeting) payload.custom_greeting = custom_greeting;

      const response = await fetch(`${TAVUS_API_BASE}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        return NextResponse.json({ error: data?.message || 'Failed to create conversation' }, { status: response.status });
      }
      return NextResponse.json(data);
    }

    if (action === 'end') {
      if (!conversation_id) {
        return NextResponse.json({ error: 'conversation_id is required' }, { status: 400 });
      }
      const response = await fetch(`${TAVUS_API_BASE}/conversations/${conversation_id}/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        return NextResponse.json({ error: data?.message || 'Failed to end conversation' }, { status: response.status });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
