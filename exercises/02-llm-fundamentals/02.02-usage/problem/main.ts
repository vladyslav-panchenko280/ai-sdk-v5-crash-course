import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

const model = anthropic('claude-3-5-haiku-20241022');

const output = streamText({
  model,
  prompt: `Which country makes the best sausages? Answer in a single paragraph.`,
});

for await (const chunk of output.textStream) {
  process.stdout.write(chunk);
}

console.log(await output.usage);
