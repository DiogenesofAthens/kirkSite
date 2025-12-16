import { NextRequest, NextResponse } from 'next/server';
import { performExtraction } from '@/actions/extract-entity';

export async function POST(req: NextRequest) {
  // 1. Anti-Abuse / Rate Limit Warning (Not implemented fully, but warning is in docs)
  // In a real app, use KV or Redis here.

  // 2. Auth Check
  const apiKey = req.headers.get('x-api-key');
  const validKey = process.env.API_SECRET_KEY || "demo-key-123"; // Fallback for demo

  if (!apiKey || apiKey !== validKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Payload Check
  try {
    const body = await req.json();
    const { text, schema } = body;

    if (!text) {
        return NextResponse.json({ error: "Missing 'text' field" }, { status: 400 });
    }

    if (text.length > 50000) {
        return NextResponse.json({ error: "Payload Too Large: Text exceeds 50k characters" }, { status: 413 });
    }

    // 4. Extraction Logic
    const result = await performExtraction(text, schema || 'general');

    if (result.success) {
        return NextResponse.json(result.data);
    } else {
        return NextResponse.json({ error: result.error }, { status: 500 });
    }

  } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
