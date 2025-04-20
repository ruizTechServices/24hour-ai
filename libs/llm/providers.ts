// libs/llm/providers.ts

export interface LLMRequest {
    model: string
    messages: { role: 'user'|'assistant', content: string }[]
    max_tokens?: number
  }
  
  export interface LLMResponse {
    id: string
    text: string
  }
  
  export interface LLMProvider {
    send(req: LLMRequest): Promise<LLMResponse>
  }
  
  //— OpenAI Wrapper —//
  import openaiClient from '@/libs/openai/client'
  export class OpenAIProvider implements LLMProvider {
    async send({ model, messages }: LLMRequest) {
      // use chat completions endpoint for typed JSON response
      const data = await openaiClient.chat.completions.create({
        model,
        messages,
      });

      // extract assistant reply
      const text = data.choices?.[0]?.message?.content ?? "No content";
  
      return {
        id: data.id,
        text
      };
    }
  }
  
  //— Anthropic Wrapper —//
  import anthropicClient from '@/libs/anthropic/client'
  export class AnthropicProvider implements LLMProvider {
    async send({ model, messages, max_tokens }: LLMRequest) {
      const resp = await anthropicClient.messages.create({
        model,
        messages,
        max_tokens: max_tokens ?? 1000
      });
      // flatten content blocks to plain text
      const text = resp.content.map(block => {
        if (block.type === 'text') return block.text;
        if (block.type === 'thinking') return block.thinking;
        if (block.type === 'tool_use') return '';
        if (block.type === 'redacted_thinking') return block.data;
        return '';
      }).join('');
      return { id: resp.id, text };
    }
  }
  
  //— Factory —//
  export function getProvider(name: string): LLMProvider {
    switch (name) {
      case 'openai':    return new OpenAIProvider()
      case 'anthropic': return new AnthropicProvider()
      // add more here…
      default: throw new Error(`Unknown provider: ${name}`)
    }
  }