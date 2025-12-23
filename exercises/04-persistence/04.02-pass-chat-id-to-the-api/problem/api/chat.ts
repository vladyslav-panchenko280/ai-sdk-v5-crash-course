import { anthropic } from '@ai-sdk/anthropic';
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from 'ai';

export const POST = async (req: Request): Promise<Response> => {
  const body: { messages: UIMessage[]; id: string } =
    await req.json();
  const { messages, id } = body;

  console.log('id', id);

  const result = streamText({
    model: anthropic('claude-3-5-haiku-20241022'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};
