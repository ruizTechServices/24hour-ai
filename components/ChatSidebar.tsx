// /components/ChatSidebar.tsx
"use client"; // Required for motion and onClick handlers

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import ChatHistoryItem from './ChatHistoryItem';
import { ChatHistoryItemData } from '../libs/types';
import ClerkHeader from './ClerkHeader';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatHistoryItemData[];
  onNewChat: () => void;
  onDeleteChat: (id: number) => void;
  // Add onSelectChat prop if needed: onSelectChat: (id: number) => void;
}

export default function ChatSidebar({
  isOpen,
  onClose,
  chatHistory,
  onNewChat,
  onDeleteChat,
  // onSelectChat // Uncomment if needed
}: ChatSidebarProps) {
  if (!isOpen) return null; // Render nothing if closed (handled by AnimatePresence in parent)

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed md:relative z-20 w-72 h-full bg-white shadow-lg flex flex-col"
      aria-label="Chat History Sidebar"
    >
      <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
        <h2 className="font-medium">Chat History</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-neutral-100"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-2 flex-shrink-0">
        <button
          onClick={onNewChat}
          className="w-full py-2 px-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
        >
          New Chat
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-2 space-y-1">
        {chatHistory.length === 0 ? (
          <p className="text-center text-sm text-neutral-500 py-4">No chat history yet.</p>
        ) : (
          chatHistory.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              chat={chat}
              onDelete={onDeleteChat}
              // onClick={onSelectChat} // Pass down if implemented
            />
          ))
        )}
      </div>
      <Link href="/" className="text-blue-500">Home</Link>
      <br/>
      <ClerkHeader />
    </motion.div>
  );
}