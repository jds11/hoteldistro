"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center max-w-lg">
        <h2 className="font-semibold text-emerald-800 mb-1">Message Sent</h2>
        <p className="text-sm text-emerald-600">
          Thanks for reaching out. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-lg p-6 sm:p-8 max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm resize-none
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        {status === "error" && (
          <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg
                     hover:bg-brand-700 transition-colors shadow-sm disabled:opacity-50
                     focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}