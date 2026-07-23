import React, { useEffect, useRef } from "react";
import { Message } from "../types/chat";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-h-[60vh] min-h-[350px] bg-zinc-950/30 border border-zinc-800 rounded-xl">
      {messages.length <= 1 ? (
        <div className="flex flex-col items-center justify-center h-[96%] text-center p-6 text-zinc-500">
          <span className="text-4xl mb-3">💬</span>
          <p className="text-sm font-semibold">Start a new conversation</p>
          <p className="text-xs text-zinc-600 mt-1 max-w-sm">
            Select an AI engine above and send a message. Your chat history will be sent to the model.
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))
      )}

      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl rounded-bl-none px-4 py-3 text-zinc-300 shadow-sm max-w-xs">
            <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-1.5">
              AI Engine is thinking
            </div>
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
