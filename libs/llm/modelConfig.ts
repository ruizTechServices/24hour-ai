// Centralized provider/model config for LLMs
// Add new providers/models here for both frontend and backend usage

export const PROVIDER_MODELS = {
  openai: [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  ],
  anthropic: [
    { value: 'claude-3-7-sonnet-20250219', label: 'Claude 3.7 Sonnet' },
    { value: 'claude-3-5-sonnet-latest', label: 'Claude 3.5 Sonnet Latest' },
    { value: 'claude-3-haiku-20240307', label: 'Claude 3.5 Haiku' },
  ],
  // Add more providers/models here as needed
} as const;

export type ProviderKey = keyof typeof PROVIDER_MODELS;
export type ModelValue = (typeof PROVIDER_MODELS)[ProviderKey][number]['value'];
