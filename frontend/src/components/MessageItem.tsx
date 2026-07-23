import React, { useState } from "react";
import { Message } from "../types/chat";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);
  const isSystem = message.role === "system";
  const isUser = message.role === "user";

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-zinc-950/60 border border-zinc-800 text-zinc-400 text-xs px-3.5 py-1.5 rounded-full font-mono max-w-lg text-center">
          ⚙️ System: {message.content}
        </div>
      </div>
    );
  }

  let thinkingContent = "";
  let mainContent = message.content;

  const thinkRegex = /<think>([\s\S]*?)<\/think>/i;
  const match = message.content.match(thinkRegex);

  if (match) {
    thinkingContent = match[1].trim();
    mainContent = message.content.replace(thinkRegex, "").trim();
  }

  return (
    <div className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 border shadow-sm transition-all duration-200 ${
          isUser
            ? "bg-indigo-600 border-indigo-500 text-white rounded-br-none"
            : "bg-zinc-900 border-zinc-800 text-zinc-100 rounded-bl-none"
        }`}
      >
        <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1">
          {isUser ? "You" : "Assistant"}
        </div>

        {!isUser && thinkingContent && (
          <div className="mb-3 bg-zinc-950/70 rounded-lg border border-zinc-800/80 overflow-hidden">
            <button
              onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-mono text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                🧠 Reasoning Process {isThinkingExpanded ? "" : "..."}
              </span>
              <span className="text-[10px] text-zinc-500">
                {isThinkingExpanded ? "Collapse ▲" : "Expand ▼"}
              </span>
            </button>
            {isThinkingExpanded && (
              <div className="px-3 py-2 border-t border-zinc-900 text-zinc-400 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto bg-zinc-950/90">
                {thinkingContent}
              </div>
            )}
          </div>
        )}

        <div className="text-sm leading-relaxed whitespace-pre-wrap select-text">
          {mainContent || (thinkingContent && !mainContent ? "Thinking complete." : "")}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
