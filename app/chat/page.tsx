// /app/chat/page.tsx (Example path for Next.js App Router)
"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import ChatSidebar from '@/components/ChatSidebar';
import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import { Message, ChatHistoryItemData } from '@/libs/types'; // Adjust path
import { ProviderKey, ModelValue, PROVIDER_MODELS } from '@/libs/llm/modelConfig';

export default function ChatPage() {
  // State management remains in the parent component
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItemData[]>([
    { id: 1, title: "Coffee recommendations", date: "Today" },
    { id: 2, title: "Vacation planning", date: "Yesterday" },
    { id: 3, title: "Book suggestions", date: "Jul 15" },
  ]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // NEW: provider/model state for dropdown
  const [provider, setProvider] = useState<ProviderKey>('openai');
  const [model, setModel] = useState<ModelValue>(PROVIDER_MODELS['openai'][0].value);
  
  // Handle message submission
  const handleSubmit = async () => { // Make async if using real API calls
    if (!input.trim() || isLoading) return;

    const newUserMessage: Message = { sender: 'user', content: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput(''); // Clear input immediately
    setIsLoading(true); // Set loading state

    // Call the actual LLM chat API endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          model,
          messages: [...messages, newUserMessage].map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content
          })),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error');
      }
      const result = await response.json();
      // Assume result contains the bot's reply in a 'content' or similar field
      const botContent = result.text || result.content || result.message || JSON.stringify(result);
      const botResponse: Message = {
        sender: 'bot',
        content: botContent,
      };
      setMessages(prev => [...prev, botResponse]);
      // TODO: Potentially update chat history title based on the conversation
      // e.g., if messages.length was 1 before adding the user message,
      // update the title of the current (or a new) chat history item.

    } catch (error: any) {
      console.error("Error fetching bot response:", error);
      // Optionally display an error message to the user
      setMessages(prev => [...prev, {
        sender: 'bot',
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  // Delete chat history item
  const deleteChat = (id: number) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
    // TODO: Add logic here if deleting the *currently active* chat.
    // Should probably clear the messages array or load another chat.
    // For now, it just removes from history.
  };

  // Start a new chat session
  const startNewChat = () => {
    setMessages([]);
    // Potentially create a new ChatHistoryItem here or wait for the first message.
    setSidebarOpen(false); // Close sidebar on new chat
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900 overflow-hidden">
      {/* Sidebar - Must be inside the main div but outside the flex-1 div */}
      {/* AnimatePresence controls the mounting/unmounting based on isSidebarOpen */}
      <AnimatePresence>
        {isSidebarOpen && (
          <ChatSidebar
            isOpen={isSidebarOpen} // Pass isOpen for internal logic if needed, but AnimatePresence handles visibility
            onClose={() => setSidebarOpen(false)}
            chatHistory={chatHistory}
            onNewChat={startNewChat}
            onDeleteChat={deleteChat}
          />
        )}
      </AnimatePresence>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full">
        <ChatHeader
          onToggleSidebar={toggleSidebar}
          title="24Hour-AI" //Or dynamically set based on selected chat
        />

        <MessageList messages={messages} />

        {/* dropdowns + input */}
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          provider={provider}
          onProviderChange={setProvider}
          model={model}
          onModelChange={setModel}
        />
      </div>
    </div>
  );
}