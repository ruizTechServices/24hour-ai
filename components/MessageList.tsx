// /components/MessageList.tsx
"use client"; // Required for framer-motion, hooks

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Message } from '../libs/types'; // Adjust path

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <AnimatePresence initial={false}>
        {messages.length === 0 ? (
          <motion.div
            key="welcome-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} // Added exit animation
            className="h-full flex flex-col items-center justify-center text-center p-8"
          >
            <div className="mb-6 p-4 rounded-full bg-neutral-100">
              <MessageSquare size={32} className="text-neutral-500" />
            </div>
            <h2 className="text-2xl font-medium mb-2">24Hour-AI</h2>
            <p className="text-neutral-600 max-w-md">
              Your minimalist chat companion with access to an immense
              <br/>
              access to SOTA LLMs.<br/>
              <b className='text-neutral-900 animate-pulse'>How can I help you today?</b>
            </p>
          </motion.div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={`message-${index}`} // Unique key for each message
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.1 }}
              layout // Added layout animation for smoother additions/removals
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[60%] p-3 rounded-2xl shadow-sm ${ // Added subtle shadow
                  message.sender === 'user'
                    ? 'bg-neutral-900 text-white rounded-tr-none'
                    : 'bg-neutral-200 text-neutral-900 rounded-tl-none'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
      {/* Always render the ref div */}
      <div ref={messagesEndRef} />
    </div>
  );
}