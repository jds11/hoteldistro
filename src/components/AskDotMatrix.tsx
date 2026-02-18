"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import ChatMarkdown from "./ChatMarkdown";

const SUGGESTIONS = [
  "What is the difference between an OTA and a metasearch engine?",
  "How do hotels decide between direct and indirect channels?",
  "What is rate parity and why is it controversial?",
  "How does the GDS work?",
];

export default function AskDotMatrix() {
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: [
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [
          {
            type: "text" as const,
            text: "Hey! I'm **Dot Matrix** 💬 — the study assistant for this textbook. Ask me anything about hotel distribution — channels, technology, strategy, or any concept from the chapters.",
          },
        ],
      },
    ],
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || isLoading) return;
    setStarted(true);
    sendMessage({ text: text.trim() });
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <section className="py-12 border-b border-border">
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-lg">
            💬
          </div>
          <div>
            <h2 className="font-bold text-text-primary text-lg">Ask Dot Matrix</h2>
            <p className="text-text-muted text-sm">Your AI study assistant for hotel distribution</p>
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className={`px-6 space-y-3 overflow-y-auto transition-all ${
            started ? "max-h-80 py-3" : "max-h-0 py-0"
          }`}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${(m.role as string) === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  (m.role as string) === "user"
                    ? "bg-brand-900 text-white rounded-br-md"
                    : "bg-slate-100 text-text-primary rounded-bl-md"
                }`}
              >
                <ChatMarkdown
                  content={
                    m.parts
                      ?.filter((p) => p.type === "text")
                      .map((p) => (p as { type: "text"; text: string }).text)
                      .join("") ?? ""
                  }
                />
              </div>
            </div>
          ))}
          {isLoading && (messages[messages.length - 1]?.role as string) === "user" && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 text-xs py-2">
              Something went wrong. Try again.
            </div>
          )}
        </div>

        {/* Suggestions (shown before first message) */}
        {!started && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={onSubmit} className="px-6 pb-6 pt-2 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about hotel distribution..."
            className="flex-1 text-sm px-4 py-2.5 rounded-full border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 text-text-primary placeholder:text-text-muted"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full bg-brand-900 text-white flex items-center justify-center hover:bg-brand-800 transition-colors disabled:opacity-40 shrink-0"
            aria-label="Send message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}

// removed — using ChatMarkdown
