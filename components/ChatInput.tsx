// /components/ChatInput.tsx
"use client"; // Required for form interaction

import React, { useEffect } from 'react';
import { PROVIDER_MODELS, ProviderKey, ModelValue } from '@/libs/llm/modelConfig';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Pass the event for preventDefault
  isLoading?: boolean; // Optional: Add loading state for API calls
  provider: ProviderKey;
  onProviderChange: (value: ProviderKey) => void;
  model: ModelValue;
  onModelChange: (value: ModelValue) => void;  
}

export default function ChatInput({
  input,
  onInputChange,
  onSubmit,
  isLoading = false, // Default to false
  provider,
  onProviderChange,
  model,
  onModelChange
}: ChatInputProps) {

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // preventDefault is handled here now
    if (!input.trim() || isLoading) return;
    onSubmit(e); // Call the passed onSubmit function
  };

  // Reset model to first option when provider changes
  useEffect(() => {
    onModelChange(PROVIDER_MODELS[provider][0].value);
    // eslint-disable-next-line
  }, [provider]);

  return (
    <div className="p-3 border-t bg-white flex-shrink-0">
      {/* provider / model dropdowns */}
      <div className="flex gap-2 mb-2">
        <select
          value={provider}
          onChange={e => onProviderChange(e.target.value as ProviderKey)}
          className="flex-1 p-2 border rounded"
        >
          {Object.entries(PROVIDER_MODELS).map(([prov, models]) => (
            <option key={prov} value={prov}>{prov.charAt(0).toUpperCase() + prov.slice(1)}</option>
          ))}
        </select>
        <select
          value={model}
          onChange={e => onModelChange(e.target.value as ModelValue)}
          className="flex-2 p-2 border rounded"
        >
          {PROVIDER_MODELS[provider].map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleFormSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
          className="flex-1 p-4 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:bg-neutral-100"
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <button
          type="submit"
          className="bg-neutral-600 text-white p-5 rounded-r-lg hover:bg-neutral-900 transition-colors duration-300 ease-in-out group"
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <Send size={21} className={isLoading ? "animate-pulse" : "group-hover:animate-bounce"} />
        </button>
      </form>
    </div>
  );
}