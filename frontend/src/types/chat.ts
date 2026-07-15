export type Provider = "google" | "groq" | "inference";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatRequest {
  provider: Provider;
  messages: Message[];
  temperature?: number;
}

export interface ChatResponse {
  message: Message;
  provider: string;
  model: string;
}

export interface ProviderDetail {
  id: Provider;
  name: string;
  model: string;
  description: string;
  icon: string;
}
