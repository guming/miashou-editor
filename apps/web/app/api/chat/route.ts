import { openai } from '@ai-sdk/openai';
import { StreamData, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // optional: use stream data
  const data = new StreamData();
  data.append('initialized call');

  data.append('initialized call2');

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages,
    onFinish() {
        data.append('call completed');
        data.close();
    },
  });

  return result.pipeAIStreamToResponse(data);
}