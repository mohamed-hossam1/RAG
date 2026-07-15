"use client";

import ProviderSelector from "../components/ProviderSelector";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import useChat from "../hooks/useChat";

export default function Home() {
  const {
    messages,
    provider,
    isLoading,
    error,
    sendMessage,
    setProvider,
    clearChat,
  } = useChat();

  return (
    <div className="flex flex-col h-screen bg-black text-zinc-100 font-sans">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <div>
            <h1 className="text-md font-bold tracking-tight text-white">
              AI Multi-Engine Chatbot
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase font-mono">
              FastAPI + Next.js Integration
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-xs font-mono text-zinc-500 hover:text-zinc-300 border border-zinc-850 px-3 py-1.5 rounded-lg hover:bg-zinc-900 transition-all cursor-pointer"
        >
          Clear History
        </button>
      </header>

      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 md:p-6 overflow-hidden gap-4">
        <ProviderSelector
          selectedProvider={provider}
          onProviderChange={setProvider}
        />

        {error && (
          <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-3.5 text-xs text-red-400 font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              ⚠️ <strong>Error:</strong> {error}
            </span>
          </div>
        )}

        <MessageList messages={messages} isLoading={isLoading} />

        <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
