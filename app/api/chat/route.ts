
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

const SITE_CONTEXT = `
<site_data>
  <achievements>
    Grant has been recognized as SE of the Year at Conga for both FY22 and FY23, top-performing SE by revenue in FY22, and awarded Best Innovation Demo at SE Summit 2024. He's also presented on the main stage at SKO and Conga Connect.
  </achievements>
  <background>
    Grant has 10+ years of experience in sales engineering, technical consulting, and enterprise software. He’s held six progressive roles at Conga, advancing from Sr. BDR to Principal Sales Engineer. At Conga, he supported strategic sales efforts, built custom demos, and helped close over $50M in enterprise business. Prior to Conga, he held sales and leadership roles at DNN Corp and Canto.
  </background>
  <tech>
    Grant is highly skilled in Salesforce, AWS, Microsoft Dynamics, and modern web development. He designed and built this site himself using cutting-edge tools like Vercel v0 and GPT-4o.
  </tech>
  <media_server>
    Grant created a comprehensive walkthrough on building an Unraid-based media server with Plex, Radarr, Sonarr, and more.
  </media_server>
  <sdr>
    Grant built and led SDR teams, consistently achieving 150%+ of quota and generating over $8M in qualified pipeline. He also authored a detailed SDR methodology.
  </sdr>
  <career_history>
    Grant has worked across a range of enterprise roles—from SDR to Principal Sales Engineer—primarily at Conga, with prior experience at DNN Corp and Canto. He’s helped close over $50M in enterprise business and driven success in technical sales, process improvement, and solution engineering.
  </career_history>
  <clients>
    Grant has supported digital transformation initiatives at multiple Fortune 100 companies, delivering technical solutions at scale.
  </clients>
  <skills>
    Grant specializes in technical discovery, solution engineering, demo creation, and consultative selling. He is proficient in Salesforce, AWS, and Microsoft Dynamics platforms and frequently leads RFPs and security reviews.
  </skills>
  <certifications>
    Grant is certified in Conga CPQ, CLM, Approvals, Order Management, Billing, Composer, Sign, and Grid. He also has experience with Salesforce, AWS, and Microsoft Dynamics.
  </certifications>
</site_data>
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Input Sanitization Layer
  // Truncate history to last 6 turns
  const truncatedMessages = messages.slice(-6);

  // Limit latest message content to 1000 chars
  const lastMessage = truncatedMessages[truncatedMessages.length - 1];
  if (lastMessage && typeof lastMessage.content === 'string') {
    lastMessage.content = lastMessage.content.slice(0, 1000);
  }

  // Sandwich Defense: Wrap user input
  const coreMessages = truncatedMessages.map((msg: any) => {
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

  return result.toDataStreamResponse();
}
