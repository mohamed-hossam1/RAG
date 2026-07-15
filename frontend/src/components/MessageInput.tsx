import React, { useState, FormEvent, KeyboardEvent } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;
    onSendMessage(content);
    setContent("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full mt-2">
      <div className="relative flex-1 flex bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Please wait..." : "Type your message here..."}
          disabled={isLoading}
          rows={1}
          className="flex-1 max-h-32 min-h-[44px] py-3 px-4 resize-none bg-transparent outline-none text-zinc-100 text-sm leading-relaxed placeholder-zinc-500 disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !content.trim()}
        className="flex items-center justify-center w-12 h-11 self-end rounded-xl bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 disabled:bg-zinc-850 disabled:border-zinc-800 disabled:opacity-40 text-white font-semibold text-lg cursor-pointer transition-all active:scale-95"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          "📤"
        )}
      </button>
    </form>
  );
};

export default MessageInput;
