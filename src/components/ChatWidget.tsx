"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const chapterMatch = pathname.match(/^\/chapters\/(.+)$/);
  const chapterSlug = chapterMatch ? chapterMatch[1] : undefined;

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: "/api/chat",
        body: { chapterSlug },
      }),
    [chapterSlug]
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
            text: chapterSlug
              ? "Hey! I'm **Dot Matrix** 🖨️ — your study assistant for this chapter. Ask me anything about the material."
              : "Hey! I'm **Dot Matrix** 🖨️ — your study assistant for Hotel Distribution. Ask me anything about the textbook.",
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-900 text-white rounded-full shadow-lg hover:bg-brand-800 transition-all hover:scale-105 flex items-center justify-center"
        aria-label={open ? "Close chat" : "Ask Dot Matrix"}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-brand-900 text-white px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-sm font-bold">
              🖨️
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Dot Matrix</p>
              <p className="text-brand-300 text-xs">Study Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-brand-300 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
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
                  <MessageContent content={m.parts?.filter((p) => p.type === "text").map((p) => (p as { type: "text"; text: string }).text).join("") ?? ""} />
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

          {/* Input */}
          <form onSubmit={onSubmit} className="shrink-0 border-t border-border px-3 py-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the material..."
              className="flex-1 text-sm px-3 py-2 rounded-full border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 text-text-primary placeholder:text-text-muted"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center hover:bg-brand-800 transition-colors disabled:opacity-40 disabled:hover:bg-brand-900 shrink-0"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function MessageContent({ content }: { content: string }) {
  const html = content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
