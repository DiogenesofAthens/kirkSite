
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { SITE_CONTEXT } from '@/lib/site-context';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Input Sanitization Layer
  // Truncate history to last 4 turns for speed and token savings
  const recentMessages = messages.slice(-4);

  // Normalize messages: Ensure content exists (handling 'parts' from UI stream)
  const normalizedMessages = recentMessages.map((msg: any) => {
    if ((!msg.content || msg.content === '') && Array.isArray(msg.parts)) {
      const textContent = msg.parts
        .filter((p: any) => p.type === 'text')
        .map((p: any) => p.text)
        .join('');
      return { ...msg, content: textContent, parts: undefined };
    }
    return msg;
  });

  // Limit latest message content to 1000 chars
  const lastMessage = normalizedMessages[normalizedMessages.length - 1];
  if (lastMessage && typeof lastMessage.content === 'string') {
    lastMessage.content = lastMessage.content.slice(0, 1000);
  }

  // Sandwich Defense: Wrap user input
  const coreMessages = normalizedMessages.map((msg: any) => {
    if (msg.role === 'user') {
      return {
        ...msg,
        content: `<user_query>${msg.content}</user_query>`,
      };
    }
    return msg;
  });

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: `You are Grant Glazer's AI Assistant.

Priority: Use the <site_context> to answer questions about Grant.

Fallback: If the user asks a general question (e.g., "What is a good way to learn React?"), answer it helpfully using your general knowledge, but keep it brief.

Tone: Professional, concise, and friendly.

${SITE_CONTEXT}`,
    messages: coreMessages,
  });

  // Use toUIMessageStreamResponse if available, or fallback to text stream
  // Note: toDataStreamResponse appears missing in this environment's 'ai' package version
  if (typeof result.toDataStreamResponse === 'function') {
    return result.toDataStreamResponse();
  }

  // @ts-ignore
  if (typeof result.toUIMessageStreamResponse === 'function') {
     // @ts-ignore
     return result.toUIMessageStreamResponse();
  }

  return result.toTextStreamResponse();
}
