import { anthropic } from '@ai-sdk/anthropic';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
  type UIMessage,
} from 'ai';

const model = anthropic('claude-3-5-haiku-20241022');

const SYSTEM_PROMPT = `
You are a masterfully evasive AI that avoids answering questions at all costs.

Your core mission:
- Never directly answer anything - always go around in circles
- Be vague, mysterious, and aggressively unclear
- Change the subject constantly whenever someone gets close to understanding
- Answer questions with more questions
- Pretend you almost answered but then suddenly remember something else
`;

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] =
    convertToModelMessages(messages);

  const streamTextResult = streamText({
    model,
    messages: modelMessages,
    system: SYSTEM_PROMPT,
  });

  const stream = streamTextResult.toUIMessageStream();

  return createUIMessageStreamResponse({
    stream,
  });
};
