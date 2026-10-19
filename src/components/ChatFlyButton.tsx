import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface ChatFlyButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatFlyButton: React.FC<ChatFlyButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <aside aria-label="Live Customer Support Chat" className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        aria-label="Open BioCore-Design Customer Support & Engineering Chat"
        className="group flex items-center gap-2.5 px-4 py-3 bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 rounded-full shadow-xl hover:bg-neutral-800 dark:hover:bg-amber-400 border border-neutral-700/60 dark:border-amber-400 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 hover:scale-103 active:scale-97"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-4.5 h-4.5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900 dark:ring-amber-500" />
        </div>

        <div className="flex flex-col text-left pr-1">
          <span className="text-xs font-bold tracking-tight leading-tight">
            Chat with Support
          </span>
          <span className="text-[10px] opacity-80 font-mono tracking-tight">
            AI Assistant · Online
          </span>
        </div>
      </button>
    </aside>
  );
};
