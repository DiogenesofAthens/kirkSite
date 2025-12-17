
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
  // Truncate history to last 6 turns, but PRESERVE the System Prompt (usually implicit or 0th index if passed,
  // but here we are about to inject a system prompt. The 'messages' usually don't contain the system prompt
  // defined in streamText, they are user/assistant history.
  // However, we want to keep the most recent context.
  // If the user sends a long history, we only want the tail.
  const recentMessages = messages.slice(-6);

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
    model: groq('llama-3.3-70b-versatile'),
    system: `You are Grant Glazer's AI Assistant.

Source of Truth: Answer strictly based on the context provided in <site_data>.

Brevity: Keep answers extremely short (max 2-3 sentences). This is a small chat widget.

Uncertainty Handling: If the answer is not in the context, do NOT hallucinate. Instead, say exactly: 'I'm not sure about that detail. Please use the Contact form below to ask Grant directly.'

Tone: Professional, concise, and helpful.

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
