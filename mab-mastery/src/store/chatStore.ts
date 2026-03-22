import { create } from 'zustand';
import type { ChatMessage } from '../types/content';

const EMPTY_MESSAGES: ChatMessage[] = [];

interface ChatState {
  histories: Record<string, ChatMessage[]>;
  addMessage: (moduleId: string, message: ChatMessage) => void;
  getHistory: (moduleId: string) => ChatMessage[];
  clearHistory: (moduleId: string) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  histories: {},
  addMessage: (moduleId, message) =>
    set((s) => ({
      histories: {
        ...s.histories,
        [moduleId]: [...(s.histories[moduleId] || []), message],
      },
    })),
  getHistory: (moduleId) => get().histories[moduleId] || EMPTY_MESSAGES,
  clearHistory: (moduleId) =>
    set((s) => {
      const h = { ...s.histories };
      delete h[moduleId];
      return { histories: h };
    }),
}));
