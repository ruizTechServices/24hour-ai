// /components/ChatHistoryItem.tsx
import React from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
import { ChatHistoryItemData } from '../libs/types'; // Adjust path if your types file is elsewhere

interface ChatHistoryItemProps {
  chat: ChatHistoryItemData;
  onDelete: (id: number) => void;
  // Add onClick prop if you want to load a specific chat when clicked
  // onClick: (id: number) => void;
}

export default function ChatHistoryItem({ chat, onDelete }: ChatHistoryItemProps) {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering potential parent onClick
    onDelete(chat.id);
  };

  return (
    <div
      key={chat.id}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 cursor-pointer group"
      // onClick={() => onClick(chat.id)} // Uncomment if you add loading functionality
    >
      <div className="flex items-center overflow-hidden">
        <MessageSquare size={16} className="mr-2 text-neutral-500 flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="text-sm font-medium truncate">{chat.title}</p>
          <p className="text-xs text-neutral-500">{chat.date}</p>
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 ml-2 flex-shrink-0"
        aria-label={`Delete chat: ${chat.title}`}
      >
        <Trash2 size={16} className="hidden group-hover:block" />
      </button>
    </div>
  );
}