import React from "react";
import { Provider, ProviderDetail } from "../types/chat";

interface ProviderSelectorProps {
  selectedProvider: Provider;
  onProviderChange: (provider: Provider) => void;
}

const PROVIDERS: ProviderDetail[] = [
  {
    id: "groq",
    name: "Groq Llama",
    model: "llama-3.3-70b-versatile",
    description: "Fast inference using Groq LLaMA 70B",
    icon: "⚡",
  },
  {
    id: "google",
    name: "Google Gemini",
    model: "gemini-3.5-flash",
    description: "Multi-modal capable flash model from Google",
    icon: "♊",
  },
  {
    id: "inference",
    name: "Dahl Inference",
    model: "MiniMaxAI/MiniMax-M2.7",
    description: "Deep thinking reasoning model (MiniMax M2.7)",
    icon: "🧠",
  },
];

export const ProviderSelector: React.FC<ProviderSelectorProps> = ({
  selectedProvider,
  onProviderChange,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full bg-zinc-900/60 backdrop-blur-md p-4 rounded-xl border border-zinc-800">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Select AI Engine
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROVIDERS.map((prov) => {
          const isSelected = selectedProvider === prov.id;
          return (
            <button
              key={prov.id}
              onClick={() => onProviderChange(prov.id)}
              className={`flex flex-col text-left p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-zinc-800/80 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.15)] text-white"
                  : "bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{prov.icon}</span>
                <span className="font-semibold text-sm">{prov.name}</span>
              </div>
              <span className="text-xs font-mono text-indigo-400 mb-1">
                {prov.model}
              </span>
              <span className="text-[11px] text-zinc-500 leading-relaxed">
                {prov.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderSelector;
