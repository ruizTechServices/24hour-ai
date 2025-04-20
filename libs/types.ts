// /types.ts

export interface Message {
    sender: 'user' | 'bot';
    content: string;
  }
  
  export interface ChatHistoryItemData {
    id: number;
    title: string;
    date: string;
  }

  