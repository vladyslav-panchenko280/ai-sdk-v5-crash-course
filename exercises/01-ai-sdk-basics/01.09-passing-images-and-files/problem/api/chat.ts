import { anthropic } from '@ai-sdk/anthropic';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
  type UIMessage,
} from 'ai';

const model = anthropic('claude-3-5-haiku-20241022');

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const modelMessages: ModelMessage[] =
    convertToModelMessages(body.messages satisfies UIMessage[]);

  const streamTextResult = streamText({
    model,
    messages: modelMessages,
  });

  const stream = streamTextResult.toUIMessageStream();

  return createUIMessageStreamResponse({
    stream,
  });
};
