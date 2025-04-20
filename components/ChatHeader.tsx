// /components/ChatHeader.tsx
import React from 'react';
import { Menu } from 'lucide-react';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  title: string;
}

export default function ChatHeader({ onToggleSidebar, title }: ChatHeaderProps) {
  return (
    <header className="p-4 border-b flex items-center justify-between bg-white flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-full hover:bg-neutral-100"
        aria-label="Toggle chat history sidebar"
      >
        <Menu size={20} />
      </button>
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="w-8"></div> {/* Spacer for alignment */}
    </header>
  );
}