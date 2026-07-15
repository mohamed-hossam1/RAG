import { useState, useCallback } from "react";
import { Message, Provider, ChatRequest } from "../types/chat";
import { sendChatMessage } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are a helpful",
    },
  ]);
  const [provider, setProvider] = useState<Provider>("groq");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: Message = { role: "user", content };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const updatedMessages = [...messages, userMessage];

        const requestPayload: ChatRequest = {
          provider,
          messages: updatedMessages,
          temperature: 0.7,
        };

        const result = await sendChatMessage(requestPayload);

        setMessages((prev) => [
          ...prev,
          {
            role: result.message.role,
            content: result.message.content,
          },
        ]);
      } catch (err: { message: string }) {
        setError(err.message || "Failed to get a response from the server.");
      } finally {
        setIsLoading(false);
      }
    },
    [messages, provider],
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: "system",
        content: "You are a helpful.",
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    provider,
    isLoading,
    error,
    sendMessage,
    setProvider,
    clearChat,
  };
}
export default useChat;
